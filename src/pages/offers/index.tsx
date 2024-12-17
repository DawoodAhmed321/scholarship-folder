import AppLayout from "@/components/Layouts/AppLayout";
import { TOffer, TPagination } from "@/configs/interface";
import http, { API_URL } from "@/services/http.services";
import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import Image from "next/image";
import Loader from "@/components/loader/Loader";
import { FcVoicePresentation } from "react-icons/fc";
import EmptyMessage from "@/components/empty-message/EmptyMessage";

export const getServerSideProps = async () => {
  const resp = await http.get(API_URL.OFFERS, {
    params: {
      page: 1,
      limit: 10,
    },
  });

  return {
    props: {
      data: resp.data,
    },
  };
};

interface IOffer {
  data: {
    data: TOffer[];
    pagination: TPagination;
  };
}

function Offers({ data }: IOffer) {
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

  return (
    <div className="md:px-32 sm:px-16 xs:px-12 px-6">
      {/* Heding */}
      <div className="my-12 hero-heading">
        <h1 className="md:text-7xl xs:text-5xl text-4xl font-medium">
          <span className="underline decoration-blue-400">Offers</span> For You
        </h1>
      </div>
      {/* Main Banner */}
      <div className="">
        <img src="/images/mac.png" alt="mac" className="w-full" />
      </div>

      <h3 className="xs:text-3xl text-xl font-medium my-12">
        Why hello there. Want to see more of our work? Check out just some of
        what we've been up to below.
      </h3>

      {offers.data.length < 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {offers.data.map((offer, index) => (
            <div
              key={index}
              className="relative size-60 rounded-full overflow-hidden cursor-pointer border border-black/20 mx-auto"
            >
              <div className="fade-in px-2 absolute z-20 top-0 left-0 right-0 bottom-0 bg-black/40 opacity-0  hover:opacity-100 transition-all duration-300 ease-in-out flex justify-center items-center ">
                <p className="text-white text-sm">{offer.description}</p>
              </div>
              <Image
                src={offer.image.url}
                alt="mac"
                className="size-full object-cover"
                layout="fill"
              />
            </div>
          ))}
          {offers.pagination.current_page < offers.pagination.last_page && (
            <div
              onClick={loadMore}
              className=" size-60 flex justify-center items-center text-lg rounded-full overflow-hidden cursor-pointer border border-black/20 mx-auto bg-primary text-white hover:bg-primary/80"
            >
              {load ? <Loader className="w-16 h-16" /> : <p>See More</p>}
            </div>
          )}
        </div>
      ) : (
        <EmptyMessage message="No offers found" />
      )}
    </div>
  );
}

Offers.Layout = AppLayout;
export default Offers;
