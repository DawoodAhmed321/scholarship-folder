import AppButton from "@/components/app-buttons/AppButton";
import EmptyMessage from "@/components/empty-message/EmptyMessage";
import AppLayout from "@/components/Layouts/AppLayout";
import ScholarshipCarusole from "@/components/ScholarshipCarusole";
import { TPagination, TScholarship } from "@/configs/interface";
import http, { API_URL } from "@/services/http.services";
import Link from "next/link";
import React from "react";

export const getServerSideProps = async () => {
  const resp = await http.get(API_URL.SCHOLARSHIPS, {
    params: {
      page: 1,
      limit: 10,
    },
  });

  return {
    props: {
      scholarship: resp.data,
    },
  };
};

interface IScholarship {
  scholarship: {
    data: TScholarship[];
    pagination: TPagination;
  };
}

function Scholarship({ scholarship }: IScholarship) {
  const [data, setData] = React.useState(scholarship);
  const [load, setLoad] = React.useState(false);

  const loadMore = async () => {
    try {
      setLoad(true);
      const resp = await http.get(API_URL.SCHOLARSHIPS, {
        params: {
          page: data.pagination.current_page + 1,
          limit: 10,
        },
      });
      if (resp.status == 200) {
        setData({
          data: [...data.data, ...resp.data.data],
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
    <div className="md:px-32 sm:px-16 xs:px-12 px-6 ">
      {/* Heding */}
      <div className="my-10 hero-heading">
        <h1 className="md:text-7xl xs:text-5xl text-4xl font-medium">
          <span className="underline decoration-blue-400">Scholarships</span>{" "}
          For You
        </h1>
      </div>
      <div>
        <h3 className="xs:text-3xl text-xl">
          Why hello again. We also love print. We love colours and branding and
          getting your print work just perfect. Click me to edit me.
        </h3>
      </div>
      {/* Scholarships */}
      {data.data.length > 0 ? (
        <div className="my-6">
          {data.data.map((item, index) => (
            <div key={index}>
              <div className="flex md:flex-row flex-col gap-6 my-2">
                <div className=" bg-white rounded-md overflow-hidden  ">
                  <ScholarshipCarusole item={item} />
                </div>
                <div className="flex-1 p-2 flex flex-col gap-4">
                  <h2 className="md:text-[82px] md:text-7xl sm:text-6xl text-5xl font-semibold">
                    #{index + 1}
                  </h2>
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-sm text-black/50">
                    {item.description}
                    <br />
                    <br />
                    <br />
                    Dead Line : {item.deadline}
                  </p>
                  <Link
                    href={item.link}
                    target="_blank"
                    className="text-sm text-blue-500 hover:text-blue-500/50"
                  >
                    Link : {item.link}
                  </Link>
                </div>
              </div>
              <div className="h-1 bg-blue-400 my-8"></div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyMessage message="No Scholarships Found" />
      )}
      {data.pagination.current_page < data.pagination.last_page && (
        <AppButton
          title="Load More"
          onClick={loadMore}
          className="my-6 w-fit mx-auto"
          loader={load}
        />
      )}
    </div>
  );
}

Scholarship.Layout = AppLayout;
export default Scholarship;
