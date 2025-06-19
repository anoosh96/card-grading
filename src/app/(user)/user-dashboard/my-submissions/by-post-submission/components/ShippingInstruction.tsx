import { ButtonGradient } from "@/components/common/ButtonGradient"
import CustomCheckbox from "@/components/common/CustomCheckbox"
import { Button } from "@/components/ui/button"
import { FormStepProps } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaInfoCircle } from "react-icons/fa"

const instructions = [
  'Use penny sleeves and top loaders for protection.',
  'Secure with bubble wrap or cardboard reinforcements.',
  'Use a padded envelope or box to prevent damage.',
  'Include a printed copy of your submission details.',
  'Ship to: Card Grading Center, 123 Main St, Cardville, CV 12345'
]


export default function ShippingInstruction({ handleNext }: FormStepProps) {

  const router = useRouter()
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div>
      <h1 className="heading-primary font-bold">Ship Your Card Securely</h1>
      <p className="text-neutral-grey mt-4">Follow these instructions to safely ship your card</p>

      <div className="bg-light-grey rounded-lg py-7 px-4 sm:p-7 mt-8">
        <h2 className="heading-primary font-bold">Shipping Instructions:</h2>
        <div className="mt-4 space-y-6 py-7 px-4 sm:p-7">
          {instructions.map((instruction, index) => (
            <div className="flex gap-4" key={index}>
              <Image src={"/icons/double-star.svg"} width={20} height={20} alt="list icon image" />
              <span className="block text-neutral-grey">{instruction}</span>
            </div>
          ))}
        </div>
        <div className="bg-transparent-red p-4 md:p-8 flex items-center text-light-red">
          <FaInfoCircle className="text-2xl bg-transparent" />
          <p className="text-sm md:text-xl ml-6 font-regular">Once received, you&#39;ll get a tracking number to monitor progress.</p>
        </div>
        <CustomCheckbox text="I confirm that I have read and will follow the shipping instructions" className="bg-transparent mt-4 text-xs" size="md" checked={checked} onChange={setChecked} />
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-8">
        <Button
          size={"lg"}
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" type="button" onClick={handleNext} disabled={!checked}>
          Next
        </ButtonGradient>
      </div>
    </div>
  )
}