export default function DeepResearchSlugPage({ params }: { params: { slug: string } }) {
  return <div className="p-8 font-sans">Deep Research: {params.slug} — coming soon</div>;
}
