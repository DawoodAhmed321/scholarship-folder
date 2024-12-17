import { mergeClasses } from "@/utils/indext";
import React from "react";
import { FcVoicePresentation } from "react-icons/fc";

interface IEmptyMessageProps {
  className?: string;
  message: string;
}

export default function EmptyMessage({
  message,
  className,
}: IEmptyMessageProps) {
  return (
    <div
      className={`${mergeClasses(
        "flex justify-center items-center xs:min-h-96 min-h-72 flex-col",
        className
      )}`}
    >
      <FcVoicePresentation className="text-7xl text-white" />
      <h3 className="xs:text-2xl text-lg text-primary font-mono text-center">
        {message} <br />
        Come back later
      </h3>
    </div>
  );
}
