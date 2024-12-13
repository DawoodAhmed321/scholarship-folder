import React from "react";
import AppHeader from "../AppHeader";
import AppFooter from "../AppFooter";

export default function AppLayout({ children }: ILayout) {
  return (
    <div className=" bg-secondary">
      <div className="max-w-screen-2xl mx-auto">
        <AppHeader />
        <div>{children}</div>
        <AppFooter />
      </div>
    </div>
  );
}
