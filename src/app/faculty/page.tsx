import { FacultyHero } from "@/components/faculty/FacultyHero";
import { FacultyCarousel } from "@/components/faculty/FacultyCarousel";
import { FacultyGrid } from "@/components/faculty/FacultyGrid";
import { FacultyQuote } from "@/components/faculty/FacultyQuote";

export default function FacultyPage() {
  return (
    <main className="pt-32">
      <FacultyHero />
      <FacultyCarousel />
      <FacultyGrid />
      <FacultyQuote />
    </main>
  );
}
