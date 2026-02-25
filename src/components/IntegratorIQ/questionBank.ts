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
  { key: "inst1", label: "Installer 1 (Non-Renewable)" },
  { key: "instc", label: "Installer 2, Copper (INSTC)" },
  { key: "instf", label: "Installer 2, Optical Fiber (INSTF)" },
  { key: "tech", label: "Technician (TECH)" },
  { key: "rcdd", label: "Registered Communications Distribution Designer (RCDD)" },
  { key: "dcdc", label: "Data Center Design Consultant (DCDC)" },
  { key: "osp", label: "Outside Plant Designer (OSP)" },
  { key: "ess", label: "Electronic Safety & Security (ESS)" },
] as const;

export type CertKey = (typeof BICSI_CERTIFICATIONS)[number]["key"];
