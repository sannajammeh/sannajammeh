import "../styles/global.css";
import "nprogress/nprogress.css";
import React, { Suspense } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Cursor from "../components/cursor";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={null}>
        <Cursor />
      </Suspense>
      <ParallaxProvider>
        <Component {...pageProps} />
      </ParallaxProvider>
    </>
  );
}
