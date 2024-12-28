import AppLayout from "@/components/Layouts/AppLayout";
import { APP_ROUTES } from "@/configs";
import Link from "next/link";
import React from "react";

const PRIVACY_POLICY_TABLE_OF_CONTENTS = [
  {
    title: "Consent",
    href: "#consent",
  },
  {
    title: "Information Collected By Us ",
    href: "#information-collected-by-us",
  },
  {
    title: "How we would use your information",
    href: "#how-we-would-use-your-information",
  },
  {
    title: "Withdrawing Consent",
    href: "#withdrawing-consent",
  },
];

function PrivacyPolicy() {
  return (
    <div className="  font-primary">
      <div className="flex gap-12 px-5 xs:px-16  py-8 relative">
        {/* Contemt */}
        <div className="flex-1">
          <h1 className="text-primary text-4xl font-bold font-primary ">
            Privacy Policy
          </h1>
          <p className="  font-primary text-sm mt-2 mb-4">
            Last updated: August 21, 2024
          </p>

          <p className=" text-base font-primary">
            This page contains the information recorded and collected by us and
            how the information is used.
            <br />
            <br />
            The privacy policy applies to our online activities and is ordained
            on visitors to our website regarding information that is collected
            and shared in app . This privacy policy does not apply to any
            information that is collected through channels other than this
            particular website.
          </p>

          <h2 id="consent" className=" text-2xl font-bold font-primary my-8">
            1. Consent
          </h2>
          <p className=" text-base font-primary">
            You hereby consent to our privacy policy through the use of this
            website and agree to its terms and conditions.
          </p>
          <h2
            id="information-collected-by-us"
            className=" text-2xl font-bold font-primary my-8"
          >
            Information Collected by Us
          </h2>
          <p className=" text-base font-primary">
            All the information required to be provided by you and its reasoning
            will be clearly stated when prompted for your personal information.
            By contacting us directly we may be able to collect any further
            information about you including your phone number, name, email
            address, and the content of any files or attachments you share with
            us that you freely provide.
          </p>
          <h2
            className=" text-2xl font-bold font-primary my-8"
            id="how-we-would-use-your-information"
          >
            How we would use your information:
          </h2>
          <p className=" text-base font-primary">
            We collect this information so that we can better understand your
            needs so that we can provide you with the best service, particularly
            for the reasons listed below:
          </p>

          <ul className="list-disc list-inside  text-base font-primary my-8">
            <li className=" text-base font-primary">
              Internal bookkeeping including restaurant bookings and other
              reservations
            </li>
            <li className=" text-base font-primary">
              For the process of order collection or delivery
            </li>
            <li className=" text-base font-primary">
              To provide our response when receiving any complaints, security
              concerns, and more.
            </li>
            <li className=" text-base font-primary">
              To detect and prevent any criminal activity
            </li>
            <li className=" text-base font-primary">
              To send promotional emails or any other useful information through
              the email address provided by you
            </li>
          </ul>

          <h2
            className=" text-2xl font-bold font-primary my-8"
            id="withdrawing-consent"
          >
            Withdrawing Consent
          </h2>
          <p className=" text-base font-primary">
            You have the right to withdraw consent for us to use your data at
            any time. A lot of the information in this privacy policy is not
            based on your consent therefore whenever we are legally permitted,
            we may continue the usage of your data.
          </p>
          <br />
          <br />
          <br />
          <h3>
            Please feel free to{" "}
            <Link href={APP_ROUTES.CONTACT} className="underline">
              contact us
            </Link>{" "}
            if you have any additional questions regarding our privacy policy or
            if you would like additional information.
          </h3>
        </div>
        {/* Table of contents */}
        <div className=" hidden md:block md:w-56 lg:w-96 sticky top-24 max-h-[50vh]">
          <h1 className=" text-2xl font-bold font-primary ">
            Table of Contents
          </h1>
          {PRIVACY_POLICY_TABLE_OF_CONTENTS.map((item, index) => {
            return (
              <Link
                key={item.title}
                href={item.href}
                scroll={false}
                className={`flex gap-2 group xl:text-lg xs:text-base text-sm flex-shrink-0  font-primary  px-3 py-2 duration-300 hover:bg-primary hover:text-white  rounded-lg `}
              >
                <p>{index + 1}.</p>
                <p className="underline decoration-thin underline-offset-2">
                  {item.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

PrivacyPolicy.Layout = AppLayout;

export default PrivacyPolicy;
