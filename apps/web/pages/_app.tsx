import "../styles/global.css";
import "nprogress/nprogress.css";
import React, { Suspense } from "react";
import Head from "next/head";
import { ParallaxProvider } from "react-scroll-parallax";
import Cursor from "../components/cursor";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Suspense fallback={null}>
        <Cursor />
      </Suspense>
      <ParallaxProvider>
        <Component {...pageProps} />
      </ParallaxProvider>
    </>
  );
}
