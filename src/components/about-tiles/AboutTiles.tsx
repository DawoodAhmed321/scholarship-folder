import Link from "next/link";
import React from "react";
import { FaCompass } from "react-icons/fa";

interface AboutTilesProps {
  text: string;
  link: string;
  className?: string;
  reverseArrow?: boolean;
}

export default function AboutTiles({
  link,
  text,
  className,
  reverseArrow,
}: AboutTilesProps) {
  return (
    <div
      className={`${className} md:px-2 xs:px-12 px-6 py-6 border border-black/20 flex md:flex-col items-center justify-between relative`}
    >
      <div>
        <FaCompass className="md:text-4xl text-3xl text-white" />
      </div>
      <div className=" flex items-center xs:gap-6 gap-2 relative">
        <h3
          className={`${
            reverseArrow ? "text-white" : "text-black"
          } md:text-nowrap  xs:text-4xl text-xl font-semibold  md:rotate-[270deg]  md:absolute bottom-16 left-0 right-0 mx-auto`}
        >
          {text}
        </h3>
        <Link href={link}>
          <img
            src={`/images/long-arrow-right.${reverseArrow ? "svg" : "png"}`}
            alt=""
            className={`md:size-12 size-8 rounded-full border ${
              reverseArrow
                ? "border-white  hover:bg-black"
                : " hover:bg-black/20 border-black "
            }`}
          />
        </Link>
      </div>
    </div>
  );
}
