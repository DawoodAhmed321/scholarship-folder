import { TState } from "@/redux";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ToastComponent from "./Toast";

export default function Toast() {
  //=============================================== Hooks
  const toasts = useSelector((state: TState) => state.toast.toasts);

  return (
    <div className="fixed bottom-0 right-0 top-0 flex flex-col justify-end pb-10 z-50">
      {toasts.map((toast) => (
        <ToastComponent toast={toast} key={toast.id} />
      ))}
    </div>
  );
}
