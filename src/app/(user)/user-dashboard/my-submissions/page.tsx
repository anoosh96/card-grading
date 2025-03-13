'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import SelectableCard from "./SelectableCard";
import FormIcon from "@/components/svgs/FormIcon";
import PostIcon from "@/components/svgs/PostIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function MySubmissionPage() {
  const [source, setSource] = useState("")
  const router = useRouter()

  const onContinue = () => {
    router.push(`/user-dashboard/my-submissions/${source}-submission`)
  }
  
  return (
    <section className="bg-white p-7">
       <h1 className="text-4xl font-bold">Submit Your Cards for Grading</h1>
       <p className="text-medium-grey mt-2">Get Your Card Professionally Evaluated and Certified</p>

       <div className="mt-8 space-y-8">
          <SelectableCard 
            icon={<FormIcon className={`${source == 'by-form' ? 'text-primary': ''}`}  />} 
            title="By Form Submission" 
            desc="Manually enter card details." 
            selected={source} 
            setSelected={setSource} 
            value="by-form" />

          <SelectableCard icon={<PostIcon className={`${source == 'by-post' ? 'text-primary': ''}`}  />} 
            title="By Post Submission" 
            desc="Ship the card, admin enters details." 
            selected={source} 
            setSelected={setSource} 
            value="by-post" />

            <ButtonGradient disabled={source == ''} className="px-10 py-6" onClick={onContinue}>Continue</ButtonGradient>
       </div>
    </section>
  )
}