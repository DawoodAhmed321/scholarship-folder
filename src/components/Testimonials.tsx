"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaStar,
} from "react-icons/fa";
import { Navigation, Autoplay } from "swiper/modules";
import { APP_ROUTES, TESTIMONIALS } from "@/configs";
import Link from "next/link";
import { ITestimonial } from "@/configs/interface";
import Image from "next/image";

interface ITestimonialProps {
  testimonials: ITestimonial[];
}

export const Testimonials = ({ testimonials }: ITestimonialProps) => {
  return (
    <div className="bg-black px-6 py-12 flex items-center relative">
      <FaChevronCircleLeft className="z-20 text-3xl object-contain  text-white swiper-button-prev select-none cursor-pointer absolute xs:left-6 left-1 top-1/2 -translate-y-1/2" />

      <Swiper
        modules={[Navigation, Autoplay]}
        // centeredSlides
        watchSlidesProgress
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="w-[720px]"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index.toString()}>
            <Link
              href={APP_ROUTES.TESTIMONIALS(testimonial.id)}
              className="h-full flex flex-col select-none bg-secondary rounded-xl overflow-hidden"
            >
              <div className="relative w-full min-h-44">
                <Image
                  layout="fill"
                  className="  object-cover "
                  src={testimonial.image.url}
                  alt={`testimonial-${index}`}
                />
              </div>
              <div className="p-4 h-44 overflow-hidden">
                <h3 className="text-2xl font-bold">{testimonial.name}</h3>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar className="text-yellow-400" key={index} />
                  ))}
                </div>
                <p className="text-sm mt-1 line-clamp-5">
                  " {testimonial.description} "
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <FaChevronCircleRight className=" z-20 text-3xl text-white swiper-button-next select-none cursor-pointer absolute xs:right-6 right-1 top-1/2 -translate-y-1/2" />
    </div>
  );
};
