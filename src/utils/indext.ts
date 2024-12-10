import { appDispatch } from "@/redux";
import { addToast } from "@/redux/slices/toastSlice";

export const showToast = (
  message: string,
  type: "success" | "warning" | "error"
) => {
  const toastId = Date.now();
  appDispatch(addToast({ message, type }));
};
