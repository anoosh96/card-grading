"use client";

import React, { useState } from "react";
import CustomInput from "@/components/common/CustomInput";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter } from "next/navigation";

const ShippingInfo = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    shippingAddress: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // You can send formData to an API or handle it here
  };

  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-2">
        <h1 className="heading-primary font-bold mb-1">Shipping Information</h1>
        <p className="heading-tertiary text-muted-foreground">
          Enter your shipping details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-black heading-tertiary">
        <div className="flex w-full flex-col mb-6">
          <label
            htmlFor="name"
            className="block font-medium mb-1"
          >
            Full Name
          </label>

          <CustomInput
            id="name"
            placeholder="Enter Your Name"
            className="w-full p-3"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex-col">
          <label
            htmlFor="shippingAddress"
            className="block font-medium mb-1"
          >
            Shipping Address
          </label>
          <CustomInput
            id="shippingAddress"
            placeholder="Enter Shipping Address"
            type="text"
            className="w-full p-3"
            value={formData.shippingAddress}
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex-col">
          <label
            htmlFor="shippingAddress"
            className="block font-medium mb-1"
          >
            Phone Number
          </label>
          <CustomInput
            id="shippingAddress"
            placeholder="eg +92 000000000"
            type="text"
            className="w-full p-3 border border-transparent"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-6 mt-4">
          <Button
            onClick={() => router.back()}
            variant={"ghost"}
            className="max-w-[8rem] w-full rounded-full heading-secondary bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
          >
            Back
          </Button>
          <ButtonGradient type="submit" className="max-w-[8rem] w-full">
            Next
          </ButtonGradient>
        </div>
      </form>
    </div>
  );
};

export default ShippingInfo;
