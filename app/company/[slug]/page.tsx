export default function CompanySlugPage({ params }: { params: { slug: string } }) {
  return <div className="p-8 font-sans">Company: {params.slug} — coming soon</div>;
}
