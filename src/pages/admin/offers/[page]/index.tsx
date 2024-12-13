import DatePicker from "@/components/app-date-picker/AppDatePicker";
import AppSwitch from "@/components/app-inputs/AppSwitch";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { openModal } from "@/redux/slices/modalSlice";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";

export const serverSideProps = (context: GetServerSidePropsContext) => {
  let page = context.query.page as string;

  return {
    props: {
      page: isNaN(parseInt(page)) ? 1 : parseInt(page),
    },
  };
};

interface IOffers {
  page: number;
}

function Offers({ page }: IOffers) {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [search, setSearch] = useState<string>("");

  return (
    <div className="mb-20">
      <h1 className="text-3xl text-primary   ">Offers</h1>
      <div className="flex items-center justify-end gap-4 flex-wrap ">
        <div
          className="text-sm flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={() => dispatch(openModal({ view: "NEW_OFFER", data: null }))}
        >
          <FaPlus /> New Offer
        </div>
      </div>
      {/* Table Section */}
      <div className="bg-white rounded-md shadow-sm shadow-black/30 p-4 mt-6 ">
        {/* Filter Section */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg text-primary">All Offers</h2>
          <div className="flex items-center gap-4   text-sm flex-wrap">
            <div className="flex items-center gap-2 border border-black px-2 py-1 rounded-md">
              <input
                type="search"
                className="text-black outline-none border-none"
                placeholder="Search Offers"
              />
              <img
                src="/images/icons/search.svg"
                alt=""
                className="w-4 h-4 object-contain"
              />
            </div>

            {/* Start Date */}
            <div>
              <DatePicker
                placeholder="Created Date"
                onChange={(date) => {
                  setSelectedDate(new Date(date));
                }}
              />
            </div>

            <div className="flex items-center gap-2 rounded-md border border-black px-2 py-1 bg-white cursor-pointer">
              <h3 className="">Export Report</h3>
              <img
                src="/images/icons/send.svg"
                alt=""
                className="w-4 h-4 object-contain"
              />
            </div>
            {/* Clear Filter */}
            {(selectedDate || search.length > 3) && (
              <div
                className="flex items-center gap-2 rounded-md border border-red-500 px-2 py-1 bg-red-500 text-white cursor-pointer"
                onClick={() => {
                  setSelectedDate(null);
                }}
              >
                <h3 className="">Clear Filter</h3>
              </div>
            )}
          </div>
        </div>
        {/* Table */}
        <div className="mt-2 overflow-x-auto">
          <table className="w-full  min-w-[640px]">
            <thead className=" bg-primary/10 text-primary text-sm font-semibold rounded-md ">
              <tr className="text-left rounded-md [&>th]:py-2 [&>th]:px-2">
                <th>ID</th>
                <th>Name</th>

                <th>Description</th>

                <th>Actions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className=" text-left  [&>tr>td]:py-1 [&>tr>td]:px-2 [&>tr]:border-b [&>tr]:border-black/10">
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/p1.jpg"
                        alt="offer"
                        className="size-10 rounded-md object-cover"
                      />
                      <p className="text-sm text-black/50">John Doe</p>
                    </div>
                  </td>
                  <td className="max-w-screen-xs line-clamp-3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Beatae ab nisi error odit ut, qui illum necessitatibus quod,
                    deleniti totam reprehenderit, eligendi nesciunt repudiandae
                    quam? Vero quis laborum maiores temporibus.
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FaEdit className="text-primary" />
                      <MdOutlineDelete className="text-red-500 text-lg" />
                    </div>
                  </td>
                  <td className="">
                    <AppSwitch
                      checked={index % 3 != 0}
                      onChange={(e) => console.log(e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Section */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Link href="/admin/offers/1">
          <FaChevronCircleLeft className="text-3xl object-contain  text-primary " />
        </Link>
        <Link
          href="/admin/offers/1"
          className="text-sm flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
        >
          1
        </Link>
        <Link href="/admin/offers/1">
          <FaChevronCircleRight className="text-3xl object-contain  text-primary " />
        </Link>
      </div>
    </div>
  );
}

Offers.Layout = DashboardLayout;
export default Offers;
