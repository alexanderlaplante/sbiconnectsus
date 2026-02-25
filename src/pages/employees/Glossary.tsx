import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Zap, Cable, Plug, BarChart3, Radio, Shield, Building2, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Data ─────────────────────────────────────────────────────── */

interface GlossaryEntry {
  acronym: string;
  standsFor: string;
  description: string;
  details: string;
  category: string;
}

const CATEGORIES = [
  { key: "All", icon: Zap, label: "All" },
  { key: "Fiber Types", icon: Cable, label: "Fiber Types" },
  { key: "Connectors", icon: Plug, label: "Connectors" },
  { key: "Polish & Loss", icon: BarChart3, label: "Polish & Loss" },
  { key: "Transceivers & Cables", icon: Radio, label: "Transceivers" },
  { key: "Multiplexing", icon: Zap, label: "Multiplexing" },
  { key: "Jacket & Ratings", icon: Shield, label: "Jacket & Ratings" },
  { key: "Standards & Organizations", icon: Building2, label: "Standards" },
  { key: "Network & Telecom", icon: Globe, label: "Network" },
] as const;

const GLOW: Record<string, string> = {
  "Fiber Types": "from-emerald-500/20 to-emerald-500/0",
  "Connectors": "from-sky-500/20 to-sky-500/0",
  "Polish & Loss": "from-violet-500/20 to-violet-500/0",
  "Transceivers & Cables": "from-amber-500/20 to-amber-500/0",
  "Multiplexing": "from-rose-500/20 to-rose-500/0",
  "Jacket & Ratings": "from-orange-500/20 to-orange-500/0",
  "Standards & Organizations": "from-cyan-500/20 to-cyan-500/0",
  "Network & Telecom": "from-indigo-500/20 to-indigo-500/0",
};

const DOT: Record<string, string> = {
  "Fiber Types": "bg-emerald-400",
  "Connectors": "bg-sky-400",
  "Polish & Loss": "bg-violet-400",
  "Transceivers & Cables": "bg-amber-400",
  "Multiplexing": "bg-rose-400",
  "Jacket & Ratings": "bg-orange-400",
  "Standards & Organizations": "bg-cyan-400",
  "Network & Telecom": "bg-indigo-400",
};

const GLOSSARY: GlossaryEntry[] = [
  // Network & Telecom
  { acronym: "LAN", standsFor: "Local Area Network", category: "Network & Telecom", description: "Network within a limited area such as an office or campus.", details: "LANs are the backbone of enterprise environments, connecting workstations, printers, and servers within a building or campus. Ethernet (IEEE 802.3) is the dominant LAN technology, running over both copper and fiber media." },
  { acronym: "VM", standsFor: "Virtual Machine", category: "Network & Telecom", description: "Software-based computer instance that runs on physical servers.", details: "VMs allow multiple operating systems to share a single physical host, increasing server utilization. They rely on high-bandwidth LAN connections—often 10G or 25G fiber—to handle east-west traffic between virtual workloads in modern data centers." },
  { acronym: "Gb / Gbps", standsFor: "Gigabit / Gigabits per second", category: "Network & Telecom", description: "Unit of data transfer speed equal to 1 billion bits per second.", details: "Gigabit Ethernet (1000BASE-T over copper, 1000BASE-SX/LX over fiber) is the baseline speed in most modern networks. Higher tiers—10G, 25G, 40G, 100G, and 400G—are increasingly common in data center spine-leaf architectures." },
  { acronym: "CATV", standsFor: "Cable Television (Community Antenna Television)", category: "Network & Telecom", description: "Video distribution system increasingly carried over fiber.", details: "CATV headends distribute RF video signals over fiber using analog or digital modulation. APC connectors are mandatory because the analog signals are extremely sensitive to back-reflections. Modern systems use RF-over-Glass (RFoG) and IP video (IPTV) over PON architectures." },
  { acronym: "SONET", standsFor: "Synchronous Optical Network", category: "Network & Telecom", description: "Legacy North American fiber-optic telecom transport protocol.", details: "SONET (ANSI T1.105) defines a hierarchy of data rates starting at OC-1 (51.84 Mbps) up to OC-768 (40 Gbps). It provides synchronous multiplexing, built-in fault recovery (ring protection), and operations management. Largely replaced by packet-based OTN and Carrier Ethernet in new deployments." },
  { acronym: "SDH", standsFor: "Synchronous Digital Hierarchy", category: "Network & Telecom", description: "International equivalent of SONET used outside North America.", details: "SDH (ITU-T G.707) starts at STM-1 (155 Mbps) and scales to STM-256 (40 Gbps). It is functionally equivalent to SONET with different naming conventions. SDH/SONET ring networks formed the backbone of global telecom for decades." },
  { acronym: "ATM", standsFor: "Asynchronous Transfer Mode", category: "Network & Telecom", description: "Fixed-cell-size switching technology — legacy telecom.", details: "ATM uses 53-byte cells for multiplexing voice, video, and data with Quality of Service guarantees. It was prominent in the 1990s–2000s WAN and backbone networks but has been almost entirely replaced by MPLS, Carrier Ethernet, and IP/MPLS architectures." },
  { acronym: "EPON", standsFor: "Ethernet Passive Optical Network", category: "Network & Telecom", description: "IEEE 802.3ah standard for fiber-to-the-premise access.", details: "EPON uses passive optical splitters to share a single fiber from the central office (OLT) to up to 32 subscribers (ONUs). Operating at 1G symmetric, it is widely deployed in Asia. 10G-EPON (IEEE 802.3av) extends capacity for next-generation access." },
  { acronym: "GPON", standsFor: "Gigabit Passive Optical Network", category: "Network & Telecom", description: "ITU-T G.984 standard for high-speed fiber access.", details: "GPON provides 2.488 Gbps downstream and 1.244 Gbps upstream over single-mode fiber using 1490 nm (downstream) and 1310 nm (upstream) wavelengths. A 1550 nm overlay supports RF video. It is the dominant PON technology in North America and Europe. XGS-PON (G.9807.1) extends to 10G symmetric." },
  { acronym: "RJ45", standsFor: "Registered Jack 45", category: "Network & Telecom", description: "8-position 8-contact (8P8C) copper Ethernet connector.", details: "Although technically a telephone registration standard, RJ-45 commonly refers to the 8P8C modular connector used for twisted-pair Ethernet (Cat5e, Cat6, Cat6A). It is not a fiber connector but is included here because SFP copper modules use RJ-45 for short copper runs in fiber-dominant networks." },

  // Fiber Types
  { acronym: "nm", standsFor: "Nanometer", category: "Fiber Types", description: "Unit of wavelength measurement for optical signals.", details: "Multimode fiber typically operates at 850 nm (VCSEL-based) or 1300 nm, while single-mode fiber uses 1310 nm and 1550 nm windows. The wavelength determines attenuation characteristics, dispersion behavior, and which transceivers are compatible." },
  { acronym: "µm", standsFor: "Micrometer (Micron)", category: "Fiber Types", description: "Unit used to express fiber core and cladding diameters.", details: "All standard fiber uses a 125 µm cladding. Core sizes vary: multimode ranges from 50 µm (OM2–OM5) to 62.5 µm (OM1), while single-mode cores are approximately 8–9 µm. The core size directly affects bandwidth, modal dispersion, and supported distances." },
  { acronym: "OS", standsFor: "Optical Single Mode", category: "Fiber Types", description: "Category designation for single-mode optical fiber.", details: "Single-mode fiber carries one mode of light, eliminating modal dispersion and enabling transmission over very long distances (kilometers to hundreds of kilometers). It is the standard choice for campus backbones, metropolitan networks, and all telecom infrastructure." },
  { acronym: "OS1", standsFor: "Optical Single Mode 1", category: "Fiber Types", description: "Indoor-rated single-mode fiber with tight-buffered construction.", details: "OS1 is designed for indoor use with a maximum attenuation of 1.0 dB/km at 1310 nm and 1550 nm. Tight-buffered construction makes it easier to handle and terminate but limits practical distance to approximately 2 km. Defined by ISO/IEC 11801." },
  { acronym: "OS2", standsFor: "Optical Single Mode 2", category: "Fiber Types", description: "Outdoor-rated single-mode fiber with loose-tube construction.", details: "OS2 offers lower attenuation (≤0.4 dB/km at 1310 nm, ≤0.3 dB/km at 1550 nm) thanks to its loose-tube design, which protects fibers from mechanical stress. Supports distances up to 10 km for 10G Ethernet and is the standard for outside plant (OSP) runs." },
  { acronym: "OM", standsFor: "Optical Multimode", category: "Fiber Types", description: "Category designation for multimode optical fiber.", details: "Multimode fiber has a larger core that supports multiple light modes simultaneously. While this limits distance due to modal dispersion, it enables the use of inexpensive VCSEL transmitters, making it cost-effective for short-reach applications in buildings and data centers." },
  { acronym: "OM1", standsFor: "Optical Multimode 1", category: "Fiber Types", description: "62.5/125 µm multimode fiber — legacy standard.", details: "OM1 uses a 62.5 µm core and is identified by its orange jacket. It supports Gigabit Ethernet up to 275 m at 850 nm. Considered legacy; no longer recommended for new installations due to limited bandwidth (200 MHz·km at 850 nm). Does not support 10G Ethernet." },
  { acronym: "OM2", standsFor: "Optical Multimode 2", category: "Fiber Types", description: "50/125 µm standard multimode fiber.", details: "OM2 uses a 50 µm core with 500 MHz·km bandwidth at 850 nm. It supports Gigabit Ethernet up to 550 m and 10G Ethernet up to 82 m. Also identified by an orange jacket. Largely superseded by OM3 and OM4 in new deployments." },
  { acronym: "OM3", standsFor: "Optical Multimode 3", category: "Fiber Types", description: "Laser-optimized 50/125 µm multimode fiber.", details: "OM3 is optimized for 850 nm VCSEL sources with an effective modal bandwidth of 2000 MHz·km. Identified by its aqua jacket, it supports 10G Ethernet up to 300 m and 40G/100G up to 100 m using MPO/MTP parallel optics. The workhorse of modern data centers." },
  { acronym: "OM4", standsFor: "Optical Multimode 4", category: "Fiber Types", description: "Enhanced laser-optimized 50/125 µm multimode fiber.", details: "OM4 extends OM3 performance to 4700 MHz·km at 850 nm, supporting 10G Ethernet up to 550 m and 40G/100G up to 150 m. Available in aqua or violet jackets depending on manufacturer. The current standard recommendation for enterprise data center builds." },
  { acronym: "OM4+", standsFor: "Enhanced OM4", category: "Fiber Types", description: "Proprietary extension of OM4 for 40G/100G reach.", details: "OM4+ is a vendor-specific designation (not an official TIA/ISO standard) for fiber exceeding standard OM4 bandwidth. It offers extended reach for 40GBASE-SR4 and 100GBASE-SR4 applications. Typically identified by a violet jacket." },
  { acronym: "OM5", standsFor: "Optical Multimode 5", category: "Fiber Types", description: "Wideband multimode fiber supporting SWDM technology.", details: "OM5 (TIA-492AAAE) is designed for Short Wavelength Division Multiplexing, operating across 850–953 nm. Its lime green jacket distinguishes it from other grades. It enables 40G and 100G over fewer fibers than parallel optics by using four wavelengths on a single fiber pair." },
  { acronym: "VCSEL", standsFor: "Vertical-Cavity Surface-Emitting Laser", category: "Fiber Types", description: "Low-cost laser source used with multimode fiber.", details: "VCSELs emit light perpendicular to the chip surface at 850 nm, enabling low-cost, high-volume manufacturing. They are the standard light source for short-reach multimode applications (1G through 100G). Their low power consumption and fast modulation make them ideal for data center optics." },

  // Multiplexing
  { acronym: "SWDM", standsFor: "Short Wavelength Division Multiplexing", category: "Multiplexing", description: "Multiplexing technology using multiple short wavelengths over multimode fiber.", details: "SWDM uses four wavelengths (850, 880, 910, and 940 nm) over a single fiber pair, enabling 40G or 100G transmission with just two fibers instead of eight or twenty. Requires OM5 wideband multimode fiber for full performance. Defined by the SWDM Alliance." },
  { acronym: "WDM", standsFor: "Wavelength Division Multiplexing", category: "Multiplexing", description: "Technology that combines multiple optical wavelengths onto a single fiber.", details: "WDM increases fiber capacity by transmitting different data streams on different colors of light simultaneously. Coarse WDM (CWDM) uses 20 nm channel spacing for up to 18 channels, while Dense WDM (DWDM) packs channels much more tightly for maximum capacity." },
  { acronym: "DWDM", standsFor: "Dense Wavelength Division Multiplexing", category: "Multiplexing", description: "High-density WDM with tightly spaced channels for maximum capacity.", details: "DWDM supports 40, 80, or even 160+ channels on a single fiber with 0.8 nm (100 GHz) or 0.4 nm (50 GHz) spacing in the C-band (1530–1565 nm). It is the foundation of long-haul and metropolitan telecom networks, enabling terabits of aggregate capacity per fiber." },

  // Connectors
  { acronym: "LC", standsFor: "Lucent Connector (Little Connector)", category: "Connectors", description: "Small form-factor fiber connector with 1.25 mm ferrule.", details: "The LC connector uses a push-pull latching mechanism similar to an RJ-45 clip. Its small size allows double the port density of SC connectors on patch panels and switch faceplates. It is the dominant connector in modern data centers and enterprise networks for both single-mode and multimode applications." },
  { acronym: "SC", standsFor: "Subscriber Connector (Square Connector)", category: "Connectors", description: "Push-pull snap-in fiber connector with 2.5 mm ferrule.", details: "Developed by NTT, the SC connector features a square cross-section and a simple push-pull engagement. It was the first truly standardized fiber connector and remains very common in telecom environments, FTTH deployments, and legacy enterprise installations." },
  { acronym: "ST", standsFor: "Straight Tip", category: "Connectors", description: "Bayonet-style fiber connector with spring-loaded 2.5 mm ferrule.", details: "The ST connector uses a half-twist bayonet lock. It was the dominant multimode connector in the 1990s–2000s and is still found in older installations, military applications, and some industrial environments. Largely replaced by LC and SC in new deployments." },
  { acronym: "FC", standsFor: "Ferrule Connector", category: "Connectors", description: "Threaded screw-on fiber connector.", details: "The FC connector's threaded coupling provides excellent vibration resistance, making it the choice for test equipment, CATV headends, and environments subject to mechanical stress. Available in PC, UPC, and APC polish types. Being phased out in favor of LC in many applications." },
  { acronym: "MU", standsFor: "Miniature Unit", category: "Connectors", description: "Compact 1.25 mm ferrule fiber connector.", details: "Developed by NTT as a miniaturized SC, the MU connector is popular in Japanese and Asian telecom infrastructure. It offers high density and is used in backplane interconnects and some DWDM systems, though LC dominates in North American and European markets." },
  { acronym: "MT-RJ", standsFor: "Mechanical Transfer Registered Jack", category: "Connectors", description: "Duplex multimode connector with two fibers in a single ferrule.", details: "The MT-RJ integrates two fibers into an RJ-45-sized form factor, simplifying installations. However, its higher insertion loss and return loss compared to LC and SC have limited its adoption. Primarily found in older desktop-to-wall connections." },
  { acronym: "CS", standsFor: "Connector System (Senko)", category: "Connectors", description: "Ultra-compact single-fiber connector for next-gen transceiver density.", details: "The CS connector by Senko Advanced Components is designed for 200G and 400G QSFP-DD and OSFP transceivers. At roughly half the width of an LC duplex, it doubles faceplate density. It uses a 1.25 mm ferrule and supports both single-mode and multimode fiber." },
  { acronym: "MPO", standsFor: "Multi-Fiber Push On", category: "Connectors", description: "High-density multi-fiber connector supporting 8, 12, 16, 24, or 32 fibers.", details: "The MPO connector (IEC 61754-7) enables parallel optics by terminating multiple fibers in a single rectangular ferrule. It is essential for 40G, 100G, and 400G breakout and parallel applications. Polarity management (Method A/B/C per TIA-568) is critical when designing MPO trunk systems." },
  { acronym: "MTP", standsFor: "Multi-Fiber Termination Push-On", category: "Connectors", description: "US Conec's enhanced, trademarked version of the MPO connector.", details: "MTP connectors are backward-compatible with MPO but offer tighter tolerances, removable housing for re-polishing, and metal guide pins (vs. plastic) for improved alignment. They are the de facto choice in high-performance data center structured cabling systems." },
  { acronym: "E2000", standsFor: "— (European design)", category: "Connectors", description: "High-performance fiber connector with integrated dust shutter.", details: "The E2000 (also called LSH) features a spring-loaded dust cap that automatically covers the ferrule when disconnected, protecting against contamination. It offers very low return loss and is used in high-reliability telecom and broadcast environments, particularly in Europe." },

  // Polish & Loss
  { acronym: "PC", standsFor: "Physical Contact", category: "Polish & Loss", description: "Fiber endface polish with a slight convex curve.", details: "PC polish creates a curved endface that ensures the fiber cores make physical contact, reducing the air gap. It provides approximately −40 dB optical return loss (ORL). It was the original improvement over flat-polished connectors and is still common in multimode applications." },
  { acronym: "UPC", standsFor: "Ultra Physical Contact", category: "Polish & Loss", description: "Extended fine polish for improved return loss.", details: "UPC polish extends the PC process with finer polishing compounds, achieving approximately −55 dB ORL. The endface is flat-domed. UPC is the standard for single-mode digital communications (Ethernet, Fibre Channel). Connectors have a blue housing by convention." },
  { acronym: "APC", standsFor: "Angled Physical Contact", category: "Polish & Loss", description: "8-degree angled endface polish for minimum back-reflection.", details: "APC polish angles the ferrule endface at 8°, directing reflected light into the cladding instead of back toward the source. This achieves ≥ −65 dB ORL (typically −70 dB or better). Essential for analog video (CATV), GPON/EPON, and RF-over-fiber. Green housing by convention. Never mate APC with UPC — the angle mismatch causes high loss and potential fiber damage." },
  { acronym: "ORL", standsFor: "Optical Return Loss", category: "Polish & Loss", description: "Ratio of incident power to reflected power at a connection, in dB.", details: "ORL quantifies how much light is reflected back toward the transmitter at a connector, splice, or other interface. Higher ORL values (in dB) indicate less reflection, which is better. Poor ORL can cause transmitter instability, increased bit error rates, and is especially problematic in analog and coherent optical systems." },

  // Transceivers & Cables
  { acronym: "SFP", standsFor: "Small Form-Factor Pluggable", category: "Transceivers & Cables", description: "Hot-swappable optical or copper transceiver module for 1G applications.", details: "SFP modules conform to the MSA (Multi-Source Agreement) standard and support data rates up to 4.25 Gbps. They are available for multimode (SX), single-mode (LX, EX, ZX), and copper (RJ-45) media. Digital Diagnostic Monitoring (DDM/DOM) provides real-time power, temperature, and bias current readings." },
  { acronym: "SFP+", standsFor: "Enhanced Small Form-Factor Pluggable", category: "Transceivers & Cables", description: "10 Gbps transceiver in the same SFP form factor.", details: "SFP+ supports 10G Ethernet, 8G/16G Fibre Channel, and OTU2. It uses the same physical dimensions as SFP, allowing switch vendors to offer universal cages. Common variants include SR (multimode, 300 m), LR (single-mode, 10 km), and ER (single-mode, 40 km)." },
  { acronym: "XFP", standsFor: "10 Gigabit Small Form-Factor Pluggable", category: "Transceivers & Cables", description: "Older-generation 10G transceiver module.", details: "XFP was the original hot-pluggable 10G transceiver, slightly larger than SFP+. It includes the CDR (Clock and Data Recovery) circuit on the module itself. Largely replaced by SFP+ due to SFP+'s smaller size and lower power, but still found in some legacy DWDM and SONET/SDH equipment." },
  { acronym: "QSFP", standsFor: "Quad Small Form-Factor Pluggable", category: "Transceivers & Cables", description: "4-lane transceiver module supporting 40G aggregate bandwidth.", details: "QSFP uses four 10G lanes for 40G Ethernet (40GBASE-SR4 over MPO/MTP). It can also be broken out into 4×10G connections using a breakout cable. The form factor is the basis for higher-speed variants (QSFP28 for 100G, QSFP56 for 200G)." },
  { acronym: "QSFP-DD", standsFor: "Quad SFP Double Density", category: "Transceivers & Cables", description: "8-lane transceiver doubling QSFP port density for 200G/400G.", details: "QSFP-DD adds a second row of contacts to the QSFP form factor, providing 8 electrical lanes. At 50G per lane (PAM4), it achieves 400G; at 100G per lane, it scales to 800G. Backward-compatible with QSFP modules, protecting existing infrastructure investment." },
  { acronym: "OSFP", standsFor: "Octal Small Form-Factor Pluggable", category: "Transceivers & Cables", description: "8-lane high-speed transceiver for 400G and beyond.", details: "OSFP provides eight lanes with better thermal management than QSFP-DD due to its slightly larger form factor. It supports 400G (8×50G) and is designed to scale to 800G and 1.6T. Preferred by some hyperscale data center operators for its superior power dissipation." },
  { acronym: "DAC", standsFor: "Direct Attach Cable", category: "Transceivers & Cables", description: "Copper twinax cable with integrated transceiver ends.", details: "DACs provide the lowest-cost, lowest-latency connections for very short distances (typically ≤5 m in a rack). Available in passive (up to ~5 m) and active (up to ~10 m) variants for SFP+, QSFP, and QSFP-DD form factors. Common in top-of-rack switch-to-server connections." },
  { acronym: "AOC", standsFor: "Active Optical Cable", category: "Transceivers & Cables", description: "Fiber cable with permanently attached optical transceivers.", details: "AOCs embed VCSEL transmitters and photodetectors directly into the cable assembly, combining the distance advantages of fiber (up to 100 m) with plug-and-play simplicity. Lighter and more flexible than DACs at longer runs, they are popular in data center row-to-row connections." },

  // Standards & Organizations
  { acronym: "NEC", standsFor: "National Electrical Code", category: "Standards & Organizations", description: "U.S. standard (NFPA 70) governing electrical and cable installations.", details: "The NEC defines cable jacket fire ratings (plenum, riser, general purpose) and installation requirements. Article 770 specifically covers optical fiber cables and raceways. Compliance is required by most U.S. jurisdictions and is enforced by local Authorities Having Jurisdiction (AHJs)." },
  { acronym: "ISO", standsFor: "International Organization for Standardization", category: "Standards & Organizations", description: "Global body publishing standards across industries.", details: "ISO/IEC 11801 defines international structured cabling standards, including fiber channel classifications (OS1, OS2, OM1–OM5) and link performance requirements. It parallels the TIA-568 standard used in North America." },
  { acronym: "IEC", standsFor: "International Electrotechnical Commission", category: "Standards & Organizations", description: "International standards organization for electrical and electronic technologies.", details: "IEC works jointly with ISO on cabling standards (ISO/IEC 11801) and independently on fiber connector standards (IEC 61754 series), test methods (IEC 61280), and optical cable specifications. IEC standards are referenced globally." },
  { acronym: "ITU-T", standsFor: "International Telecommunication Union – Telecom Standardization", category: "Standards & Organizations", description: "UN agency setting global telecom standards.", details: "ITU-T Recommendation G.652 defines standard single-mode fiber (the basis for OS2). G.655 covers non-zero dispersion-shifted fiber for DWDM. G.657 specifies bend-insensitive fiber for FTTH. These recommendations are the global foundation for telecom fiber specifications." },
  { acronym: "TIA", standsFor: "Telecommunications Industry Association", category: "Standards & Organizations", description: "U.S. trade association publishing cabling and telecom standards.", details: "TIA-568 is the definitive North American structured cabling standard, covering fiber and copper. TIA-568.3-D specifically addresses optical fiber cabling. TIA-606 governs labeling and administration, and TIA-607 covers grounding and bonding for telecom infrastructure." },
  { acronym: "NTT", standsFor: "Nippon Telegraph and Telephone", category: "Standards & Organizations", description: "Japanese telecom corporation and major fiber optic innovator.", details: "NTT developed the SC and MU connectors, pioneered GPON technology, and has been instrumental in advancing fiber-to-the-home infrastructure globally. NTT's research labs continue to push the boundaries of coherent optical transmission and spatial division multiplexing." },

  // Jacket & Ratings
  { acronym: "PVC", standsFor: "Polyvinyl Chloride", category: "Jacket & Ratings", description: "Most common cable jacket material — general purpose use.", details: "PVC jackets are inexpensive, flexible, and suitable for general-purpose (CM/CMG) rated cables. However, PVC produces toxic smoke and hydrochloric acid when burned, making it unsuitable for plenum spaces or enclosed areas where occupant safety is a concern." },
  { acronym: "PE", standsFor: "Polyethylene", category: "Jacket & Ratings", description: "Cable jacket material used primarily for outdoor cables.", details: "PE offers excellent moisture resistance, UV stability, and dielectric properties, making it the standard jacket for outside plant (OSP) fiber cables. It is not flame-retardant and should not be brought more than 50 feet (15 m) inside a building per NEC Article 770." },
  { acronym: "PVDF", standsFor: "Polyvinylidene Difluoride (Kynar)", category: "Jacket & Ratings", description: "Flame-resistant fluoropolymer jacket for plenum environments.", details: "PVDF meets the stringent flame and smoke requirements for plenum-rated cables (OFNP). It produces minimal smoke and no halogen-acid gases when burned. More rigid and expensive than PVC, but required for any cable routed through air-handling spaces above drop ceilings." },
  { acronym: "PUR", standsFor: "Polyurethane", category: "Jacket & Ratings", description: "Flexible, abrasion-resistant jacket for harsh environments.", details: "PUR jackets maintain flexibility at low temperatures (down to −40°C) and resist oils, chemicals, and mechanical abrasion. Used in industrial fiber cables, tactical military fiber, and portable/temporary cable assemblies." },
  { acronym: "LSZH", standsFor: "Low Smoke Zero Halogen", category: "Jacket & Ratings", description: "Jacket material producing minimal toxic fumes when burned.", details: "LSZH (also LS0H or LSOH) jackets are required by European standards (IEC 60332) and many international building codes for cables in confined or poorly ventilated spaces such as tunnels, ships, and aircraft. They replace PVC in safety-critical environments. LSZH is not an NEC rating but is recognized by IEC and EN standards." },
  { acronym: "OFNP", standsFor: "Optical Fiber Nonconductive Plenum", category: "Jacket & Ratings", description: "Highest NEC fire rating for all-dielectric fiber cable.", details: "OFNP cables are rated for installation in plenum spaces — the air-handling areas above drop ceilings and below raised floors. They must pass UL 910 (Steiner Tunnel) flame and smoke testing. OFNP is required whenever fiber is routed through return-air plenums without conduit." },
  { acronym: "OFCP", standsFor: "Optical Fiber Conductive Plenum", category: "Jacket & Ratings", description: "Plenum-rated fiber cable containing metallic elements.", details: "OFCP cables include a metallic strength member, armor, or trace wire while maintaining plenum fire ratings. The conductive element requires bonding and grounding per TIA-607 and NEC Article 770, adding installation complexity but providing benefits like locatability." },
  { acronym: "OFNR", standsFor: "Optical Fiber Nonconductive Riser", category: "Jacket & Ratings", description: "Riser-rated all-dielectric fiber cable for vertical runs.", details: "OFNR cables are rated for vertical runs between floors (risers) and must pass UL 1666 flame propagation testing. They prevent fire from traveling floor to floor through cable shafts. OFNR may not be substituted for OFNP in plenum spaces." },
  { acronym: "OFCR", standsFor: "Optical Fiber Conductive Riser", category: "Jacket & Ratings", description: "Riser-rated fiber cable with metallic components.", details: "OFCR cables combine riser fire ratings with metallic elements for grounding, armoring, or locating. They must be bonded and grounded per code. Like OFNR, they are intended for vertical pathways but may not be used in plenum spaces." },
  { acronym: "OFNG", standsFor: "Optical Fiber Nonconductive General Purpose", category: "Jacket & Ratings", description: "General-purpose all-dielectric fiber cable.", details: "OFNG cables are suitable for horizontal runs on the same floor. They do not meet the fire-test requirements for plenum or riser applications and must not be used in those pathways. They pass UL 1581 VW-1 (vertical wire) flame testing." },
  { acronym: "OFCG", standsFor: "Optical Fiber Conductive General Purpose", category: "Jacket & Ratings", description: "General-purpose fiber cable with metallic elements.", details: "OFCG is the conductive counterpart to OFNG, adding metallic armor or strength members. It is rated only for same-floor horizontal runs and requires bonding and grounding." },
  { acronym: "OFN", standsFor: "Optical Fiber Nonconductive", category: "Jacket & Ratings", description: "Basic all-dielectric fiber cable — no specific fire rating.", details: "OFN denotes fiber cable without metallic components and without a specific plenum, riser, or general-purpose NEC fire rating. It is used where local codes do not require a higher-rated cable, such as within equipment rooms or short patch cord applications." },
  { acronym: "OFC", standsFor: "Optical Fiber Conductive", category: "Jacket & Ratings", description: "Basic fiber cable with metallic elements — no specific fire rating.", details: "OFC includes metallic components (typically a strength member) but does not carry a plenum, riser, or general-purpose fire rating. The metallic elements require bonding and grounding per NEC Article 770." },
];

/* ── Animated Background ──────────────────────────────────────── */

const FiberGrid = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.04]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

/* ── Expandable Card ──────────────────────────────────────────── */

const GlossaryCard = ({ entry, isOpen, onToggle }: { entry: GlossaryEntry; isOpen: boolean; onToggle: () => void }) => {
  const glow = GLOW[entry.category] ?? "from-primary/20 to-primary/0";
  const dot = DOT[entry.category] ?? "bg-primary";

  return (
    <motion.div
      layout
      className="group relative"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {/* Glow edge */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div
        onClick={onToggle}
        className="relative cursor-pointer rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-border"
      >
        {/* Header */}
        <div className="flex items-center gap-4 px-5 py-4">
          {/* Acronym badge */}
          <div className="shrink-0 flex items-center justify-center min-w-[4rem] h-10 rounded-lg bg-muted/60 border border-border/40">
            <span className="font-mono text-sm font-bold text-primary tracking-wide">
              {entry.acronym}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate leading-tight">
              {entry.standsFor}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {entry.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`w-2 h-2 rounded-full ${dot}`} />
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </div>
        </div>

        {/* Expanded Detail */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-1">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {entry.details}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
                    {entry.category}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ── Alphabet Jump Bar ────────────────────────────────────────── */

const AlphabetBar = ({ letters, onJump }: { letters: string[]; onJump: (l: string) => void }) => (
  <div className="hidden lg:flex flex-col items-center gap-0.5 fixed right-4 top-1/2 -translate-y-1/2 z-30">
    {letters.map((l) => (
      <button
        key={l}
        onClick={() => onJump(l)}
        className="w-6 h-5 flex items-center justify-center text-[10px] font-mono font-bold text-muted-foreground hover:text-primary hover:scale-125 transition-all duration-150"
      >
        {l}
      </button>
    ))}
  </div>
);

/* ── Main Component ───────────────────────────────────────────── */

const Glossary = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openAcronym, setOpenAcronym] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    let result = GLOSSARY;
    if (activeCategory !== "All") {
      result = result.filter((e) => e.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.acronym.toLowerCase().includes(q) ||
          e.standsFor.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.details.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  // Group alphabetically
  const grouped = useMemo(() => {
    const map: Record<string, GlossaryEntry[]> = {};
    for (const e of filtered) {
      const letter = e.acronym[0].toUpperCase();
      (map[letter] ??= []).push(e);
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const allLetters = useMemo(() => grouped.map(([l]) => l), [grouped]);

  const jumpTo = (letter: string) => {
    sectionRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Auto-expand single search result
  useEffect(() => {
    if (filtered.length === 1) {
      setOpenAcronym(filtered[0].acronym);
    }
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FiberGrid />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-14 md:py-24 lg:pr-14">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5 tracking-wide">
            <Cable className="h-3.5 w-3.5" />
            INTERNAL REFERENCE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
            Fiber Optics
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Acronym Glossary
            </span>
          </h1>
          <p className="text-muted-foreground max-w-lg leading-relaxed">
            Quick-reference field guide sourced from{" "}
            <span className="italic text-foreground/70">Fiber Optics in the LAN & Data Center</span>.
            Tap any term to expand full details.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 space-y-4"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search 67 terms…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card/60 backdrop-blur-sm border-border/60 focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeCategory === key
                    ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
                    : "bg-muted/30 text-muted-foreground border border-transparent hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Count */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
            {filtered.length} terms
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
        </div>

        {/* Grouped Entries */}
        <div className="space-y-8">
          {grouped.map(([letter, entries]) => (
            <div
              key={letter}
              ref={(el) => { sectionRefs.current[letter] = el; }}
              className="scroll-mt-24"
            >
              {/* Letter divider */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-2xl font-black text-primary/30 select-none">
                  {letter}
                </span>
                <div className="h-px flex-1 bg-border/40" />
              </div>

              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {entries.map((entry) => (
                    <GlossaryCard
                      key={entry.acronym}
                      entry={entry}
                      isOpen={openAcronym === entry.acronym}
                      onToggle={() =>
                        setOpenAcronym((prev) =>
                          prev === entry.acronym ? null : entry.acronym
                        )
                      }
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">No matching terms found.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Alphabet jump bar */}
      <AlphabetBar letters={allLetters} onJump={jumpTo} />
    </div>
  );
};

export default Glossary;
