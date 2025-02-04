import { appDispatch } from "@/redux";
import { addToast } from "@/redux/slices/toastSlice";
import { useEffect, useRef, useState } from "react";

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


export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView] as const;
}



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

export function convertTimeToDate(timeString: string) {
  // Create a new Date object for the current date
  console.log(timeString);
  const date = new Date();

  // Extract hours and minutes from the time string
  const [hours, minutes] = timeString.split(":").map(Number);

  // Set the hours and minutes of the date object
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

export { useDebounce, isStringArray };
