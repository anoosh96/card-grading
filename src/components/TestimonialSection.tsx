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
    image: "/assets/images/testimonial-section-person-image-2.svg",
    date: "May 8, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet,",
  },
  {
    id: 2,
    image: "/assets/images/testimonial-section-person-image-2.svg",
    date: "June 15, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet,",
  },
  {
    id: 3,
    image: "/assets/images/testimonial-section-person-image-2.svg",
    date: "July 22, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet,",
  },
  {
    id: 4,
    image: "/assets/images/testimonial-section-person-image-2.svg",
    date: "June 15, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet,",
  },
  {
    id: 5,
    image: "/assets/images/testimonial-section-person-image-2.svg",
    date: "July 22, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet,",
  },
  {
    id: 6,
    image: "/assets/images/testimonial-section-person-image-2.svg",
    date: "June 15, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet,",
  },
  {
    id: 7,
    image: "/assets/images/testimonial-section-person-image-2.svg",
    date: "July 22, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet, Consequat duis diam lacus arcu.Lorem ipsum dolor sit amet,",
  },
];

const TestimonialSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className=" py-16">
      <h2 className="text-3xl font-bold text-start mb-36 md:mb-10">What Our Clients Say About Us</h2>

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
                  <div className="flex w-full gap-10">
                    <div className="relative max-w-full min-w-[245px]">
                      <Image src={image} alt="User Preview Image" fill className="rounded-tl-lg rounded-bl-lg object-cover w-full h-full" />
                    </div>
                    <CardContent className="p-7 flex w-auto flex-col">
                      <div className="space-y-3">
                        <time className="text-sm font-medium">{date}</time>
                        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
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
