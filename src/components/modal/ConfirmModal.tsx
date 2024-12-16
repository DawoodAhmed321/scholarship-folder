import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import { TOffer } from "@/configs/interface";
import { IoMdClose } from "react-icons/io";
import { TState } from "@/redux";
import React from "react";
import AppButton from "../app-buttons/AppButton";
import { removeOffer } from "@/redux/slices/offerSlice";
import http, { API_URL } from "@/services/http.services";
import { showToast } from "@/utils/indext";
import { removeScholarship } from "@/redux/slices/scholarshipSlice";

export default function EditOffer() {
  const [loader, setLoader] = React.useState(false);
  const modal = useSelector((state: TState) => state.modal.data) as {
    data: any;
    type: "offers" | "scholarships" | "testimonials";
    message: string;
  };

  const dispatch = useDispatch();

  const setRedux = () => {
    switch (modal.type) {
      case "offers":
        dispatch(removeOffer(modal.data.id));
        break;
      case "scholarships":
        dispatch(removeScholarship(modal.data.id));
        break;
      default:
        break;
    }
  };

  const onConfirm = async () => {
    try {
      setLoader(true);
      const resp = await http.delete(API_URL.DELETE(modal.data.id, modal.type));
      if (resp.status == 200) {
        setRedux();
        showToast(
          `${modal.type
            .toUpperCase()
            .split("")
            .filter((x, i) => i != modal.type.length - 1)
            .join("")} deleted successfully`,
          "success"
        );
      }
    } catch (error) {
      console.log("error in confirm", error);
    } finally {
      setLoader(false);
      dispatch(closeModal());
    }
  };

  return (
    <div className="bg-white py-3 px-4 rounded-md w-[95vw] max-w-screen-xs ">
      <div className="flex justify-end">
        <IoMdClose
          className="text-primary xs:text-2xl text-xl cursor-pointer text-end"
          onClick={() => dispatch(closeModal())}
        />
      </div>

      <h2 className="xs:text-2xl text-lg font-semibold mb-4 text-primary text-center">
        {modal.message}
      </h2>
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(closeModal())}
          className="bg-primary text-white py-2 px-4 rounded-md mr-2 flex-1 hover:bg-primary/90"
        >
          Cancel
        </button>
        <AppButton
          title="Confirm"
          type="danger"
          onClick={onConfirm}
          loader={loader}
        />
      </div>
    </div>
  );
}
