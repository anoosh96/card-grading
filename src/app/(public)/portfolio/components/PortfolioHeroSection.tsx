import Image from "next/image";


export default function PortfolioHeroSection() {
  return (
    <section className="relative">
      <div className="grid lg:grid-cols-2 p-10 gap-3">
        <div className="flex flex-col justify-center h-[46rem] pl-10">
          <div className="space-y-4 -mt-20">
             <h1 className="text-4xl font-bold text-charcol">Graded Cards Showcase</h1>
             <p>Explore our collection of professionally graded cards from Pokemon, <br /> Yu-Gi-Oh, and Sports cards</p>
          </div>
        </div>
        <div className="flex h-full justify-center gap-6 mt-40 lg:mt-0">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src={"/assets/images/pikachu.svg"} width={200} height={271} alt="Pikachu" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src={"/assets/images/spiderman.svg"} width={200} height={271} alt="Pikachu" />
            <Image src={"/assets/images/mike-trout.svg"} width={200} height={271} alt="Mike Trout" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src={"/assets/images/jpark.svg"} width={200} height={271} alt="Pikachu" />
            <Image src={"/assets/images/op.svg"} width={200} height={271} alt="Mike Trout" />
          </div>
        </div>
      </div>
      <Image src={"/assets/images/ornament-ring.svg"} width={76} height={76} alt="ornament ring" className="absolute top-5 left-[70%] md:left-[60%] lg:left-[32%]" />
      <Image src={"/assets/images/ornament-arrows.svg"} width={76} height={76} alt="ornament arrows" className="absolute top-5 left-0"/>
      <Image src={"/assets/images/ornament-wave.svg"} width={88} height={76} alt="ornament wave" className="absolute top-[170px] left-[350px]"/>
      <Image src={"/assets/images/ornament-star.svg"} width={20} height={20} alt="ornament star" className="absolute top-[270px] left-[40px]"/>
      <Image src={"/assets/images/ornament-half-ring.svg"} width={50} height={50} alt="ornament star" className="absolute top-[450px] lg:bottom-[250px] left-0"/>
      <Image src={"/assets/images/ornament-star.svg"} width={20} height={20} alt="ornament star" className="absolute top-[470px] lg:bottom-[290px] left-[400px]"/>
      <Image src={"/assets/images/ornament-line-mini.svg"} width={80} height={80} alt="ornament line" className="absolute top-[600px] lg:bottom-[150px] left-[100px]"/>
    </section>
  )
}