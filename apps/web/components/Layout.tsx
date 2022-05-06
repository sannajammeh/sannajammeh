import Head from "next/head";
import { useRouter } from "next/router";

import Nav from "./Nav";

import "smooth-scrollbar/dist/smooth-scrollbar.css";

export default function Layout({ children = null, title = "Sanna Jammeh" }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
      <main>{children}</main>
    </>
  );
}
