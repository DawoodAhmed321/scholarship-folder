import Collapsible from "@/components/Collapsible";
import AppLayout from "@/components/Layouts/AppLayout";
import { SOCIAL_LINKS } from "@/configs";
import Link from "next/link";
import React from "react";
import { ImLocation } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosClock, IoMdMail } from "react-icons/io";
import ContactForm from "@/components/contact-form/ContactForm";
import { useSelector } from "react-redux";
import { TState } from "@/redux";

function ContactUs() {
  const contact = useSelector((state: TState) => state.app.footer);

  const getLink = (index: number) => {
    switch (index) {
      case 0:
        return contact.facebook;
      case 1:
        return contact.instagram;
      case 2:
        return contact.twitter;
      default:
        return "/";
    }
  };

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

      <div className="flex lg:flex-row flex-col sm:my-20 my-10 xs:px-12 px-6">
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
            <Link
              href={`
              mailto:${contact.email}
              `}
              className="flex"
            >
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
                  <p className="text-xs text-black/70 break-all">
                    {contact.email}
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href={`
              tel:${contact.mobile}
              `}
              className="flex"
            >
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
                  <p className="text-sm text-black/70 ">{contact.mobile}</p>
                </div>
              </div>
            </Link>
            <div className="flex">
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
                  <p className="text-sm text-black/70 ">
                    Daily {contact.start_time} to {contact.end_time}
                  </p>
                </div>
              </div>
            </div>
            <Link
              href={`
              https://www.google.com/maps/place/${contact.address}
              `}
              className="flex"
            >
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
                  <p className="text-xs text-black/70 ">{contact.address} </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Social Media :</h3>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link, index) => (
                <Link href={getLink(index)} key={link.id} target="_blank">
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
      <div className=" xs:px-12 px-6">
        <div className="">
          <h2 className="text-3xl font-semibold">
            Got Any Questions? <br />
          </h2>
          <h2 className="text-black/40 text-3xl">
            We Got{" "}
            <span className="underline underline-offset-4 decoration-blue-400">
              Answered
            </span>{" "}
          </h2>
        </div>
        <div className="flex md:flex-row flex-col-reverse md:gap-6 gap-3 py-12">
          <div className="basis-1/2 flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Collapsible
                className="bg-white "
                collapsibleClassName="bg-white "
                key={index}
                item={{
                  title: "How can i get benifit from your services?",
                  content: (
                    <div className="p-4">
                      <p className="text-sm text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam, culpa.
                      </p>
                    </div>
                  ),
                }}
              />
            ))}
          </div>
          <div className="basis-1/2 flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Collapsible
                className="bg-white "
                collapsibleClassName="bg-white"
                key={index}
                item={{
                  title: "How can i get benifit from your services?",
                  content: (
                    <div className="p-4">
                      <p className="text-sm text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam, culpa.
                      </p>
                    </div>
                  ),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ContactUs.Layout = AppLayout;
export default ContactUs;
