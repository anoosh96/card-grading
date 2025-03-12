import Image from "next/image";

const PricingTableItems = [
  {
    name: 'Turnaround Time',
    addon: false,
    pricing: {
      standard: '7-10 Days',
      premium: '3-5 Days'
    }
  },
  {
    name: 'AI Grading',
    addon: false,
    pricing: {
      standard: true,
      premium: true
    }
  },
  {
    name: 'Protective Case',
    addon: true,
    pricing: {
      standard: false,
      premium: true
    }
  },
  {
    name: 'Digital Certificate',
    addon: true,
    pricing: {
      standard: false,
      premium: true
    }
  }
]


export default function PricingTable() {

  const getPricing = (pricing: string | boolean) => {
    if(typeof pricing == 'boolean'){
      return pricing ? (<Image src={"/icons/checkmark.svg"} width={15} height={15} className="inline" alt="checkmark icon" />) : null
    }
    return pricing
  }

  return (
    <section className="p-10 lg:pr-40">
      <h2 className="text-charcol text-4xl font-bold">Pricing Table</h2>

      <div className="p-4">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="text-left">
              <th className="p-2"></th>
              <th className="p-2 text-lg font-medium text-center text-xl"><div className="mb-2">Standard</div><div className="text-medium-grey mb-8">$X</div></th>
              <th className="p-2 text-lg font-medium text-center text-xl"><div className="mb-2">Premium</div><div className="text-medium-grey mb-8">$X</div></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>

            {PricingTableItems.map((item, index) => {
              return (
                <tr className={`${ index % 2 == 0 ? '' : 'bg-light-grey' }`} key={index}>
                  <td className="px-4 py-5 text-gray-600 flex items-center gap-2">
                    {item.name}
                    { item.addon &&
                      <span className="bg-custom-gradient text-xs px-2 py-1 rounded-full ml-1 text-white">
                        add-on
                      </span>
                    }
                    <span className=""><Image src={"/icons/question.svg"} width={15} height={15} alt="info icon" /></span>
                  </td>
                  <td className="px-4 py-5 text-center">{getPricing(item.pricing.standard)}</td>
                  <td className="px-4 py-5 text-center">{ getPricing(item.pricing.premium) }</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}