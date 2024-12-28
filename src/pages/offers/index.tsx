import EmptyMessage from "@/components/empty-message/EmptyMessage";
import AppLayout from "@/components/Layouts/AppLayout";
import Loader from "@/components/loader/Loader";
import { OfferTestimonials } from "@/components/testimonials/OfferTestimonials";
import { APP_ROUTES, OFFERS_SKILLS, SKILLS_PROCESS } from "@/configs";
import { ITestimonial, TOffer, TPagination } from "@/configs/interface";
import { openModal } from "@/redux/slices/modalSlice";
import http, { API_URL } from "@/services/http.services";
import Router from "next/router";
import React, { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useDispatch } from "react-redux";

export const getServerSideProps = async () => {
  const resp = await http.get(API_URL.OFFERS, {
    params: {
      page: 1,
      limit: 10,
    },
  });

  const response = await http.get(API_URL.TESTIMONIALS, {
    params: {
      page: 1,
      limit: 8,
    },
  });

  return {
    props: {
      data: resp.data,
      testimonials: response.data.data,
    },
  };
};

interface IOffer {
  data: {
    data: TOffer[];
    pagination: TPagination;
  };
  testimonials: ITestimonial[];
}

function Offers({ data, testimonials }: IOffer) {
  const [offers, setOffers] = useState(data);
  const [load, setLoad] = React.useState(false);
  const loadMore = async () => {
    try {
      setLoad(true);
      const resp = await http.get(API_URL.TESTIMONIALS, {
        params: {
          page: offers.pagination.current_page + 1,
          limit: 10,
        },
      });
      if (resp.status == 200) {
        setOffers({
          data: [...offers.data, ...resp.data.data],
          pagination: resp.data.pagination,
        });
      }
    } catch (error) {
      console.log("error while loading more testimonials", error);
    } finally {
      setLoad(false);
    }
  };

  const [hoverId, setHoverId] = useState<number | null>(null);

  const getHoverStyle = (index: number) => {
    return index === 0 && hoverId == null
      ? true
      : hoverId === index
      ? true
      : false;
  };

  return (
    <div className="lg:px-32 md:px-20 sm:px-16 xs:px-12 px-6">
      {/* Hero Section */}

      <div className="flex lg:flex-row flex-col gap-4 relative">
        <div className="xs:min-w-80">
          <h1 className=" lg:text-7xl md:text-5xl xs:text-4xl text-3xl font-bold text-primary mt-24">
            Watch.
            <br />
            Learn.
            <br />
            Grow.
          </h1>
        </div>
        <div className="flex flex-1 lg:flex-nowrap flex-wrap gap-y-6 ">
          {OFFERS_SKILLS.map((item, index) => (
            <div
              key={index}
              className={` transition-all duration-500 ease-in-out cursor-pointer
               md:h-[590px] h-96 overflow-hidden rounded-xl shadow-square shadow-black/10
                relative md:mx-3 ${
                  getHoverStyle(index) ? "w-full" : "md:w-60 w-full"
                } `}
              onMouseEnter={() => setHoverId(index)}
              onMouseLeave={() => setHoverId(null)}
            >
              <img
                src={item.img}
                alt="mac"
                className={` w-full h-full object-cover `}
              />
              <div
                className={`md:flex hidden absolute  z-20 top-0 left-0 right-0 bottom-0 
                  bg-black/40 transition-all duration-500  ease-in-out
                   justify-center items-center ${
                     getHoverStyle(index)
                       ? "opacity-0 pointer-events-none"
                       : "opacity-100 pointer-events-auto"
                   }`}
              >
                <div className="size-full relative ">
                  <p className="text-white text-3xl rotate-[270deg] absolute bottom-28 left-0 right-0 mx-auto ">
                    {item.name}
                  </p>
                </div>
              </div>
              <div
                className={`bg-gradient-to-b from-transparent to-black/80 transition-all duration-500 ease-in-out
                absolute inset-0 z-20 ${
                  getHoverStyle(index)
                    ? "opacity-100 pointer-events-none"
                    : "md:opacity-0 opacity-100 md:pointer-events-auto pointer-events-auto"
                }
                flex justify-center items-end
                `}
              >
                <div
                  className={`${
                    index == 0 ? " lg:pl-12 lg:pr-4 pl-4 pr-4 " : "px-4"
                  } flex justify-between w-full mb-20 `}
                >
                  <p className="text-white text-4xl">
                    {item.name} <br /> Course
                  </p>
                  <p className="text-white text-4xl">
                    {" "}
                    100 <br /> <span className="text-2xl">Topics</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            Router.push(APP_ROUTES.CONTACT);
          }}
          className="flex lg:mt-24 mt-12 max-w-96  border border-black/20 rounded-xl overflow-hidden lg:absolute right-0 left-0 bottom-20 bg-white"
        >
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email address"
            autoComplete="email"
            required
            className=" outline-none px-4 xs:py-8 py-3 flex-1 z-30 xs:w-auto w-20"
          />
          <button
            type="submit"
            className="z-30 inline-flex items-center xs:px-6 px-3 xs:py-2 py-1 border border-transparent text-base font-medium text-black bg-secondary hover:bg-primary hover:text-white transition-colors duration-500 ease-in-out"
          >
            Subscribe
          </button>
        </form>
      </div>

      <h3 className="xs:text-3xl text-center text-xl mt-24 mb-16">
        Our offers are designed to help you grow your skills and knowledge.
      </h3>
      {offers.data.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6">
            {offers.data.map((offer, index) => (
              <OfferCard key={index} offer={offer} />
            ))}
          </div>
          {offers.pagination.current_page < offers.pagination.last_page && (
            <div
              onClick={loadMore}
              className=" w-fit my-4 py-2 px-4 flex justify-center items-center text-lg rounded-full overflow-hidden cursor-pointer border border-black/20 bg-primary text-white hover:bg-primary/80"
            >
              {load ? <Loader className="w-16 h-16" /> : <p>See More</p>}
            </div>
          )}
        </>
      ) : (
        <EmptyMessage message="No offers available" />
      )}

      {/* Process Section */}

      <div>
        <div className="flex md:flex-row flex-col lg:gap-20 md:gap-12 gap-8 mt-28 mb-16">
          <div className="basis-[45%]">
            <h3 className="lg:text-5xl text-3xl">
              Get the skills you need for a job that is in demand.
            </h3>
          </div>
          <div className="basis-[55%] relative">
            <p className=" lg:text-xl text-base ">
              The modern labor market dictates its own terms. Today, to be a
              competitive specialist requires more than professional skills.
            </p>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col gap-6">
          <div className="basis-1/3 flex lg:flex-col flex-row flex-wrap lg:justify-start justify-between lg:my-0 my-8">
            {SKILLS_PROCESS.map((item, index) => (
              <div className="flex gap-8 relative py-5">
                <div>
                  <img
                    src={item.img}
                    alt=""
                    className="size-16 rounded-full bg-white p-4 object-contain"
                  />
                </div>
                <div className="flex-1 ">
                  <p className="xs:text-xl text-base pb-4">{item.name}</p>
                  <p className="xs:text-base text-xs pb-2">
                    {item.description}
                  </p>
                </div>
                {index != SKILLS_PROCESS.length - 1 && (
                  <div className="lg:block hidden  absolute left-8 top-24 bottom-0  border-l border-dashed border-black"></div>
                )}
              </div>
            ))}
          </div>
          <div className="basis-2/3 relative">
            <div className=" bg-green-600 px-4 py-5 flex justify-between xs:absolute top-0 -translate-y-1/2 left-10 right-10 mx-auto">
              <div className="flex gap-4 items-center justify-center basis-1/2">
                <h4 className=" sm:text-5xl text-3xl  font-semibold ">10</h4>
                <h4 className="sm:text-base text-xs">
                  Years <br /> experiences
                </h4>
              </div>
              <div className="flex gap-4 items-center justify-center basis-1/2 border-l border-black">
                <h4 className="sm:text-5xl text-3xl font-semibold ">250</h4>
                <h4 className="sm:text-base text-xs">
                  types of <br /> courses
                </h4>
              </div>
            </div>
            <img src="/images/p1.jpg" alt="john" className="rounded-lg" />
          </div>
        </div>
      </div>

      {/* What Our customers say */}
      <h3 className="xs:text-3xl text-center text-xl mt-24 mb-16">
        What Our Customers Say
      </h3>
      <div>
        <OfferTestimonials testimonials={testimonials} />
      </div>
    </div>
  );
}

Offers.Layout = AppLayout;
export default Offers;

const OfferCard = ({ offer }: { offer: TOffer }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col gap-4 relative overflow-hidden cursor-pointer [&:hover>svg]:top-4 
        [&:hover>div>div]:top-20 [&:hover>div>div]:opacity-100 select-none
      rounded-xl"
      onClick={() =>
        dispatch(
          openModal({
            view: "OFFER_DETAIL",
            data: offer,
          })
        )
      }
    >
      <MdOutlineArrowOutward className="z-30 absolute -top-20  transition-all duration-300 ease-in-out right-4 text-3xl text-white bg-primary rounded-full p-2 cursor-pointer" />
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={offer.image.url}
          alt={offer.title}
          className="w-full h-80 object-cover "
        />
        <div className="absolute top-80 opacity-0 bottom-0 left-0 right-0 bg-black/50 z-30 rounded-xl transition-all duration-1000 ease-in-out">
          <p className="text-white text-sm px-4 py-2">{offer.description}</p>
        </div>
      </div>
      <h3 className="text-2xl ">{offer.title}</h3>
    </div>
  );
};
