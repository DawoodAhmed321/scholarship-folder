import Collapsible from "@/components/Collapsible";
import AppLayout from "@/components/Layouts/AppLayout";
import { SOCIAL_LINKS } from "@/configs";
import Link from "next/link";
import React from "react";
import { ImLocation } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosClock, IoMdMail } from "react-icons/io";
import ContactForm from "@/components/contact-form/ContactForm";

function ContactUs() {
  return (
    <div>
      <div className="text-center max-w-[340px] mx-auto hero-heading">
        <h2 className="text-3xl font-semibold">
          <span className="underline underline-offset-4 decoration-blue-400">
            Connect
          </span>{" "}
          With Our Team
        </h2>
        <p className="text-sm text-black/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          odio minus
        </p>
      </div>

      {/* Form */}

      <div className="flex lg:flex-row flex-col my-20 xs:px-12 px-6">
        <div className="basis-1/2 ">
          <ContactForm />
        </div>
        <div className="basis-1/2 lg:px-6 px-0 py-6">
          <h3 className="text-4xl font-bold mb-6">Contact Details</h3>
          <p className="text-sm text-black/70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            libero ut mollitia voluptatibus eligendi tempore voluptatem, iure
            adipisci sequi ullam?
          </p>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 my-6">
            <Link href={"/"} className="flex">
              <div
                className="flex-1 flex items-center gap-4 border border-black/20 rounded-md p-3
                  [&:hover>div>svg]:text-black [&:hover>div:nth-child(2)>h3]:text-blue-400
                  hover:bg-black [&:hover>div:nth-child(2)>p]:text-white
                  [&:hover>div:nth-child(1)]:bg-white transition-colors duration-300 ease-in-out
                "
              >
                <div className="bg-black rounded-md p-4">
                  <ImLocation className="text-white text-2xl" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">Address</h3>
                  <p className="text-sm text-black/70 ">
                    Lorem ipsum dolor sit amet,
                  </p>
                </div>
              </div>
            </Link>
            <Link href={"/"} className="flex">
              <div
                className="flex-1 flex items-center gap-4 border border-black/20 rounded-md p-3
                  [&:hover>div>svg]:text-black [&:hover>div:nth-child(2)>h3]:text-blue-400
                  hover:bg-black [&:hover>div:nth-child(2)>p]:text-white
                  [&:hover>div:nth-child(1)]:bg-white transition-colors duration-300 ease-in-out
                "
              >
                <div className="bg-black rounded-md p-4">
                  <FaPhoneAlt className="text-white text-2xl" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">Mobile</h3>
                  <p className="text-sm text-black/70 ">(+44) 123 456 789</p>
                </div>
              </div>
            </Link>
            <Link href={"/"} className="flex">
              <div
                className="flex-1 flex items-center gap-4 border border-black/20 rounded-md p-3
                  [&:hover>div>svg]:text-black [&:hover>div:nth-child(2)>h3]:text-blue-400
                  hover:bg-black [&:hover>div:nth-child(2)>p]:text-white
                  [&:hover>div:nth-child(1)]:bg-white transition-colors duration-500 ease-in-out
                "
              >
                <div className="bg-black rounded-md p-4">
                  <IoIosClock className="text-white text-2xl" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold break-all">
                    Avaialability
                  </h3>
                  <p className="text-sm text-black/70 ">Daily 9am to 5pm</p>
                </div>
              </div>
            </Link>
            <Link href={"/"} className="flex">
              <div
                className="flex-1 flex items-center gap-4 border border-black/20 rounded-md p-3
                  [&:hover>div>svg]:text-black [&:hover>div:nth-child(2)>h3]:text-blue-400
                  hover:bg-black [&:hover>div:nth-child(2)>p]:text-white
                  [&:hover>div:nth-child(1)]:bg-white transition-colors duration-300 ease-in-out
                "
              >
                <div className="bg-black rounded-md p-4">
                  <IoMdMail className="text-white text-2xl" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="text-sm text-black/70 break-all">
                    syed.saad@gmail.com
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Social Media :</h3>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <Link href={link.link} key={link.id}>
                  {link.icon({
                    className:
                      "text-2xl text-black/70 hover:text-blue-400 transition-colors duration-300 ease-in-out",
                  })}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common Queries Section */}
      <div className="bg-white py-20 xs:px-12 px-6">
        <div className="text-center  mx-auto">
          <h2 className="text-3xl font-semibold">
            Common Quries{" "}
            <span className="underline underline-offset-4 decoration-blue-400">
              Answered
            </span>{" "}
            <br />
            with Additional FAQs
          </h2>
          <p className="text-sm text-black/70 mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
            Cupiditate odio minus ipsum dolor sit
          </p>
        </div>
        <div className="flex md:flex-row flex-col-reverse gap-6 py-12">
          <div className="basis-1/2 flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Collapsible
                key={index}
                item={{
                  title: "How can i get benifit from your services?",
                  content: (
                    <div className="p-4">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam, culpa.
                      </p>
                    </div>
                  ),
                }}
              />
            ))}
          </div>
          <div className="basis-1/2 ">
            <img
              src="/images/p1.jpg"
              alt="profile"
              className="w-full object-cover  rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ContactUs.Layout = AppLayout;
export default ContactUs;
