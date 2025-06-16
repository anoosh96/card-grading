'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useFormState } from "@/hooks/useFormState";
import { useUpdateProfile } from "@/hooks/useUpdateProfile"; // you'll need to implement this like useResetPassword
import { User, UserProfile } from "@/types";
import { removeEmpty } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { handleRequestError } from "@/lib/toast";
import { paymentMethodMap } from "../../lib/utils/constants";
import { SkeletonProfilePage } from "@/components/skeletons/DashboardSkeleton";

export default function ProfilePage() {
  const { user, setUser } = useUserStore(state => state);
  const router = useRouter()

  console.log(user)

  const initialData = (): UserProfile => {
    const initialValues: UserProfile = {
      name: user?.fullName || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
      paymentMethod: user?.paymentMethod || "Card",
      shippingAddress: user?.shippingAddress || "",
      phoneNumber: user?.phoneNumber || ""
    };

    return initialValues
  }

  const form = useFormState<UserProfile>(initialData());
  const [image, setImage] = useState<string | undefined>(user?.profileImageUrl);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const { mutate: updateProfile, isPending: isLoading } = useUpdateProfile();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Password match validation
    if (form.values.password && form.values.password !== form.values.confirmPassword) {
      form.setError("confirmPassword", "Passwords do not match");
      return;
    }

    // Name validation
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(form.values.name)) {
      form.setError("name", "Name should only contain letters and spaces");
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.values.email)) {
      form.setError("email", "Please enter a valid email address");
      return;
    }

    const cleanData = removeEmpty({ ...form.values, profileImage: imageFile })
    updateProfile(cleanData, {
      onError: (error: unknown) => {
        if (error instanceof AxiosError && error.response) {
          form.handleApiValidationError(error.response.data);
        }
        else {
          handleRequestError(error)
        }
      },
      onSuccess: async (data) => {
        form.resetForm();
        setUser(data.data as User)
      }
    });
  };

  useEffect(() => {
    if (user) {
      const updatedData: UserProfile = initialData()
      Object.keys(updatedData).forEach(key => {
        form.setValue(key as keyof UserProfile, updatedData[key as keyof UserProfile])
      })
      setImage(user.profileImageUrl)

      if (!user.emailVerified) {
        router.push('/verfication-code')
      }
    }
  }, [user])

  if (!user?.id) { return <SkeletonProfilePage /> }

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col items-start justify-center w-full sm:w-44 gap-2">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <div
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-300"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <img
              src={image || "/assets/images/profile-avatar.svg"}
              alt="Profile"
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
          <div {...getRootProps()} className="absolute bottom-1 right-0 sm:bottom-2 sm:right-1 cursor-pointer">
            <Image src={"/icons/camera.svg"} alt="camera icon" width={25} height={25} className="w-6 h-6 sm:w-9 sm:h-9" />
          </div>
        </div>

        <div className="text-lg sm:text-xl">{user?.fullName}</div>
        <div className="flex gap-1 sm:gap-2 text-sm">
          <Image src={"/icons/email-grey.svg"} alt="email icon" width={14} height={14} className="w-4 h-4 sm:w-5 sm:h-5" />
          <div>{user?.email}</div>
        </div>
      </div>

      <div className="mt-6 sm:mt-10">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mt-4 sm:mt-8 p-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <label className="block font-semibold mb-1 sm:mb-2">Full Name</label>
              <CustomInput id="name" name="name" placeholder="Enter Full Name" className="w-full p-3 sm:p-6 bg-white"
                value={form.values.name}
                onChange={(e) => {
                  form.handleChange(e);
                  form.clearError("name"); // Clear error on input
                }}
              />
              {form.errors.name && <p className="text-red-500 mt-1 text-sm">{form.errors.name}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1 sm:mb-2">Email</label>
              <CustomInput id="email" name="email" placeholder="Enter Email" className="w-full p-3 sm:p-6 bg-white"
                value={form.values.email}
                onChange={(e) => {
                  form.handleChange(e);
                  form.clearError("email"); // Clear error on input
                }}
              />
              {form.errors.email && <p className="text-red-500 mt-1 text-sm">{form.errors.email}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1 sm:mb-2">Shipping Address</label>
              <CustomInput id="shippingAddress" name="shippingAddress" placeholder="Enter Shipping Address" className="w-full p-3 sm:p-6 bg-white"
                value={form.values.shippingAddress}
                onChange={form.handleChange}
              />
              {form.errors.shippingAddress && <p className="text-red-500 mt-1 text-sm">{form.errors.shippingAddress}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1 sm:mb-2">Phone Number</label>
              <CustomInput id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" className="w-full p-3 sm:p-6 bg-white"
                value={form.values.phoneNumber}
                onChange={form.handleChange}
              />
              {form.errors.phoneNumber && <p className="text-red-500 mt-1 text-sm">{form.errors.phoneNumber}</p>}
            </div>

            <div className="flex flex-col">
              <label className="block font-semibold text-gray-700 mb-1 sm:mb-2">Password</label>
              <CustomInput id="password" name="password" type="password" placeholder="Enter Password"
                className="w-full p-3 sm:p-6 bg-white"
                value={form.values.password}
                onChange={form.handleChange}
              />
              {form.errors.password && <p className="text-red-500 mt-1 text-sm">{form.errors.password}</p>}
            </div>

            <div className="flex flex-col">
              <label className="block font-semibold text-gray-700 mb-1 sm:mb-2">Confirm Password</label>
              <CustomInput id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password"
                className="w-full p-3 sm:p-6 bg-white"
                value={form.values.confirmPassword}
                onChange={form.handleChange}
              />
              {form.errors.confirmPassword && <p className="text-red-500 mt-1 text-sm">{form.errors.confirmPassword}</p>}
            </div>

            {/* <div className="col-span-1 sm:col-span-2">
              <label className="block font-semibold mb-1 sm:mb-2">Payment Method</label>
              <CustomSelect
                options={['Card', 'Paypal']}
                optionIcons={['/icons/credit-card.svg', '/icons/logos_paypal.svg']}
                selectedOption={paymentMethodMap[form.values.paymentMethod as string] as string}
                borderColor="border-transparent"
                bg="bg-white"
                setSelectedOption={(value) => form.setValue("paymentMethod", value as string)}
                className="relative"
              />
              {form.errors.paymentMethod && <p className="text-red-500 mt-1 text-sm">{form.errors.paymentMethod}</p>}
            </div> */}

            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6 col-span-1 sm:col-span-2">
              <Button
                size={"lg"}
                type="button"
                onClick={form.resetForm}
                className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-2 sm:py-3 px-8 sm:px-14 text-base hover:bg-soft-grey"
              >
                Cancel
              </Button>
              <ButtonGradient
                size={"lg"}
                type="submit"
                className="py-2 sm:py-3 px-8 sm:px-14 h-auto"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </ButtonGradient>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
