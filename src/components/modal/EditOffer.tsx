import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { AppInput } from "../app-inputs/AppInput";
import AppButton from "../app-buttons/AppButton";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import http, { API_URL } from "@/services/http.services";
import { showToast } from "@/utils/indext";
import { addOffer, updateOffer } from "@/redux/slices/offerSlice";
import { TState } from "@/redux";
import { TOffer } from "@/configs/interface";
import Image from "next/image";

const offerSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  image: Yup.mixed<File | string>()
    .required()
    .test("fileSize", "File size cannot exced 3mb", (value) => {
      if (typeof value == "string") return true;
      if (value.size > 3 * 1024 * 1024) {
        return false;
      }
      return true;
    }),
  is_active: Yup.boolean().required(),
});

export default function EditOffer() {
  const [loader, setLoader] = React.useState(false);
  const offer = useSelector((state: TState) => state.modal.data) as TOffer;

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: offer.title,
      description: offer.description,
      image: offer.image.url,
      is_active: offer.is_active,
    },
    resolver: yupResolver(offerSchema),
  });
  const image = watch("image");

  const dispatch = useDispatch();

  const editOffer = async (value: {
    title: string;
    description: string;
    image: File | string;
    is_active: NonNullable<boolean | undefined>;
  }) => {
    try {
      setLoader(true);
      const data = new FormData();
      data.append("id", offer.id.toString());
      data.append("title", value.title);
      data.append("description", value.description);
      data.append(
        "image",
        typeof value.image == "string" ? `["${value.image}"]` : value.image
      );
      data.append("is_active", value.is_active.toString());
      const resp = await http.put(API_URL.OFFERS, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (resp.status == 200) {
        showToast("Offer updated successfully", "success");
        dispatch(updateOffer(resp.data.data));
        dispatch(closeModal());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-white py-3 px-4 rounded-md w-[95vw] max-w-screen-sm ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Edit Offer</h2>
        <IoMdClose
          className="text-primary text-2xl cursor-pointer"
          onClick={() => dispatch(closeModal())}
        />
      </div>
      <form onSubmit={handleSubmit(editOffer)}>
        <AppInput
          placeholder="Enter Offer Title"
          {...register("title")}
          error={errors.title?.message}
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
            {typeof image === "string" && image.length > 0 ? (
              <div className="relative p-6 border border-secondary/50 rounded-md">
                <Image
                  src={image}
                  alt="offer"
                  width={100}
                  height={100}
                  className="w-20 h-20 object-contain "
                />
                <IoMdClose
                  className="text-primary text-2xl cursor-pointer absolute top-0 right-0"
                  onClick={() => setValue("image", "")}
                />
              </div>
            ) : (
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
                        {field.value && typeof field.value === "object"
                          ? field.value.name.toString().split("\\").pop()
                          : "Upload Image"}
                      </span>
                    </label>
                  </div>
                )}
              />
            )}
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
              defaultChecked={offer.is_active}
            />
          </div>
        </div>
        <AppButton
          title="Update Offer"
          type="primary"
          className="mt-4 "
          loader={loader}
        />
      </form>
    </div>
  );
}
