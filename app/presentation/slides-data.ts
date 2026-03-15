// frontend/app/presentation/slides-data.ts

export interface BulletItem  { text: string; sub?: string[] }
export interface GridColumn  { heading: string; items: string[] }
export interface Card        { title: string; body: string }
export interface RankedItem  { rank: number; name: string; note?: string }

export type SlideBody =
  | { type: "cover";       meta: string[] }
  | { type: "bullets";     lead?: string; items: BulletItem[] }
  | { type: "grid";        lead?: string; columns: GridColumn[] }
  | { type: "table";       lead?: string; headers: string[]; rows: string[][] }
  | { type: "cards";       lead?: string; cards: Card[] }
  | { type: "two-col";     left: { heading: string; items: string[] }[]; right: { heading: string; items: string[] }[] }
  | { type: "ranked-list"; lead?: string; items: RankedItem[] };

export interface SlideData {
  id:       number;
  section:  string;
  title:    string;
  subtitle?: string;
  body:     SlideBody;
}

export const SLIDES: SlideData[] = [
  {
    id: 1, section: "Cover",
    title: "Regenerative Viticulture Technology Landscape",
    subtitle: "Investment Research Memorandum",
    body: { type: "cover", meta: ["Prepared for: Confidential Investor", "Prepared by: Multiplium", "March 2026"] },
  },
  {
    id: 2, section: "Executive Summary",
    title: "Executive Summary",
    body: {
      type: "bullets",
      lead: "The wine sector is undergoing structural transition driven by climate change, water scarcity, regulatory pressure on agrochemicals, and sustainable consumer demand.",
      items: [
        { text: "96 companies identified across the regenerative viticulture ecosystem" },
        { text: "Strongest innovation cluster: upstream vineyard level", sub: ["Soil health & biological inputs", "Precision viticulture data platforms", "Carbon MRV & traceability infrastructure"] },
        { text: "Second innovation cluster: data infrastructure" },
        { text: "Geography: Europe and the US dominate the ecosystem" },
        { text: "The opportunity lies at the intersection of six forces", sub: ["AgTech digitization", "Climate mitigation / carbon markets", "Water efficiency", "Biological inputs / soil regeneration", "Supply chain transparency", "Circular economy"] },
      ],
    },
  },
  {
    id: 3, section: "Market Context",
    title: "Market Context & Industry Rationale",
    body: {
      type: "bullets",
      lead: "Global wine: ~$340B market value. Harvest dates have advanced 2–3 weeks over 40 years due to climate change. Global wine production fell to a 64-year low in 2024 (OIV). Major producing regions — France, Italy, Spain, the US, Australia, Chile, Argentina — are accelerating investment in precision agriculture and regenerative practices.",
      items: [
        { text: "Climate impacts reshaping viticulture", sub: ["Shifting harvest timing across major regions", "Heat stress and drought increasing input costs", "Rising disease pressure requiring new management approaches"] },
        { text: "Regulatory pressure on agrochemicals intensifying in the EU and key export markets" },
        { text: "Buyer ESG mandates creating commercial pull for verified sustainable practices" },
        { text: "Regenerative practices moving from niche to operational necessity" },
      ],
    },
  },
  {
    id: 4, section: "Investment Thesis",
    title: "Regenerative Viticulture Thesis",
    body: {
      type: "two-col",
      left: [{ heading: "Core Principles", items: ["Soil health restoration", "Biodiversity conservation", "Reduced chemical inputs", "Improved water retention", "Carbon sequestration"] }],
      right: [{ heading: "Practices Creating Technology Demand", items: ["Cover cropping — soil biology monitoring tools", "Reduced tillage — precision machinery + sensors", "Compost amendments — soil analytics platforms", "Biological pest control — IPM decision systems", "Precision irrigation — water efficiency software"] }],
    },
  },
  {
    id: 5, section: "Segmentation",
    title: "Market Segmentation Framework",
    subtitle: "9-segment taxonomy across the regenerative viticulture value chain",
    body: {
      type: "grid",
      columns: [
        { heading: "Upstream Production", items: ["1. Soil health technologies", "2. Precision irrigation systems", "3. Integrated pest management", "4. Canopy management solutions"] },
        { heading: "Winemaking", items: ["5. Wine production (vinification) technologies"] },
        { heading: "Infrastructure & Data", items: ["6. Carbon MRV & traceability platforms", "7. Cross-cutting digital agriculture tools"] },
        { heading: "Supply Chain", items: ["8. Packaging & bottling", "9. Distribution & logistics"] },
        { heading: "Downstream", items: ["10. Marketing & branding technologies", "11. Consumption platforms"] },
        { heading: "Circular Economy", items: ["12. Recycling & aftermarket solutions"] },
      ],
    },
  },
  {
    id: 6, section: "Market Size",
    title: "TAM & Segment Attractiveness",
    subtitle: "Approximate estimates from cited market research reports",
    body: {
      type: "table",
      headers: ["Segment", "Approximate TAM"],
      rows: [
        ["Precision viticulture software", "$3–5B globally"],
        ["Soil health & biological inputs", "$10–15B"],
        ["Precision irrigation",            "$5–7B"],
        ["Carbon MRV (agriculture)",        "$2–4B"],
        ["Wine production technologies",    "$1–2B"],
        ["Sustainable packaging",           "$4–6B"],
      ],
    },
  },
  {
    id: 7, section: "Landscape",
    title: "Innovation Landscape Overview",
    body: {
      type: "bullets",
      lead: "96 companies mapped across 9 segments of the regenerative viticulture value chain.",
      items: [
        { text: "Geography", sub: ["Europe dominant: France, Spain, Italy, Germany, Netherlands", "US significant: California, Pacific Northwest", "Emerging: Australia, Chile, Israel"] },
        { text: "Strongest innovation clusters", sub: ["Upstream vineyard: soil health, precision irrigation, IPM — largest cluster", "Data infrastructure: AI-driven disease prediction, satellite analytics, carbon monitoring"] },
        { text: "Concentration at early and growth stages (Series A–B)" },
        { text: "Limited consolidation to date — fragmentation creates platform opportunity" },
      ],
    },
  },
  {
    id: 8, section: "Scoring Model",
    title: "Investor Scoring Model",
    subtitle: "Standardizes comparison across heterogeneous technologies to reduce ~100 companies to 15–25 high-priority targets",
    body: {
      type: "cards",
      cards: [
        { title: "Market Segment Attractiveness — 25%", body: "Priority segments: precision viticulture, soil health, carbon MRV. Scores highest investment tailwinds." },
        { title: "Technology & Business Model — 25%",   body: "Software-driven and biotech models score highest. SaaS/Data platforms, biotech, AI/satellite analytics." },
        { title: "Company Maturity — 20%",              body: "Optimal: 50–100 employees (Series A–B). Proven technology, still scalable." },
        { title: "Impact & ESG Alignment — 15%",        body: "Direct relevance to KPIs: carbon sequestration, soil health, water reduction, biodiversity." },
        { title: "Differentiation & Competitive Edge — 15%", body: "Proprietary technology, IP, biological databases, AI models, unique datasets." },
      ],
    },
  },
  {
    id: 9, section: "Top 20",
    title: "Top 20 Most Investable Companies",
    subtitle: "Computed ranking from enriched dataset — five-pillar weighted scoring model",
    body: {
      type: "table",
      headers: ["Rank", "Company", "Primary Segment"],
      rows: [
        ["1",  "Biome Makers",            "Soil Health / Biologicals"],
        ["2",  "Biorizon Biotech",        "Soil Health / Biologicals"],
        ["3",  "Agrology",               "Carbon MRV / Traceability"],
        ["4",  "Pacific Biochar",        "Soil Health / Biologicals"],
        ["5",  "EZ Lab - Wine Blockchain","Carbon MRV / Traceability"],
        ["6",  "Arable",                 "Precision Viticulture"],
        ["7",  "Cérience",               "Soil Health / Biologicals"],
        ["8",  "MyEasyFarm",             "Carbon MRV / Traceability"],
        ["9",  "ClimateHound",           "Carbon MRV / Traceability"],
        ["10", "Deep Planet",            "Precision Viticulture"],
        ["11", "Bioplanet",              "Pest Management"],
        ["12", "Mycophyto",              "Soil Health / Biologicals"],
        ["13", "BioStart (Mycorrcin)",   "Soil Health / Biologicals"],
        ["14", "FarmLab",                "Carbon MRV / Traceability"],
        ["15", "WiseConn",               "Irrigation Optimisation"],
        ["16", "Kilimo",                 "Irrigation Optimisation"],
        ["17", "SupPlant",               "Irrigation Optimisation"],
        ["18", "ISCA Technologies",      "Pest Management"],
        ["19", "UAV-IQ",                 "Pest Management"],
        ["20", "Bottlebooks",            "Carbon MRV / Traceability"],
      ],
    },
  },
  {
    id: 10, section: "Top 10 Outreach",
    title: "Top 10 Immediate Investor Outreach",
    subtitle: "Strongest combination of scalable technology, impact alignment, and growth-stage maturity",
    body: {
      type: "ranked-list",
      lead: "Top 10 from the computed scoring model — immediate outreach recommended.",
      items: [
        { rank: 1,  name: "Biome Makers",             note: "Soil microbiome biotech, deep biological IP, lab + SaaS hybrid" },
        { rank: 2,  name: "Biorizon Biotech",        note: "TrieTech© bio-stimulant technology for soil regeneration" },
        { rank: 3,  name: "Agrology",               note: "Real-time soil carbon flux monitoring, continuous sequestration tracking" },
        { rank: 4,  name: "Pacific Biochar",        note: "Biochar soil amendment, water retention and carbon sequestration" },
        { rank: 5,  name: "EZ Lab - Wine Blockchain", note: "Blockchain traceability for wine supply chain transparency" },
        { rank: 6,  name: "Arable",                 note: "Precision crop monitoring platform, strong vineyard traction" },
        { rank: 7,  name: "Cérience",               note: "Soil health SaaS, actionable agronomic insights" },
        { rank: 8,  name: "MyEasyFarm",             note: "Farm management + carbon MRV platform for growers" },
        { rank: 9,  name: "ClimateHound",           note: "Carbon accounting and ESG reporting for agricultural operations" },
        { rank: 10, name: "Deep Planet",            note: "Satellite + AI carbon measurement and traceability for vineyards" },
      ],
    },
  },
  {
    id: 11, section: "Top 3 Deep Research",
    title: "Top 3 Deep Research Targets",
    subtitle: "Post-shortlist deep research — highest-conviction investment targets from the scored and enriched dataset",
    body: {
      type: "cards",
      cards: [
        { title: "#1 — Biome Makers",      body: "#1 scorer globally (tied). Series B closed 2024 ($15M). World's largest soil microbiome database (55M+ taxa). 56+ country deployments. Dual revenue model: per-test + licensing. Fast Company #4 most innovative in agriculture 2024." },
        { title: "#2 — Biorizon Biotech",  body: "#2 scorer (tied). World's largest indoor microalgae agricultural production facility in Europe. 4 EU-certified biostimulants. 60+ country distribution. AgroStar India partnership. €23M expansion underway. Strong regulatory moat." },
        { title: "#3 — Agrology",          body: "Substitute for Sencrop (acquired Jan 2025). Only commercial continuous soil carbon flux monitoring system in vineyards. Named customers: Duckhorn, Jordan, Silver Oak. USDA $5M climate-smart grant. Full GHG stack (N2O sensor 2025)." },
      ],
    },
  },
  {
    id: 12, section: "Competition",
    title: "Competitive Landscape",
    body: {
      type: "bullets",
      lead: "The landscape is fragmented across three competitive clusters, with limited consolidation to date. This fragmentation creates both platform and roll-up opportunity.",
      items: [
        { text: "Precision agriculture platforms",   sub: ["Taranis — AI-driven field scouting", "CropX — soil sensing + irrigation", "AgroSmart — crop monitoring"] },
        { text: "Soil biology analytics",            sub: ["Trace Genomics — genomic soil testing", "Indigo Agriculture — microbiome + carbon markets", "Biome Makers — wine-specific soil intelligence"] },
        { text: "Vineyard-specific DSS platforms",   sub: ["VineView — aerial remote sensing", "Fruition Sciences — vine physiology monitoring", "Tule Technologies — crop water stress"] },
        { text: "Consolidation potential is high — many point solutions addressing adjacent parts of the same value chain" },
      ],
    },
  },
  {
    id: 13, section: "Strategy",
    title: "Investment Strategy Options",
    body: {
      type: "cards",
      cards: [
        { title: "Strategy 1 — Platform Strategy",            body: "Invest in a precision viticulture software platform combining irrigation management, disease prediction, and carbon monitoring. Target companies with multi-module potential and open integration architecture." },
        { title: "Strategy 2 — Climate Infrastructure",       body: "Focus on carbon MRV and soil health technologies directly aligned with voluntary carbon markets and EU regulatory requirements. Highest ESG alignment and emerging institutional buyer demand." },
        { title: "Strategy 3 — Circular Economy",             body: "Target sustainable packaging innovation, waste valorisation, and recycling infrastructure. Driven by producer ESG commitments and retailer packaging mandates." },
      ],
    },
  },
  {
    id: 14, section: "Due Diligence",
    title: "Due Diligence Roadmap",
    body: {
      type: "grid",
      columns: [
        { heading: "Commercial",  items: ["Customer traction and retention", "Revenue model and unit economics", "Vineyard adoption rate and NPS"] },
        { heading: "Technology",  items: ["IP protection and freedom to operate", "AI model accuracy and validation", "Sensor reliability and maintenance cost"] },
        { heading: "Financial",   items: ["Revenue growth trajectory", "Burn rate and runway", "Capital efficiency vs peers"] },
        { heading: "Impact",      items: ["Verified emissions reductions (tCO₂e)", "Water savings per hectare", "Chemical input reduction data"] },
      ],
    },
  },
  {
    id: 15, section: "Risks",
    title: "Key Risks",
    body: {
      type: "bullets",
      lead: "Three structural risks apply across the regenerative viticulture technology landscape.",
      items: [
        { text: "Market fragmentation",   sub: ["No dominant platform has emerged — customer acquisition cost remains high", "Interoperability between point solutions is limited", "Consolidation could rapidly shift competitive dynamics"] },
        { text: "Adoption barriers",      sub: ["Winegrowers are conservative; ROI proof cycles are long (1–3 seasons)", "Language and regional support requirements fragment go-to-market", "Legacy decision-making in family-owned estates slows uptake"] },
        { text: "Hardware margins",       sub: ["Hardware-dependent models carry higher COGS and support burden", "Supply chain risk for sensor components", "Pure SaaS companies command materially higher multiples"] },
      ],
    },
  },
  {
    id: 16, section: "Next Steps",
    title: "Next Steps",
    subtitle: "Goal: identify 3–5 priority investment opportunities",
    body: {
      type: "bullets",
      items: [
        { text: "Shortlist 10–15 companies from the top 20 for active diligence", sub: ["Prioritise companies with ≥medium score confidence", "Cross-reference with fund's geographic and stage preferences"] },
        { text: "Conduct management interviews",  sub: ["CEO/CTO sessions with top-10 outreach list", "Standard diligence questionnaire: commercial, tech, financial, impact"] },
        { text: "Analyse funding history and valuation benchmarks", sub: ["Comparable AgTech transactions 2022–2025", "Revenue multiples for SaaS vs biotech vs hardware models"] },
        { text: "Assess strategic partnerships with wineries", sub: ["Identify anchor customer relationships", "Evaluate distribution partnership opportunities for portfolio leverage"] },
      ],
    },
  },
];
