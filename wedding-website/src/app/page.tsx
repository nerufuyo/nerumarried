import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { StorySection } from '@/components/sections/StorySection';
import { WeddingDetailsSection } from '@/components/sections/WeddingDetailsSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { RSVPSection } from '@/components/sections/RSVPSection';
import { GiftRegistrySection } from '@/components/sections/GiftRegistrySection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <StorySection />
      <WeddingDetailsSection />
      <GallerySection />
      <RSVPSection />
      <GiftRegistrySection />
    </Layout>
  );
}
