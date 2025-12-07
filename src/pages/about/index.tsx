import AboutTiles from "@/components/about-tiles/AboutTiles";
import AppLayout from "@/components/Layouts/AppLayout";
import { APP_ROUTES } from "@/configs";
import Link from "next/link";
import React from "react";
import { BsSnow } from "react-icons/bs";
import { LuSchool } from "react-icons/lu";
import { MdStar } from "react-icons/md";

function About() {
  return (
    <div className="bg-secondary ">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6 lg:-mt-20">
        {/* Section 1 */}
        <div className="flex-1 flex flex-col justify-center lg:pl-32 md:pl-20 sm:pl-16 xs:pl-12 pl-6  md:pr-0 sm:pr-16 xs:pr-12 pr-6">
          <h2 className="lg:text-6xl md:text-5xl text-3xl font-bold text-black hero-heading">
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
            <h3>How to apply?</h3>
          </Link>
        </div>
        {/* Section 2 */}
        <div className="grid md:grid-cols-4 grid-cols-1  md:grid-rows-1 grid-rows-3 flex-1 md:min-h-[560px]">
          <AboutTiles
            text="VISION & MISSION"
            link="#about"
            className="bg-[#E1D1BE]"
          />
          <AboutTiles text="WHY US?" link="#why-us" className="bg-[#CB88FF] " />
          <AboutTiles
            text="OUR SERVICES"
            link="#our-services"
            className="bg-[#f2e0bf]"
          />
          <AboutTiles
            text="OUR TEAM"
            link="#our-team"
            className="bg-orange-500"
            reverseArrow
          />
        </div>
      </div>
      {/* About */}
      <div
        className="lg:px-32 md:px-20 sm:px-16 xs:px-12 px-6 mt-24"
        id="about"
      >
        <h2 className="text-7xl font-bold">About</h2>

        <div className="my-6">
          <h3 className="text-3xl font-semibold">Vision & Mission</h3>
          <div className="flex md:flex-row flex-col gap-10 text-justify my-4 text-lg text-black/60">
            <div className="basis-1/2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                autem impedit asperiores eligendi voluptates omnis officiis
                aperiam cum, iure voluptatum atque tempore magni magnam neque
                numquam illo explicabo repudiandae necessitatibus! Lorem ipsum
                dolor sit amet consectetur, adipisicing elit. Accusamus
                distinctio eius totam error! Non minus, quidem beatae sed iure
                pariatur fuga, corrupti dolor ad nobis optio, nostrum eligendi
                qui atque?
              </p>
            </div>
            <div className="basis-1/2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                enim dolorum laboriosam cupiditate. Nostrum, harum! Excepturi,
                atque omnis deserunt reprehenderit distinctio iure officiis
                soluta quibusdam molestias laborum sit! Sint, ea magni atque cum
                in debitis? Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Dolorem, facere?
              </p>
            </div>
          </div>

          <div className="flex gap-10 md:mt-20 xs:mt-10 mt-8 lg:flex-row flex-col ">
            <div className="basis-1/2">
              <h3 className="text-3xl font-semibold">Audience</h3>
              <div className="my-8">
                <h4 className="text-xl font-medium">
                  Age Range :{" "}
                  <span className="font-normal text-lg text-black/70">
                    predominantly 18-34
                  </span>
                </h4>
                <h4 className="text-xl font-medium">
                  Gender :{" "}
                  <span className="font-normal text-lg text-black/70">
                    70% Female 30% Male
                  </span>
                </h4>
                <h4 className="text-xl font-medium">
                  Geographic Location :{" "}
                  <span className="font-normal text-lg text-black/70">
                    North America
                  </span>
                </h4>
                <h4 className="text-xl font-medium">
                  intereset :{" "}
                  <span className="font-normal text-lg text-black/70">
                    Fashion, Beauty, Traveling
                  </span>
                </h4>
              </div>

              <div className="bg-black/20 h-px my-6"></div>

              <h4 className="sm:text-5xl xs:text-4xl text-3xl text-black/50 font-light">
                " My work is driven by a passion for creativity & authenticity.
                I aim to inspire others to live confidently and make mindful
                choices."
              </h4>
              <h5 className="text-3xl text-black/80 my-4">-Olivia Mackenzie</h5>
              <div className="bg-black/20 h-px my-6"></div>
            </div>
            <div className="basis-1/2 flex">
              <div className="relative flex-1">
                <div className="p-2 rounded-full bg-blue-400 absolute md:right-10 right-2 top-0 -translate-y-1/2">
                  <BsSnow className="text-black size-20" />
                </div>
                <div className="bg-[#F1FDD6] rounded-md grid xs:grid-cols-2 grid-cols-1 gap-6 xl:px-12 px-6 py-14 min-h-full">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex flex-col justify-center">
                      <h3 className="xs:text-2xl text-xl font-bold">
                        INSTAGRAM
                      </h3>
                      <h4 className="xs:text-7xl text-6xl font-bold">120K</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Us? */}
      <div
        className="flex gap-6 lg:px-32  md:px-20 sm:px-16 xs:px-12 px-6 mt-24 md:flex-row flex-col-reverse"
        id="why-us"
      >
        <div className="basis-1/2">
          <h3 className="lg:text-5xl md:text-4xl sm:text-5xl  xs:text-3xl text-2xl font-bold">
            Transforming Business With Inovative Digital Solutions.
          </h3>
          <p className="text-sm font-light mt-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et iure
            dolores ipsam, a totam dolorem praesentium aliquid. Cumque iusto
            asperiores veniam animi beatae soluta eos modi tenetur? Neque,
            corrupti officiis.
            <br />
            <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo ex
            deleniti amet quibusdam fuga ipsa dolorum magni impedit sapiente
            voluptates.
          </p>
        </div>
        <div className="basis-1/2">
          <img
            src="/images/p1.jpg"
            alt="paul"
            className="rounded-lg shadow-square shadow-black/20"
          />
        </div>
      </div>

      {/* Our Services */}
      <div
        className="flex gap-6 lg:px-32  md:px-20 sm:px-16 xs:px-12 px-6 md:mt-24 sm:mt-16 xs:mt-10 mt-8 lg:flex-row-reverse flex-col-reverse"
        id="our-services"
      >
        <div className="basis-1/2 flex flex-col justify-center ">
          <h3 className="lg:text-5xl md:text-4xl sm:text-5xl  xs:text-3xl text-2xl font-bold">
            We Can Help You Solve Your Problems Through Our Service.
          </h3>
          <p className="text-sm font-light mt-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et iure
            dolores ipsam, a totam dolorem praesentium aliquid. Cumque iusto
            asperiores veniam animi beatae soluta eos modi tenetur? Neque,
            corrupti officiis.
          </p>
        </div>
        <div className="basis-1/2 ">
          <div className="flex gap-6 sm:flex-row flex-col">
            <div className="grid grid-cols-1 gap-6 sm:mb-10">
              <div
                className={` bg-white shadow-square shadow-black/20 rounded-lg p-6 `}
              >
                <LuSchool className="bg-black text-white rounded-full size-12 p-2" />
                <h4 className="text-lg font-semibold my-4">
                  Best Universities
                </h4>
                <p className="text-xs text-black/60">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  quos, dolorum, dolores, quos, dolorum, dolores,
                </p>
              </div>
              <div
                className={` bg-white shadow-square shadow-black/20 rounded-lg p-6 `}
              >
                <LuSchool className="bg-black text-white rounded-full size-12 p-2" />
                <h4 className="text-lg font-semibold my-4">
                  Best Universities
                </h4>
                <p className="text-xs text-black/60">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  quos, dolorum, dolores, quos, dolorum, dolores,
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6  sm:mt-10">
              <div
                className={` bg-white shadow-square shadow-black/20 rounded-lg p-6 `}
              >
                <LuSchool className="bg-black text-white rounded-full size-12 p-2" />
                <h4 className="text-lg font-semibold my-4">
                  Best Universities
                </h4>
                <p className="text-xs text-black/60">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  quos, dolorum, dolores, quos, dolorum, dolores,
                </p>
              </div>
              <div
                className={` bg-white shadow-square shadow-black/20 rounded-lg p-6 `}
              >
                <LuSchool className="bg-black text-white rounded-full size-12 p-2" />
                <h4 className="text-lg font-semibold my-4">
                  Best Universities
                </h4>
                <p className="text-xs text-black/60">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  quos, dolorum, dolores, quos, dolorum, dolores,
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div
        className="flex xl:flex-row flex-col lg:px-32 md:px-20 sm:px-16 xs:px-12 px-6 my-24"
        id="our-team"
      >
        <div className="basis-1/2">
          <h3 className="lg:text-5xl md:text-4xl sm:text-5xl xs:text-3xl text-2xl font-bold max-w-screen-xs">
            Build Your Dream Team With Us
          </h3>
        </div>
        <div className="basis-1/2">
          <div className="grid sm:grid-cols-[1.15fr,1fr,0.85fr] xs:grid-cols-2 grid-cols-1 lg:mt-0 mt-8  gap-4">
            <div className="flex flex-col gap-4 ">
              <div className="bg-white rounded-xl min-h-64 overflow-hidden shadow-square shadow-black/20 relative">
                <img
                  className="w-full h-full object-cover"
                  src="/images/p1.jpg"
                  alt="Mike"
                />
                <div className="absolute bottom-6  bg-white bg-opacity-80 py-1 px-4 rounded-e-full flex items-center gap-2">
                  <div>
                    <h3 className="text-base font-bold">Huda Fatima</h3>
                    <p className="text-xs text-gray-600">Frontend Dev.</p>
                  </div>
                  <MdStar className="text-black text-sm" />
                </div>
              </div>
              <div className="bg-purple-100 rounded-xl shadow-square shadow-black/20  p-4 flex flex-col justify-center ">
                <h3 className="text-xl font-bold">Remote Talent Pool</h3>
                <p className="text-gray-600 mt-2 text-xs">
                  Pre-vetted remote developers, designers, and product managers
                  with world-className technical and communication skills.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 ">
              <div className="bg-green-100 rounded-xl shadow-square shadow-black/20  p-4 flex flex-col justify-center basis-1/2">
                <h3 className="text-xl font-bold">Quick and adaptable</h3>
                <p className="text-gray-600 mt-2 text-xs">
                  Hire within a mere 72 hours. Easily adjust your team size from
                  month to month as required.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-square shadow-black/20 relative overflow-hidden  xs:basis-1/2 basis-full">
                <img
                  className="size-full object-cover"
                  src="/images/p1.jpg"
                  alt="Latisha"
                />
                <div className="absolute bottom-6  bg-white bg-opacity-80 py-1 px-4 rounded-e-full flex items-center gap-2">
                  <div>
                    <h3 className="text-base font-bold">Gloria Wang</h3>
                    <p className="text-xs text-gray-600">Frontend Dev.</p>
                  </div>
                  <MdStar className="text-black text-sm" />
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col xs:flex-row flex-col gap-4 sm:col-span-1 xs:col-span-2 ">
              <div className="bg-white rounded-xl shadow-square shadow-black/20 relative xs:basis-1/3 basis-full overflow-hidden">
                <img
                  className="size-full object-cover min-h-44"
                  src="/images/p1.jpg"
                  alt="Asger"
                />
                <div className="absolute bottom-6  bg-white bg-opacity-80 py-1 px-4 rounded-e-full flex items-center gap-2">
                  <div>
                    <h3 className="text-base font-bold">Ali Mujtaba</h3>
                    <p className="text-xs text-gray-600">Frontend Dev.</p>
                  </div>
                  <MdStar className="text-black text-sm" />
                </div>
              </div>

              <div className="bg-orange-100 rounded-lg shadow p-4 flex flex-col justify-center basis-2/3">
                <h3 className="text-xl font-bold">Rest assured</h3>
                <p className="text-gray-600 mt-2 text-xs">
                  There are no crazy fees or legal hassle to worry about.
                </p>
              </div>
            </div>
          </div>
          <div className=" mt-4 grid sm:grid-cols-[1.15fr,1fr,0.85fr] xs:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col gap-4 ">
              <div className="bg-white rounded-xl min-h-64 overflow-hidden shadow-square shadow-black/20 relative">
                <img
                  className="w-full h-full object-cover"
                  src="/images/p1.jpg"
                  alt="Muhammad Ahtisham"
                />
                <div className="absolute bottom-6  bg-white bg-opacity-80 py-1 px-4 rounded-e-full flex items-center gap-2">
                  <div>
                    <h3 className="text-base font-bold">Muhammad Ahtisham</h3>
                    <p className="text-xs text-gray-600">Frontend Dev.</p>
                  </div>
                  <MdStar className="text-black text-sm" />
                </div>
              </div>
              <div className="bg-purple-100 rounded-xl shadow-square shadow-black/20  p-4 flex flex-col justify-center ">
                <h3 className="text-xl font-bold">Remote Talent Pool</h3>
                <p className="text-gray-600 mt-2 text-xs">
                  Pre-vetted remote developers, designers, and product managers
                  with world-className technical and communication skills.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 ">
              <div className="bg-green-100 rounded-xl shadow-square shadow-black/20  p-4 flex flex-col justify-center basis-1/2">
                <h3 className="text-xl font-bold">Quick and adaptable</h3>
                <p className="text-gray-600 mt-2 text-xs">
                  Hire within a mere 72 hours. Easily adjust your team size from
                  month to month as required.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-square shadow-black/20 relative overflow-hidden  xs:basis-1/2 basis-full">
                <img
                  className="size-full object-cover"
                  src="/images/p1.jpg"
                  alt="Aneeque Mushtaq"
                />
                <div className="absolute bottom-6  bg-white bg-opacity-80 py-1 px-4 rounded-e-full flex items-center gap-2">
                  <div>
                    <h3 className="text-base font-bold">Aneeque Mushtaq</h3>
                    <p className="text-xs text-gray-600">Frontend Dev.</p>
                  </div>
                  <MdStar className="text-black text-sm" />
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col xs:flex-row flex-col gap-4 sm:col-span-1 xs:col-span-2 ">
              <div className="bg-white rounded-xl shadow-square shadow-black/20 relative xs:basis-1/3 basis-full overflow-hidden">
                <img
                  className="size-full object-cover min-h-44"
                  src="/images/p1.jpg"
                  alt="Asger"
                />
                <div className="absolute bottom-6  bg-white bg-opacity-80 py-1 px-4 rounded-e-full flex items-center gap-2">
                  <div>
                    <h3 className="text-base font-bold">Harry</h3>
                    <p className="text-xs text-gray-600">Frontend Dev.</p>
                  </div>
                  <MdStar className="text-black text-sm" />
                </div>
              </div>

              <div className="bg-orange-100 rounded-lg shadow p-4 flex flex-col justify-center basis-2/3">
                <h3 className="text-xl font-bold">Rest assured</h3>
                <p className="text-gray-600 mt-2 text-xs">
                  There are no crazy fees or legal hassle to worry about.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

About.Layout = AppLayout;
export default About;
