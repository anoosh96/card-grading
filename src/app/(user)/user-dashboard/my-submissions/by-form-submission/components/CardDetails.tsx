import ImageEditor from "@/components/common/ImagePicker/ImageEditor";
import { SetStateAction, useState } from "react";

import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { Card, FormStepProps } from "@/types";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter } from "next/navigation";

const cardTypes: string[] = ["Card Type", "Pokémon", "Spiderman", "Sports", "One Piece"];
const conditions: string[] = ["Mint", "Near Mint", "Good", "Excellant", "Fair"];
const services: string[] = ["Service 1", "Service 2"];


export default function CardDetails({ handleNext }: FormStepProps) {
  const [frontImg, setFrontImg] = useState<{ url: string; alt: string } | undefined>(undefined);
  const [backImg, setBackImg] = useState<{ url: string; alt: string } | undefined>(undefined);

  const router = useRouter()


  const [cardDetails, setCardDetails] = useState<Card>({
    cardName: "",
    category: "Card Type",
    year: "",
    condition: "Mint",
    serviceType: "Premium",
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
    handleNext()
  };

  const handleUploadImage = (type: "front" | "back", file: File) => {
    const uploadedImage = {
      url: URL.createObjectURL(file),
      alt: file.name,
    };

    if (type === "front") {
      setFrontImg(uploadedImage);
    } else {
      setBackImg(uploadedImage);
    }
  };

  const handleRemoveImage = (type: "front" | "back") => {
    if (type === "front") {
      setFrontImg(undefined);
    } else {
      setBackImg(undefined);
    }
  };

  return (
    <div>
      <h1 className="heading-primary font-bold">Enter Your Card Details</h1>
      <p className="text-medium-grey mt-2">Provide information about the card you&#39;re submitting</p>

      <div className="overflow-hidden mt-8">
        <h3 className="heading-tertiary mb-2">Card Images</h3>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex-between gap-4">
            <ImageEditor
              image={frontImg}
              placeholder="Drag and drop your card front image here"
              onAddImage={(file) => handleUploadImage("front", file[0])}
              onDeleteImage={() => handleRemoveImage("front")}
            />

            {/* Back Image */}
            <ImageEditor
              image={backImg}
              placeholder="Drag and drop your card back image here"
              onAddImage={(file) => handleUploadImage("back", file[0])}
              onDeleteImage={() => handleRemoveImage("back")}
            />
          </div>

          <div className="mt-8 p-2 space-y-4">

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

            {/* Service Type (Disabled Field) */}
            <div>
              <label className="block font-semibold mb-2">Service Type</label>
              <CustomSelect options={services} selectedOption={cardDetails.serviceType} borderColor="border-transparent" bg="bg-light-grey"
                setSelectedOption={(value) => handleChange({ target: { name: 'serviceType', value: value } })} className="relative" />
            </div>

            {/* Buttons */}
            <div className="flex gap-6 mt-8">
              <Button
                size={"lg"}
                type="button"
                className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" type="submit">
                Next
              </ButtonGradient>
            </div>

          </div>
        </form>


      </div>
    </div>
  )
}