import React, { HTMLAttributes } from "react";

interface AppButton extends HTMLAttributes<HTMLButtonElement> {
  type?: "secondary" | "primary" | "tertiary";
}

export default function AppButton({
  className,
  type,
  title,
  ...props
}: AppButton) {
  const getButtonClass = () => {
    switch (type) {
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
      className={` ${className} ${getButtonClass()} transition-colors duration-300 ease-in-out`}
      {...props}
    >
      {title}
    </button>
  );
}
