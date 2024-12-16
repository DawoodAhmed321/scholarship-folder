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
      <div className="bg-gradient-to-tr from-secondary to-primary my-8 sm:mx-8 mx-4 sm:p-8 p-4 rounded-lg shadow-sm">
        <div className=" grid lg:grid-cols-[repeat(9,minmax(0,1fr))] sm:grid-cols-3 grid-cols-2  gap-6">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              className={`cursor-pointer flex justify-center ${
                index + 1 >= 10
                  ? (index + 1) % 2 != 0
                    ? "lg:mt-16"
                    : ""
                  : (index + 1) % 2 == 0
                  ? "lg:mt-16"
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
            className=" mt-32 flex sm:flex-row flex-col gap-8 justify-center hero-heading"
          >
            <div className="relative">
              <div className="bg-white border-2 border-primary text-white absolute top-0 sm:right-2 left-24 size-8 rounded-full"></div>
              <div className="bg-white border-2 border-primary text-white absolute -top-2 sm:-right-0 left-[130px] size-3 rounded-full"></div>

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
                  className="xs:size-12 size-6 object-contain"
                />
                <p className="flex-1 mt-6 sm:text-lg xs:text-base text-sm">
                  {selectedTestimonial.review}
                </p>
                <img
                  src="/images/icons/comma.png"
                  alt=""
                  className="xs:size-12 size-6 object-contain rotate-180 self-end"
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
