"use client";
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import Link from "next/link";
import ConfidenceBadge from "@/components/badges/ConfidenceBadge";
import SegmentPill from "@/components/badges/SegmentPill";
import { formatScore } from "@/lib/utils";
import type { CompanyIndexItem } from "@/lib/types";

const SEGMENTS = [
  "All Segments",
  "Precision viticulture / vineyard management",
  "Soil health / biologicals",
  "Carbon MRV / traceability",
  "Irrigation optimisation",
  "Pest management",
  "Wine production technologies",
  "Packaging / recycling",
  "Marketing / distribution",
  "Consumption platforms",
];

const CONFIDENCE_OPTIONS = ["Any", "high", "medium", "low"];

interface Props { data: CompanyIndexItem[]; }

export default function CompanyTable({ data }: Props) {
  const [search,     setSearch]     = useState("");
  const [segment,    setSegment]    = useState("All Segments");
  const [confidence, setConfidence] = useState("Any");
  const [shortlist,  setShortlist]  = useState(false);

  const filtered = useMemo(() => data.filter(co => {
    if (search && !co.company.toLowerCase().includes(search.toLowerCase()) &&
                  !co.normalizedSegment.toLowerCase().includes(search.toLowerCase())) return false;
    if (segment !== "All Segments" && co.normalizedSegment !== segment)  return false;
    if (confidence !== "Any"       && co.scoreConfidence !== confidence) return false;
    if (shortlist  && !co.shortlistFlag) return false;
    return true;
  }), [data, search, segment, confidence, shortlist]);

  const columns: ColumnDef<CompanyIndexItem>[] = [
    {
      accessorKey: "rank",
      header: "#",
      cell: ({ getValue }) => (
        <span className="font-mono text-[12px] text-text-muted">
          {getValue<number>() ? `#${getValue<number>()}` : "—"}
        </span>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => (
        <Link href={`/company/${row.original.slug}`} className="font-sans text-[14px] text-text-main hover:text-primary transition-colors">
          {row.original.company}
        </Link>
      ),
    },
    {
      accessorKey: "normalizedSegment",
      header: "Segment",
      cell: ({ getValue }) => <SegmentPill segment={getValue<string>()} />,
    },
    {
      accessorKey: "scoreConfidence",
      header: "Confidence",
      cell: ({ getValue }) => <ConfidenceBadge confidence={getValue<"high" | "medium" | "low">()} />,
    },
    {
      accessorKey: "weightedTotalScore",
      header: "Score",
      cell: ({ getValue }) => (
        <span className="font-mono text-[13px] font-medium text-primary">
          {formatScore(getValue<number>())}
        </span>
      ),
    },
    {
      id: "detail",
      header: "",
      cell: ({ row }) => (
        <Link href={`/company/${row.original.slug}`} className="text-text-muted hover:text-primary">
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search company or segment..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="font-sans text-[13px] border border-border-color rounded-sm px-3 py-2 bg-surface text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary min-w-[240px]"
        />
        <select
          value={segment}
          onChange={e => setSegment(e.target.value)}
          className="font-sans text-[13px] border border-border-color rounded-sm px-3 py-2 bg-surface text-text-main focus:outline-none focus:border-primary"
        >
          {SEGMENTS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select
          value={confidence}
          onChange={e => setConfidence(e.target.value)}
          className="font-sans text-[13px] border border-border-color rounded-sm px-3 py-2 bg-surface text-text-main focus:outline-none focus:border-primary"
        >
          {CONFIDENCE_OPTIONS.map(c => <option key={c}>{c}</option>)}
        </select>
        <label className="flex items-center gap-2 font-sans text-[13px] text-text-muted cursor-pointer">
          <input type="checkbox" checked={shortlist} onChange={e => setShortlist(e.target.checked)}
            className="accent-primary" />
          Top 20 only
        </label>
        <span className="font-mono text-[12px] text-text-muted ml-auto">
          {filtered.length} / {data.length}
        </span>
      </div>

      {/* Table */}
      <div className="border border-border-color rounded-sm overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border-color bg-background-light">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(h => (
                  <th key={h.id} className="font-mono text-[11px] uppercase tracking-wider text-text-muted px-4 py-3 text-left">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-border-color/50 hover:bg-surface transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="font-sans text-[13px] text-text-muted hover:text-text-main disabled:opacity-30 disabled:cursor-not-allowed"
        >← Prev</button>
        <span className="font-mono text-[12px] text-text-muted">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="font-sans text-[13px] text-text-muted hover:text-text-main disabled:opacity-30 disabled:cursor-not-allowed"
        >Next →</button>
      </div>
    </div>
  );
}
