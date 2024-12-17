import DatePicker from "@/components/app-date-picker/AppDatePicker";
import AppSwitch from "@/components/app-inputs/AppSwitch";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { TOffer } from "@/configs/interface";
import { openModal } from "@/redux/slices/modalSlice";
import http, { API_URL } from "@/services/http.services";
import React, { useEffect, useState } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { TState } from "@/redux";
import { setOffer, updateOffer } from "@/redux/slices/offerSlice";
import { showToast } from "@/utils/indext";
import { setTestimonials } from "@/redux/slices/testimonialSlice";

function Testimonials() {
  const [selectedDate, setSelectedDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [search, setSearch] = useState<string>("");

  const dispatch = useDispatch();
  const testimonials = useSelector(
    (state: TState) => state.testimonials.testimonials
  );
  const pagination = useSelector(
    (state: TState) => state.testimonials.pagination
  );

  useEffect(() => {
    if (
      search.length == 0 &&
      selectedDate?.start == null &&
      selectedDate?.end == null
    ) {
      initialLoading(1, false);
    }
  }, [search, selectedDate]);

  const validationSchema = () => {
    if (
      search.length == 0 &&
      selectedDate?.start == null &&
      selectedDate?.end == null
    ) {
      showToast("Please enter search or select date filter", "error");
      return false;
    }
    if (selectedDate.start && !selectedDate.end) {
      showToast("Please select end date", "error");
      return false;
    }
    if (!selectedDate.start && selectedDate.end) {
      showToast("Please select start date", "error");
      return false;
    }
    if (search.length > 0 && search.length <= 3) {
      showToast("Search should be more than 3 characters", "error");
      return false;
    }
    if (
      selectedDate.start &&
      selectedDate.end &&
      selectedDate.start >= selectedDate.end
    ) {
      showToast("Start date should be less than end date", "error");
      return false;
    }
    return true;
  };

  const initialLoading = async (
    page: number = 1,
    checkValidationSchema = true
  ) => {
    try {
      if (checkValidationSchema && !validationSchema()) return;

      const resp = await http.get(API_URL.TESTIMONIALS, {
        params: {
          page,
          q: search,
          start_date: selectedDate?.start,
          end_date: selectedDate?.end,
        },
      });

      if (resp.status == 200) {
        dispatch(setTestimonials(resp.data));
      }
    } catch (error) {
      console.log("error while apply filter", error);
    }
  };

  const toogleSwitch = async (item: TOffer) => {
    try {
      const resp = await http.put(API_URL.OFFERS, {
        id: item.id,
        title: item.title,
        description: item.description,
        image: [item.image.url],
        is_active: !item.is_active,
      });
      if (resp.status == 200) {
        dispatch(updateOffer(resp.data.data));
      }
    } catch (error) {
      console.log("error while toggle switch", error);
    }
  };

  return (
    <div className="mb-20">
      <h1 className="text-3xl text-primary" id="top">
        Testimonials
      </h1>
      <div className="flex items-center justify-end gap-4 flex-wrap ">
        <div
          className="text-sm flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={() =>
            dispatch(openModal({ view: "NEW_TESTIMONIAL", data: null }))
          }
        >
          <FaPlus /> New Testimonial
        </div>
      </div>
      {/* Table Section */}
      <div className="bg-white rounded-md shadow-sm shadow-black/30 p-4 mt-6 ">
        {/* Filter Section */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg text-primary">All Testimonials</h2>
          <div className="flex items-center gap-4   text-sm flex-wrap">
            <div className="flex items-center gap-2 border border-black px-2 py-1 rounded-md">
              <input
                type="search"
                className="text-black outline-none border-none"
                placeholder="Search Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                placeholder="Start Date"
                value={selectedDate.start}
                onChange={(date) => {
                  setSelectedDate({
                    ...selectedDate,
                    start: new Date(new Date(date).setUTCHours(0, 0, 0, 0)),
                  });
                }}
              />
            </div>
            <div>
              <DatePicker
                placeholder="End Date"
                value={selectedDate.end}
                onChange={(date) => {
                  setSelectedDate({
                    ...selectedDate,
                    end: new Date(new Date(date).setUTCHours(23, 59, 59, 0)),
                  });
                }}
              />
            </div>
            <div
              className="flex items-center gap-2 rounded-md border border-primary px-2 py-1 bg-primary text-white cursor-pointer"
              onClick={async () => {
                await initialLoading(1);
              }}
            >
              <h3 className="">Apply Filter</h3>
            </div>
            {/* Clear Filter */}
            {((selectedDate.start && selectedDate.end) ||
              search.length > 3) && (
              <div
                className="flex items-center gap-2 rounded-md border border-red-500 px-2 py-1 bg-red-500 text-white cursor-pointer"
                onClick={async () => {
                  setSelectedDate({ start: null, end: null });
                  setSearch("");
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
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className=" text-left  [&>tr>td]:py-1 [&>tr>td]:px-2 [&>tr]:border-b [&>tr]:border-black/10">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id}>
                  <td>{testimonial.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Image
                        width={50}
                        height={50}
                        src={testimonial.image.url}
                        alt="testimonial"
                        className="size-10 rounded-md object-cover"
                      />
                      <p className="text-sm text-black/50">
                        {testimonial.name}
                      </p>
                    </div>
                  </td>
                  <td className="max-w-screen-xs line-clamp-3">
                    {testimonial.description}
                  </td>
                  <td>{testimonial.created_at}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FaEdit
                        className="text-primary cursor-pointer "
                        onClick={() => {
                          dispatch(
                            openModal({
                              view: "EDIT_TESTIMONIAL",
                              data: testimonial,
                            })
                          );
                        }}
                      />
                      <MdOutlineDelete
                        className="text-red-500 text-lg cursor-pointer"
                        onClick={() =>
                          dispatch(
                            openModal({
                              view: "CONFIRM_MODAL",
                              data: {
                                data: testimonial,
                                type: "testimonials",
                                message:
                                  "Are you sure you want to delete this testimonial?",
                              },
                            })
                          )
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Section */}
      {testimonials.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          {pagination.current_page > 1 && (
            <FaChevronCircleLeft
              className="text-3xl object-contain  text-primary cursor-pointer"
              onClick={async () => {
                await initialLoading(pagination.current_page - 1, false);
              }}
            />
          )}
          <p className="text-sm flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md">
            {pagination.current_page}
          </p>
          {pagination.current_page < pagination.last_page && (
            <FaChevronCircleRight
              className="text-3xl object-contain  text-primary cursor-pointer"
              onClick={async () => {
                await initialLoading(pagination.current_page + 1, false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

Testimonials.Layout = DashboardLayout;
export default Testimonials;
