import { TState } from "@/redux";
import { closeModal } from "@/redux/slices/modalSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NewOffer from "./NewOffer";
import NewScholarship from "./NewScholarship";
import EditOffer from "./EditOffer";
import EditScholarship from "./EditScholarship";
import ConfirmModal from "./ConfirmModal";
import NewTestimonial from "./NewTestimonial";
import EditTestimonial from "./EditTestimonial";
import OfferDetails from "./OfferDetails";
import ExportModal from "./ExportModal";

export default function ManagedModal() {
  const modal = useSelector((store: TState) => store.modal);
  const dispatch = useDispatch();

  const getModal = () => {
    switch (modal.view) {
      case "OFFER_DETAIL":
        return <OfferDetails />;
      case "NEW_OFFER":
        return <NewOffer />;
      case "EDIT_OFFER":
        return <EditOffer />;
      case "NEW_SCHOLARSHIP":
        return <NewScholarship />;
      case "EDIT_SCHOLARSHIP":
        return <EditScholarship />;
      case "NEW_TESTIMONIAL":
        return <NewTestimonial />;
      case "EDIT_TESTIMONIAL":
        return <EditTestimonial />;
      case "CONFIRM_MODAL":
        return <ConfirmModal />;
      case "EXPORT_MODAL":
        return <ExportModal />;

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
