import { HeroSection } from '@/components/home/HeroSection';
import { ResultsGallery } from '@/components/home/ResultsGallery';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { LeadCaptureForm } from '@/components/home/LeadCaptureForm';

export default function HomePage() {
  return (
    <main className=" overflow-x-hidden bg-white">
      <HeroSection />
      <ResultsGallery />
      <FeaturesSection />
      <TestimonialSection />
      <LeadCaptureForm />
    </main>
  );
}
