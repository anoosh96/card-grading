"use client";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardContent } from "./ui/card";

// Import background images

const testimonials = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "May 8, 2024",
    title: "Smooth process from submission to delivery",
    content:
      "First time grading! I submitted three Pokémon cards (including a 1999 Base Set Pikachu). The form was straightforward, shipping label printed in minutes, and the status updates were super clear. Got my slabs back in under two weeks—packaging was rock solid and the grades felt fair. Will definitely submit again.",
    name: "John Smith"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "June 15, 2024",
    title: "Accurate grading and excellent communication",
    content:
      "I sent in a Topps baseball rookie and two basketball inserts. Support answered a couple of newbie questions about surface scratches before I shipped. Turnaround matched the estimate, and the subgrades commentary in the report helped me understand the final grade. Super happy with the transparency.",
    name: "Sarah Lee"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "July 22, 2024",
    title: "Well-packaged return and great slabs",
    content:
      "Cards came back in clean, sturdy slabs—no rattling or scuffs. I really appreciated the tamper-evident seals and QR code link to the grading report. My Yu-Gi-Oh! Dark Magician graded higher than I expected after a careful clean. Shipping both ways felt safe and insured.",
    name: "Michael Jordan"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "June 15, 2024",
    title: "Helped me prep my cards the right way",
    content:
      "The pre-submission checklist was a lifesaver. I used card savers and sleeves as recommended and avoided a couple of mistakes I usually make. Sent five soccer rookies—three came back strong grades. Customer service even flagged a print line I missed in the photos. Honest and helpful.",
    name: "Anna Martinez"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "July 22, 2024",
    title: "Quick turnaround on my express order",
    content:
      "I paid for the express tier to get a vintage Jordan back before a show. They hit the timeline perfectly (7 business days door to door). The scan images in the portal were crisp and the final slab looks premium on my display. Worth the extra fee for time-sensitive cards.",
    name: "David Wong"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "June 15, 2024",
    title: "Fair grades and clear defect notes",
    content:
      "Not every card gemmed, and that’s a good thing. The grader notes called out corner softening on a chrome refractor and a tiny print dot on another—exactly what I saw under magnification. Feels consistent and fair, which builds trust. Packed returns with bubble wrap + boxed—no corner dings.",
    name: "Jessica Brown"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "July 22, 2024",
    title: "Easy for bulk subs, tracking was spot on",
    content:
      "Did a bulk submission with 20 modern Pokémon and F1. The online spreadsheet import saved a ton of time. Every milestone email landed (received, grading, quality check, shipped) and the tracking updated instantly. All slabs arrived together with a summary sheet—super organized.",
    name: "Omar Khan"
  }
];



const TestimonialSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className=" py-16">
      <h2 className="heading-primary font-bold text-start mb-36 md:mb-10">What Our Clients Say About Us</h2>

      <div className="relative w-full">
        <Image
          src={"/assets/images/bg-testimonial-section-top-ornament.svg"}
          alt="Background decoration"
          className="absolute -top-32 right-0 opacity-75"
          width={198}
          height={161}
        />
        <Image
          src={"/assets/images/bg-testimonial-section-bottom-ornament.svg"}
          alt="Background decoration"
          className="absolute -translate-y-16 -bottom-6 md:-bottom-14 left-0 opacity-75"
          width={198}
          height={161}
        />

        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              renderBullet: function (index, className) {
                return `<span class="${className}"></span>`;
              },
            }}
            navigation={{
              prevEl: ".custom-prev-button",
              nextEl: ".custom-next-button",
            }}
            breakpoints={{
              425: { slidesPerView: 1 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.4 },
            }}
            className="w-full h-[400px]"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {testimonials.map(({ id, image, date, title, content }) => (
              <SwiperSlide key={id} className="flex justify-center !w-[745px] !min-h-[300px]">
                <Card className="overflow-hidden p-0 shadow-md border-none rounded-xl">
                  <div className="flex w-full gap-10 h-72">
                    <div className="relative max-w-full min-w-[245px]">
                      <Image src={image} alt="User Preview Image" fill className="rounded-tl-lg rounded-bl-lg object-cover w-full h-full" />
                    </div>
                    <CardContent className="p-7 flex w-auto flex-col">
                      <div className="space-y-3">
                        <time className="text-sm font-medium">{date}</time>
                        <h2 className="text-xl md:text-2xl font-semibold tracking-tight h-18">{title}</h2>
                        <p className="text-sm">{content}</p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation and pagination container */}
          <div className="flex w-auto h-auto items-center justify-center mt-20 md:mt-14 gap-4">
            <button className="custom-prev-button text-primary focus:outline-none" aria-label="Previous slide">
              <Image src={"/icons/left-slide-icon.svg"} alt="Left Slide Icon" className="w-10 h-10" width={40} height={40} />
            </button>
            <div className="custom-pagination flex gap-0 md:gap-2 px-0 md:px-20"></div>
            <button className="custom-next-button text-primary focus:outline-none" aria-label="Next slide">
              <Image src={"/icons/right-slide-icon.svg"} alt="Right Slide Icon" className="w-10 h-10" width={40} height={40} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
