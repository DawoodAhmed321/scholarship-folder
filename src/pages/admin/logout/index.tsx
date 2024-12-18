import DashboardLayout from "@/components/Layouts/DashboardLayout";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import http, { API_URL } from "@/services/http.services";
import { useRouter } from "next/router";
import { LiaSmileWinkSolid } from "react-icons/lia";

function Logout() {
  const router = useRouter();

  useEffect(() => {
    logoutCall();
  }, []);

  const logoutCall = async () => {
    try {
      const resp = await http.get(API_URL.LOGOUT);
      if (resp.status == 200) {
        Cookies.remove("user_token");
        localStorage.removeItem("user_token");
        router.replace("/admin/login");
      }
    } catch (error) {
      console.log("error while logout", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-primary mb-16">
      <LiaSmileWinkSolid className="text-7xl text-white" />
      <h1 className="text-5xl font-bold text-white">
        Logout Successfully Completed!
      </h1>
    </div>
  );
}

Logout.Layout = DashboardLayout;
export default Logout;
