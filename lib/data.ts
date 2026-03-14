// frontend/lib/data.ts
import fs from "fs";
import path from "path";
import type { CompanyIndexItem, Top3Item, ScoringMeta, SelectionLog, CompanyDossier } from "./types";

const DATA_DIR = path.join(process.cwd(), "public/data");

function readJSON<T>(filename: string): T {
  const raw = fs.readFileSync(path.join(DATA_DIR, filename), "utf-8");
  return JSON.parse(raw) as T;
}

export function getTop20(): CompanyIndexItem[] {
  return readJSON<CompanyIndexItem[]>("top20.json");
}

export function getAllCompanies(): CompanyIndexItem[] {
  return readJSON<CompanyIndexItem[]>("all-companies.json");
}

export function getTop3(): Top3Item[] {
  return readJSON<Top3Item[]>("top3.json");
}

export function getScoringMeta(): ScoringMeta {
  return readJSON<ScoringMeta>("scoring-meta.json");
}

export function getSelectionLog(): SelectionLog {
  return readJSON<SelectionLog>("selection-log.json");
}

export function getDossier(slug: string): CompanyDossier {
  return readJSON<CompanyDossier>(`dossiers/${slug}.json`);
}

export const DOSSIER_SLUGS = ["biome-makers", "biorizon-biotech", "agrology"] as const;

export function getAllDossiers(): CompanyDossier[] {
  return DOSSIER_SLUGS.map(getDossier);
}
