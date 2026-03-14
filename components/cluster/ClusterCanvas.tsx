"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3-force";
import type { CompanyIndexItem } from "@/lib/types";
import { heatColor } from "@/lib/utils";
import ClusterSidePanel from "./ClusterSidePanel";

const SEGMENT_GROUPS: Record<string, { x: number; y: number }> = {
  "Precision viticulture / vineyard management": { x: 0.25, y: 0.3 },
  "Soil health / biologicals":                   { x: 0.5,  y: 0.2 },
  "Carbon MRV / traceability":                   { x: 0.75, y: 0.3 },
  "Irrigation optimisation":                     { x: 0.2,  y: 0.6 },
  "Pest management":                             { x: 0.5,  y: 0.55 },
  "Wine production technologies":                { x: 0.75, y: 0.65 },
  "Packaging / recycling":                       { x: 0.3,  y: 0.8 },
  "Marketing / distribution":                    { x: 0.65, y: 0.8 },
  "Consumption platforms":                       { x: 0.85, y: 0.5 },
};

interface SimNode extends CompanyIndexItem {
  x?: number; y?: number; vx?: number; vy?: number;
  fx?: number | null; fy?: number | null;
}

interface Props { data: CompanyIndexItem[]; }

export default function ClusterCanvas({ data }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<CompanyIndexItem | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;
    const svg = svgRef.current;
    const W   = svg.clientWidth  || 800;
    const H   = svg.clientHeight || 600;

    const nodes: SimNode[] = data.map(co => {
      const gp = SEGMENT_GROUPS[co.normalizedSegment] ?? { x: 0.5, y: 0.5 };
      return { ...co, x: gp.x * W + (Math.random() - 0.5) * 80, y: gp.y * H + (Math.random() - 0.5) * 80 };
    });

    const sim = d3.forceSimulation<SimNode>(nodes)
      .force("charge", d3.forceManyBody<SimNode>().strength(-30))
      .force("collide", d3.forceCollide<SimNode>(22))
      .force("x", d3.forceX<SimNode>(n => (SEGMENT_GROUPS[n.normalizedSegment]?.x ?? 0.5) * W).strength(0.4))
      .force("y", d3.forceY<SimNode>(n => (SEGMENT_GROUPS[n.normalizedSegment]?.y ?? 0.5) * H).strength(0.4));

    const svgEl = svgRef.current as SVGSVGElement;
    const existingG = svgEl.querySelector("g.nodes");
    if (existingG) existingG.remove();

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "nodes");
    svgEl.appendChild(g);

    const circles: SVGCircleElement[] = nodes.map(node => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const r = node.shortlistFlag ? 14 : 10;
      circle.setAttribute("r",    String(r));
      circle.setAttribute("fill", heatColor(node.weightedTotalScore));
      circle.setAttribute("stroke", node.shortlistFlag ? "#4A5D23" : "#E6E4E0");
      circle.setAttribute("stroke-width", node.shortlistFlag ? "2" : "1");
      circle.setAttribute("cursor", "pointer");
      circle.setAttribute("opacity", "0.85");
      circle.addEventListener("click", () => setSelected(node));
      circle.addEventListener("mouseenter", () => circle.setAttribute("opacity", "1"));
      circle.addEventListener("mouseleave", () => circle.setAttribute("opacity", "0.85"));
      g.appendChild(circle);
      return circle;
    });

    sim.on("tick", () => {
      nodes.forEach((n, i) => {
        circles[i].setAttribute("cx", String(n.x ?? 0));
        circles[i].setAttribute("cy", String(n.y ?? 0));
      });
    });

    return () => { sim.stop(); };
  }, [data]);

  return (
    <div className="flex h-[calc(100vh-57px)]">
      <div className="flex-1 relative bg-background-light">
        <svg ref={svgRef} className="w-full h-full" />
        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-surface border border-border-color p-4 rounded-sm">
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-3">Score Range</p>
          {[
            { label: "High (4.5+)",   color: heatColor(5)   },
            { label: "Medium (3.5+)", color: heatColor(3.5) },
            { label: "Low (<3.5)",    color: heatColor(2)   },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded-full" style={{ background: color }} />
              <span className="font-sans text-[12px] text-text-muted">{label}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-border-color">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-primary" style={{ background: heatColor(4.5) }} />
              <span className="font-sans text-[12px] text-text-muted">Top-20 shortlisted</span>
            </div>
          </div>
        </div>
      </div>
      {selected && (
        <ClusterSidePanel company={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
