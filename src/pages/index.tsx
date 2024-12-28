import AppLayout from "@/components/Layouts/AppLayout";
import { Testimonials } from "@/components/Testimonials";
import VerticalMarquee from "@/components/vertical-marquee/VerticalMarquee";
import { ITestimonial, TOffer } from "@/configs/interface";
import http, { API_URL } from "@/services/http.services";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const resp = await http.get(API_URL.HOME);
  return {
    props: {
      data: resp.data.data,
    },
  };
}

interface IHome {
  data: {
    title: string;
    facebook: string;
    twitter: string;
    instagram: string;
    mobile: string;
    email: string;
    address: string;
    start_time: string;
    end_time: string;
    testimonials: ITestimonial[];
    offers: TOffer[];
  };
}

function Home({ data }: IHome) {
  return (
    <div className={` bg-secondary `}>
      {/* Hero Section */}
      <div className="flex lg:flex-row flex-col items-center lg:gap-0 gap-4 lg:px-32 md:px-20 sm:px-16 xs:px-12 px-6 pb-8">
        <div className="py-4 xl:max-w-screen-sm max-w-[400px]  flex justify-center ">
          <h2 className="hero-heading md:text-6xl xs:text-4xl text-3xl leading-snug font-bitter font-medium  ">
            {data.title}
          </h2>
        </div>
        <div className="flex-1">
          <h2
            className=" 
          text-xl font-semibold text-primary text-end my-2
          "
          >
            New Offers
          </h2>
          <div className=" max-h-60 border border-black/20 rounded-md overflow-hidden px-2 shadow-square shadow-black/20">
            <VerticalMarquee
              items={data.offers}
              renderItem={(item, index) => (
                <div
                  key={index}
                  className="flex gap-2 p-2 rounded-md bg-white/80  my-1 items-center shadow-square shadow-black/10"
                >
                  <div>
                    <img
                      src={item.image.url}
                      alt="offer"
                      className="size-16 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 font-bitter">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-xs line-clamp-3">{item.description}</p>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Testimonials */}

      {data && data.testimonials && (
        <Testimonials testimonials={data.testimonials} />
      )}
    </div>
  );
}

Home.Layout = AppLayout;
export default Home;
