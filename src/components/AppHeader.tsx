import { NAVBAR_MENU } from "@/configs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function AppHeader() {
  const router = useRouter();

  return (
    <div>
      <nav>
        <img src="/globe.svg" alt="logo" className="w-6 h-6 object-contain" />
        <div className="flex items-center gap-6">
          {NAVBAR_MENU.map((menu) => (
            <Link key={menu.id.toString()} href={menu.link}>
              <h1
                className={`text-xl hover:text-blue-300 ${
                  router.pathname == menu.link ? "text-blue-300" : "text-black"
                } `}
              >
                {menu.name}
              </h1>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
