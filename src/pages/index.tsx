import Div from "@/components/animated-container/Div";
import AppLayout from "@/components/Layouts/AppLayout";
import { Testimonials } from "@/components/Testimonials";
import VerticalMarquee from "@/components/vertical-marquee/VerticalMarquee";
import { APP_ROUTES } from "@/configs";
import { ITestimonial, TOffer } from "@/configs/interface";
import http, { API_URL } from "@/services/http.services";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

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
  //=============================== Hooks

  const router = useRouter();

  //=============================== Render
  return (
    <div className={` bg-secondary `}>
      {/* Hero Section */}
      <div className="flex lg:flex-row flex-col lg:items-center justify-between lg:gap-4 gap-4 lg:px-32 md:px-20 sm:px-16 xs:px-12 px-6 pb-8 md:min-h-96">
        <div className="py-4 xl:max-w-screen-sm lg:max-w-[400px]   ">
          <h2 className="hero-heading md:text-6xl xs:text-4xl text-3xl leading-snug font-bitter font-medium  ">
            {data.title}
          </h2>
          <Div animation="-translateY" delay={1.2}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(APP_ROUTES.CONTACT);
              }}
              className="flex max-w-96 mt-6  border border-black/20 rounded-xl overflow-hidden bg-white "
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
          </Div>
          <p className="mt-2 text-sm text-black/70 px-2">
            Stay updated about scholarships and offers
          </p>
        </div>
        <div className="lg:max-w-screen-xs lg:flex-none flex-1">
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
