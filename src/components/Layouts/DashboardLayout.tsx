import React, { useState } from "react";
import AdminHeader from "../AdminHeader";
import { DASHBOARD_MODULE } from "@/configs";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/router";
import { CollapsibleMenu } from "../collapsible-menu/CollapsibleMenu";
import { useSelector } from "react-redux";
import { TState } from "@/redux";
import Loader from "../loader/Loader";

export default function DashboardLayout({ children }: ILayout) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const loader = useSelector((state: TState) => state.app.dashboardLoader);

  return (
    <div className=" flex flex-col h-screen overflow-hidden">
      <AdminHeader
        onBarClick={() => {
          setIsOpen(!isOpen);
          console.log("setIsOpen");
        }}
      />
      <div className="flex flex-grow ">
        <div className="md:block hidden bg-secondary min-w-56 overflow-y-scroll  shadow-sidebar shadow-secondary/20">
          <div className="mt-4 p-2 ">
            {DASHBOARD_MODULE.map((item) => (
              <CollapsibleMenu key={item.title} item={item} />
            ))}
          </div>
        </div>
        <div className="flex-grow h-screen overflow-y-scroll sm:p-6 p-4 relative">
          {loader && (
            <div className="absolute inset-0 flex justify-center items-center ">
              <Loader />
            </div>
          )}
          {children}
        </div>
      </div>

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
                  src={require("../../../public/images/logo.svg")}
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
