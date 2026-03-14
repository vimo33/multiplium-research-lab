import { getTop20 } from "@/lib/data";
import ClusterCanvas from "@/components/cluster/ClusterCanvas";

export default function ClusterPage() {
  const top20 = getTop20();
  return <ClusterCanvas data={top20} />;
}
