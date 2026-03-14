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
        { text: "~98 companies identified across the regenerative viticulture ecosystem" },
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
      lead: "Global wine production fell to a 64-year low in 2024 (OIV). Major producing regions — France, Italy, Spain, the US, Australia, Chile, Argentina — are accelerating investment in precision agriculture and regenerative practices.",
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
    subtitle: "12-segment taxonomy across the regenerative viticulture value chain",
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
        ["Precision viticulture software", "~$1.5B globally, growing ~12% CAGR"],
        ["Soil health & biologicals",      "~$4B agricultural biologicals market"],
        ["Precision irrigation",           "~$2.5B smart irrigation globally"],
        ["Carbon MRV (agriculture)",       "Early-stage; $50B+ voluntary carbon market context"],
        ["Wine production technologies",   "~$800M winery equipment + digital tools"],
        ["Sustainable packaging",          "~$300B global sustainable packaging, wine subset growing"],
      ],
    },
  },
  {
    id: 7, section: "Landscape",
    title: "Innovation Landscape Overview",
    body: {
      type: "bullets",
      lead: "~98 companies mapped across 12 segments of the regenerative viticulture value chain.",
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
    subtitle: "Ranked screening result — investor-oriented shortlist from the partner scoring model",
    body: {
      type: "table",
      headers: ["Rank", "Company", "Primary Segment"],
      rows: [
        ["1",  "Arable",             "Precision Viticulture / Cross-cutting"],
        ["2",  "Biome Makers",       "Soil Health & Biological Inputs"],
        ["3",  "WiseConn",           "Precision Irrigation"],
        ["4",  "Naïo Technologies",  "Canopy Management / Robotics"],
        ["5",  "Sencrop",            "Cross-cutting Digital Agriculture"],
        ["6",  "Elaisian",           "Precision Viticulture / IPM"],
        ["7",  "Deep Planet",        "Carbon MRV & Traceability"],
        ["8",  "VineView",           "Precision Viticulture / Remote Sensing"],
        ["9",  "Green Atlas",        "Canopy Management / AI"],
        ["10", "VitiBot",            "Canopy Management / Robotics"],
        ["11", "Tule Technologies",  "Precision Irrigation"],
        ["12", "Fruition Sciences",  "Precision Viticulture / Physiology"],
        ["13", "AgroSmart",          "Cross-cutting Digital Agriculture"],
        ["14", "Trace Genomics",     "Soil Health & Biological Inputs"],
        ["15", "Agrology",           "Soil Health & Carbon"],
        ["16", "CropX",              "Precision Irrigation / Soil Sensing"],
        ["17", "Taranis",            "Precision Viticulture / AI Scouting"],
        ["18", "Indigo Agriculture", "Soil Health / Carbon Markets"],
        ["19", "Biorizon Biotech",   "Soil Health & Biological Inputs"],
        ["20", "Fruition Sciences",  "Precision Viticulture"],
      ],
    },
  },
  {
    id: 10, section: "Top 10 Outreach",
    title: "Top 10 Immediate Investor Outreach",
    subtitle: "Strongest combination of scalable technology, impact alignment, and growth-stage maturity",
    body: {
      type: "ranked-list",
      lead: "Priority monitoring set — immediate outreach recommended.",
      items: [
        { rank: 1,  name: "Arable",            note: "Precision crop monitoring platform, strong vineyard traction" },
        { rank: 2,  name: "Biome Makers",       note: "Soil microbiome analytics, deep IP, lab + SaaS model" },
        { rank: 3,  name: "WiseConn",           note: "Remote irrigation management, deployed across wine regions" },
        { rank: 4,  name: "Naïo Technologies",  note: "Autonomous vineyard robots, reduces chemical dependency" },
        { rank: 5,  name: "Sencrop",            note: "Hyper-local weather network, disease pressure prediction" },
        { rank: 6,  name: "Elaisian",           note: "AI-driven disease and irrigation advisory" },
        { rank: 7,  name: "Deep Planet",        note: "Satellite + AI carbon measurement for vineyards" },
        { rank: 8,  name: "VineView",           note: "Aerial remote sensing for vine health mapping" },
        { rank: 9,  name: "Green Atlas",        note: "AI canopy analysis, berry prediction" },
        { rank: 10, name: "VitiBot",            note: "Autonomous under-vine weeding robot" },
      ],
    },
  },
  {
    id: 11, section: "Company Highlights",
    title: "High-Potential Company Highlights",
    subtitle: "From the partner investment memo — four companies with exceptional strategic fit",
    body: {
      type: "cards",
      cards: [
        { title: "Biome Makers",  body: "Soil microbiome analytics platform for precision regenerative management. Unique biological database across thousands of soil samples. SaaS + lab services hybrid. Directly addresses soil health and carbon sequestration KPIs." },
        { title: "Deep Planet",   body: "Satellite + AI platform for carbon measurement and traceability in vineyards. Addresses carbon MRV infrastructure gap. Well-positioned for voluntary carbon market expansion in agriculture." },
        { title: "Elaisian",      body: "AI-driven advisory platform for disease management and precision irrigation. Reduces chemical inputs measurably. Vineyard-specific DSS with demonstrated ROI for growers." },
        { title: "Arable",        body: "Crop monitoring platform combining on-farm hardware with cloud analytics. Strong vineyard adoption in premium wine regions. Highest composite score in the model; scalable SaaS business model." },
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
  {
    id: 17, section: "Appendix",
    title: "Appendix: Execution-Layer Output",
    subtitle: "Later operational output from the research workflow — not the original partner-authored plan",
    body: {
      type: "bullets",
      lead: "The following reflects the executed research pipeline output. Included for reference only.",
      items: [
        { text: "Final cleaned top 20 — company-only universe after entity audit", sub: ["2 non-company entities removed (industry organisations)", "96 companies scored"] },
        { text: "Deep-research candidates: Biome Makers, Biorizon Biotech, Agrology", sub: ["Selected by composite rank with ≥medium score confidence"] },
        { text: "Full dossiers available in the Deep Research section of this research portal" },
      ],
    },
  },
];
