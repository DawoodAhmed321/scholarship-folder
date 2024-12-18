import AppButton from "@/components/app-buttons/AppButton";
import { AppInput } from "@/components/app-inputs/AppInput";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import http, { API_URL } from "@/services/http.services";
import { showToast } from "@/utils/indext";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const homeSchema = Yup.object().shape({
  title: Yup.string().required().min(3),
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
      if (resp.status === 200) {
        setValue("title", resp.data.data.title);
      }
    } catch (error) {}
  };

  const handleUpdateHome = async (value: { title: string }) => {
    try {
      const resp = await http.post(API_URL.HOME, value);
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
        <AppInput
          type="text"
          placeholder="Enter Home title"
          {...register("title")}
          error={errors.title?.message}
        />
        <AppButton title="Update" className="mt-4" />
      </form>
    </div>
  );
}
HomePage.Layout = DashboardLayout;
export default HomePage;
