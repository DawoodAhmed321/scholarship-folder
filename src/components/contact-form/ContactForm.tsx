import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

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
});

export default function ContactForm() {
  const [loader, setLoader] = React.useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const router = useRouter();

  const submitForm = async (values: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      setLoader(true);
      const resp = await http.post(API_URL.CONTACT, values);
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
      <div className="  my-4">
        <AppInput
          type="text"
          placeholder="Enter Your Subject"
          containerClass="p-2 rounded-md border border-black/20"
          {...register("subject")}
          error={errors.subject?.message}
        />
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
      <AppButton
        title="Send Message"
        className="text-sm text-white font-semibold bg-black px-6 py-2 w-fit hover:bg-black/80 rounded-md"
        loader={loader}
      />
    </form>
  );
}
