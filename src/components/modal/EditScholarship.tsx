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
import { isStringArray, showToast } from "@/utils/indext";
import { TState } from "@/redux";
import { TScholarship } from "@/configs/interface";
import Image from "next/image";
import { updateScholarship } from "@/redux/slices/scholarshipSlice";
import DatePicker from "../app-date-picker/AppDatePicker";

const scholarshipSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  images: Yup.array()
    .of(Yup.mixed<File | string>())
    .min(1)
    .max(4, "Cannot select more than 4 images")
    .required(),
  deadline: Yup.date().required(),
  link: Yup.string().required(),
  is_active: Yup.boolean().required(),
});

export default function EdirScholarship() {
  const scholarships = useSelector(
    (state: TState) => state.modal.data
  ) as TScholarship;

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: scholarships.title,
      description: scholarships.description,
      images: scholarships.images.map((img) => img.url),
      deadline: new Date(scholarships.deadline),
      link: scholarships.link,
      is_active: scholarships.is_active,
    },
    resolver: yupResolver(scholarshipSchema),
  });

  const images = watch("images");

  const dispatch = useDispatch();

  const editScholarship = async (value: {
    title: string;
    description: string;
    images: (string | File | undefined)[];
    is_active: NonNullable<boolean | undefined>;
    deadline: Date;
    link: string;
  }) => {
    try {
      const data = new FormData();
      data.append("id", scholarships.id.toString());
      data.append("title", value.title);
      data.append("description", value.description);
      data.append("deadline", value.deadline.toISOString());
      data.append("link", value.link);

      for (let i = 0; i < value.images.length; i++) {
        if (typeof value.images[i] !== "string") {
          data.append("images", value.images[i]!);
        }
      }

      data.append(
        "images",
        JSON.stringify(value.images.filter((img) => typeof img === "string"))
      );

      data.append("is_active", value.is_active.toString());
      const resp = await http.put(API_URL.SCHOLARSHIPS, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (resp.status == 200) {
        showToast("Scholarship updated successfully", "success");
        dispatch(updateScholarship(resp.data.data));
        dispatch(closeModal());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="bg-white py-3 px-4 rounded-md w-[95vw] max-w-screen-sm ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Edit Scholarship
        </h2>
        <IoMdClose
          className="text-primary text-2xl cursor-pointer"
          onClick={() => dispatch(closeModal())}
        />
      </div>
      <form onSubmit={handleSubmit(editScholarship)}>
        <AppInput
          placeholder="Enter Scholarship Ttitle"
          {...register("title")}
          error={errors.title?.message}
        />
        <div className="flex xs:flex-row flex-col gap-4 my-3">
          <div className="basis-1/2">
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="border border-secondary/50 py-2"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
            {errors.deadline && (
              <p className="text-red-500 text-[10px]  ml-1">
                {errors.deadline.message}
              </p>
            )}
          </div>
          <div className="basis-1/2">
            <AppInput
              placeholder="Enter Scholarship Link"
              {...register("link")}
              error={errors.link?.message}
            />
          </div>
        </div>
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
            <div className="flex items-center gap-2">
              {images &&
                images.map((file, index) =>
                  typeof file == "string" ? (
                    <div
                      key={index}
                      className="flex items-center gap-2 my-2 border border-secondary/20 px-2 py-1 rounded-md relative"
                    >
                      <Image
                        src={file}
                        alt="image"
                        width={100}
                        height={100}
                        className="w-10 h-10 object-cover"
                      />
                      <IoMdClose
                        className="bg-red-500 rounded-full text-white text-xl cursor-pointer absolute top-0 right-0"
                        onClick={() => {
                          setValue(
                            "images",
                            images.filter((_, i) => i !== index)
                          );
                        }}
                      />
                    </div>
                  ) : null
                )}
            </div>
            <Controller
              name="images"
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
                        let selectedFiles: File[] = [];
                        Object.values(e.target.files).forEach((file) => {
                          selectedFiles.push(file);
                        });
                        field.onChange([...field.value, ...selectedFiles]);
                      }
                    }}
                    multiple
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex items-center gap-2 border border-secondary/50 px-2 py-1 rounded-md w-fit"
                  >
                    {
                      <span className="text-primary line-clamp-1">
                        {field.value && !isStringArray(field.value)
                          ? field.value
                              .filter((file) => typeof file == "object")
                              .map((file) => file.name)
                              .join(", ")
                          : "Upload Images"}
                      </span>
                    }
                  </label>
                </div>
              )}
            />
            {errors.images && (
              <p className="text-red-500 text-[10px]  ml-1">
                {errors.images.message}
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
        <AppButton title="Add Offer" type="primary" className="mt-4 " />
      </form>
    </div>
  );
}
