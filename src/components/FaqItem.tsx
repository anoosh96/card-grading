'use client'

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (faqRef.current && !faqRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={faqRef}
      className="border rounded-lg shadow-md bg-white p-5 transition-all duration-300"
    >
      {/* Question Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="lg:text-lg font-semibold">{question}</h3>
        <Image
          src={`${isOpen ? '/icons/arrow-up.svg' : '/icons/arrow-down-2.svg'}`}
          width={30}
          height={30}
          alt="faq open icon"
        />
      </div>

      {/* Answer Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[200vh] mt-3" : "max-h-0"
        }`}
      >
        {/* dangerouslySetInnerHTML is used here to render the HTML string */}
        <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: answer }}></p>
      </div>
    </div>
  );
};