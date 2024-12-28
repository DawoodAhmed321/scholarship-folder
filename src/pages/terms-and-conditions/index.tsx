import AppLayout from "@/components/Layouts/AppLayout";
import { APP_ROUTES } from "@/configs";
import Link from "next/link";
import React from "react";

const TERMS_AN_CONDITIONS = [
  {
    title: "Reservations & Cancellations",
    href: "#reservations-&-cancellations",
  },
  {
    title: "Dietary Restrictions & Allergies",
    href: "#dietary-restrictions-&-allergies",
  },
  {
    title: "Payment Systems & Returns",
    href: "#payment-systems-&-returns",
  },
  {
    title: "Liability",
    href: "#liability",
  },
];

function PrivacyPolicy() {
  return (
    <div className="  font-primary">
      <div className="flex gap-12 px-5 xs:px-16  py-8 relative">
        {/* Contemt */}
        <div className="flex-1">
          <h1 className="text-primary text-4xl font-bold font-primary ">
            Terms & Conditions
          </h1>
          <p className="  font-primary text-sm mt-2 mb-4">
            Last updated: August 21, 2024
          </p>

          <p className=" text-base font-primary">
            This page contains the terms and conditions applied to all services
            provided by Crispy's and any associated parties.
            <br />
            <br />
            The promotions and discounts are applied under the surveillance of
            the management parties of the restaurant at the time of purchasing
            services.
            <br />
            By purchasing our services whether it is through our online portal
            by dining in or by using our website you agree to these terms.
          </p>

          <h2
            id="reservations-&-cancellations"
            className=" text-2xl font-bold font-primary my-8"
          >
            1. Reservations & Cancellations
          </h2>
          <p className=" text-base font-primary">
            All reservations for Crispy's can be made online, in person, or over
            the phone. Crispy's reserves the right to change or cancel any
            reservations in case of unexpected circumstances.
            <br />
            You are advised to arrive on time for your reservation as we are not
            able to hold tables for a long period. In case you need to cancel
            your reservation, we advise you to inform us at least an hour before
            your scheduled time.
          </p>
          <h2
            id="dietary-restrictions-&-allergies"
            className=" text-2xl font-bold font-primary my-8"
          >
            Dietary Restrictions & Allergies
          </h2>
          <p className=" text-base font-primary">
            It is strongly recommended to inform the restaurant of any dietary
            restrictions and allergies when you make your reservation.
            <br />
            Our staff will do everything possible to meet any dietary needs
            however it is essential for you to note that we cannot guarantee
            that our menu will be free of allergens.
          </p>
          <h2
            className=" text-2xl font-bold font-primary my-8"
            id="payment-systems-&-returns"
          >
            Payment Systems & Returns
          </h2>
          <p className=" text-base font-primary">
            All the prices listed in our menu are in British Pounds and can be
            modified without prior notice.
            <br />
            All forms of payment are accepted including cash or credit card.
            <br />
            A service charge might be added to your bill.
            <br />
            Unless there is a huge error from our side, there cannot be any
            refunds or exchanges made for meals cooked and served since these
            items are perishable.
          </p>

          <h2 className=" text-2xl font-bold font-primary my-8" id="liability">
            Liability
          </h2>
          <p className=" text-base font-primary">
            Regarding any personal belongings that have been lost or stolen or
            damaged, Crispy's is not held responsible.
            <br />
            In case of any allergic reactions, we are not held liable unless the
            customer has informed us of any allergens earlier or due to gross
            negligence from our side.
          </p>
          <br />
          <br />
          <h3>
            If you have any questions regarding the terms and conditions listed
            on this page, feel free to{" "}
            <Link href={APP_ROUTES.CONTACT} className="underline">
              contact{" "}
            </Link>
            Crispy's and we will do our best to answer all of your questions.
            Thank you for choosing us.
          </h3>
        </div>
        {/* Table of contents */}
        <div className=" hidden md:block md:w-56 lg:w-96 sticky top-24 max-h-[50vh] overflow-y-scroll">
          <h1 className=" text-2xl font-bold font-primary ">
            Table of Contents
          </h1>
          {TERMS_AN_CONDITIONS.map((item, index) => {
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
