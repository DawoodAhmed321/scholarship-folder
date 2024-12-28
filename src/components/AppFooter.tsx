import { NAVBAR_MENU, SOCIAL_LINKS } from "@/configs";
import { TState } from "@/redux";
import { setFooter } from "@/redux/slices/appSlice";
import http, { API_URL } from "@/services/http.services";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect } from "react";
import { LuFacebook, LuInstagram, LuSend } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function AppFooter() {
  const dispatch = useDispatch();

  const footer = useSelector((state: TState) => state.app.footer);

  useEffect(() => {
    handleFooterData();
  }, []);

  const handleFooterData = async () => {
    try {
      const resp = await http.get(API_URL.HOME);
      dispatch(setFooter(resp.data.data));
    } catch (error) {
      console.log(error);
    }
  };

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

            <Link
              className="w-fit [&:hover>div]:w-full [&:hover>h3]:text-blue-400 "
              href="/privacy-policy"
            >
              <h3 className="text-sm text-black/70 transition-colors duration-300 ease-in-out">
                Privacy Policy
              </h3>
              <div className="h-[2px] bg-blue-400 w-0 transition-all duration-300 ease-in-out"></div>
            </Link>
            <Link
              className="w-fit [&:hover>div]:w-full [&:hover>h3]:text-blue-400 "
              href="/terms-and-conditions"
            >
              <h3 className="text-sm text-black/70 transition-colors duration-300 ease-in-out">
                Terms and Conditions
              </h3>
              <div className="h-[2px] bg-blue-400 w-0 transition-all duration-300 ease-in-out"></div>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Social Links</h2>

          <div className="my-4 flex flex-col gap-4">
            <Link
              className="w-fit [&:hover>div]:w-full [&:hover>div>h3]:text-blue-400 [&:hover>div>svg]:text-blue-400"
              href={footer.facebook}
              target="_blank"
            >
              <div className="flex items-center gap-1">
                <LuFacebook className="text-lg text-black/70 transition-colors duration-300 ease-in-out" />

                <h3 className="text-sm text-black/70 transition-colors duration-300 ease-in-out">
                  facebook
                </h3>
              </div>
              <div className="h-[2px] bg-blue-400 w-0 transition-all duration-300 ease-in-out"></div>
            </Link>
            <Link
              className="w-fit [&:hover>div]:w-full [&:hover>div>h3]:text-blue-400 [&:hover>div>svg]:text-blue-400"
              href={footer.instagram}
              target="_blank"
            >
              <div className="flex items-center gap-1">
                <LuInstagram className="text-lg text-black/70 transition-colors duration-300 ease-in-out" />
                <h3 className="text-sm text-black/70 transition-colors duration-300 ease-in-out">
                  Instagram
                </h3>
              </div>
              <div className="h-[2px] bg-blue-400 w-0 transition-all duration-300 ease-in-out"></div>
            </Link>
            <Link
              className="w-fit [&:hover>div]:w-full [&:hover>div>h3]:text-blue-400 [&:hover>div>svg]:text-blue-400"
              href={footer.twitter}
              target="_blank"
            >
              <div className="flex items-center gap-1">
                <RiTwitterXFill className="text-lg text-black/70 transition-colors duration-300 ease-in-out" />

                <h3 className="text-sm text-black/70 transition-colors duration-300 ease-in-out">
                  Twitter
                </h3>
              </div>
              <div className="h-[2px] bg-blue-400 w-0 transition-all duration-300 ease-in-out"></div>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Get In Touch With Us</h3>
          <p className="my-4 text-sm font-medium">
            Need Answers? Need Help ? <br />
            Just Email Us
          </p>
          <div>
            <form
              className="flex items-center border border-black/30 rounded-md bg-white px-2 py-1"
              onSubmit={(e) => {
                e.preventDefault();
                Router.push("/contact");
              }}
            >
              <input
                type="email"
                className="border-none outline-none flex-1"
                placeholder="Enter your email address"
                required
              />
              <button type="submit">
                <LuSend className="text-xl " />
              </button>
            </form>
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
