import { mergeClasses } from "@/utils/indext";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

interface ICollapsible {
  item: {
    title: string;
    content: React.JSX.Element;
  };
  className?: string;
  collapsibleClassName?: string;
}

export default function Collapsible({
  item,
  className,
  collapsibleClassName,
}: ICollapsible) {
  const divRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (visible) {
      const contentEl = divRef.current;
      if (contentEl) {
        setHeight(contentEl.scrollHeight);
      }
    } else {
      setHeight(0);
    }
  }, [visible]);

  return (
    <div className="px-1">
      <div
        className={` ${mergeClasses(
          "flex items-center justify-between bg-secondary/50 rounded-md px-3 py-2 shadow-md",
          className
        )}`}
      >
        <h1 className="my-2  xs:text-lg text-base font-medium">{item.title}</h1>

        <div className="rounded-md text-gray-500 ">
          {visible ? (
            <FaMinus
              size={18}
              onClick={() => setVisible(!visible)}
              className={`cursor-pointer `}
            />
          ) : (
            <IoMdAdd
              size={18}
              onClick={() => setVisible(!visible)}
              className={`cursor-pointer `}
            />
          )}
        </div>
      </div>
      <div
        ref={divRef}
        style={{
          height,
        }}
        className={` -mt-2 rounded-b-md ${mergeClasses(
          "overflow-hidden transition-height duration-500 ease-in-out  ",
          collapsibleClassName
        )}`}
      >
        {item.content}
      </div>
    </div>
  );
}
