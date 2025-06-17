'use client'

import Image from "next/image";
import { useState } from "react";

const PricingTableItems = [
  {
    name: 'Economy',
    price: '15',
    tag: 'Budget-friendly option',
    turnaroundTime: '10 Days',
    maxCardValue: '£250',
    colorClass: 'bg-[#FFC420]',
    borderClass: 'border-l-[#FFC420]'
  },
  {
    name: 'Standard',
    price: '20',
    tag: 'Most popular choice',
    turnaroundTime: '7 Days',
    maxCardValue: '£1,000',
    colorClass: 'bg-[#4B9CFF]',
    borderClass: 'border-l-[#4B9CFF]'
  },
  {
    name: 'Express',
    price: '40',
    tag: 'Fast turnaround',
    turnaroundTime: '5 Days',
    maxCardValue: '£2,500',
    colorClass: 'bg-[#3DD6A8]',
    borderClass: 'border-l-[#3DD6A8]'
  },
  {
    name: 'Super Express',
    price: '80',
    tag: 'Premium speed',
    turnaroundTime: '2 Days',
    maxCardValue: '£10,000',
    colorClass: 'bg-[#E3350D]',
    borderClass: 'border-l-[#E3350D]'
  },
  {
    name: 'Walkthrough',
    price: '150',
    tag: 'Same-day service',
    turnaroundTime: '1 Day',
    maxCardValue: '£15,000',
    colorClass: 'bg-[#8F3DDC]',
    borderClass: 'border-l-[#8F3DDC]'
  },
];

export default function PricingTable() {
  const [hoveredTagIndex, setHoveredTagIndex] = useState<number | null>(null);

  const getPricingDisplay = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (<Image src={"/icons/checkmark.svg"} width={15} height={15} className="inline" alt="checkmark icon" />) : null;
    }
    return value;
  };

  return (
    <section className="p-10">
      <h2 className="text-charcol heading-primary font-bold">Pricing Table</h2>

      {/* Added an outer div for horizontal scrolling */}
      <div className="overflow-x-auto lg:p-4">
        <table className="w-full border-collapse min-w-[600px]"> {/* min-w added for better scrolling experience */}
          {/* Table Header */}
          <thead>
            <tr className="text-left">
              <th className="p-2">Service Level</th>
              <th className="p-2 text-center">Turnaround Time</th>
              <th className="p-2 text-center">Price Per Card</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {PricingTableItems.map((item, index) => {
              return (
                <tr className={`${index % 2 === 0 ? '' : 'bg-light-grey'}`} key={index}>
                  <td className="px-4 py-5 text-gray-600">
                    <div className="flex items-center gap-2">
                      {item.name}
                      <div
                        className="relative cursor-pointer"
                        onMouseEnter={() => setHoveredTagIndex(index)}
                        onMouseLeave={() => setHoveredTagIndex(null)}
                      >
                        <Image src={"/icons/question.svg"} width={15} height={15} alt="info icon" />
                        {/* Tooltip Popup */}
                        {hoveredTagIndex === index && (
                          <div className="absolute z-10 p-2 text-xs text-white bg-gray-800 rounded shadow-lg bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap">
                            {item.tag}
                            {/* Arrow for the tooltip, positioned at the bottom center */}
                            <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-gray-800 transform rotate-45 -translate-x-1/2"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center text-sm lg:text-base">{item.turnaroundTime}</td>
                  <td className="px-4 py-5 text-center text-sm lg:text-base">£{item.price} / card</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}