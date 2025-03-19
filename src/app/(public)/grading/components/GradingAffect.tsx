import Image from "next/image";

export default function GradingAffect() {
  return (
    <section className="mt-20 p-10">
      <h1 className="heading-primary font-bold">How Grading Transforms Your Cards</h1>
      <div className="mt-14 w-full">
       <Image className="mx-auto" src={"/assets/images/after.svg"} 
         width={1254} height={813} alt="before after image"  style={{ width: "100%", height: "auto" }}/>
      </div>
    </section>
  )
}

