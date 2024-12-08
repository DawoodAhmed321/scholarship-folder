import AppLayout from "@/components/Layouts/AppLayout";
import Link from "next/link";
import React from "react";
import { FaCompass } from "react-icons/fa";

function About() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <div className="grid xl:grid-cols-[1.3fr,1fr,1fr] lg:grid-cols-3  md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6 ">
        {/* Section 1 */}
        <div className="flex-1 flex flex-col justify-end pl-20">
          <h2 className="md:text-6xl xs:text-4xl text-3xl font-bold text-black hero-heading">
            Welcome to <br /> Scholarship Folder
          </h2>
          <p className="text-sm text-black/50 my-8 hero-heading">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            voluptatum magni accusantium facere hic quae. Aperiam inventore
            vitae officia debitis?
          </p>
          <Link
            href={"/"}
            className="text-lg text-white font-semibold bg-black px-6 py-3 w-fit hover:bg-black/80"
          >
            <h3>How it works?</h3>
          </Link>
        </div>
        {/* Section 2 */}
        <div className="flex md:pl-20 md:pr-12 justify-center ">
          {/* Column 1 */}
          <div className="flex flex-col">
            <div>
              <img
                src="/images/p1.jpg"
                alt=""
                className="size-32 rounded-full border border-black/20 object-cover p-4"
              />
            </div>
            <div className="border border-black/20 rounded-full flex-1 flex flex-col justify-start">
              <div>
                <img
                  src="/images/btc.webp"
                  alt=""
                  className="size-32 rounded-full border border-black/20 object-cover p-4"
                />
              </div>
              <div>
                <img
                  src="/images/long-arrow-down.png"
                  alt=""
                  className="w-24 px-4 pt-4 pb-8 mx-auto"
                />
              </div>
            </div>
            <div>
              <img
                src="/images/p1.jpg"
                alt=""
                className="size-32 rounded-full border border-black/20 object-cover p-4"
              />
            </div>
          </div>
          {/* Column 2 */}
          <div className="flex flex-col">
            <div>
              <img
                src="/images/p1.jpg"
                alt=""
                className="size-32 rounded-full border border-black/20 object-cover p-4"
              />
            </div>
            <div className="border border-black/20 rounded-full flex-1 flex flex-col justify-end ">
              <div>
                <img
                  src="/images/long-arrow-up.png"
                  alt=""
                  className="w-24 p-4 mx-auto"
                />
              </div>
              <div>
                <img
                  src="/images/btc.webp"
                  alt=""
                  className="size-32 rounded-full border border-black/20 object-cover p-4"
                />
              </div>
            </div>
            <div>
              <img
                src="/images/p1.jpg"
                alt=""
                className="size-32 object-cover rounded-full border border-black/20 p-4"
              />
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="grid lg:col-span-1 md:col-span-2  lg:grid-cols-3 lg:grid-rows-1 grid-rows-3 flex-1 min-h-[560px]">
          <div className="bg-[#E1D1BE] lg:px-2 md:px-20 xs:px-12 px-6 py-6 border border-black/20 flex lg:flex-col items-center justify-between ">
            <div>
              <FaCompass className="text-4xl " />
            </div>
            <div className="relative flex items-center gap-6">
              <h3 className="lg:rotate-90 lg:absolute -top-28 text-center left-2 right-0 mx-auto lg:-translate-y-full text-5xl font-semibold">
                Loans
              </h3>
              <Link href={"/loans"}>
                <img
                  src="/images/long-arrow-right.png"
                  alt=""
                  className="size-12 rounded-full border border-black/50  hover:bg-black/10"
                />
              </Link>
            </div>
          </div>
          <div className="bg-[#CB88FF] lg:px-2 md:px-20 xs:px-12 px-6 py-6 border border-black/20 flex lg:flex-col items-center justify-between ">
            <div>
              <FaCompass className="text-4xl " />
            </div>
            <div className="relative flex items-center gap-6">
              <h3 className="lg:rotate-90 lg:absolute -top-[70] text-center left-2 right-0 mx-auto lg:-translate-y-full text-5xl font-semibold">
                NTF
              </h3>
              <Link href={"/nft"}>
                <img
                  src="/images/long-arrow-right.png"
                  alt=""
                  className="size-12 rounded-full border border-black/50  hover:bg-black/10"
                />
              </Link>
            </div>
          </div>
          <div className="bg-[#0B3E26] lg:px-2 md:px-20 xs:px-12 px-6 py-6 border border-black/20 flex lg:flex-col items-center justify-between ">
            <div>
              <FaCompass className="text-4xl text-white" />
            </div>
            <div className="relative flex items-center gap-6">
              <h3 className="lg:rotate-90 lg:absolute -top-32 text-white  left-2 right-0 mx-auto lg:-translate-y-full text-5xl font-semibold">
                Builder
              </h3>
              <Link href={"/loans"}>
                <img
                  src="/images/long-arrow-right.svg"
                  alt=""
                  className="size-12 rounded-full border border-white  hover:bg-black"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

About.Layout = AppLayout;
export default About;
