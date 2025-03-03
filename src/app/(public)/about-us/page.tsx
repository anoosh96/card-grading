import Container from "@/components/common/Container";
import AboutMissionSection from "./components/AboutMissionSection";
import AboutHeroSection from "./components/AboutHeroSection";
import AboutStorySection from "./components/AboutStorySection";
import AboutWhyChooseUs from "./components/AboutWhyChooseUs";

function AboutUsPage() {
  return (
    <Container>
      <AboutHeroSection />
      <AboutMissionSection />
      <AboutStorySection />
      <AboutWhyChooseUs />
    </Container>
  );
}

export default AboutUsPage;
