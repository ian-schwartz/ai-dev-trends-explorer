import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedToolsSection } from "@/components/home/FeaturedToolsSection";
import { WorkflowPreviewSection } from "@/components/home/WorkflowPreviewSection";
import { TrendRadarSection } from "@/components/home/TrendRadarSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedToolsSection />
      <WorkflowPreviewSection />
      <TrendRadarSection />
    </main>
  );
}
