import React, { HTMLAttributes } from "react";
import Loader from "../loader/Loader";
import { classSpreader, mergeClasses } from "@/utils/indext";

interface AppButton extends HTMLAttributes<HTMLButtonElement> {
  type?: "secondary" | "primary" | "tertiary" | "danger";
  loader?: boolean;
}

export default function AppButton({
  loader,
  className,
  type,
  title,
  ...props
}: AppButton) {
  const getButtonClass = () => {
    switch (type) {
      case "danger":
        return "bg-red-500 text-white py-2 px-4 rounded-md flex-1 hover:bg-red-700";
      case "tertiary":
        return "border bg-gradient-to-br from-secondary to-blue-950  text-white transition-all duration-300 ease-in-out py-3 px-5 hover:bg-secondary hover:text-primary w-full";
      case "secondary":
        return "text-primary text-sm px-2 py-0.5 rounded-md cursor-pointer bg-white border border-primary hover:bg-primary hover:text-white ";
      case "primary":
      default:
        return "text-white hover:bg-primary/80 bg-primary py-2 text-lg px-3  rounded-md cursor-pointer w-full";
    }
  };

  return (
    <button
      className={`${mergeClasses(
        `${getButtonClass()} flex items-center justify-center gap-3 transition-colors duration-300 ease-in-out`,
        className
      )} `}
      {...props}
    >
      {!loader ? title : <Loader className=" !w-4 !h-4 !border-2 " />}
    </button>
  );
}
