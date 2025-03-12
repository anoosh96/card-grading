import { FaqProps } from "@/types";
import FAQItem from "./FaqItem";


export default function Faqs({ faqs } : FaqProps) {
  return (
    <div className="w-[80%] mx-auto mt-10 space-y-4">
      { faqs.map((faq, index) => (<FAQItem key={index} question={faq.question} answer={faq.answer}/>)) }
    </div>
  )
}