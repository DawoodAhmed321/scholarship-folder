import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { AppInput } from "../app-inputs/AppInput";
import AppButton from "../app-buttons/AppButton";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";

const offerSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  image: Yup.mixed<File>()
    .required()
    .test("fileSize", "File size cannot exced 3mb", (value) => {
      if (value.size > 3 * 1024 * 1024) {
        return false;
      }
      return true;
    }),
  is_active: Yup.boolean().required(),
});

export default function NewOffer() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(offerSchema),
  });

  const dispatch = useDispatch();

  return (
    <div className="bg-white py-3 px-4 rounded-md w-[95vw] max-w-screen-sm ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Add New Offer
        </h2>
        <IoMdClose
          className="text-primary text-2xl cursor-pointer"
          onClick={() => dispatch(closeModal())}
        />
      </div>
      <form onSubmit={handleSubmit((values) => console.log(values))}>
        <AppInput
          placeholder="Enter Offer Name"
          {...register("name")}
          error={errors.name?.message}
        />
        <div className="my-4">
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Enter Description"
            className="border border-secondary/50 outline-none w-full p-2 rounded-md "
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-[10px]  ml-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex items-center gap-2 border border-secondary/50 px-2 py-1 rounded-md max-w-60"
                  >
                    <span className="text-primary line-clamp-1">
                      {field.value
                        ? field.value.name.toString().split("\\").pop()
                        : "Upload Image"}
                    </span>
                  </label>
                </div>
              )}
            />
            {errors.image && (
              <p className="text-red-500 text-[10px]  ml-1">
                {errors.image.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="is_active">Is Active</label>{" "}
            <input
              type="checkbox"
              id="is_active"
              {...register("is_active")}
              defaultChecked
            />
          </div>
        </div>
        <AppButton
          title="Add Offer"
          type="primary"
          className="mt-4 "
          onClick={() => console.log("clicked", register("image"))}
        />
      </form>
    </div>
  );
}
