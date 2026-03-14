// frontend/lib/types.ts
export type ScoreConfidence  = "high" | "medium" | "low";
export type ScoreabilityClass = "scoreable_high" | "scoreable_medium" | "scoreable_low" | "not_scoreable";
export type InvestorSignal   = "HIGH" | "MEDIUM" | "LOW" | "WATCHLIST";

export interface CompanyIndexItem {
  slug:               string;
  company:            string;
  country:            string;
  normalizedSegment:  string;
  technologyModel:    string;
  teamSizeBucket?:    string;
  website?:           string;
  summary:            string;
  weightedTotalScore: number;
  rank?:              number;
  scoreConfidence:    ScoreConfidence;
  scoreabilityClass:  ScoreabilityClass;
  shortlistFlag:      boolean;
  investorSignal?:    InvestorSignal;
  segmentScore?:      number;
  technologyScore?:   number;
  maturityScore?:     number;
  impactScore?:       number;
  differentiationScore?: number;
  scoringNotes?:      string;
}

export interface Top3Item {
  slug:               string;
  company:            string;
  rank:               number;
  weightedTotalScore: number;
  segment:            string;
  technologyModel:    string;
  investorSignal:     InvestorSignal;
  majorRisk:          string;
  shortlistRationale: string;
}

export interface ScoringPillar {
  name:        string;
  weight:      number;
  weightLabel: string;
  description: string;
}

export interface ScoringMeta {
  pillars:        ScoringPillar[];
  totalCompanies: number;
  topShortlist:   number;
  deepResearch:   number;
  formula:        string;
}

export interface ExcludedCompany {
  company:      string;
  originalRank: number;
  reason:       string;
  type:         "not_investable" | "acquired";
}

export interface ReplacementCompany {
  company:      string;
  originalRank: number;
  reason:       string;
}

export interface SelectionLog {
  finalTop3:    string[];
  excluded:     ExcludedCompany[];
  replacements: ReplacementCompany[];
  selectionRule: string;
}

export interface DossierSection {
  title:   string;
  content: string;
}

export interface CompanyDossier {
  slug:               string;
  company:            string;
  rank:               number;
  score:              number;
  signal:             InvestorSignal;
  majorRisk:          string;
  shortlistRationale: string;
  sections:           DossierSection[];
  sources:            string[];
}
