"use client";

import * as React from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const AppSwitch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, checked, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false);

    return (
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            ref={ref}
            {...props}
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              onChange && onChange(e);
            }}
          />
          <div
            className={`block w-10 h-6 rounded-full ${
              isChecked ? "bg-primary" : "bg-gray-600"
            }`}
          ></div>
          <div
            className={`absolute z-20 left-1 top-1 bg-white size-4 rounded-full transition-transform duration-300 ease-in-out 
              ${
                isChecked
                  ? "transform translate-x-full"
                  : "transform translate-x-0"
              }`}
          ></div>
        </div>
        {label && (
          <span className="ml-3 text-sm font-medium text-gray-900">
            {label}
          </span>
        )}
      </label>
    );
  }
);

export default AppSwitch;
