import EmptyLayout from "@/components/Layouts/EmptyLayout";
import ManagedModal from "@/components/modal";
import Toast from "@/components/toast";
import { store } from "@/redux";
import "@/styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "swiper/css";

interface IAppComonent extends AppProps {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: typeof EmptyLayout;
  };
}

export default function App({ Component, pageProps }: IAppComonent) {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toast />
      <ManagedModal />
    </Provider>
  );
}
