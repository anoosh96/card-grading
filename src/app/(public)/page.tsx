import Container from "@/components/common/Container";
import GradedCardsSection from "@/components/GradedCardsSection";
import HeroSection from "@/components/HeroSection";
import KeyFeaturesSection from "@/components/KeyFeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import WhatWeDo from "@/components/WhatWeDoSection";

export default function Home() {
  return (
    <Container isWithBackground>
      <main className="px-4 md:px-10">
        <HeroSection />
        <WhatWeDo />
        <KeyFeaturesSection />
        <GradedCardsSection />
        <TestimonialSection />
      </main>
    </Container>
  );
}
