import { NAVBAR_MENU, SOCIAL_LINKS } from "@/configs";
import Link from "next/link";
import React from "react";
import { LuSend } from "react-icons/lu";

export default function AppFooter() {
  return (
    <div>
      <div className="bg-secondary lg:px-20 sm:px-12 px-6 py-12 grid lg:grid-cols-[1.2fr,1fr,1fr,1fr] sm:grid-cols-2 sm:gap-12 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.svg"
              alt="logo"
              className="size-10 object-contain rounded-full border border-black/50"
            />
            <h2 className="text-xl font-semibold">
              Scholarship <span className="font-normal">Folder</span>
            </h2>
          </div>
          <p className="text-sm font-medium text-black/70 my-4 ">
            We Are A Scholarship Agency That Thinks Differently! and deliver our
            users with best
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Navigations</h2>
          <div className="my-4 flex flex-col gap-2">
            {NAVBAR_MENU.map((nav) => (
              <Link
                key={nav.id}
                className="w-fit [&:hover>div]:w-full [&:hover>h3]:text-blue-400 "
                href={nav.link}
              >
                <h3 className="text-sm text-black/70 transition-colors duration-300 ease-in-out">
                  {nav.name}
                </h3>
                <div className="h-[2px] bg-blue-400 w-0 transition-all duration-300 ease-in-out"></div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Social Links</h2>

          <div className="my-4 flex flex-col gap-4">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.id}
                className="w-fit [&:hover>div]:w-full [&:hover>div>h3]:text-blue-400 [&:hover>div>svg]:text-blue-400"
                href={social.link}
              >
                <div className="flex items-center gap-1">
                  {social.icon({
                    className:
                      "text-xl text-black/70 transition-colors duration-300 ease-in-out",
                  })}
                  <h3 className="text-sm text-black/70 transition-colors duration-300 ease-in-out">
                    {social.name}
                  </h3>
                </div>
                <div className="h-[2px] bg-blue-400 w-0 transition-all duration-300 ease-in-out"></div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Get In Touch With Us</h3>
          <p className="my-4 text-sm font-medium">
            Need Answers? Need Help ? <br />
            Just Email Us
          </p>
          <div className="flex items-center border border-black/30 rounded-md bg-white px-2 py-1 ">
            <input
              type="email"
              className="border-none outline-none flex-1"
              placeholder="Enter your email address"
            />
            <LuSend className="text-xl " />
          </div>
        </div>
      </div>
      <div className="bg-black">
        <h3 className=" p-2 text-lg text-white ml-6">
          Powered By Syed Saad ©{" "}
        </h3>
      </div>
    </div>
  );
}
