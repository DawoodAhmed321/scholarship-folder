import AppLayout from "@/components/Layouts/AppLayout";
import { Testimonials } from "@/components/Testimonials";
import { ITestimonial } from "@/configs/interface";
import http, { API_URL } from "@/services/http.services";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function getServerSideProps<GetServerSideProps>(
  context: GetServerSidePropsContext
) {
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
    testimonials: ITestimonial[];
  };
}

function Home({ data }: IHome) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} bg-secondary `}
    >
      {/* Hero Section */}
      <div className="py-12 max-w-screen-lg">
        <h2 className="hero-heading md:text-6xl xs:text-4xl text-3xl leading-snug font-mono font-medium lg:px-32 md:px-20 sm:px-16 xs:px-12 px-6 py-4">
          {data.title}
        </h2>
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
