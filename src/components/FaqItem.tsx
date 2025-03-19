'use client'

import Image from "next/image";
import { useState } from "react";

export default function FAQItem ({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-md bg-white p-5 transition-all duration-300">
      {/* Question Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="lg:text-lg font-semibold">{question}</h3>
        <Image src={`${ isOpen ? '/icons/arrow-up.svg' : '/icons/arrow-down-2.svg'}`} 
          width={30} height={30} alt="faq open icon" />
      </div>

      {/* Answer Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen mt-3" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};