export interface Question {
  id: string;
  category: string;
  categoryLabel: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanationCorrect: string;
  explanationWrong: string;
}

export const BICSI_CERTIFICATIONS = [
  { key: "rcdd", label: "Registered Communications Distribution Designer (RCDD)" },
  { key: "tech", label: "Technician (TECH)" },
] as const;

export type CertKey = (typeof BICSI_CERTIFICATIONS)[number]["key"];
