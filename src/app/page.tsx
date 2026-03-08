import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedToolsSection } from "@/components/home/FeaturedToolsSection";
import { WorkflowPreviewSection } from "@/components/home/WorkflowPreviewSection";
import { AIDevBuzzSection } from "@/components/home/AIDevBuzzSection";
import { TrendRadarSection } from "@/components/home/TrendRadarSection";
import { getAIDevBuzzStories } from "@/lib/hacker-news";

export default async function Home() {
  const stories = await getAIDevBuzzStories();

  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedToolsSection />
      <WorkflowPreviewSection />
      <AIDevBuzzSection stories={stories} />
      <TrendRadarSection />
    </main>
  );
}
