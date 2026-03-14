import { notFound } from "next/navigation";
import { getDossier } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import DossierArticle from "@/components/research/DossierArticle";
import SignalBadge from "@/components/badges/SignalBadge";
import { formatScore } from "@/lib/utils";

export function generateStaticParams() {
  return ["biome-makers", "biorizon-biotech", "agrology"].map(slug => ({ slug }));
}

export default async function DossierPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let dossier;
  try { dossier = getDossier(slug); }
  catch { notFound(); }

  return (
    <>
      <div className="h-[2px] bg-primary/20 sticky top-[57px] z-40" />

      <PageContainer variant="editorial" className="mt-16">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 mb-6 text-[11px] font-mono uppercase tracking-widest text-text-muted">
          <span>Deep Research</span>
          <span>/</span>
          <span>{dossier.company}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[40px] font-semibold text-primary">
              {formatScore(dossier.score)}
            </span>
            <div className="flex flex-col gap-1">
              <SignalBadge signal={dossier.signal} />
              <span className="font-mono text-[11px] text-text-muted">Rank #{dossier.rank}</span>
            </div>
          </div>
          <h1 className="font-display text-[40px] font-semibold leading-tight mb-4">
            {dossier.company}
          </h1>
          <p className="font-sans text-[15px] text-text-muted leading-relaxed max-w-2xl">
            {dossier.shortlistRationale}
          </p>
          {dossier.majorRisk && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-sm">
              <p className="font-sans text-[11px] uppercase tracking-wider text-red-600 mb-1">Major Risk</p>
              <p className="font-sans text-[13px] text-red-800">{dossier.majorRisk}</p>
            </div>
          )}
        </div>

        {/* Dossier sections */}
        <DossierArticle sections={dossier.sections} />
      </PageContainer>
    </>
  );
}
