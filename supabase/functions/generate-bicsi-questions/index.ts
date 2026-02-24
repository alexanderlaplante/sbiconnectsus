import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CERT_DETAILS: Record<string, string> = {
  inst1: "BICSI Installer 1 Non-Renewable Certificate – covers basic structured cabling, safety, standards awareness, cable types, tools, and basic installation practices.",
  instc: "BICSI Installer 2 Copper (INSTC) – covers copper cabling systems including Cat5e/Cat6/Cat6A termination, testing, troubleshooting, TIA-568 standards, bonding & grounding, and advanced copper installation techniques.",
  instf: "BICSI Installer 2 Optical Fiber (INSTF) – covers fiber optic cabling systems including singlemode/multimode fiber, fusion/mechanical splicing, OTDR testing, connector polishing, fiber standards, and loss budgets.",
  tech: "BICSI Technician (TECH) – covers advanced topics: network design, project management, codes & standards (TIA, NEC, NFPA), DAS, audiovisual systems, data center infrastructure, and system commissioning.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { certifications } = await req.json();
    // certifications should be an array like ["inst1", "instc", "instf", "tech"]

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const validCerts = (certifications || ["inst1", "instc", "instf", "tech"]).filter(
      (c: string) => CERT_DETAILS[c]
    );

    const certDescriptions = validCerts
      .map((c: string, i: number) => `${i + 1}. ${CERT_DETAILS[c]}`)
      .join("\n");

    const prompt = `You are a BICSI certification exam prep expert. Generate exactly ${validCerts.length} multiple-choice practice questions, one for each of these BICSI certifications:

${certDescriptions}

For each question:
- Make it realistic exam-level difficulty
- Provide exactly 4 answer options
- Include the correct answer index (0-based)
- Include a brief explanation for the correct answer
- Include a brief explanation for when the wrong answer is chosen

Return a JSON array with this exact structure:
[
  {
    "category": "<cert key: inst1|instc|instf|tech>",
    "categoryLabel": "<human readable cert name>",
    "prompt": "<question text>",
    "options": ["<option A>", "<option B>", "<option C>", "<option D>"],
    "correctIndex": <0-3>,
    "explanationCorrect": "<why the correct answer is right>",
    "explanationWrong": "<what the correct answer is and why>"
  }
]

Return ONLY the JSON array, no markdown, no code fences, no extra text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content:
              "You are a BICSI certification exam question generator. Return only valid JSON arrays. No markdown formatting.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI gateway returned ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse the JSON from the response, stripping any markdown fences
    let questions;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      questions = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid response from AI");
    }

    // Add IDs
    const withIds = questions.map((q: any, i: number) => ({
      id: `${q.category}_ai_${Date.now()}_${i}`,
      ...q,
    }));

    return new Response(JSON.stringify({ questions: withIds }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("generate-bicsi-questions error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
