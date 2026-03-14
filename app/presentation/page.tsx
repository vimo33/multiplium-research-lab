// frontend/app/presentation/page.tsx
import { SLIDES } from "./slides-data";
import PresentationClient from "./PresentationClient";

export default function PresentationPage() {
  return <PresentationClient slides={SLIDES} />;
}
