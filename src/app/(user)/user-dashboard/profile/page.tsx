'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa";



export default function ProfilePage() {

  const [userDetails, setUserDetails] = useState<UserProfile>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    paymentMethod: "Premium",
    shippingAddress: "",
    phoneNumber: ""
  })

  const [image, setImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, []);


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    }
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target
    console.log(e)

    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {

  }

  return (
    <section className="p-10">
      {/* <div className="flex flex-col items-start justify-center w-44 gap-2">
        <div className="relative">
          <Image width={40} height={40} alt="Profile Avatar Icon" src={"/assets/images/profile-avatar.svg"} className="h-36 w-36 rounded-full" />
          <Image src={"/icons/camera.svg"} alt="camera icon" width={35} height={35} className="absolute bottom-2 right-1 cursor-pointer" />
        </div>
        <div>Henrietta Bogisich</div>
        <div className="flex gap-2 text-sm">
          <Image src={"/assets/images/profile-avatar.svg"} alt="email icon" width={16} height={16} />
          <div>@Henrietta_Bogisich</div>
        </div>
      </div> */}
      <div className="flex flex-col items-start justify-center w-44 gap-2">
        {/* Profile Picture Container */}
        <div className="relative w-32 h-32">
          {/* Profile Image */}
          <div
            className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <img
              src={image || "/assets/images/profile-avatar.svg"} // Default placeholder
              alt="Profile"
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>

          {/* Camera Icon */}
          <div {...getRootProps()} className="absolute bottom-2 right-1 cursor-pointer">
            <Image src={"/icons/camera.svg"} alt="camera icon" width={35} height={35} className="" />
          </div>
        </div>

        {/* User Details */}
        <div>Henrietta Bogisich</div>
        <div className="flex gap-2 text-sm">
          <Image src={"/icons/email-grey.svg"} alt="email icon" width={16} height={16} />
          <div>@Henrietta_Bogisich</div>
        </div>
      </div>

      <div className="mt-10">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mt-8 p-2 grid grid-cols-2 gap-8">
            {/* Full Name */}
            <div>
              <label className="block font-semibold mb-2">Full Name</label>
              <CustomInput id="fullName" name="fullName" placeholder="Enter Full Name" className="w-full p-6 bg-white"
                value={userDetails.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email</label>
              <CustomInput id="email" name="email" placeholder="Enter Email" className="w-full p-6 bg-white"
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Shipping Address</label>
              <CustomInput id="shippingAddress" name="shippingAddress" placeholder="Enter Shipping Address" className="w-full p-6 bg-white"
                value={userDetails.shippingAddress}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Phone Number</label>
              <CustomInput id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" className="w-full p-6 bg-white"
                value={userDetails.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="password" className="block font-semibold text-gray-700 mb-2">
                Password
              </label>
              <CustomInput id="password" name="password" placeholder="Enter Password" type="password"
                className="w-full p-6 bg-white" value={userDetails.password} onChange={handleChange} />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="confirmPassword" className="block font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <CustomInput id="confirmPassword" placeholder="Enter Password" type="password" onChange={handleChange} className="w-full p-6 bg-white" />
            </div>

            <div className="col-span-full">
              <label className="block font-semibold mb-2">Condition (Your Estimate)</label>
              <CustomSelect options={['Credit/Debit Card', 'PayPal']} optionIcons={['/icons/credit-card.svg', '/icons/logos_paypal.svg']} selectedOption={userDetails.paymentMethod || ''} borderColor="border-transparent" bg="bg-white"
                setSelectedOption={(value) => handleChange({ target: { name: 'paymentMethod', value: value } })} className="relative" />
            </div>

            {/* Buttons */}
            <div className="flex gap-6 mt-8">
              <Button
                size={"lg"}
                className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
              >
                Cancel
              </Button>
              <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" type="submit">
                Save Changes
              </ButtonGradient>
            </div>

          </div>
        </form>
      </div>
    </section>
  )
} 