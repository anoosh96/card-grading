import Image from "next/image"
import ServiceCard from "./ServiceCard"

const SERVICES = [
  {
    name: 'Standard',
    price: 'X',
    features: ['Submit card details online', 'Ship cards to us', 'AI grading process', 'Cards returned within 3-4 weeks']
  },

  {
    name: 'Premium',
    price: 'X',
    features: ['Express grading for faster results', 'High-resolution scans for detailed review', 'Optional authentication check', 'Return shipment via premium courier']
  }
]


export default function OurServices (){
  return(
    <section className="p-10 pr-10 lg:pr-40 mt-4">
      <h1 className="text-charcol font-bold heading-primary" >Our Grading Services & Pricing</h1>
      <p className="text-charcol mt-2">Select from our affordable grading services with quick turnaround times and premium accuracy.</p>   
    
      <div className="mt-20 flex flex-col md:flex-row items-start">
          <Image src={"/assets/images/style.svg"} width={500} height={700} className="w-[20rem] -mt-32 -ml-[40px] lg:-ml-[42px] xl:-ml-[44px]" alt="style image" />
          <div className="grid lg:grid-cols-2 gap-10 w-full">
           {SERVICES.map((service, index) => { return ( <div key={index} className="flex justify-center mb-10 lg:mb-0 lg:justify-end"> <ServiceCard {...service}/> </div>)}) }
          </div>
      </div>
    </section>
  )  
}