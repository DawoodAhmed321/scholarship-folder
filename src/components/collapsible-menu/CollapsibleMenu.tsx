import { DASHBOARD_MODULE } from "@/configs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { IoChevronUp } from "react-icons/io5";

export const CollapsibleMenu = ({
  item,
}: {
  item: (typeof DASHBOARD_MODULE)[0];
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [visible, setVisible] = useState(true);
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
      <div className="flex items-center justify-between text-primary">
        <h1 className="my-2   font-medium text-lg">{item.title}</h1>

        <IoChevronUp
          size={18}
          onClick={() => setVisible(!visible)}
          className={`cursor-pointer transform ${
            visible ? "rotate-0" : "rotate-180"
          } transition-transform duration-300 ease-in-out `}
        />
      </div>
      <div
        ref={divRef}
        style={{
          height,
        }}
        className={` overflow-hidden transition-height duration-500 ease-in-out`}
      >
        {item.subMenu.map((subMenu) => (
          <div
            key={subMenu.id}
            className="ml-2 border-l-[0.5px] border-l-primary pl-2 pb-2"
          >
            <Link href={subMenu.link}>
              <div
                className={`flex items-center gap-2 p-2  hover:bg-primary  rounded-md ${
                  router.pathname == subMenu.link
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-yellow-800`"
                }  hover:text-white transition-colors duration-300 ease-in-out `}
              >
                <div>
                  {subMenu.Icon({
                    size: 16,
                  })}
                </div>
                <h1 className="text-sm  ">{subMenu.title}</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
