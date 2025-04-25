import Link from "next/link";
import { ButtonGradient } from "./common/ButtonGradient";
import { Button } from "./ui/button";

function HeroSection() {
  return (
    <div className="relative flex justify-center w-full">
      <section className="pt-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-charcol mx-auto text-center">
            <h1 className="heading-primary font-bold mb-4">
              AI-Driven Precision Grading
              <br />
              for Pokémon Cards
            </h1>
            <p className="font-medium text-lg mb-8">Accurate, fast, and transparent AI card grading—trusted by <br /> collectors worldwide.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-1">
              <Link href="/login">
                <ButtonGradient size={"lg"} className="font-semibold rounded-full px-8 !py-2 text-base">
                  Get Started
                </ButtonGradient>
              </Link>

              <Link href="/services-and-pricing">
                <Button size={"lg"} className="font-semibold bg-soft-grey rounded-full text-pure-grey py-2 px-8 text-base hover:bg-soft-grey">
                  View Pricing
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-orange-100/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-radial from-orange-100/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>
    </div>
  );
}

export default HeroSection;
