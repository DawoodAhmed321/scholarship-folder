import { removeToast } from "@/redux/slices/toastSlice";
import React from "react";
import { useDispatch } from "react-redux";

interface IToast {
  toast: {
    id: number;
    message: string;
    type: "success" | "warning" | "error";
  };
}

export default function ToastComponent({ toast }: IToast) {
  //============================================================== Refs
  let toastRef = React.useRef<HTMLDivElement>(null);

  //============================================================== Hooks
  const dispatch = useDispatch();

  //============================================================== Helper Functions

  const getColor = () => {
    switch (toast.type) {
      case "success":
        return "from-green-600 via-green-500 to-green-400 border-green-500 text-black";
      case "warning":
        return "from-yellow-600 via-yellow-500 to-yellow-400 border-yellow-500 text-black";
      case "error":
        return "from-red-600 via-red-500 to-red-400 border-red-500 text-red-500";
      default:
        return "bg-gray-200 text-black";
    }
  };

  const getToastTitle = () => {
    switch (toast.type) {
      case "success":
        return "Yippee!";
      case "warning":
        return "Warning!";
      case "error":
        return "Opps Something Went Wrong!";
      default:
        return "Toast";
    }
  };

  const handleCloseToast = () => {
    if (toastRef.current) {
      toastRef.current.classList.remove("animate-toast-enter-x");
      toastRef.current.classList.add("paused");
      void toastRef.current.offsetWidth;
      toastRef.current.classList.remove("paused");
      toastRef.current.classList.add("animation-toast-exit-x");
    }
  };

  //============================================================== Render

  return (
    <div
      ref={toastRef}
      onAnimationEnd={(v) => {
        if (v.animationName === "toastExitXAnimation") {
          dispatch(removeToast(toast.id));
        }
      }}
      className={`px-2 pb-2 min-w-80 font-semibold animate-toast-enter-x transition-all duration-300 ease-in-out `}
    >
      <div
        className={`min-h-10 bg-gradient-radial ${getColor()} rounded-t-xl flex items-center justify-between px-2`}
      >
        <h5 className=" text-[16px] text-white   font-semibold">
          {getToastTitle()}
        </h5>
        {/* Close Svg */}
        <svg
          onClick={handleCloseToast}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
          stroke="currentColor"
          fill="currentColor"
          className="w-5 h-5 border border-white text-white rounded-full p-1 cursor-pointer hover:bg-white hover:text-red-500 transition-colors duration-300 ease-in-out "
        >
          <path d="M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z"></path>
        </svg>
      </div>
      <div
        className={`p-2 backdrop-blur-[10px] min-h-20 rounded-b-xl border-[1px] ${getColor()}`}
      >
        <p className={`text-sm ${getColor()}`}>{toast.message}</p>
      </div>
    </div>
  );
}
