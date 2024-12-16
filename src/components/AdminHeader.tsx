import Link from "next/link";
import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";
import { LuBellDot } from "react-icons/lu";
import { HiMenu } from "react-icons/hi";

interface IAdminHeader {
  onBarClick?: () => void;
}

export default function AdminHeader({ onBarClick }: IAdminHeader) {
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
            onClick={onBarClick}
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
    </div>
  );
}
