import AppLayout from "@/components/Layouts/AppLayout";
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
  return <div className={`${geistSans.variable} ${geistMono.variable}`}></div>;
}

Home.Layout = AppLayout;
export default Home;
