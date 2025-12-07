import AppButton from "@/components/app-buttons/AppButton";
import { AppInput } from "@/components/app-inputs/AppInput";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import http, { API_URL } from "@/services/http.services";
import { convertTimeToDate, showToast } from "@/utils/indext";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const homeSchema = Yup.object().shape({
  title: Yup.string().required().min(3),
  facebook: Yup.string().required().min(3),
  twitter: Yup.string().required().min(3),
  instagram: Yup.string().required().min(3),
  mobile: Yup.string().required().min(11),
  email: Yup.string().required().email(),
  address: Yup.string().required().min(3),

  bachelor: Yup.number().required().min(1),
  master: Yup.number().required().min(1),
  phd: Yup.number().required().min(1),
  internship: Yup.number().required().min(1),
  postdoc: Yup.number().required().min(1),

  start_time: Yup.string()
    .matches(timeFormatRegex, "Start time must be in the format HH:mm")
    .required("Start time is required"),
  end_time: Yup.string()
    .matches(timeFormatRegex, "End time must be in the format HH:mm")
    .required("End time is required")
    .test(
      "is-greater",
      "End time must be greater than start time",
      function (value) {
        const { start_time } = this.parent;
        if (!start_time || !value) return true; // If either time is not set, skip validation

        // Parse the time strings into date objects
        const [startHours, startMinutes] = start_time.split(":").map(Number);
        const [endHours, endMinutes] = value.split(":").map(Number);

        // Create date objects for comparison
        const startTime = new Date();
        startTime.setHours(startHours, startMinutes, 0, 0);

        const endTime = new Date();
        endTime.setHours(endHours, endMinutes, 0, 0);
        return endTime > startTime;
      }
    ),
});

function HomePage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(homeSchema),
  });

  useEffect(() => {
    intialRequest();
  }, []);

  const intialRequest = async () => {
    try {
      const resp = await http.get(API_URL.HOME);
      const countResp = await http.get(API_URL.SCHOLARSHIP_COUNT);
      if (resp.status === 200) {
        setValue("title", resp.data.data.title);
        setValue("facebook", resp.data.data.facebook || "");
        setValue("twitter", resp.data.data.twitter || "");
        setValue("instagram", resp.data.data.instagram || "");
        setValue("mobile", resp.data.data.mobile || "");
        setValue("email", resp.data.data.email || "");
        setValue("address", resp.data.data.address || "");
        setValue("start_time", resp.data.data.start_time || new Date());
        setValue("end_time", resp.data.data.end_time || new Date());
      }
      if (countResp.status === 200) {
        setValue("bachelor", countResp.data.data.bachelor);
        setValue("master", countResp.data.data.master);
        setValue("phd", countResp.data.data.phd);
        setValue("internship", countResp.data.data.internship);
        setValue("postdoc", countResp.data.data.postdoc);
      }
    } catch (error) {
      console.log("error while fetching home data", error);
    }
  };

  const handleUpdateHome = async (value: {
    title: string;
    facebook: string;
    twitter: string;
    instagram: string;
    mobile: string;
    email: string;
    address: string;
    start_time: string;
    end_time: string;
  }) => {
    try {
      const resp = await http.post(API_URL.HOME, {
        ...value,

        start_time: convertTimeToDate(value.start_time),
        end_time: convertTimeToDate(value.end_time),
      });
      if (resp.status === 200) {
        showToast("Successfully Updated Home Data", "success");
      }
    } catch (error) {
      console.log("error while updating home", error);
    }
  };

  return (
    <div className="pb-20">
      <h1 className="text-3xl text-primary">Home Page</h1>
      <form onSubmit={handleSubmit(handleUpdateHome)} className="mt-10">
        <div>
          <h1 className="text-xl text-primary mb-2 ">Home Title</h1>
          <AppInput
            type="text"
            placeholder="Enter Home title"
            {...register("title")}
            error={errors.title?.message}
          />
        </div>
        <h1 className="text-xl text-primary my-2 ">Social Links</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div>
            <AppInput
              type="text"
              placeholder="Enter Facebook Link"
              {...register("facebook")}
              error={errors.facebook?.message}
            />
          </div>
          <div>
            <AppInput
              type="text"
              placeholder="Enter Instagram Link"
              {...register("instagram")}
              error={errors.instagram?.message}
            />
          </div>
          <div>
            <AppInput
              type="text"
              placeholder="Enter twitter Link"
              {...register("twitter")}
              error={errors.twitter?.message}
            />
          </div>
        </div>
        <h1 className="text-xl text-primary my-2 ">Contacts</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div>
            <AppInput
              type="text"
              placeholder="Enter Mobile Number"
              {...register("mobile")}
              error={errors.mobile?.message}
            />
          </div>
          <div>
            <AppInput
              type="email"
              placeholder="Enter Email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          <div>
            <AppInput
              type="text"
              placeholder="Enter Address"
              {...register("address")}
              error={errors.address?.message}
            />
          </div>
        </div>
        <h1 className="text-xl text-primary my-2 ">Cases Count</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div>
            <AppInput
              type="number"
              placeholder="Enter Bachelor Counts"
              {...register("bachelor")}
              error={errors.bachelor?.message}
            />
          </div>
          <div>
            <AppInput
              type="number"
              placeholder="Enter Master Counts"
              {...register("master")}
              error={errors.master?.message}
            />
          </div>
          <div>
            <AppInput
              type="number"
              placeholder="Enter Phd Counts"
              {...register("phd")}
              error={errors.phd?.message}
            />
          </div>
          <div>
            <AppInput
              type="number"
              placeholder="Enter Internship Counts"
              {...register("internship")}
              error={errors.internship?.message}
            />
          </div>
          <div>
            <AppInput
              type="number"
              placeholder="Enter Postdoc Counts"
              {...register("postdoc")}
              error={errors.postdoc?.message}
            />
          </div>
        </div>
        <h1 className="text-xl text-primary my-2 ">Daily Availability Time</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div>
            <AppInput
              type="time"
              placeholder="Enter Start Time"
              {...register("start_time")}
              error={errors.start_time?.message}
            />
          </div>
          <div>
            <AppInput
              type="time"
              placeholder="Enter End Time"
              {...register("end_time")}
              error={errors.end_time?.message}
            />
          </div>
        </div>
        <AppButton title="Update" className="mt-4" />
      </form>
    </div>
  );
}
HomePage.Layout = DashboardLayout;
export default HomePage;
