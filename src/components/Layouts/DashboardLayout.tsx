import React from "react";
import AdminHeader from "../AdminHeader";
import { DASHBOARD_MODULE } from "@/configs";
import { CollapsibleMenu } from "../collapsible-menu/CollapsibleMenu";
import { useSelector } from "react-redux";
import { TState } from "@/redux";
import Loader from "../loader/Loader";

export default function DashboardLayout({ children }: ILayout) {
  const loader = useSelector((state: TState) => state.app.dashboardLoader);

  return (
    <div className=" flex flex-col h-screen overflow-hidden">
      <AdminHeader />
      <div className="flex flex-grow ">
        <div className="md:block hidden bg-secondary min-w-56 overflow-y-scroll  shadow-sidebar shadow-secondary/20">
          <div className="mt-4 p-2 ">
            {DASHBOARD_MODULE.map((item) => (
              <CollapsibleMenu key={item.title} item={item} />
            ))}
          </div>
        </div>
        <div className="flex-grow h-screen overflow-y-scroll sm:p-6 p-4 relative flex flex-col">
          {loader && (
            <div className="absolute inset-0 flex justify-center items-center ">
              <Loader />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
