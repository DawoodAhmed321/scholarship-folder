import { TOffer } from "@/configs/interface";
import { TState } from "@/redux";
import { closeModal } from "@/redux/slices/modalSlice";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function OfferDetails() {
  const offer = useSelector((state: TState) => state.modal.data) as TOffer;
  const dispatch = useDispatch();

  return (
    <div className="w-screen h-screen  text-white overflow-y-scroll relative">
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/90 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <h2 className="text-2xl text-center"> {offer.title}</h2>

        <div className="p-8">
          <p className="text-lg text-center">{offer.description}</p>
        </div>
      </div>
      <IoClose
        className="text-3xl absolute z-30 top-6 right-6 cursor-pointer bg-red-500 rounded-full"
        onClick={() => {
          dispatch(closeModal());
        }}
      />
      <img
        //   layout="fill"
        src={offer.image.url}
        alt="offer"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
