import React from "react";
import AppHeader from "../AppHeader";
import AppFooter from "../AppFooter";

export default function AppLayout({ children }: ILayout) {
  return (
    <div>
      <AppHeader />
      <div>{children}</div>
      <AppFooter />
    </div>
  );
}
