import AppLayout from "@/components/Layouts/AppLayout";
import { TESTIMONIALS } from "@/configs";
import { GetServerSidePropsContext } from "next";
import React from "react";

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const id = +(context.query.id as string);
  const testimonial = TESTIMONIALS.find((t) => t.id === id);

  return {
    props: {
      testimonial,
    },
  };
};

interface ITestimonialDetails {
  testimonial: (typeof TESTIMONIALS)[0];
}

function TestimonialsDetails({ testimonial }: ITestimonialDetails) {
  const [selectedTestimonial, setSelectedTestimonial] =
    React.useState(testimonial);

  return (
    <div>
      <div className="px-8 mt-8 hero-heading">
        <h3 className="text-3xl  ">We Love To Have</h3>
        <h3 className="font-bold text-5xl text-primary">
          Our Smiling Customers
        </h3>
      </div>
      <div className="bg-gradient-to-tr from-secondary to-primary m-8 p-8 rounded-lg shadow-sm">
        <div className=" grid grid-cols-[repeat(9,minmax(0,1fr))] gap-6">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              className={`cursor-pointer flex justify-center ${
                index + 1 >= 10
                  ? (index + 1) % 2 != 0
                    ? "mt-16"
                    : ""
                  : (index + 1) % 2 == 0
                  ? "mt-16"
                  : ""
              }`}
              onClick={() => {
                setSelectedTestimonial(t);
              }}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
          ))}
        </div>
        {selectedTestimonial && (
          <div
            key={selectedTestimonial.id}
            className=" mt-32 flex gap-8 justify-center hero-heading"
          >
            <div className="relative">
              <div className="bg-white border-2 border-primary text-white absolute top-0 right-2 size-8 rounded-full"></div>
              <div className="bg-white border-2 border-primary text-white absolute -top-2 -right-0 size-3 rounded-full"></div>

              <img
                className="size-36 rounded-full border-2 border-primary"
                src={selectedTestimonial.image}
                alt="profile"
              />
            </div>
            <div>
              <div className="flex items-start gap-6 max-w-96">
                <img
                  src="/images/icons/comma.png"
                  alt=""
                  className="size-12 object-contain"
                />
                <p className="flex-1 mt-6">{selectedTestimonial.review}</p>
                <img
                  src="/images/icons/comma.png"
                  alt=""
                  className="size-12 object-contain rotate-180 self-end"
                />
              </div>
              <p className="text-2xl font-semibold mt-4">
                {selectedTestimonial.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

TestimonialsDetails.Layout = AppLayout;
export default TestimonialsDetails;
