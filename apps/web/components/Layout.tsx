import Head from "next/head";
import Nav from "./Nav";

import "smooth-scrollbar/dist/smooth-scrollbar.css";
import Footer from "./Footer";
import clsx from "clsx";

export default function Layout({
  children = null,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <Nav />
      <main className={clsx(className, "min-h-screen")}>{children}</main>
      <Footer />
    </>
  );
}
