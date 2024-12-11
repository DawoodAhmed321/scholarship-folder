import { TState } from "@/redux";
import { closeModal } from "@/redux/slices/modalSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NewOffer from "./NewOffer";
import NewScholarship from "./NewScholarship";

export default function ManagedModal() {
  const modal = useSelector((store: TState) => store.modal);
  const dispatch = useDispatch();

  const getModal = () => {
    switch (modal.view) {
      case "NEW_OFFER":
        return <NewOffer />;
      case "NEW_SCHOLARSHIP":
        return <NewScholarship />;
      default:
        return <></>;
    }
  };

  return modal.view != "" ? (
    <div>
      <div
        className="fixed z-50 inset-0  bg-black/20 "
        onClick={() => dispatch(closeModal())}
      ></div>
      <div className="fixed z-[51] inset-0 w-fit h-fit my-auto mx-auto flex items-center justify-center hero-heading">
        {getModal()}
      </div>
    </div>
  ) : null;
}
