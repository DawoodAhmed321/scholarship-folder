import AppLayout from "@/components/Layouts/AppLayout";
import Loader from "@/components/loader/Loader";
import { ITestimonial } from "@/configs/interface";
import http, { API_URL } from "@/services/http.services";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import React from "react";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = +(context.query.id as string);
  const testimonials = await http.get(API_URL.TESTIMONIALS, {
    params: {
      page: 1,
      limit: 18,
    },
  });
  const testimonial = await http.get(`${API_URL.TESTIMONIALS}/${id}`);
  return {
    props: {
      testimonials: testimonials.data.data,
      pagination: testimonials.data.pagination,
      testimonial: testimonial.data.data,
    },
  };
};

interface ITestimonialDetails {
  testimonial: ITestimonial;
  testimonials: ITestimonial[];
  pagination: {
    current_page: number;
    last_page: number;
  };
}

function TestimonialsDetails({
  testimonial,
  testimonials,
  pagination,
}: ITestimonialDetails) {
  const testimonialDiv = React.useRef<HTMLDivElement>(null);

  const [selectedTestimonial, setSelectedTestimonial] =
    React.useState(testimonial);
  const [load, setLoad] = React.useState(false);
  const [data, setData] = React.useState(testimonials);
  const [paginator, setPagination] = React.useState(pagination);

  const loadMore = async () => {
    try {
      setLoad(true);
      const resp = await http.get(API_URL.TESTIMONIALS, {
        params: {
          page: pagination.current_page + 1,
          limit: 18,
        },
      });
      if (resp.status == 200) {
        setData([...data, ...resp.data.data]);
        setPagination(resp.data.pagination);
      }
    } catch (error) {
      console.log("error while loading more testimonials", error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-tr from-secondary to-primary my-8 sm:mx-8 mx-4 sm:p-8 p-4 rounded-lg shadow-sm">
        <div className="px-0 mb-8 hero-heading">
          <h3 className="xs:text-3xl text-xl text-white ">We Love To Have</h3>
          <h3 className="font-bold md:text-5xl xs:text-4xl text-3xl text-white">
            Our Smiling Customers
          </h3>
        </div>
        <div className=" grid lg:grid-cols-[repeat(9,minmax(0,1fr))] sm:grid-cols-3 grid-cols-2  gap-6">
          {data.map((t, index) => (
            <div
              key={t.id}
              className={`cursor-pointer flex justify-center ${
                (index % 9) % 2 === 1 ? "lg:mt-16" : ""
              }`}
              onClick={() => {
                setSelectedTestimonial(t);
                testimonialDiv && testimonialDiv.current?.scrollIntoView();
              }}
            >
              <img
                src={t.image.url}
                alt={t.name}
                className="size-20 rounded-full bg-white object-cover"
              />
            </div>
          ))}
          {paginator.current_page < paginator.last_page && (
            <div
              className={`cursor-pointer flex justify-center ${
                (data.length % 9) % 2 === 1 ? "lg:mt-16" : ""
              }`}
            >
              <div
                onClick={loadMore}
                className="w-16 h-16 text-xs text-white rounded-full object-cover bg-primary hover:bg-primary/80 flex justify-center items-center break-all"
              >
                {load ? <Loader className="w-4 h-4" /> : <p>see more</p>}
              </div>
            </div>
          )}
        </div>
        <div ref={testimonialDiv}>
          {selectedTestimonial && (
            <div
              id="testimonial"
              key={selectedTestimonial.id}
              className=" mt-32 flex sm:flex-row flex-col gap-8 justify-center hero-heading"
            >
              <div className="relative">
                <div className="bg-white border-2 border-primary text-white absolute top-0 sm:right-2 left-24 size-8 rounded-full"></div>
                <div className="bg-white border-2 border-primary text-white absolute -top-2 sm:-right-0 left-[130px] size-3 rounded-full"></div>

                <img
                  className="size-40 rounded-full border-2 border-primary object-cover"
                  src={selectedTestimonial.image.url}
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
                    {selectedTestimonial.description}
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
    </div>
  );
}

TestimonialsDetails.Layout = AppLayout;
export default TestimonialsDetails;
