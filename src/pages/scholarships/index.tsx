import AppLayout from "@/components/Layouts/AppLayout";
import ScholarshipCarusole from "@/components/ScholarshipCarusole";
import React from "react";

function Scholarship() {
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
        <h3 className="text-2xl ">
          Why hello again. We also love print. We love colours and branding and
          getting your print work just perfect. Click me to edit me.
        </h3>
      </div>
      {/* Scholarships */}
      <div className="my-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <div className="flex md:flex-row flex-col gap-6 my-2">
              <div className="basis-2/3 bg-white rounded-md overflow-hidden  ">
                <ScholarshipCarusole
                  item={{
                    id: index,
                  }}
                />
              </div>
              <div className="basis-1/3 p-2 flex flex-col gap-4">
                <h2 className="md:text-[82px] md:text-7xl sm:text-6xl text-5xl font-semibold">
                  #{index + 1}
                </h2>
                <h2 className="text-2xl font-bold">Print Work</h2>
                <p className="text-sm text-black/50">
                  I'm a paragraph. Click here to add your own text and edit me.
                  I’m a great place for you to tell a story and let your users
                  know a little more about you.
                  <br />
                  <br />
                  <br />
                  This is a great space to write long text about your company
                  and your services. You can use this space to go into a little
                  more detail about your company.
                </p>
              </div>
            </div>
            <div className="h-1 bg-blue-400 my-8"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

Scholarship.Layout = AppLayout;
export default Scholarship;
