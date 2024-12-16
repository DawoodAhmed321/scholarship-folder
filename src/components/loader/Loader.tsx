import React from "react";

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return <div className={`${className} loader`}></div>;
}
