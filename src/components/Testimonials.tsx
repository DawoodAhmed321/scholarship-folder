"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaStar,
} from "react-icons/fa";
import { Navigation, Autoplay } from "swiper/modules";
import { APP_ROUTES } from "@/configs";
import Link from "next/link";
import { ITestimonial } from "@/configs/interface";
import Image from "next/image";
import { LuBriefcaseBusiness, LuSchool } from "react-icons/lu";
import { LiaSchoolSolid } from "react-icons/lia";
import { IoSchoolOutline } from "react-icons/io5";

interface ITestimonialProps {
  testimonials: ITestimonial[];
}

export const Testimonials = ({ testimonials }: ITestimonialProps) => {
  return (
    <div className="bg-black px-6 py-12 flex items-center relative">
      <FaChevronCircleLeft className="z-20 text-3xl object-contain  text-white swiper-button-prev select-none cursor-pointer absolute xs:left-6 left-1 top-1/2 -translate-y-1/2" />

      <Swiper
        modules={[Navigation, Autoplay]}
        watchSlidesProgress
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
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
        className="w-[920px]"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index.toString()}>
            <Link
              href={APP_ROUTES.TESTIMONIALS(testimonial.id)}
              className={`h-full flex flex-col select-none bg-secondary rounded-xl overflow-hidden ${
                index % 2 == 0 ? "xs:mt-20" : ""
              }`}
            >
              <div className="relative w-full min-h-44">
                <Image
                  fill
                  className="  object-cover "
                  src={testimonial.image.url}
                  alt={`testimonial-${index}`}
                />
              </div>
              <div className="p-4 min-h-44 overflow-hidden">
                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar className="text-yellow-400 text-sm" key={index} />
                  ))}
                </div>
                <p className="text-[10px] font-light mt-1 line-clamp-3">
                  " {testimonial.description} "
                </p>
                <div className="text-xs mt-2 font-bitter font-bold">
                  <div className="flex items-center justify-between py-1.5 border-b border-black/20">
                    <p>{testimonial.university}</p>
                    <LuSchool />
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-black/20">
                    <p>{testimonial.program}</p>
                    <LiaSchoolSolid />
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-black/20">
                    <p>{testimonial.scholarshipProgram}</p>
                    <IoSchoolOutline />
                  </div>
                  <div className=" flex items-center justify-between py-1.5 ">
                    <p>Session {testimonial.session}</p>
                    <LuBriefcaseBusiness />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <FaChevronCircleRight className=" z-20 text-3xl text-white swiper-button-next select-none cursor-pointer absolute xs:right-6 right-1 top-1/2 -translate-y-1/2" />
    </div>
  );
};
