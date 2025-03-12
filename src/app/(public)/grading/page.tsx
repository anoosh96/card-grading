import Container from "@/components/common/Container";
import GradingHeroSection from "./components/GradingHeroSection";
import GradingProcess from "./components/GradingProcess";
import GradingVideoSection from "./components/GradingVideoSection";
import GradingAffect from "./components/GradingAffect";
import GradingFaqSection from "./components/GradingFaqSection";


export default function GradingPage () {
  return(
    <Container>
       <GradingHeroSection />
       <GradingProcess />
       <GradingVideoSection />
       <GradingAffect />
       <GradingFaqSection/>
    </Container>
  )
}