import { appDispatch } from "@/redux";
import { addToast } from "@/redux/slices/toastSlice";
import { useEffect, useRef } from "react";

export const showToast = (
  message: string,
  type: "success" | "warning" | "error"
) => {
  const toastId = Date.now();
  appDispatch(addToast({ message, type }));
};

function isStringArray(arr: any[]) {
  return Array.isArray(arr) && arr.every((item) => typeof item === "string");
}

const useDebounce = (callback: any, delay: number) => {
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export const classSpreader = (className?: string) => {
  if (!className) return "";
  return className
    .split(" ")
    .map((c) => `!${c} `)
    .join(" ");
};

export function mergeClasses(defaultClass: string, className?: string) {
  if (!className) return defaultClass;
  const defaultClassArray = defaultClass.split(" ");
  const classNameArray = className.split(" ");

  const resultClassSet = new Set(classNameArray);

  defaultClassArray.forEach((cls) => {
    const classNamePrefix = cls.split("-")[0];
    const hasOverride = classNameArray.some((c) =>
      c.startsWith(classNamePrefix)
    );
    if (!hasOverride) {
      resultClassSet.add(cls);
    }
  });

  return Array.from(resultClassSet).join(" ");
}

export { useDebounce, isStringArray };
