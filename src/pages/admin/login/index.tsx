import AppButton from "@/components/app-buttons/AppButton";
import { AppInput } from "@/components/app-inputs/AppInput";
import http, { API_URL } from "@/services/http.services";
import { showToast } from "@/utils/indext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email Should be Valid").required(),
  password: yup
    .string()
    .required()
    .min(8)
    .max(16)

    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one character and one special character"
    ),

  rememberMe: yup.boolean().default(false),
});

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: yupResolver(loginSchema),
  });

  //============================================= Hooks
  const router = useRouter();

  //============================================= Handlers

  const login = async (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    // showToast("Login", "success");
    try {
      const resp = await http.post(API_URL.LOGIN, {
        email: values.email,
        password: values.password,
      });
      if (resp.status == 200) {
        if (values.rememberMe) {
          localStorage.setItem("token", resp.data.data.token);
        }
        showToast("Successfully logged in !", "success");
        router.replace("/admin/dashboard/");
      }
    } catch (error) {
      console.log("Error in login", error);
    }
  };

  return (
    <div
      className=" flex items-center justify-center min-h-screen bg-contain bg-repeat"
      style={{
        backgroundImage: "url(/images/login-bg.jpeg)",
        backgroundSize: "320px 320px",
      }}
    >
      <form
        onSubmit={handleSubmit(login)}
        className="flex flex-col gap-2 bg-[#F0F2F5] p-8 rounded-md w-96"
      >
        <div className="mb-8 mt-2">
          <h1 className="text-center text-2xl text-blue-950 font-bold  ">
            Welcome back!
            <br />
            <span>Login to Continue</span>
          </h1>
        </div>
        <AppInput
          type="email"
          id="email"
          {...register("email")}
          placeholder="Email Address"
          error={errors.email?.message}
        />
        <AppInput
          {...register("password")}
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          // iseye
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            {...register("rememberMe")}
            className="cursor-pointer"
          />
          <label
            className="text-sm text-gray-600 select-none cursor-pointer"
            htmlFor="rememberMe"
          >
            Remember Me
          </label>
        </div>
        <AppButton title="Login" />
      </form>
    </div>
  );
}
