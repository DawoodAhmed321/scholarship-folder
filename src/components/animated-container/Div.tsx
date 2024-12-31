import { useInView } from "@/utils/indext";
import React, { useEffect } from "react";

interface IDiv extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation: "translateY" |"-translateY"| "translateX" | "-translateX";
  delay?: number
}

export default function Div({ children, animation,delay=0,className, ...props }: IDiv) {

  //================================== Refs
  const [ref, isInView] = useInView()
  return <div ref={ref} 
    className={`${isInView ? " animation " : ` intial-state `} ${className}`}
    style={{
      //@ts-ignore
      '--animation': animation,
      '--animation-delay' : `${delay}s`
    }}
    {...props}
  >{children}</div>;
}
