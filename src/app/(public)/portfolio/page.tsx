import Container from "@/components/common/Container";
import PortfolioHeroSection from "./components/PortfolioHeroSection";
import ExploreCardSection from "./components/ExploreCardSection";


export default function Portfolio() {
  return (
    <Container cloudBackground>
      <PortfolioHeroSection />
      <ExploreCardSection />
    </Container>
  )
}