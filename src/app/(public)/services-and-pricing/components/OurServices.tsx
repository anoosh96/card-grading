'use client'

import Image from "next/image"
import ServiceCard from "./ServiceCard"
import BulkCard from "./BulkCard";

export interface Service {
  name: string;
  price: string; // e.g., "£15" (for the number part)
  tag: string; // e.g., "Budget-friendly option"
  turnaroundTime: string; // e.g., "10 Days"
  maxCardValue: string; // e.g., "£250"
  colorClass: string; // Tailwind class for the primary background color (e.g., 'bg-yellow-400')
  borderClass: string
  // No more features array or pricePerCard as it's implied in 'price'
}

export interface BulkService {
  price: string;
  turnAroundTime: string;
  color: string;
  cards: string;
  className?: string
}

export type ServiceCardProps = Service; // This simplifies things as ServiceCard takes all Service properties

export type BulkCardProps = BulkService

// Updated SERVICES data to match the image and new structure
export const SERVICES_DATA: Service[] = [
  {
    name: 'Economy',
    price: '15', // Store just the number, add '£' and '/ card' in ServiceCard
    tag: 'Budget-friendly option',
    turnaroundTime: '10 Days',
    maxCardValue: '£250',
    colorClass: 'bg-[#FFC420]', // Specific yellow from design
    borderClass: 'border-l-[#FFC420]'
  },
  {
    name: 'Standard',
    price: '20',
    tag: 'Most popular choice',
    turnaroundTime: '7 Days',
    maxCardValue: '£1,000',
    colorClass: 'bg-[#0DA6E3]', // Specific blue from design
    borderClass: 'border-l-[#0DA6E3]'
  },
  {
    name: 'Express',
    price: '40',
    tag: 'Fast turnaround',
    turnaroundTime: '5 Days',
    maxCardValue: '£2,500',
    colorClass: 'bg-[#3DD6A8]', // Specific green from design
    borderClass: 'border-l-[#3DD6A8]'
  },
  {
    name: 'Super Express',
    price: '80',
    tag: 'Premium speed',
    turnaroundTime: '2 Days',
    maxCardValue: '£10,000',
    colorClass: 'bg-[#E3350D]', // Specific orange-red from design
    borderClass: 'border-l-[#E3350D]'
  },
  {
    name: 'Walkthrough',
    price: '150',
    tag: 'Same-day service',
    turnaroundTime: '1 Day',
    maxCardValue: '£15,000', // Adjusted from image £10,000 to something higher for Walkthrough
    colorClass: 'bg-[#8F3DDC]', // Specific purple from design
    borderClass: 'border-l-[#8F3DDC]'
  },
];

const BULK_SERVICES = [
  {
    turnAroundTime: '10 days',
    price: '13',
    cards: '10',
    color: '#FF9067'
  },

  {
    turnAroundTime: '10 days',
    price: '12',
    cards: '25',
    color: '#FD88AD'
  },

  {
    turnAroundTime: '10 days',
    price: '10',
    cards: '50',
    color: '#A1CBFC'
  }
]


export default function OurServices() {
  // const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  return (
    <section className="p-10 mt-4">
      <h1 className="text-charcol font-bold heading-primary" >Our Grading Services & Pricing</h1>
      <p className="text-charcol mt-2">Select from our affordable grading services with quick turnaround times and premium accuracy.</p>

      <div className="mt-20 flex flex-col md:flex-row items-start">
        <Image src={"/assets/images/style.svg"} width={500} height={700} className="w-[20rem] -mt-32 -ml-[40px] lg:-ml-[42px] xl:-ml-[44px]" alt="style image" />
        <div className="w-full">
          <h2 className="heading-primary text-charcol text-center font-bold mb-10">Service Levels</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 w-full">
            {SERVICES_DATA?.map((service: Service, index: number) => {
              return (<div key={index} className={`flex p-10 justify-center ${index == 4 ? 'xl:col-span-2 xl:justify-center' : ''}`}>
                <ServiceCard {...service} /> </div>)
            })}
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center mt-20">
        <hr className="w-64 tex-grey border-t-2 border-gray-400"></hr>
        <span className="px-4 font-semibold text-lg text-gray-500">Or</span>
        <hr className="w-64 tex-grey border-t-2 border-gray-400"></hr>
      </div>

      <div className="mt-20">
        <h2 className="heading-primary text-center text-charcol font-bold">Bulk Submission</h2>

        <div className="mt-10 pr-4 sm:pr-20">

          {
            BULK_SERVICES.map((service: BulkService, index: number) => {
              return (<BulkCard key={index} {...service} className={index == 0 ? 'flex lg:justify-end' : index == 1 ? 'flex lg:justify-center' : 'flex lg:justify-start'} />)
            })
          }
        </div>
      </div>
    </section>
  )
}