import Link from "next/link";
import Image from "next/image";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput"; // Assuming this accepts value, onChange, disabled
import CustomTextAreaa from "@/components/common/CustomTextAreaa"; // Assuming this accepts value, onChange, disabled

import { useState } from "react"; // Import useState
import { useContactMessage } from "@/hooks/useContactUs"; // Import the hook
import { showToast } from "@/lib/toast";

function ContactForm() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Get the mutate function and loading state from your new hook
  const { mutate, isPending } = useContactMessage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all required fields (Name, Email, Message).", { variant: 'error' });
      return;
    }
    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showToast("Please enter a valid email address.", { variant: 'error' });
      return;
    }

    // Call the mutate function from the hook
    mutate(formData, {
      onSuccess: () => {
        // Clear the form only on successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      },
      // onError is handled by the hook itself
    });
  };

  return (
    <div className="w-full mx-auto px-4 md:px-10 py-8">
      <h1 className="text-[2rem] font-bold mb-5">Contact Us</h1>
      <p className="text-lg font-medium mb-10">Any questions or remarks? Just write us a message.</p>

      <div className="relative bg-white rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.045)] overflow-hidden">
        {/* <div className="absolute inset-0 bg-white opacity-50" /> */}

        <div className="relative flex flex-col md:flex-row w-full p-4 md:p-[0.625rem]">
          {/* Left Column - Contact Information */}
          <div className="flex flex-col md:flex-row w-[95%] lg:w-4/5 z md:contact-container before:left-8 before:top-16  2xl:w-2/3 gap-4 md:gap-8">
            <div className="bg-light-grey min-h-[500px]  md:min-h-[700px] flex flex-col rounded-md justify-between w-full p-3 sm:p-5 md:p-10">
              <div className="flex flex-col px-1 z-20 gap-3">
                <span className="text-xl md:text-[2rem] text-charcol whitespace-wrap md:w-max bg-light-grey z-50 font-bold">Contact Information</span>
                <p className="font-medium text-charcol text-lg">Follow Us & Stay Updated</p>
              </div>
              <div className="space-y-8 lg:space-y-14 px-1">
                {/* <div className="flex items-center gap-2 md:gap-8">
                  <div className="h-6 w-6 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Image alt="Phone Icon" src={"/icons/phone-black-icon.svg"} width={40} height={40} />
                  </div>
                  <span className="text-sm sm:text-md md:text-lg font-medium">+0348 - 848924792</span>
                </div> */}

                <div className="flex items-center gap-2 md:gap-8">
                  <div className="h-6 w-6 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Image alt="Mail Icon" src={"/icons/mail-black-icon.svg"} width={40} height={40} />
                  </div>
                  <span className="text-sm sm:text-md md:text-lg font-medium">accounts@precisiongrading.co.uk</span>
                </div>

                <div className="flex items-center gap-2 md:gap-8">
                  <div className="h-6 w-6  md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Image alt="Map Pin Icon" src={"/icons/map-pin-black-icon.svg"} width={40} height={40} />
                  </div>
                  <span className="text-sm sm:text-md md:text-lg font-medium">Stephen Wood, Precision Grading LTD, PO Box 353, Chester Le Street, DH3 9GN</span>
                </div>
              </div>

              <div className="flex gap-4 lg:gap-9 mt-12">
                <Link href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Image alt="Instagram Icon" src={"/icons/insta-black-icon.svg"} width={40} height={40} />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Image alt="Twitter Icon" src={"/icons/twitter-black-icon.svg"} width={40} height={40} />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Image alt="Facebook Icon" src={"/icons/fb-black-icon.svg"} width={40} height={40} />
                </Link>
              </div>
            </div>

            <div className="bg-white w-full lg:w-4/5 mt-10 md:mt-20 flex flex-col items-start justify-start rounded-2xl p-0 lg:p-6 backdrop-blur-sm">
              <form className="flex w-full flex-col justify-start items-start gap-5" onSubmit={handleSubmit}>
                <div className="flex w-full flex-col">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <CustomInput
                    id="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                  />
                </div>

                <div className="flex w-full flex-col">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <CustomInput
                    id="email"
                    placeholder="Enter Email"
                    type="email" // Added type email for better browser validation
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                  />
                </div>

                <div className="flex w-full flex-col">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <CustomInput
                    id="subject"
                    placeholder="Enter Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isPending}
                  />
                </div>

                <div className="flex w-full flex-col">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <CustomTextAreaa
                    id="message"
                    placeholder="Enter message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                  />
                </div>

                <div className="flex justify-end w-full">
                  <ButtonGradient
                    type="submit"
                    className="px-4 py-3 rounded-full font-medium text-base text-white"
                    disabled={isPending} // Disable button while sending
                  >
                    {isPending ? "Sending Message..." : "Send Message"}
                  </ButtonGradient>
                </div>
              </form>
            </div>
            <Image
              alt="Message Path Icon"
              src={"/icons/message-send-path-icon.svg"}
              className="absolute -bottom-12 hidden xl:block  -right-[5%] lg:-right-[25%]"
              width={240}
              height={113}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;