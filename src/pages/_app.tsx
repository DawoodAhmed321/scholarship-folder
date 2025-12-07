import EmptyLayout from "@/components/Layouts/EmptyLayout";
import ManagedModal from "@/components/modal";
import Toast from "@/components/toast";
import { store } from "@/redux";
import "@/styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "swiper/css";
import { Bitter, Poppins } from "next/font/google";

const font = Bitter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-bitter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

interface IAppComonent extends AppProps {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: typeof EmptyLayout;
  };
}

export default function App({ Component, pageProps }: IAppComonent) {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <div className={`${font.variable} ${poppins.variable}`}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toast />
        <ManagedModal />
      </Provider>
    </div>
  );
}
