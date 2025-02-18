import { Button } from "./ui/button";

function HeroSection() {
  return (
    <div className="relative flex justify-center w-full">
      <section className="pt-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI-Driven Precision Grading
              <br />
              for Pokémon Cards
            </h1>
            <p className="text-gray-600 text-lg mb-8">Accurate, fast, and transparent AI card grading—trusted by collectors worldwide.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size={"lg"} className="h-auto rounded-full bg-custom-gradient py-3 px-8 text-base transition-colors">
                Get Started
              </Button>
              <Button size={"lg"} className="h-auto bg-soft-grey rounded-full text-black py-3 px-8 text-base hover:bg-soft-grey">
                View Pricing
              </Button>
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
