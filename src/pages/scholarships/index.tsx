import AppButton from "@/components/app-buttons/AppButton";
import EmptyMessage from "@/components/empty-message/EmptyMessage";
import AppLayout from "@/components/Layouts/AppLayout";
import ScholarshipCarusole from "@/components/ScholarshipCarusole";
import { TPagination, TScholarship } from "@/configs/interface";
import http, { API_URL } from "@/services/http.services";
import Link from "next/link";
import React from "react";
import SlotCounter from "react-slot-counter";

export const getServerSideProps = async () => {
  const resp = await http.get(API_URL.SCHOLARSHIPS, {
    params: {
      page: 1,
      limit: 10,
    },
  });

  const countResp = await http
    .get(API_URL.SCHOLARSHIP_COUNT)
    .catch((e) => console.log("error", e));

  if (countResp && countResp.status == 200) {
    return {
      props: {
        scholarship: resp.data,
        count: {
          bachelor: countResp.data.data.bachelor,
          master: countResp.data.data.master,
          phd: countResp.data.data.phd,
          internship: countResp.data.data.internship,
          postdoc: countResp.data.data.postdoc,
        },
      },
    };
  }

  return {
    props: {
      scholarship: resp.data,
      count: {
        bachelor: 100,
        master: 87,
        phd: 45,
        internship: 213,
        postdoc: 32,
      },
    },
  };
};

interface IScholarship {
  scholarship: {
    data: TScholarship[];
    pagination: TPagination;
  };
  count: {
    bachelor: number;
    master: number;
    phd: number;
    internship: number;
    postdoc: number;
  };
}

function Scholarship({ scholarship, count }: IScholarship) {
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

  const getCountTitle = (type: string) => {
    switch (type) {
      case "bachelor":
        return "Bachelor";
      case "master":
        return "Master";
      case "phd":
        return "Phd";
      case "internship":
        return "Internship";
      case "postdoc":
        return "Postdoc";
      default:
        return "Bachelor";
    }
  };

  return (
    <div className="md:px-32 sm:px-16 xs:px-12 px-6 ">
      {/* Slot Counter */}
      <div className="my-10 ">
        <h1 className="text-4xl font-medium">Total scholarship posts</h1>
        <div className="my-5 w-fit flex gap-x-10 sm:gap-y-10 gap-y-4 bg-gradient-to-tr from-primary/90 via-primary to-purple-500/60 sm:flex-nowrap flex-wrap xs:justify-start justify-center rounded-md text-white px-6 py-2">
          {/* {Object.keys(count).map((key, i) => (
            <div className="flex items-center flex-col" key={i}>
              <SlotCounter
                value={count[key as keyof typeof count]}
                debounceDelay={i * 1.5}
                valueClassName="sm:text-5xl text-3xl font-extralight "
                numberClassName="sm:text-5xl text-3xl font-extralight "
                duration={2}
                speed={0.8}
              />
              <p className="text-sm font-light">{getCountTitle(key)}</p>
            </div>
          ))} */}
          <SlotCounter
            value={scholarship.data.length}
            debounceDelay={1.5}
            valueClassName="sm:text-5xl text-3xl font-extralight "
            numberClassName="sm:text-5xl text-3xl font-extralight font-poppins font-semibold "
            duration={2}
            speed={0.8}
          />
        </div>
      </div>

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
              <div className="flex lg:flex-row flex-col gap-6 my-2">
                <div className=" bg-white rounded-md overflow-hidden lg:w-3/5 w-full">
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
