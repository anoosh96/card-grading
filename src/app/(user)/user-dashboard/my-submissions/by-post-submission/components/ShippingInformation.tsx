import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import { Card, FormStepProps } from "@/types";
import { SetStateAction, useState } from "react";

const cardTypes: string[] = ["Card Type", "Pokémon", "Spiderman", "Sports", "One Piece"];
const conditions: string[] = ["Mint", "Near Mint", "Good", "Excellant", "Fair"];

export default function ShippingInformation({handleNext, handlePrevious}: FormStepProps) {
  const [cardDetails, setCardDetails] = useState<Card>({
    cardName: "",
    category: "Card Type",
    year: "",
    condition: "",
    serviceType: "Premium",
    fullName: "",
    shippingAddress: "",
    phoneNumber: ""
  })

  const handleChange = (e: {
      target: {
        name: string;
        value: string | number | boolean | SetStateAction<string>;
      };
    }) => {
    const { name, value } = e.target
    console.log(e)

    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form Data:", cardDetails);
    //handleNext()
  };

  return (
    <div>
      <h1 className="text-4xl font-bold" >Shipping Information</h1>
      <p className="text-neutral-grey mt-4">Enter your shipping details</p>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-8 p-2 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-2">Full Name</label>
            <CustomInput id="fullName" name="fullName" placeholder="Enter Full Name" className="w-full p-6"
              value={cardDetails.cardName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Shipping Address</label>
            <CustomInput id="shippingAddress" name="shippingAddress" placeholder="Enter Shipping Address" className="w-full p-6"
              value={cardDetails.cardName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Phone Number</label>
            <CustomInput id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" className="w-full p-6"
              value={cardDetails.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Card Name */}
          <div>
            <label className="block font-semibold mb-2">Card Name</label>
            <CustomInput id="cardName" name="cardName" placeholder="Enter Card Name" className="w-full p-6"
              value={cardDetails.cardName}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <CustomSelect options={cardTypes} selectedOption={cardDetails.category} borderColor="border-transparent" bg="bg-light-grey"
              setSelectedOption={(value) => handleChange({ target: { name: 'category', value: value } })} className="relative" />
          </div>

          {/* Year of Release */}
          <div>
            <label className="block font-semibold mb-2">Year of Release</label>
            <CustomInput id="year" name="year" placeholder="Year of Release" className="w-full p-6"
              value={cardDetails.year} onChange={handleChange}
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block font-semibold mb-2">Condition (Your Estimate)</label>
            <CustomSelect options={conditions} selectedOption={cardDetails.condition} borderColor="border-transparent" bg="bg-light-grey"
              setSelectedOption={(value) => handleChange({ target: { name: 'condition', value: value } })} className="relative" />
          </div>

          {/* Buttons */}
          <div className="flex gap-6 mt-8">
            <Button
              size={"lg"}
              className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
              onClick={handlePrevious}
            >
              Back
            </Button>
            <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" type="submit" onClick={handleNext}>
              Next
            </ButtonGradient>
          </div>

        </div>
      </form>
    </div>
  )
}