import Image from "next/image";
import Addon from "./Addon";

const ADDONS = [
  {
    icon: "/icons/card.svg",
    title: "Protected Card Cases",
    desc: "Keep your graded cards safe."
  },

  {
    icon: "/icons/certificate.svg",
    title: "Digital Certificates",
    desc: "Get a verified digital certificate for your graded card."
  }
]

export default function Addons(){
  return (
    <section className="p-10">
      <div className="flex items-cetner gap-4">
        <Image  src={"/icons/checkbox.svg"} width={30} height={30} alt="checbox filled icon" />
        <h2 className="text-charcol heading-primary font-bold">Addons</h2>
      </div>

      <div className="space-y-4 mt-8">
        { ADDONS.map((addon, i) => { return (<Addon key={i} {...addon} />)}) }
      </div>
    </section>
  )
}