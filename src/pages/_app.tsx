import EmptyLayout from "@/components/Layouts/EmptyLayout";
import "@/styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";

interface IAppComonent extends AppProps {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: typeof EmptyLayout;
  };
}

export default function App({ Component, pageProps }: IAppComonent) {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
