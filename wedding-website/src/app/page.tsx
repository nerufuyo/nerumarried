import { HeroSection } from '@/components/sections/HeroSection';
import { StorySection } from '@/components/sections/StorySection';
import { WeddingDetailsSection } from '@/components/sections/WeddingDetailsSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { RSVPSection } from '@/components/sections/RSVPSection';
import { GiftRegistrySection } from '@/components/sections/GiftRegistrySection';
import { ScrollProgress, PageTransition } from '@/components/animations';
import { FloatingLanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MobileOptimization, OfflineFallback } from '@/components/optimization/MobileOptimization';
import { PerformanceMonitorComponent } from '@/components/monitoring/PerformanceMonitor';

export default function HomePage() {
  return (
    <MobileOptimization>
      <ScrollProgress>
        <PageTransition>
          <main className="min-h-screen">
            <HeroSection />
            <StorySection />
            <WeddingDetailsSection />
            <GallerySection />
            <RSVPSection />
            <GiftRegistrySection />
          </main>
          <FloatingLanguageSwitcher />
          <OfflineFallback />
          <PerformanceMonitorComponent />
        </PageTransition>
      </ScrollProgress>
    </MobileOptimization>
  );
}
