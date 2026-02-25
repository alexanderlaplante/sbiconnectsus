import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Search } from "lucide-react";

interface GlossaryEntry {
  acronym: string;
  standsFor: string;
  description: string;
  notes: string;
}

const GLOSSARY: GlossaryEntry[] = [
  { acronym: "LAN", standsFor: "Local Area Network", description: "Network within a limited area such as an office or campus", notes: "Common in enterprise environments" },
  { acronym: "VM", standsFor: "Virtual Machine", description: "Software-based computer instance", notes: "Runs on physical servers" },
  { acronym: "Gb / Gbps", standsFor: "Gigabit / Gigabits per second", description: "Data speed measurement", notes: "1 Gbps = 1 billion bits per second" },
  { acronym: "nm", standsFor: "Nanometer", description: "Wavelength measurement for optical signals", notes: "Used in fiber light specs" },
  { acronym: "µm", standsFor: "Micrometer", description: "Fiber core diameter measurement", notes: "8–62.5µm common sizes" },
  { acronym: "OS", standsFor: "Optical Single Mode", description: "Single-mode fiber category", notes: "Long-distance fiber" },
  { acronym: "OS1", standsFor: "Optical Single Mode 1", description: "Indoor single-mode fiber", notes: "Tight buffered, ~2km" },
  { acronym: "OS2", standsFor: "Optical Single Mode 2", description: "Outdoor single-mode fiber", notes: "Loose tube, up to 10km" },
  { acronym: "OM", standsFor: "Optical Multimode", description: "Multimode fiber category", notes: "Shorter distances" },
  { acronym: "OM1", standsFor: "Optical Multimode 1", description: "62.5/125µm multimode fiber", notes: "Orange jacket, legacy" },
  { acronym: "OM2", standsFor: "Optical Multimode 2", description: "50/125µm multimode fiber", notes: "Orange jacket" },
  { acronym: "OM3", standsFor: "Optical Multimode 3", description: "Laser-optimized multimode fiber", notes: "Aqua jacket, 10G+" },
  { acronym: "OM4", standsFor: "Optical Multimode 4", description: "Enhanced laser-optimized multimode", notes: "Aqua/Violet jacket" },
  { acronym: "OM4+", standsFor: "Enhanced OM4", description: "Extended 40G/100G performance", notes: "Violet jacket" },
  { acronym: "OM5", standsFor: "Optical Multimode 5", description: "Wideband multimode fiber", notes: "Lime green, supports SWDM" },
  { acronym: "SWDM", standsFor: "Short Wavelength Division Multiplexing", description: "Multiple wavelengths over multimode fiber", notes: "Used with OM5" },
  { acronym: "WDM", standsFor: "Wavelength Division Multiplexing", description: "Combines wavelengths on single fiber", notes: "Capacity expansion" },
  { acronym: "DWDM", standsFor: "Dense Wavelength Division Multiplexing", description: "High-density WDM", notes: "Long-haul telecom" },
  { acronym: "VCSEL", standsFor: "Vertical-Cavity Surface-Emitting Laser", description: "Laser type for multimode fiber", notes: "850nm common" },
  { acronym: "LC", standsFor: "Lucent / Little Connector", description: "Small form-factor fiber connector", notes: "Most popular today" },
  { acronym: "SC", standsFor: "Subscriber / Square Connector", description: "Push-pull snap-in connector", notes: "Very common" },
  { acronym: "ST", standsFor: "Straight Tip", description: "Bayonet-style connector", notes: "Older installs" },
  { acronym: "FC", standsFor: "Ferrule Connector", description: "Threaded connector", notes: "Vibration resistant" },
  { acronym: "MU", standsFor: "Miniature Unit", description: "Small footprint connector", notes: "Popular in Asia" },
  { acronym: "MT-RJ", standsFor: "Mechanical Transfer Registered Jack", description: "Duplex multimode connector", notes: "Higher insertion loss" },
  { acronym: "CS", standsFor: "Connector System", description: "Compact connector by Senko", notes: "200G/400G ready" },
  { acronym: "MPO", standsFor: "Multi-Fiber Push On", description: "Multi-fiber high-density connector", notes: "12–32 fibers" },
  { acronym: "MTP", standsFor: "Multi-Fiber Termination Push-On", description: "US Conec version of MPO", notes: "Improved MPO design" },
  { acronym: "E2000", standsFor: "—", description: "High-performance shuttered connector", notes: "Very low return loss" },
  { acronym: "PC", standsFor: "Physical Contact", description: "Slight curved polish connector", notes: "~ -40 dB ORL" },
  { acronym: "UPC", standsFor: "Ultra Physical Contact", description: "Extended polish connector", notes: "~ -55 dB ORL" },
  { acronym: "APC", standsFor: "Angled Physical Contact", description: "8° angled polish connector", notes: "~ -70 dB ORL, do not mix with UPC" },
  { acronym: "ORL", standsFor: "Optical Return Loss", description: "Measure of reflected signal power", notes: "Lower reflection = better" },
  { acronym: "SFP", standsFor: "Small Form-Factor Pluggable", description: "Hot-swappable transceiver", notes: "Common in switches" },
  { acronym: "SFP+", standsFor: "Enhanced SFP", description: "Supports 10Gb", notes: "Same physical size as SFP" },
  { acronym: "XFP", standsFor: "10 Gigabit Small Form-Factor Pluggable", description: "10G transceiver module", notes: "Older 10G format" },
  { acronym: "QSFP", standsFor: "Quad Small Form-Factor Pluggable", description: "4-lane transceiver module", notes: "40G typical" },
  { acronym: "QSFP-DD", standsFor: "Quad Small Form-Factor Pluggable Double Density", description: "High-density QSFP", notes: "200G/400G" },
  { acronym: "OSFP", standsFor: "Octal Small Form-Factor Pluggable", description: "8-lane high-speed transceiver", notes: "400G+" },
  { acronym: "DAC", standsFor: "Direct Attach Cable", description: "Copper cable with integrated ends", notes: "Short-distance use" },
  { acronym: "AOC", standsFor: "Active Optical Cable", description: "Fiber cable with integrated optics", notes: "Longer than DAC" },
  { acronym: "NEC", standsFor: "National Electrical Code", description: "US electrical safety standard", notes: "Governs jacket ratings" },
  { acronym: "ISO", standsFor: "International Organization for Standardization", description: "Global standards body", notes: "" },
  { acronym: "IEC", standsFor: "International Electrotechnical Commission", description: "Electrical standards organization", notes: "" },
  { acronym: "ITU-T", standsFor: "International Telecommunication Union – Telecommunication Standardization Sector", description: "Telecom standards body", notes: "Governs OS1/OS2" },
  { acronym: "TIA", standsFor: "Telecommunications Industry Association", description: "Cabling standards body", notes: "" },
  { acronym: "NTT", standsFor: "Nippon Telegraph and Telephone", description: "Japanese telecom company", notes: "Developed SC connector" },
  { acronym: "PVC", standsFor: "Polyvinyl Chloride", description: "Common cable jacket material", notes: "Low cost" },
  { acronym: "PE", standsFor: "Polyethylene", description: "Cable jacket material", notes: "Good insulation" },
  { acronym: "PVDF", standsFor: "Polyvinylidene Difluoride", description: "Flame-resistant jacket material", notes: "Plenum use" },
  { acronym: "PUR", standsFor: "Polyurethane", description: "Flexible jacket material", notes: "Low temperature use" },
  { acronym: "LSZH", standsFor: "Low Smoke Zero Halogen", description: "Low-toxicity flame-retardant jacket", notes: "Confined spaces" },
  { acronym: "OFNP", standsFor: "Optical Fiber Nonconductive Plenum", description: "Plenum-rated fiber", notes: "Highest fire rating" },
  { acronym: "OFCP", standsFor: "Optical Fiber Conductive Plenum", description: "Plenum hybrid fiber", notes: "Includes conductive elements" },
  { acronym: "OFNR", standsFor: "Optical Fiber Nonconductive Riser", description: "Riser-rated fiber", notes: "Vertical runs" },
  { acronym: "OFCR", standsFor: "Optical Fiber Conductive Riser", description: "Riser hybrid fiber", notes: "" },
  { acronym: "OFNG", standsFor: "Optical Fiber Nonconductive General Purpose", description: "General-purpose fiber", notes: "" },
  { acronym: "OFCG", standsFor: "Optical Fiber Conductive General Purpose", description: "Hybrid general-purpose fiber", notes: "" },
  { acronym: "OFN", standsFor: "Optical Fiber Nonconductive", description: "General fiber-only rating", notes: "" },
  { acronym: "OFC", standsFor: "Optical Fiber Conductive", description: "Hybrid cable rating", notes: "" },
  { acronym: "CATV", standsFor: "Cable Television", description: "Video distribution over fiber", notes: "Often uses APC" },
  { acronym: "SONET", standsFor: "Synchronous Optical Network", description: "Telecom fiber protocol", notes: "Legacy backbone" },
  { acronym: "SDH", standsFor: "Synchronous Digital Hierarchy", description: "International version of SONET", notes: "" },
  { acronym: "ATM", standsFor: "Asynchronous Transfer Mode", description: "Telecom switching technology", notes: "Legacy systems" },
  { acronym: "EPON", standsFor: "Ethernet Passive Optical Network", description: "Fiber-to-premise technology", notes: "" },
  { acronym: "GPON", standsFor: "Gigabit Passive Optical Network", description: "Higher-speed PON standard", notes: "" },
  { acronym: "RJ45", standsFor: "Registered Jack 45", description: "Ethernet copper connector", notes: "Not fiber" },
];

const Glossary = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return GLOSSARY;
    const q = search.toLowerCase();
    return GLOSSARY.filter(
      (e) =>
        e.acronym.toLowerCase().includes(q) ||
        e.standsFor.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.notes.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Fiber Optics Acronym Glossary</h1>
        <p className="text-muted-foreground mb-8">
          Source: <span className="italic">Fiber Optics in the LAN and Data Center</span>
        </p>

        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search acronyms, terms, descriptions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="rounded-xl border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/60">
                <TableHead className="font-bold w-[120px]">Acronym</TableHead>
                <TableHead className="font-bold">Stands For</TableHead>
                <TableHead className="font-bold">Description</TableHead>
                <TableHead className="font-bold hidden md:table-cell">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((entry) => (
                <TableRow key={entry.acronym}>
                  <TableCell className="font-mono font-semibold text-primary whitespace-nowrap">
                    {entry.acronym}
                  </TableCell>
                  <TableCell>{entry.standsFor}</TableCell>
                  <TableCell className="text-muted-foreground">{entry.description}</TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden md:table-cell">
                    {entry.notes}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No matching entries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          {filtered.length} of {GLOSSARY.length} entries shown
        </p>
      </div>
    </div>
  );
};

export default Glossary;
