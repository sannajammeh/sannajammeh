import Head from "next/head";
import Nav from "./Nav";

import "smooth-scrollbar/dist/smooth-scrollbar.css";

export default function Layout({
  children = null,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <Nav />
      <main>{children}</main>
    </>
  );
}
