import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { AppInput } from "../app-inputs/AppInput";
import AppButton from "../app-buttons/AppButton";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import http, { API_URL } from "@/services/http.services";
import { showToast } from "@/utils/indext";
import { addScholarship } from "@/redux/slices/scholarshipSlice";
import DatePicker from "../app-date-picker/AppDatePicker";

const scholarshipSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  image: Yup.array()
    .of(Yup.mixed<File>())
    .min(1)
    .max(3, "Cannot select more than 3 images")
    .required(),
  deadline: Yup.date().required(),
  link: Yup.string().required(),
  is_active: Yup.boolean().required(),
});

export default function NewScholarship() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(scholarshipSchema),
  });

  const dispatch = useDispatch();

  const editScholarship = async (value: {
    title: string;
    description: string;
    image: (File | undefined)[];
    deadline: Date;
    link: string;
    is_active: NonNullable<boolean | undefined>;
  }) => {
    try {
      const data = new FormData();
      data.append("title", value.title);
      data.append("description", value.description);
      data.append("deadline", value.deadline.toString());
      data.append("link", value.link);
      for (let i = 0; i < value.image.length; i++) {
        data.append("images", value.image[i]!);
      }
      data.append("is_active", value.is_active.toString());
      console.log("data", data);
      const resp = await http.post(API_URL.SCHOLARSHIPS, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (resp.status == 200) {
        showToast("Scholarship updated successfully", "success");
        dispatch(addScholarship(resp.data.data));
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
          Add New Scholarship
        </h2>
        <IoMdClose
          className="text-primary text-2xl cursor-pointer"
          onClick={() => dispatch(closeModal())}
        />
      </div>
      <form onSubmit={handleSubmit(editScholarship)}>
        <AppInput
          placeholder="Enter Scholarship Name"
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
                        let selectedFiles: File[] = [];
                        Object.values(e.target.files).forEach((file) => {
                          file && selectedFiles.push(file);
                        });
                        field.onChange(selectedFiles);
                        console.log(JSON.stringify(selectedFiles));
                      }
                    }}
                    multiple
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex items-center gap-2 border border-secondary/50 px-2 py-1 rounded-md max-w-60"
                  >
                    <span className="text-primary line-clamp-1">
                      {field.value
                        ? field.value
                            .map((file) => file && file.name)
                            .join(", ")
                        : "Upload Images"}
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
