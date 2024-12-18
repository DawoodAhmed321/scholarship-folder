import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { AppInput } from "../app-inputs/AppInput";
import AppButton from "../app-buttons/AppButton";
import http, { API_URL } from "@/services/http.services";
import { showToast } from "@/utils/indext";
import { useRouter } from "next/router";

const contactSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  subject: Yup.string().required(),
  message: Yup.string().required(),
  type: Yup.string()
    .required()
    .oneOf(["Inquiry", "JOIN TEAM"])
    .default("Inquiry"),
  file: Yup.mixed<File>()
    .test("isRequired", "File is required", (value, context) => {
      if (context.parent.type == "JOIN TEAM" && !value) return false;
      return true;
    })
    .test(
      "PDF file of 4MB or less",
      "File can only be a PDF file of 4MB or less",
      (value) => {
        if (!value) return true;
        if (value.size > 4 * 1024 * 1024) return false;
        if (value.type !== "application/pdf") return false;
        return true;
      }
    ),
});

export default function ContactForm() {
  const [loader, setLoader] = React.useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const type = watch("type");

  const router = useRouter();

  const submitForm = async (values: {
    file?: File | undefined;
    name: string;
    email: string;
    subject: string;
    message: string;
    type: "Inquiry" | "JOIN TEAM";
  }) => {
    try {
      setLoader(true);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("subject", values.subject);
      formData.append("message", values.message);
      if (type == "JOIN TEAM") {
        formData.append("file", values.file!);
      }

      const resp = await http.post(
        type === "JOIN TEAM" ? API_URL.JOIN_TEAM : API_URL.CONTACT,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (resp.status === 200) {
        showToast(
          "Message sent successfully we'll contact you soon",
          "success"
        );
        reset();
      }
    } catch (error) {
      console.log("error while handling contact form", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-md shadow-md"
      onSubmit={handleSubmit(submitForm)}
    >
      <h3 className="text-4xl font-bold mb-6">Get In Touch With Us</h3>
      <div className="flex gap-4 ">
        <div className=" basis-1/2">
          <AppInput
            placeholder="Enter Your Name"
            {...register("name")}
            containerClass="border border-black/20"
            error={errors.name?.message}
          />
        </div>
        <div className="  basis-1/2">
          <AppInput
            type="email"
            placeholder="Enter Your Email"
            {...register("email")}
            containerClass="border border-black/20"
            error={errors.email?.message}
          />
        </div>
      </div>
      <div className=" flex gap-4 my-4">
        <div className="basis-1/2">
          <AppInput
            type="text"
            placeholder="Enter Your Subject"
            containerClass="p-2 rounded-md border border-black/20"
            {...register("subject")}
            error={errors.subject?.message}
          />
        </div>
        <div className="basis-1/2">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="p-2 rounded-md border border-black/20 w-full "
              >
                <option value="Inquiry">Inquiry</option>
                <option value="JOIN TEAM">JOIN TEAM</option>
              </select>
            )}
          />
        </div>
      </div>
      <div className="my-4">
        <div className="p-2 rounded-md border border-black/20">
          <textarea
            placeholder="Enter Your Message"
            className="border-none outline-none w-full"
            rows={4}
            {...register("message")}
          ></textarea>
        </div>
        {errors.message?.message && (
          <p className="text-red-500 mt-1 text-[10px]">
            {errors.message.message}
          </p>
        )}
      </div>

      {type === "JOIN TEAM" && (
        <div className="my-4">
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  type="file"
                  id="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer flex items-center gap-2 border border-black/20 px-2 py-1 rounded-md max-w-60 w-fit"
                >
                  <span className="text-gray-400 line-clamp-1">
                    {field.value
                      ? field.value.name.toString().split("\\").pop()
                      : "Upload your CV"}
                  </span>
                </label>
              </div>
            )}
          />
          {errors.file && (
            <p className="text-red-500 text-[10px]  ml-1">
              {errors.file.message}
            </p>
          )}
        </div>
      )}

      <AppButton
        title="Send Message"
        className="text-sm text-white font-semibold bg-black px-6 py-2 w-fit hover:bg-black/80 rounded-md"
        loader={loader}
      />
    </form>
  );
}
