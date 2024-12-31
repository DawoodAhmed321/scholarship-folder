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
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ITestimonialProps {
  testimonials: ITestimonial[];
}

export const OfferTestimonials = ({ testimonials }: ITestimonialProps) => {
  return (
    <div className="relative">
      <div className=" flex items-center relative py-8">
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
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="w-screen py-8"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index.toString()}>
              <Link
                href={APP_ROUTES.TESTIMONIALS(testimonial.id)}
                className={`h-full flex flex-col select-none bg-white rounded-xl overflow-hidden`}
              >
                <div className="relative w-full min-h-44">
                  <Image
                    fill
                    className="  object-cover "
                    src={testimonial.image.url}
                    alt={`testimonial-${index}`}
                  />
                </div>
                <div className="p-4  overflow-hidden">
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar className="text-yellow-400 text-sm" key={index} />
                    ))}
                  </div>
                  <p className="text-[10px] min-h-16 font-light mt-1 line-clamp-3">
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
      </div>
      <MdKeyboardArrowRight className=" z-20 text-3xl text-black rounded-full border border-transparent hover:border-black/20 transition-all duration-300 ease-in-out swiper-button-next select-none cursor-pointer absolute left-16 right-0 mx-auto -bottom-8 -translate-y-1/2" />
      <MdKeyboardArrowLeft className="z-20 text-3xl object-contain rounded-full border border-transparent hover:border-black/20 transition-all duration-300 ease-in-out text-black swiper-button-prev select-none cursor-pointer absolute left-0 right-16 mx-auto  -bottom-8 -translate-y-1/2" />
    </div>
  );
};
