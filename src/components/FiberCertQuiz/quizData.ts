export interface QuizQuestion {
  id: number;
  prompt: string;
  correct: string;
  wrongPool: string[];
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    prompt: "What is total internal reflection, and why is it essential for fiber optic transmission?",
    correct:
      "Light is confined within the fiber core because it reflects off the core-cladding interface whenever the angle exceeds the critical angle.",
    wrongPool: [
      "Light enters the cladding and bounces between the jacket and core at any angle.",
      "The signal refracts through the cladding to reach the buffer layer for amplification.",
      "Total internal reflection occurs when photons absorb into the core material and re-emit at lower wavelengths.",
      "It is a phenomenon where light exits the core at steep angles to create mode dispersion.",
      "Light spirals around the outside of the cladding due to magnetic field alignment.",
      "The core and cladding have identical refractive indices, trapping light by diffraction.",
      "Photons are reflected by the outer jacket back into the buffer tube.",
      "Total internal reflection only applies to multimode fiber above 1550 nm wavelengths.",
    ],
    explanation:
      "Total internal reflection keeps light bouncing inside the core by reflecting at the core/cladding boundary above the critical angle.",
  },
  {
    id: 2,
    prompt: "What is the difference between insertion loss and return loss?",
    correct:
      "Insertion loss measures the total signal power lost through a link (lower is better), while return loss measures reflected power back toward the source (higher dB is better).",
    wrongPool: [
      "Insertion loss is the gain added by amplifiers; return loss is cable capacitance.",
      "Return loss is always measured in watts; insertion loss is measured in volts.",
      "Insertion loss only applies to copper cables; return loss is fiber-specific.",
      "Return loss is how much signal exits the far end; insertion loss is reflections.",
      "Insertion loss increases as cable length decreases due to impedance matching.",
      "Both values are measured identically and can be used interchangeably.",
      "Return loss measures chromatic dispersion; insertion loss measures modal bandwidth.",
      "Insertion loss is caused by reflections; return loss is caused by absorption.",
    ],
    explanation:
      "IL = total signal loss through a link (lower is better); RL = reflected signal back to source (higher dB value is better).",
  },
  {
    id: 3,
    prompt: "Identify two differences between OS2 and OM4 fiber.",
    correct:
      "OS2 is a singlemode fiber with a ~9 µm core designed for long-distance runs at 1310/1550 nm, whereas OM4 is a 50 µm multimode fiber optimized for shorter links at 850/1300 nm.",
    wrongPool: [
      "OS2 is multimode with a 62.5 µm core; OM4 is singlemode with a 9 µm core.",
      "Both OS2 and OM4 use a 50 µm core but differ only in jacket color.",
      "OM4 supports longer distances than OS2 because it uses laser-optimized cladding.",
      "OS2 operates exclusively at 850 nm; OM4 operates at 1310 nm and 1550 nm.",
      "OS2 has a larger core diameter than OM4 to carry more modes of light.",
      "OM4 is designed for outdoor long-haul runs exceeding 80 km; OS2 is limited to 300 m.",
      "OS2 uses graded-index profiling; OM4 uses step-index profiling for signal integrity.",
      "Both fibers are interchangeable as long as the same connector type is used.",
    ],
    explanation:
      "OS2 = singlemode, ~9 µm core, long distance, 1310/1550 nm. OM4 = multimode, 50 µm core, shorter distances, 850/1300 nm.",
  },
  {
    id: 4,
    prompt: "What are the standard testing wavelengths for singlemode fiber?",
    correct: "Singlemode fiber is standardly tested at 1310 nm and 1550 nm.",
    wrongPool: [
      "850 nm and 1300 nm are the standard singlemode testing wavelengths.",
      "Singlemode is tested at 980 nm and 1625 nm exclusively.",
      "The standard wavelength for all singlemode testing is 850 nm only.",
      "Singlemode fiber uses 1490 nm and 1590 nm for certification testing.",
      "Testing is performed at 780 nm and 1060 nm per TIA standards.",
      "All fiber types including singlemode are tested at 850 nm and 1310 nm.",
      "Singlemode testing uses 1550 nm only; 1310 nm applies to multimode.",
      "Standard singlemode wavelengths are 630 nm (visible red) and 1550 nm.",
    ],
    explanation: "Standard singlemode test wavelengths are 1310 nm and 1550 nm.",
  },
  {
    id: 5,
    prompt: "What are the first six colors in the TIA-598 12-fiber color sequence?",
    correct: "Blue, Orange, Green, Brown, Slate, White.",
    wrongPool: [
      "Red, Blue, Green, Yellow, White, Orange.",
      "Blue, Orange, Green, Brown, White, Red.",
      "Orange, Blue, Green, Brown, Slate, White.",
      "Blue, Green, Orange, Brown, Slate, White.",
      "Blue, Orange, Brown, Green, Slate, White.",
      "White, Blue, Orange, Green, Brown, Slate.",
      "Blue, Orange, Green, Slate, Brown, White.",
      "Blue, Yellow, Green, Brown, Slate, White.",
    ],
    explanation:
      "The TIA-598 standard sequence starts: Blue, Orange, Green, Brown, Slate, White.",
  },
  {
    id: 6,
    prompt: "What jacket color is typically used for singlemode fiber?",
    correct: "Yellow is the standard jacket color for singlemode fiber.",
    wrongPool: [
      "Orange is the industry standard for singlemode fiber jackets.",
      "Aqua jackets are designated specifically for singlemode applications.",
      "Blue is the recognized color for all singlemode fiber cables.",
      "Singlemode fiber uses a green jacket per TIA standards.",
      "Violet is the designated color for singlemode OS2 fiber.",
      "Black jackets are universally used for singlemode outdoor cables.",
      "Red jackets indicate singlemode fiber in all standards.",
      "Singlemode fiber has no designated color; any color may be used.",
    ],
    explanation: "Yellow is the standard jacket color for singlemode (OS2) fiber.",
  },
  {
    id: 7,
    prompt: "Why should jacket color alone not be relied upon to identify fiber type?",
    correct:
      "Jacket colors can vary between manufacturers and installations; fiber type must be confirmed by checking printed markings, labels, or documentation.",
    wrongPool: [
      "Jacket color is always standardized worldwide, so it is a reliable identifier.",
      "The color fades over time, so it is only useful within the first year of installation.",
      "Only the buffer tube color matters; the outer jacket has no significance.",
      "Jacket color identifies the connector type, not the fiber type.",
      "Manufacturers are legally required to use specific colors, making labels unnecessary.",
      "Jacket color only applies to indoor cables; outdoor cables have no color coding.",
      "Color is purely decorative and has never been associated with fiber types.",
      "The TIA standard prohibits using color for identification of any cable type.",
    ],
    explanation:
      "Colors vary by vendor and install; always verify via printed markings, labels, or project documentation.",
  },
  {
    id: 8,
    prompt: "What is the standard minimum bend radius rule when dynamically pulling fiber cable?",
    correct:
      "During active pulling, the bend radius should be at least 20 times the cable's outer diameter.",
    wrongPool: [
      "The minimum bend radius while pulling is 5 times the cable diameter.",
      "Dynamic bend radius is 10 times the outer diameter for all fiber types.",
      "There is no specific bend radius rule during installation; only static rules apply.",
      "Bend radius during pulling should be 50 times the cable OD per BICSI.",
      "The rule is 15 times the cable diameter, but only for singlemode fiber.",
      "Dynamic bend radius is the same as static: 10x the OD.",
      "Fiber can be bent to any radius during installation as long as pulling tension is below 25 lbs.",
      "The standard is 30 times the cable OD but only when using innerduct.",
    ],
    explanation:
      "The dynamic (during-pull) bend radius for fiber cable is approximately 20× the cable outside diameter.",
  },
  {
    id: 9,
    prompt: "Why is excessive sidewall pressure harmful to fiber optic cable?",
    correct:
      "High sidewall pressure creates microbends in the fiber, increasing signal attenuation and potentially causing permanent damage.",
    wrongPool: [
      "Sidewall pressure has no effect on fiber because the glass is protected by the buffer.",
      "It only affects the jacket aesthetics but does not impact signal quality.",
      "Sidewall pressure improves signal strength by compressing the core.",
      "It causes the cladding to separate from the core, creating air gaps that amplify the signal.",
      "Excessive pressure melts the fiber coating, which changes the wavelength of light.",
      "Sidewall pressure is only a concern for copper cables, not fiber.",
      "It changes the refractive index of the jacket, not the core or cladding.",
      "Pressure causes chromatic dispersion but does not affect physical integrity.",
    ],
    explanation:
      "Sidewall pressure induces microbends that increase attenuation and can permanently damage the fiber.",
  },
  {
    id: 10,
    prompt: "What is the purpose of a breakaway swivel during fiber cable pulling?",
    correct:
      "A breakaway swivel detaches at a preset tension threshold, preventing the cable from being over-stressed during installation.",
    wrongPool: [
      "It connects the fiber to the pull rope using epoxy for a permanent bond.",
      "A breakaway swivel rotates the cable to untwist it after installation.",
      "It measures pulling speed to ensure compliance with installation timelines.",
      "The swivel prevents the cable from being pulled too slowly.",
      "It is used to splice fibers together in the field without a fusion splicer.",
      "A breakaway swivel increases pulling tension to overcome conduit friction.",
      "It serves as a lubricant applicator that coats the cable during the pull.",
      "The swivel locks the cable in place once it reaches the destination point.",
    ],
    explanation:
      "A breakaway swivel separates at a calibrated tension limit to protect fiber from being over-pulled.",
  },
  {
    id: 11,
    prompt: "What is the acceptable loss threshold for a mechanical splice?",
    correct: "A properly made mechanical splice should have no more than approximately 0.3 dB of loss.",
    wrongPool: [
      "Mechanical splices are acceptable up to 1.0 dB of loss.",
      "The standard for mechanical splices is 0.05 dB or less.",
      "Any loss below 0.75 dB is considered passing for a mechanical splice.",
      "Mechanical splices have zero loss when index-matching gel is applied.",
      "The acceptable limit is 0.5 dB, identical to the fusion splice standard.",
      "Mechanical splice loss is not measured; only fusion splices require testing.",
      "Loss of up to 2.0 dB per mechanical splice is within TIA tolerance.",
      "The threshold is 0.1 dB, the same as a fusion splice target.",
    ],
    explanation: "The acceptable loss for a mechanical splice is approximately 0.3 dB.",
  },
  {
    id: 12,
    prompt: "What is the typical target average loss for a fusion splice?",
    correct:
      "A fusion splice should target an average loss of approximately 0.1 dB or less.",
    wrongPool: [
      "Fusion splice loss targets are typically around 0.5 dB.",
      "The target is 0.3 dB, matching the mechanical splice standard.",
      "Fusion splices always achieve exactly 0.0 dB loss with modern equipment.",
      "Average fusion splice loss should be below 1.0 dB per the TIA standard.",
      "The industry target is 0.25 dB for singlemode and 0.5 dB for multimode.",
      "Fusion splice loss is not measurable in the field; it must be calculated.",
      "A loss of 0.02 dB is the minimum required by BICSI for certification.",
      "Target loss for fusion splicing is 0.75 dB when using ribbon fiber.",
    ],
    explanation:
      "The typical target average loss for a quality fusion splice is ~0.1 dB or less.",
  },
  {
    id: 13,
    prompt: "Why is the cleave angle critical when performing a fusion splice?",
    correct:
      "An improper cleave angle causes fiber end-face misalignment, which increases splice loss and back-reflectance.",
    wrongPool: [
      "Cleave angle only matters aesthetically when inspecting under a microscope.",
      "A steeper cleave angle improves light coupling by directing it into the cladding.",
      "Cleave angle is irrelevant for fusion splicing; it only matters for mechanical splices.",
      "The angle determines the color of the light passing through the splice point.",
      "Cleave angle affects only multimode fiber; singlemode is insensitive to angle.",
      "A 45-degree cleave is ideal because it maximizes surface contact area.",
      "Poor cleave angles cause the fiber to melt unevenly, but loss is unaffected.",
      "Cleave angle controls the splice's tensile strength, not its optical performance.",
    ],
    explanation:
      "A bad cleave angle misaligns fiber end-faces, increasing both splice loss and reflectance.",
  },
  {
    id: 14,
    prompt: "What is the proper procedure for managing fibers in a splice tray?",
    correct:
      "Fibers should be routed neatly maintaining minimum bend radius, secured in place, with splice sleeves protected and all fibers clearly labeled.",
    wrongPool: [
      "Fibers can be coiled tightly in any direction as long as the tray lid closes.",
      "Splice trays are optional; fibers can hang freely inside the enclosure.",
      "Each fiber should be taped directly to the tray base without routing guides.",
      "Only the first and last fibers need to be labeled; intermediate ones are traced.",
      "Fibers should be left with maximum slack outside the tray for future access.",
      "Splice sleeves should be removed after curing to reduce tray congestion.",
      "Bend radius does not apply inside splice trays due to their small size.",
      "All fibers should exit the tray from the same side regardless of routing.",
    ],
    explanation:
      "Maintain bend radius, route neatly, secure fibers, protect splice sleeves, and label everything.",
  },
  {
    id: 15,
    prompt: "What is the purpose of using launch and receive cables during OTDR testing?",
    correct:
      "Launch and receive fibers eliminate the OTDR's near-end and far-end dead zones, allowing accurate measurement of the first and last connectors in the link.",
    wrongPool: [
      "They provide extra length so the OTDR can calibrate its internal clock.",
      "Launch cables are used to clean the connectors before testing begins.",
      "They amplify the OTDR signal to extend its measurement range beyond 200 km.",
      "Receive cables convert the optical signal to electrical for the OTDR display.",
      "Launch fibers are needed only for multimode; singlemode has no dead zones.",
      "They are used to add intentional loss for calibrating the OTDR's threshold settings.",
      "Launch and receive cables replace the need for a light source and power meter.",
      "They protect the OTDR port from contamination but serve no measurement purpose.",
    ],
    explanation:
      "Launch/receive fibers push dead zones outside the link, enabling accurate measurement of the first and last connectors.",
  },
  {
    id: 16,
    prompt: "What is the difference between Tier 1 and Tier 2 fiber testing?",
    correct:
      "Tier 1 testing uses an optical loss test set (light source and power meter) to verify basic pass/fail, while Tier 2 adds OTDR analysis to characterize individual events along the link.",
    wrongPool: [
      "Tier 1 uses an OTDR; Tier 2 uses only a visual fault locator.",
      "Tier 2 is a simplified version of Tier 1 designed for shorter cable runs.",
      "Both tiers use the same equipment; the difference is only in documentation format.",
      "Tier 1 tests bandwidth; Tier 2 tests insertion loss exclusively.",
      "Tier 2 testing is optional and not recognized by any industry standard.",
      "Tier 1 requires an OTDR and a power meter simultaneously on the same fiber.",
      "Tier 2 is only applicable to singlemode fiber; multimode uses Tier 1 exclusively.",
      "Tier 1 measures reflectance only; Tier 2 measures both loss and reflectance.",
    ],
    explanation:
      "Tier 1 = OLTS (power meter + light source) for pass/fail. Tier 2 = OTDR for detailed event-level analysis.",
  },
  {
    id: 17,
    prompt: "What does an event on an OTDR trace represent?",
    correct:
      "An OTDR event is any point along the fiber that causes a loss or reflection, such as a splice, connector, bend, or break.",
    wrongPool: [
      "An event indicates a section of fiber with zero loss and perfect transmission.",
      "Events represent amplification points where the signal strength increases.",
      "An OTDR event marks where the fiber changes from singlemode to multimode.",
      "Events only appear at the beginning and end of the fiber, never in the middle.",
      "An event indicates a change in jacket color along the cable route.",
      "OTDR events are software artifacts that do not correspond to physical features.",
      "An event shows where the fiber exceeds its maximum bandwidth capacity.",
      "Events represent temperature changes along the cable path detected by the laser.",
    ],
    explanation:
      "An OTDR event is any point causing loss or reflection on the trace — splices, connectors, bends, or breaks.",
  },
];
