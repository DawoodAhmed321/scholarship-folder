import AdminHeader from "@/components/AdminHeader";
import DatePicker from "@/components/app-date-picker/AppDatePicker";
import { TState } from "@/redux";
import { setJoinTeam } from "@/redux/slices/contactSlice";
import { openModal } from "@/redux/slices/modalSlice";
import http, { API_URL } from "@/services/http.services";
import { showToast } from "@/utils/indext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function GetInTouch() {
  const [selectedDate, setSelectedDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [search, setSearch] = useState<string>("");

  const dispatch = useDispatch();
  const joins = useSelector((state: TState) => state.contact.joinTeam.data);
  const pagination = useSelector(
    (state: TState) => state.contact.joinTeam.pagination
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

      const resp = await http.get(API_URL.JOIN_TEAM, {
        params: {
          page,
          q: search,
          start_date: selectedDate?.start,
          end_date: selectedDate?.end,
        },
      });

      if (resp.status == 200) {
        dispatch(setJoinTeam(resp.data));
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.log("error while apply filter", error);
    }
  };

  return (
    <div className="pb-20">
      <AdminHeader />
      <div className="p-6">
        <h1 className="text-3xl text-primary mb-4">Team Joining Mails</h1>

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
                  start: new Date(new Date(date).setHours(0, 0, 0, 0)),
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
                  end: new Date(new Date(date).setHours(23, 59, 59, 0)),
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
          {((selectedDate.start && selectedDate.end) || search.length > 3) && (
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
          <div
            className="flex items-center gap-2 rounded-md border border-primary px-2 py-1 bg-primary text-white cursor-pointer"
            onClick={async () => {
              dispatch(
                openModal({
                  view: "EXPORT_MODAL",
                  data: {
                    type: "Team Joins",
                  },
                })
              );
            }}
          >
            <h3 className="">Export</h3>
          </div>
        </div>

        {/* Data */}

        <div className="my-4">
          {joins.map((join) => (
            <div
              key={join.id}
              className="px-4 py-2 shadow-sm shadow-black/60 rounded-md my-2"
            >
              <div className="flex  justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-sm text-primary" />
                    <h1 className="text-sm">{join.email}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-sm text-primary" />
                    <h1 className="text-sm">By {join.name}</h1>
                  </div>
                  <h2 className="text-base mt-2">
                    <span className="text-gray-400">Subject :</span> About{" "}
                    {join.subject}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Message :<span className="text-black">{join.message}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-primary text-sm">
                    {new Date(join.created_at).toDateString()}
                  </p>
                  <Link href={join.file.url} target="_blank">
                    <p className="text-white bg-primary py-1 px-4 rounded-md w-fit">
                      Open CV
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
