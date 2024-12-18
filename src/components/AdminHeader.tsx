import Link from "next/link";
import React, { useState } from "react";
import { IoCloseOutline, IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";
import { LuBellDot } from "react-icons/lu";
import { HiMenu } from "react-icons/hi";
import { DASHBOARD_MODULE } from "@/configs";
import { useRouter } from "next/router";

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      <nav className="flex justify-between items-center min-h-16 bg-secondary  px-4 xs:px-6 md:px-12 sticky top-0 left-0 right-0 z-50 border-b-[1px] border-b-primary/20">
        <div className="flex flex-row-reverse items-center gap-2">
          <Link
            className="text-black text-xl font-playfair font-semibold"
            href="/"
          >
            <Image
              src={require("../../public/images/logo.svg")}
              alt="logo"
              className="w-14 md:w-16 object-contain"
              width={64}
            />
          </Link>
          <HiMenu
            className=" text-2xl md:3xl md:hidden block text-primary hover:text-primary/20 "
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className="flex-1 hidden sm:flex justify-center items-center "></div>
        <div className="flex justify-between items-end gap-2">
          <IoPersonCircleOutline className="text-primary text-3xl" />
          <h2 className=" xs:block hidden text-sm font-light">
            Welcom Super Admin
          </h2>
          <LuBellDot className="text-primary xs:text-lg text-2xl" />
        </div>
      </nav>

      {/* Drawer */}

      <div>
        <div
          onClick={() => setIsOpen(false)}
          className={`fixed top-0 right-0 left-0 bottom-0 bg-black  z-[51] md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-35 pointer-events-auto "
              : "opacity-0 pointer-events-none "
          } `}
        ></div>
        <div
          className={`md:hidden fixed z-[52] top-0 left-0 w-3/4 h-screen bg-white overflow-y-scroll transition-all duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-3">
            <div className="mt-2 flex justify-between items-center  bg-primary/20 px-2 xs:px-6 md:px-12 shadow-header rounded-md">
              <Link href="/">
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
              {DASHBOARD_MODULE.map((item) => (
                <div key={item.title}>
                  <h1>{item.title}</h1>
                  <div>
                    {item.subMenu.map((subMenu) => (
                      <Link
                        onClick={() => setIsOpen(false)}
                        key={`side-bar-${subMenu.id}`}
                        className={` text-md border border-primary rounded-md my-2 p-2 flex justify-between items-center ${
                          router.pathname == subMenu.link
                            ? "text-white bg-primary"
                            : "text-primary bg-transparent"
                        }`}
                        href={subMenu.link}
                      >
                        <p>
                          {subMenu.title}{" "}
                          <span
                            className={`${
                              router.pathname == subMenu.link
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            ›
                          </span>
                        </p>
                        <div>
                          {subMenu.Icon({
                            size: 20,
                          })}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
