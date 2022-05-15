import "../styles/global.css";
import "nprogress/nprogress.css";
import React, { Suspense } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Cursor from "../components/cursor";
import { AppProps } from "next/app";
import { NextPage } from "next";

interface Props extends AppProps {
  Component: NextPage & {
    getLayout: (page: React.ReactElement) => React.ReactNode;
  };
}

export default function MyApp({ Component, pageProps }: Props) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Suspense fallback={null}>
        <Cursor />
      </Suspense>
      <ParallaxProvider>
        {getLayout(<Component {...pageProps} />)}
      </ParallaxProvider>
    </>
  );
}
