import { NAVBAR_MENU } from "@/configs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";

export default function AppHeader() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <nav className="flex justify-between md:items-start items-center lg:px-32 md:px-20 sm:px-16 xs:px-12 px-6 py-4 bg-secondary ">
        <Link
          href="/"
          className="lg:size-28 md:size-16 xs:size-12 size-10 lg:mt-3 overflow-hidden rounded-full border border-black/20"
        >
          <img
            src="/images/logo.svg"
            alt="logo"
            className=" size-full object-cover scale-125"
          />
        </Link>

        <div>
          <div className="lg:flex hidden items-center gap-8">
            {NAVBAR_MENU.map((menu) => (
              <Link key={menu.id.toString()} href={menu.link}>
                <h1
                  className={`text-xl hover:text-blue-800 font-bitter ${
                    router.pathname == menu.link
                      ? "text-blue-800"
                      : "text-black"
                  } `}
                >
                  {menu.name}
                </h1>
              </Link>
            ))}
          </div>

          {/* nav btn */}
          <HiBars3BottomRight
            className="text-3xl object-contain cursor-pointer block lg:hidden "
            onClick={() => setIsOpen(true)}
          />
        </div>
        <div className="xl:block hidden lg:size-28 md:size-16"></div>
      </nav>

      {/* Drawer */}

      <div>
        <div
          onClick={() => setIsOpen(false)}
          className={`fixed top-0 right-0 left-0 bottom-0 bg-black  z-[51] lg:hidden transition-all duration-500 ease-in-out ${
            isOpen
              ? "opacity-35 pointer-events-auto "
              : "opacity-0 pointer-events-none "
          } `}
        ></div>
        <div
          className={`lg:hidden fixed z-[52] top-0 left-0 w-3/4 h-screen bg-secondary overflow-y-scroll transition-all duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-3">
            <div className="mt-2 flex justify-between items-center  bg-primary/20 px-2 xs:px-6 md:px-12 shadow-header rounded-md">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  className="w-16 h-14  object-contain "
                  src={require("../../public/images/logo.svg")}
                  alt="logo"
                />
              </Link>

              <IoCloseOutline
                className="cursor-pointer text-blue-800 text-2xl"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <hr className="w-full h-px bg-black opacity-100 my-6 " />

            <div className="flex flex-col justify-center gap-3">
              {NAVBAR_MENU.map((menu) => (
                <Link
                  onClick={() => setIsOpen(false)}
                  className={`text-md border border-blue-400 rounded-md my-0.5 p-2 ${
                    menu.link == router.pathname
                      ? "text-white bg-primary"
                      : "text-primary bg-transparent"
                  }`}
                  href={menu.link}
                  key={menu.id}
                >
                  <p>
                    {menu.name}{" "}
                    <span
                      className={`${
                        menu.link == router.pathname
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      ›
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
