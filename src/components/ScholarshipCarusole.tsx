"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Navigation, Autoplay } from "swiper/modules";

interface IScholarshipCarusole {
  item: {
    id: number | string;
  };
}

export default function ScholarshipCarusole({ item }: IScholarshipCarusole) {
  return (
    <div className="px-6 py-12 flex items-center w-full max-w-[630px] sm:h-[448px] xs:h-96 h-72 relative">
      <FaChevronCircleLeft
        className={`xs:text-3xl text-xl object-contain text-black swiper-button-prev-${item.id} select-none cursor-pointer absolute left-6 top-1/2 z-20 -translate-y-1/2`}
      />
      <Swiper
        modules={[Navigation, Autoplay]}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={{
          nextEl: `.swiper-button-next-${item.id}`,
          prevEl: `.swiper-button-prev-${item.id}`,
        }}
        className=" w-full h-full"
      >
        {Array.from({
          length: 7,
        }).map((_, index) => (
          <SwiperSlide key={index.toString()}>
            <div className="select-none size-full">
              <img
                className="size-full  object-contain"
                src="/images/logo.svg"
                alt={`testimonial-${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <FaChevronCircleRight
        className={`xs:text-3xl text-xl text-black swiper-button-next-${item.id} select-none cursor-pointer absolute right-6 top-1/2 z-20 -translate-y-1/2`}
      />
    </div>
  );
}
