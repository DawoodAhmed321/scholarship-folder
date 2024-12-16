import AppLayout from "@/components/Layouts/AppLayout";
import { Testimonials } from "@/components/Testimonials";
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

function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} bg-secondary `}
    >
      {/* Hero Section */}
      <div className="py-12 max-w-screen-lg">
        <h2 className="hero-heading md:text-6xl xs:text-4xl text-3xl leading-snug font-mono font-medium lg:px-32 md:px-20 sm:px-16 xs:px-12 px-6 py-4">
          We Are A Scholarship Agency That Thinks Differently
        </h2>
      </div>

      {/* Testimonials */}

      <Testimonials />
    </div>
  );
}

Home.Layout = AppLayout;
export default Home;
