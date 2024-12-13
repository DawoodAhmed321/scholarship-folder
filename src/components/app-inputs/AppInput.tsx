import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { InputHTMLAttributes, useState } from "react";

interface AppInput extends InputHTMLAttributes<HTMLInputElement> {
  iseye?: boolean;
  error?: string;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInput>(
  ({ iseye = false, type, error, ...props }, ref) => {
    const [visible, setVisible] = useState(true);

    return (
      <div className="">
        <div className=" bg-white p-2 rounded-md border border-secondary/50 flex items-center gap-2 w-full">
          <input
            ref={ref}
            id={props.id}
            {...props}
            type={type == "password" ? (visible ? "password" : "text") : type}
            className="flex-1 flex-grow bg-transparent  outline-none placeholder:   "
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
