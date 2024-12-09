"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Navigation, Autoplay } from "swiper/modules";

export default () => {
  return (
    <div className="bg-black px-6 py-12 flex items-center relative">
      <FaChevronCircleLeft className="text-3xl object-contain  text-white swiper-button-prev select-none cursor-pointer absolute left-6 top-1/2 -translate-y-1/2" />

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
        {Array.from({
          length: 7,
        }).map((_, index) => (
          <SwiperSlide key={index.toString()}>
            <div className=" flex items-center justify-center flex-col select-none">
              <img
                className="size-48 rounded-full object-contain"
                src="/images/logo.svg"
                alt={`testimonial-${index}`}
              />
              <h3 className="text-center text-3xl text-white mt-4">Hi there</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <FaChevronCircleRight
        size={30}
        className="text-3xl text-white swiper-button-next select-none cursor-pointer absolute right-6 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};
