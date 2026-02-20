export interface Question {
  id: string;
  category: "fiber" | "rack" | "das";
  categoryLabel: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanationCorrect: string;
  explanationWrong: string;
}

const fiberQuestions: Question[] = [
  {
    id: "fiber_01",
    category: "fiber",
    categoryLabel: "Fiber vs Copper",
    prompt: "A campus backbone run is 450 meters between two buildings. What's the right call?",
    options: [
      "Cat6A with a midspan repeater",
      "Singlemode fiber with LC connectors",
      "Multimode OM3 fiber",
      "Shielded Cat6 direct burial",
    ],
    correctIndex: 1,
    explanationCorrect: "Singlemode handles distances well beyond 10 km—450 m is a walk in the park for OS2.",
    explanationWrong: "Copper tops out at 100 m per TIA standards. Singlemode fiber is the correct choice for 450 m campus runs.",
  },
  {
    id: "fiber_02",
    category: "fiber",
    categoryLabel: "Fiber vs Copper",
    prompt: "An MRI suite needs network connectivity. EMI is a major concern. What do you spec?",
    options: [
      "Shielded Cat6A with grounded connectors",
      "Fiber optic cabling with media converters",
      "Cat5e with extra conduit shielding",
    ],
    correctIndex: 1,
    explanationCorrect: "Fiber is immune to electromagnetic interference—critical in MRI environments where EMI can corrupt copper signals.",
    explanationWrong: "Even shielded copper can struggle near MRI magnets. Fiber's dielectric nature makes it the only reliable choice.",
  },
  {
    id: "fiber_03",
    category: "fiber",
    categoryLabel: "Fiber vs Copper",
    prompt: "A client wants 10 Gbps to every desk in a new office. Budget is tight. Runs average 40 meters. Best approach?",
    options: [
      "Singlemode fiber to each desk",
      "Cat6A copper—it supports 10GBASE-T to 100 m",
      "OM3 multimode to each desk",
      "Cat6 with shorter patch cords",
    ],
    correctIndex: 1,
    explanationCorrect: "Cat6A supports 10GBASE-T up to 100 m. At 40 m runs, it's the most cost-effective 10G solution.",
    explanationWrong: "Cat6A handles 10 Gbps at 40 m easily and costs less than fiber-to-the-desk deployments.",
  },
  {
    id: "fiber_04",
    category: "fiber",
    categoryLabel: "Fiber vs Copper",
    prompt: "You're running cable through an industrial plant with heavy machinery. What's the primary advantage of fiber here?",
    options: [
      "Lower material cost than copper",
      "Immunity to electromagnetic interference",
      "Easier to terminate in the field",
      "Supports PoE for security cameras",
    ],
    correctIndex: 1,
    explanationCorrect: "Industrial environments are electrically noisy. Fiber's immunity to EMI makes it the reliable choice.",
    explanationWrong: "While copper can work in some industrial settings, fiber's EMI immunity is the key advantage in heavy-machinery environments.",
  },
  {
    id: "fiber_05",
    category: "fiber",
    categoryLabel: "Fiber vs Copper",
    prompt: "A client needs PoE lighting and cameras on the same cabling infrastructure. What should you recommend?",
    options: [
      "Singlemode fiber with PoE injectors",
      "Cat6A copper supporting PoE++",
      "OM4 multimode fiber",
      "Cat5e—it handles PoE just fine",
    ],
    correctIndex: 1,
    explanationCorrect: "Cat6A supports PoE++ (up to 90W per port) and handles heat dissipation better than lower categories in bundles.",
    explanationWrong: "Fiber can't carry electrical power. Cat6A with PoE++ is the right choice when devices need both data and power.",
  },
  {
    id: "fiber_06",
    category: "fiber",
    categoryLabel: "Fiber vs Copper",
    prompt: "A 12-strand OM4 backbone needs to support 40GBASE-SR4. How many fibers does each 40G link consume?",
    options: [
      "2 fibers (1 TX, 1 RX)",
      "4 fibers (2 TX, 2 RX)",
      "8 fibers (4 TX, 4 RX)",
      "12 fibers (6 TX, 6 RX)",
    ],
    correctIndex: 2,
    explanationCorrect: "40GBASE-SR4 uses parallel optics: 4 lanes transmit, 4 lanes receive = 8 fibers total.",
    explanationWrong: "40GBASE-SR4 uses parallel optics with 4 transmit and 4 receive lanes, requiring 8 fibers per link.",
  },
];

const rackQuestions: Question[] = [
  {
    id: "rack_01",
    category: "rack",
    categoryLabel: "Rack & Stack",
    prompt: "What's the standard height of a single rack unit (1U)?",
    options: ["1.5 inches", "1.75 inches", "2.0 inches", "2.25 inches"],
    correctIndex: 1,
    explanationCorrect: "1U = 1.75 inches (44.45 mm). The foundation of everything that goes in a rack.",
    explanationWrong: "A rack unit is exactly 1.75 inches. Getting this wrong means every piece of gear is a guessing game.",
  },
  {
    id: "rack_02",
    category: "rack",
    categoryLabel: "Rack & Stack",
    prompt: "You're designing a 42U rack layout. Where should the heaviest equipment (UPS, servers) be placed?",
    options: [
      "Top of rack for better airflow",
      "Middle of rack for cable reach",
      "Bottom of rack for stability",
      "Doesn't matter with proper mounting",
    ],
    correctIndex: 2,
    explanationCorrect: "Heavy gear goes at the bottom. Lower center of gravity prevents tipping and makes maintenance safer.",
    explanationWrong: "Always load racks bottom-up with the heaviest equipment. Physics doesn't care about your cable management plan.",
  },
  {
    id: "rack_03",
    category: "rack",
    categoryLabel: "Rack & Stack",
    prompt: "What's the minimum bend radius for a standard Cat6A patch cable?",
    options: [
      "1x the cable diameter",
      "2x the cable diameter",
      "4x the cable diameter",
      "8x the cable diameter",
    ],
    correctIndex: 2,
    explanationCorrect: "TIA-568 specifies 4x the cable outer diameter for 4-pair UTP. Tighter bends degrade performance.",
    explanationWrong: "The standard minimum bend radius is 4x the cable diameter. Tight bends cause signal degradation and crosstalk.",
  },
  {
    id: "rack_04",
    category: "rack",
    categoryLabel: "Rack & Stack",
    prompt: "Hot aisle / cold aisle containment is designed to:",
    options: [
      "Reduce noise from server fans",
      "Prevent mixing of hot exhaust and cold supply air",
      "Make cable management easier",
      "Meet fire code for enclosed spaces",
    ],
    correctIndex: 1,
    explanationCorrect: "Containment separates hot exhaust from cold supply air, dramatically improving cooling efficiency.",
    explanationWrong: "Hot/cold aisle containment prevents air mixing, which is the single biggest factor in data center cooling efficiency.",
  },
  {
    id: "rack_05",
    category: "rack",
    categoryLabel: "Rack & Stack",
    prompt: "Every rack in an IDF should have a dedicated ground conductor bonded to:",
    options: [
      "The building's cold water pipe",
      "The nearest electrical outlet",
      "The Telecommunications Grounding Busbar (TGB)",
      "The rack's power strip chassis",
    ],
    correctIndex: 2,
    explanationCorrect: "TIA-607 requires bonding to the TGB, which connects to the building's grounding infrastructure.",
    explanationWrong: "The TGB is your single point of ground reference per TIA-607. Never improvise grounding in a telecom space.",
  },
  {
    id: "rack_06",
    category: "rack",
    categoryLabel: "Rack & Stack",
    prompt: "You notice patch cables routed across the front of active switch ports, blocking airflow. What's the fix?",
    options: [
      "Use shorter patch cables and horizontal cable managers",
      "Move the switch to a different RU position",
      "Replace with flat ribbon cables",
      "Add an extra fan tray above the switch",
    ],
    correctIndex: 0,
    explanationCorrect: "Right-sized patch cables and horizontal managers keep the front clear. Clean airflow, clean access.",
    explanationWrong: "Horizontal cable managers and properly sized patch cables solve 90% of rack airflow and access problems.",
  },
];

const dasQuestions: Question[] = [
  {
    id: "das_01",
    category: "das",
    categoryLabel: "DAS Coverage",
    prompt: "What does DAS stand for in the context of in-building wireless?",
    options: [
      "Digital Antenna System",
      "Distributed Antenna System",
      "Direct Access Signal",
      "Data Amplification Service",
    ],
    correctIndex: 1,
    explanationCorrect: "Distributed Antenna System—a network of antennas that distributes wireless signal throughout a building.",
    explanationWrong: "DAS = Distributed Antenna System. It's the backbone of reliable in-building wireless coverage.",
  },
  {
    id: "das_02",
    category: "das",
    categoryLabel: "DAS Coverage",
    prompt: "Which building material causes the MOST signal attenuation for in-building wireless?",
    options: [
      "Standard drywall",
      "Glass curtain walls",
      "Low-E coated glass with metal oxide layers",
      "Wood framing",
    ],
    correctIndex: 2,
    explanationCorrect: "Low-E glass has metallic coatings that can attenuate RF signals by 20-40 dB. It's a DAS designer's nemesis.",
    explanationWrong: "Low-E coated glass contains metal oxide layers that block RF signals dramatically—often requiring dedicated in-building systems.",
  },
  {
    id: "das_03",
    category: "das",
    categoryLabel: "DAS Coverage",
    prompt: "Public safety DAS is required by code primarily to ensure:",
    options: [
      "Visitor Wi-Fi connectivity",
      "Cellular coverage for tenants",
      "First responder radio communication inside buildings",
      "Emergency broadcast reception",
    ],
    correctIndex: 2,
    explanationCorrect: "Public safety DAS (ERRC) ensures firefighters and police can communicate on their radios inside buildings. It saves lives.",
    explanationWrong: "Public safety DAS is about first responder communications—mandated by NFPA 72/1221 and IFC Section 510.",
  },
  {
    id: "das_04",
    category: "das",
    categoryLabel: "DAS Coverage",
    prompt: "In a DAS design, what's the difference between 'coverage' and 'capacity'?",
    options: [
      "They're the same thing measured differently",
      "Coverage = signal reach; Capacity = simultaneous users supported",
      "Coverage = outdoor; Capacity = indoor",
      "Coverage = download speed; Capacity = upload speed",
    ],
    correctIndex: 1,
    explanationCorrect: "Coverage ensures signal reaches everywhere. Capacity ensures the system handles user density. Both matter.",
    explanationWrong: "Coverage is about signal reach, capacity is about user load. A hospital lobby needs both; a stairwell mostly needs coverage.",
  },
  {
    id: "das_05",
    category: "das",
    categoryLabel: "DAS Coverage",
    prompt: "After DAS installation, signal strength is validated using a:",
    options: [
      "Spectrum analyzer and grid walk test",
      "Wi-Fi heat map survey",
      "Cable certification tester",
      "Visual inspection of antenna placement",
    ],
    correctIndex: 0,
    explanationCorrect: "Grid walk testing with a spectrum analyzer verifies actual signal levels meet design specifications throughout the coverage area.",
    explanationWrong: "DAS validation requires walking the grid with a spectrum analyzer—Wi-Fi tools measure the wrong signals entirely.",
  },
  {
    id: "das_06",
    category: "das",
    categoryLabel: "DAS Coverage",
    prompt: "A 200,000 sq ft hospital needs in-building cellular and FirstNet coverage. What system type is most appropriate?",
    options: [
      "Passive DAS with wideband couplers",
      "Active DAS with fiber-fed remote units",
      "Small cells on every floor",
      "Signal boosters at building entrances",
    ],
    correctIndex: 1,
    explanationCorrect: "Active DAS scales to large venues and supports multiple carriers and public safety bands over fiber—ideal for hospitals.",
    explanationWrong: "At 200K sq ft with multi-carrier and public safety requirements, active DAS is the only system that scales properly.",
  },
];

export const questionBank = {
  fiber: fiberQuestions,
  rack: rackQuestions,
  das: dasQuestions,
};

export type Category = keyof typeof questionBank;
export const categories: Category[] = ["fiber", "rack", "das"];
