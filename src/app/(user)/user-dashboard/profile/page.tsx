'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useFormState } from "@/hooks/useFormState";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { User, UserProfile } from "@/types"; // Import FlexibleRecord if needed for form.handleApiValidationError
import { removeEmpty } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { handleRequestError } from "@/lib/toast";
import { SkeletonProfilePage } from "@/components/skeletons/DashboardSkeleton";
import { ImageCropper } from "@/components/common/ImageCropper"; // Import the new component


export default function ProfilePage() {
  const { user, setUser } = useUserStore(state => state);
  const router = useRouter()

  const initialData = (): UserProfile => {
    const initialValues: UserProfile = {
      name: user?.fullName || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
      paymentMethod: user?.paymentMethod || "",
      shippingAddress: user?.shippingAddress || "",
      phoneNumber: user?.phoneNumber || "",
      profileImage: user?.profileImageUrl || ""
    };
    return initialValues
  }

  const form = useFormState<UserProfile>(initialData());
  const [image, setImage] = useState<string | undefined>(user?.profileImageUrl);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null); // State to hold image URL for cropping



  const { mutate: updateProfile, isPending: isLoading } = useUpdateProfile();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImageToCrop(imageUrl); // Set image for cropping
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] }
  });

  // Callback after image is cropped
  const handleCropComplete = useCallback((croppedFile: File) => {
    const croppedImageUrl = URL.createObjectURL(croppedFile);
    setImage(croppedImageUrl);
    setImageFile(croppedFile);
    form.handleChange({ target: { name: 'profileImage', value: croppedImageUrl } } as React.ChangeEvent<HTMLInputElement>);
    setImageToCrop(null); // Close the cropper
  }, [form]);

  // Callback to close the cropper without applying changes
  const handleCloseCropper = useCallback(() => {
    setImageToCrop(null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.resetFormErrors(); // Clear all errors before validation

    let isValid = true;

    // Password match validation
    if (form.values.password && form.values.password !== form.values.confirmPassword) {
      form.setError("confirmPassword", form.values.confirmPassword !== '' ? "Passwords do not match" : "Please Confirm Your Password");
      isValid = false;
    }

    // Name validation
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!form.values.name) {
      form.setError("name", "Full name is required");
      isValid = false;
    } else if (!nameRegex.test(form.values.name)) {
      form.setError("name", "Name should only contain letters and spaces");
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (user?.email && !form.values.email) {
      form.setError("email", "Email is required");
      isValid = false;
    } else if (!emailRegex.test(form.values.email)) {
      form.setError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Basic validation for shipping address and phone number (add more complex validation if needed)
    if (user?.shippingAddress && !form.values.shippingAddress) {
      form.setError("shippingAddress", "Shipping address is required");
      isValid = false;
    }

    if (user?.phoneNumber && !form.values.phoneNumber) {
      form.setError("phoneNumber", "Phone number is required");
      isValid = false;
    }


    if (!isValid) {
      // Optional: Scroll to the first error
      const firstErrorField = Object.keys(form.errors).find(key => form.errors[key as keyof UserProfile]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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
        // Reset only the password and confirm password fields, not the whole form
        // as other fields might have been updated by the server
        form.setValue("password", "");
        form.setValue("confirmPassword", "");
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
        router.push('/verification-code')
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
              src={image || "/assets/images/placeholder.png"}
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
            {/* Full Name */}
            <div className="relative">
              <label htmlFor="name" className="block font-semibold mb-1 sm:mb-2">Full Name</label>
              <CustomInput
                id="name"
                name="name"
                placeholder="Enter Full Name"
                className={`w-full p-3 sm:p-6 bg-white ${form.errors.name ? 'error-class' : ''}`}
                value={form.values.name}
                onChange={(e) => {
                  form.handleChange(e);
                  form.clearError("name");
                }}
              />
              {form.errors.name && (
                <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
                  <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                    {form.errors.name}
                  </p>
                  <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block font-semibold mb-1 sm:mb-2">Email</label>
              <CustomInput
                id="email"
                name="email"
                placeholder="Enter Email"
                className={`w-full p-3 sm:p-6 bg-white ${form.errors.email ? 'error-class' : ''}`}
                value={form.values.email}
                onChange={(e) => {
                  form.handleChange(e);
                  form.clearError("email");
                }}
              />
              {form.errors.email && (
                <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
                  <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                    {form.errors.email}
                  </p>
                  <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <div className="relative">
              <label htmlFor="shippingAddress" className="block font-semibold mb-1 sm:mb-2">Shipping Address</label>
              <CustomInput
                id="shippingAddress"
                name="shippingAddress"
                placeholder="Enter Shipping Address"
                className={`w-full p-3 sm:p-6 bg-white ${form.errors.shippingAddress ? 'error-class' : ''}`}
                value={form.values.shippingAddress}
                onChange={(e) => {
                  form.handleChange(e);
                  form.clearError("shippingAddress");
                }}
              />
              {form.errors.shippingAddress && (
                <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
                  <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                    {form.errors.shippingAddress}
                  </p>
                  <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="relative">
              <label htmlFor="phoneNumber" className="block font-semibold mb-1 sm:mb-2">Phone Number</label>
              <CustomInput
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                className={`w-full p-3 sm:p-6 bg-white ${form.errors.phoneNumber ? 'error-class' : ''}`}
                value={form.values.phoneNumber}
                onChange={(e) => {
                  form.handleChange(e);
                  form.clearError("phoneNumber");
                }}
              />
              {form.errors.phoneNumber && (
                <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
                  <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                    {form.errors.phoneNumber}
                  </p>
                  <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block font-semibold text-gray-700 mb-1 sm:mb-2">Password</label>
              <CustomInput
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                className={`w-full p-3 sm:p-6 bg-white ${form.errors.password ? 'error-class' : ''}`}
                value={form.values.password}
                onChange={(e) => {
                  form.handleChange(e);
                  form.clearError("password");
                }}
              />
              {form.errors.password && (
                <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
                  <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                    {form.errors.password}
                  </p>
                  <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block font-semibold text-gray-700 mb-1 sm:mb-2">Confirm Password</label>
              <CustomInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={`w-full p-3 sm:p-6 bg-white ${form.errors.confirmPassword ? 'error-class' : ''}`}
                value={form.values.confirmPassword}
                onChange={(e) => {
                  form.handleChange(e);
                  form.clearError("confirmPassword");
                }}
              />
              {form.errors.confirmPassword && (
                <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
                  <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                    {form.errors.confirmPassword}
                  </p>
                  <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                </div>
              )}
            </div>

            {/* Payment Method (if needed, remember to add similar error styling) */}
            {/* <div className="col-span-1 sm:col-span-2 relative">
              <label htmlFor="paymentMethod" className="block font-semibold mb-1 sm:mb-2">Payment Method</label>
              <CustomSelect
                options={['Card', 'Paypal']}
                optionIcons={['/icons/credit-card.svg', '/icons/logos_paypal.svg']}
                selectedOption={paymentMethodMap[form.values.paymentMethod as string] as string}
                borderColor={`border-transparent ${form.errors.paymentMethod ? 'error-class-border' : ''}`}
                bg="bg-white"
                setSelectedOption={(value) => {
                  form.setValue("paymentMethod", value as string);
                  form.clearError("paymentMethod");
                }}
                className="relative"
              />
              {form.errors.paymentMethod && (
                <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
                  <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                    {form.errors.paymentMethod}
                  </p>
                  <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                </div>
              )}
            </div> */}

            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6 col-span-1 sm:col-span-2">
              <Button
                size={"lg"}
                type="button"
                onClick={() => {
                  form.resetForm(); // Reset form values
                  form.resetFormErrors(); // Clear all errors
                  setImage(user?.profileImageUrl); // Reset image to original user image
                  setImageFile(undefined); // Clear selected image file
                }}
                className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-2 sm:py-3 px-8 sm:px-14 text-base hover:bg-soft-grey"
              >
                Cancel
              </Button>
              <ButtonGradient
                size={"lg"}
                type="submit"
                className="py-2 sm:py-3 px-8 sm:px-14 h-auto"
                disabled={isLoading || !form.isFormChanged}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </ButtonGradient>
            </div>
          </div>
        </form>
      </div>

      {imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          onCropComplete={handleCropComplete}
          onClose={handleCloseCropper}
        />
      )}
    </section>
  )
}