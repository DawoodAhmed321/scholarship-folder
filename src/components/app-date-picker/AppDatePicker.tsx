"use client";
import React, { useState, useRef, useEffect } from "react";

interface IDatePicker {
  placeholder?: string;
  onChange?: (date: string) => void;
}

export default function DatePicker({ placeholder, onChange }: IDatePicker) {
  const [date, setDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    setDate(formatDate(selectedDate));
    onChange && onChange(formatDate(selectedDate));
    setShowCalendar(false);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const currentDate = date ? new Date(date) : new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const previousMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    setDate(formatDate(newDate));
    onChange && onChange(formatDate(newDate));
  };

  const nextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    setDate(formatDate(newDate));
    onChange && onChange(formatDate(newDate));
  };

  return (
    <div className="relative">
      <div
        ref={inputRef}
        onClick={toggleCalendar}
        className="flex items-center gap-2 rounded-md border border-black px-2 py-1 bg-white cursor-pointer "
      >
        <h3 className="">{date ? date : placeholder || "Select Date"}</h3>
        <img
          src="/images/icons/calendar.svg"
          alt=""
          className="w-4 h-4 object-contain"
        />
      </div>
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute right-0 min-w-96 z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center p-2 border-b">
            <div
              onClick={previousMonth}
              className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              &lt;
            </div>
            <span>
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <div
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              &gt;
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 p-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-gray-500 text-xs font-semibold"
              >
                {day}
              </div>
            ))}
            {Array(firstDayOfMonth)
              .fill(null)
              .map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
            {days.map((day) => (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={`p-2 text-sm hover:bg-gray-100 cursor-pointer rounded-full ${
                  day === currentDate.getDate()
                    ? "bg-blue-500 text-white hover:bg-blue-600 "
                    : ""
                }`}
              >
                <p className="text-center">{day}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
