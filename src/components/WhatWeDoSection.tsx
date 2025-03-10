import Image from "next/image";

export default function WhatWeDo() {
  return (
    <section className="pt-16 md:pt-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center mx-auto">
          <div className="relative">
            <div className="flex justify-start 2xl:justify-center">
              <Image
                src={"/assets/images/what-we-do-section-vector.svg"}
                alt="Mobile app preview"
                width={500}
                height={524}
              />
            </div>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold mb-5">What We Do</h2>
            <p className="text-sm leading-relaxed">
              Our AI-powered grading system revolutionizes Pokémon card
              authentication by delivering fast, accurate, and consistent
              evaluations. Using advanced machine learning, we analyze card
              condition, centering, edges, and surface quality in seconds,
              eliminating human bias. With affordable and transparent pricing,
              collectors can confidently grade their cards without long wait
              times or high costs. Experience the future of card grading today!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
