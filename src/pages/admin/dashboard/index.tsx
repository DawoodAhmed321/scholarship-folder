import React from "react";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { FaEnvelope, FaUser } from "react-icons/fa";
import Link from "next/link";
import { APP_ROUTES } from "@/configs";
import AppButton from "@/components/app-buttons/AppButton";
import dynamic from "next/dynamic";
import { ChartData } from "chart.js";
import "chart.js/auto";

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const lineData: ChartData<"line", unknown, unknown> = {
  labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],

  datasets: [
    {
      label: "This Week",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: ["#145790"],
      borderColor: ["#145790"],
      borderWidth: 1,
    },
    {
      label: "Last Week",
      data: [59, 56, 77, 55, 40, 81, 65],
      backgroundColor: ["#e0e0e1"],
      borderColor: ["#00000050"],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  return (
    <div className="pb-20">
      <h1 className="text-3xl text-primary   ">Dashboard</h1>
      {/* Line Chart Section */}
      <div className=" flex flex-col xs:px-4 px-0 py-4 ">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm   font-medium">Contact Request</h2>
            <h4 className="text-xs   font-normal">
              <span className="text-green-500"> ↑ 2.1% </span> vs last week
            </h4>
          </div>
          <AppButton type="secondary" title="View Report" />
        </div>
        {/* Bar Graph */}
        <div className="flex-grow flex justify-center items-center max-h-72">
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                  align: "start",
                  fullSize: true,
                  labels: {
                    pointStyle: "circle",
                    usePointStyle: true,

                    font: {
                      size: 10,
                    },
                  },
                },
              },
              layout: {
                autoPadding: false,
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                },
              },
            }}
          />
        </div>
      </div>
      {/* Recent Get In Touch Request */}
      <div className="flex lg:flex-row flex-col gap-8 my-6  ">
        <div className="basis-1/2  ">
          <div className="border border-primary rounded-lg">
            <div className="text-sm text-white rounded-t-md bg-primary flex items-center justify-between px-4 py-2">
              <h1 className="">Recent Get In Touch Request</h1>
              <Link href={APP_ROUTES.GET_IN_TOUCH_MAILS}>
                <p>View All</p>
              </Link>
            </div>
            <div className="p-2 max-h-[400px] overflow-y-scroll">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="px-4 py-2 shadow-sm shadow-black/40 rounded-md my-2"
                >
                  <div className="flex items-center gap-2">
                    <FaUser className="text-sm text-gray-400" />
                    <h1 className="text-sm">By Syed Saad</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-sm text-gray-400" />
                    <h1 className="text-sm">syedsaad@gmail.com</h1>
                  </div>

                  <h2 className="text-sm">
                    <span className="text-gray-400">Subject :</span> About
                    Scholarship
                  </h2>
                  <p className="text-xs">
                    <span className="text-gray-400">Message :</span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat, ipsum dolores perspiciatis sed repellat nulla id
                    nemo, obcaecati quas ad fuga possimus libero quibusdam
                    labore ipsa porro dicta? Voluptate, adipisci.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="border border-primary rounded-lg">
            <div className="text-sm text-white rounded-t-md bg-primary flex items-center justify-between px-4 py-2">
              <h1 className="">Join Team Requests</h1>
              <Link href={APP_ROUTES.GET_IN_TOUCH_MAILS}>
                <p>View All</p>
              </Link>
            </div>
            <div className="p-2 max-h-[400px] overflow-y-scroll">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="px-4 py-2 shadow-sm shadow-black/40 rounded-md my-2"
                >
                  <div className="flex items-center gap-2">
                    <FaUser className="text-sm text-gray-400" />
                    <h1 className="text-sm">By Syed Saad</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-sm text-gray-400" />
                    <h1 className="text-sm">syedsaad@gmail.com</h1>
                  </div>

                  <h2 className="text-sm">
                    <span className="text-gray-400">Subject :</span> About
                    Scholarship
                  </h2>
                  <p className="text-xs">
                    <span className="text-gray-400">Message :</span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat, ipsum dolores perspiciatis sed repellat nulla id
                    nemo, obcaecati quas ad fuga possimus libero quibusdam
                    labore ipsa porro dicta? Voluptate, adipisci.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.Layout = DashboardLayout;
export default Dashboard;
