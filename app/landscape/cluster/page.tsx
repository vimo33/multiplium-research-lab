import { getAllCompanies } from "@/lib/data";
import ClusterCanvas from "@/components/cluster/ClusterCanvas";

export default function ClusterPage() {
  const companies = getAllCompanies();
  return <ClusterCanvas data={companies} />;
}
