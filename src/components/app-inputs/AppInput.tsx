import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { InputHTMLAttributes, useState } from "react";
import { mergeClasses } from "@/utils/indext";

interface AppInput extends InputHTMLAttributes<HTMLInputElement> {
  iseye?: boolean;
  error?: string;
  containerClass?: string;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInput>(
  (
    { iseye = false, className, containerClass, type, error, ...props },
    ref
  ) => {
    const [visible, setVisible] = useState(true);

    return (
      <div className="">
        <div
          className={`${mergeClasses(
            " bg-white p-2 rounded-md border border-secondary/50 flex items-center gap-2 w-full",
            containerClass
          )}`}
        >
          <input
            ref={ref}
            id={props.id}
            {...props}
            className={`${mergeClasses(
              "flex-1 flex-grow bg-transparent  outline-none placeholder:text-gray-400 ",
              className
            )}`}
            type={type == "password" ? (visible ? "password" : "text") : type}
          />
          {type === "password" &&
            iseye &&
            (visible ? (
              <FaRegEyeSlash
                className=" text-gray-700 cursor-pointer"
                size={18}
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <FaRegEye
                className=" text-gray-700 cursor-pointer"
                size={18}
                onClick={() => setVisible(!visible)}
              />
            ))}
        </div>
        {error && (
          <p className="text-red-500 text-[10px]   mt-1 ml-1">{error}</p>
        )}
      </div>
    );
  }
);
