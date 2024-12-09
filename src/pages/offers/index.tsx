import AppLayout from "@/components/Layouts/AppLayout";
import React from "react";

function Offers() {
  return (
    <div className="md:px-32 sm:px-16 xs:px-12 px-6">
      {/* Heding */}
      <div className="my-12 hero-heading">
        <h1 className="md:text-7xl xs:text-5xl text-4xl font-medium">
          <span className="underline decoration-blue-400">Offers</span> For You
        </h1>
      </div>
      {/* Main Banner */}
      <div className="">
        <img src="/images/mac.png" alt="mac" className="w-full" />
      </div>

      <h3 className="text-3xl font-medium my-12">
        Why hello there. Want to see more of our work? Check out just some of
        what we've been up to below.
      </h3>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="relative size-60 rounded-full overflow-hidden cursor-pointer border border-black/20 mx-auto"
          >
            <div className="fade-in px-2 absolute top-0 left-0 right-0 bottom-0 bg-black/40 opacity-0  hover:opacity-100 transition-all duration-300 ease-in-out flex justify-center items-center ">
              <p className="text-white text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Deserunt, sequi.
              </p>
            </div>
            <img
              src="/images/p1.jpg"
              alt="mac"
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Offers.Layout = AppLayout;
export default Offers;
