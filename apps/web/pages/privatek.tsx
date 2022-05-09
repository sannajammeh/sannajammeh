import Layout from "components/Layout";
import Image from "next/image";
import React from "react";
import privatekLogo from "public/images/privatek.png";
import privatekCase from "public/images/privatek-case.png";
import privatekPackaging from "public/images/privatek-case-packaging.png";
import privatekCasesPage from "public/images/privatek-case-pages.png";
import Button from "components/button";
import Link from "next/link";

const Privatek = () => {
  return (
    <Layout>
      <section className="container mx-auto mt-32 mb-32">
        <Image
          src={privatekLogo}
          width={100}
          height={100}
          placeholder="blur"
          priority
          objectFit="contain"
        />
        <div className="prose prose-invert md:max-w-[75ch]">
          <h1 className="">Website development for Privatek UB</h1>
          <p>
            Try to imagine what a breach of privacy would feel like. This is
            exactly what Privatek&apos;s Slider™ aims to solve. A seamless metal
            webcam cover which blends perfectly with the color of your MacBook
            or laptop. A perfect replacement for the ugly piece of tape everyone
            has on their device. Privatek went on the win the “best website”
            award at the Regional and National young entrepreneur championship.
          </p>
          <div className="flex gap-16">
            <div>
              <a href="https://privatek.no" target="_blank">
                Visit website
              </a>
            </div>
            <div>
              <span className="underline">Roles</span>
              <ul>
                <li>
                  <span>Website development</span>
                </li>
                <li>
                  <span>Package design</span>
                </li>
                <li>
                  <span>Graphic design</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <figure className="aspect-video relative w-full">
        <Image src={privatekCase} layout="fill" placeholder="blur" />
      </figure>
      <section className="container mx-auto my-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="prose prose-invert md:max-w-[75ch]">
            <h2 className="">A universal design package</h2>
            <p>
              The packaging of a product is almost as significant as the product
              itself. I was able to produce a uniform package design for both
              retail and online businesses by collaborating with Privatek.
            </p>
          </div>
          <div className="px-8 py-4">
            <Image src={privatekPackaging} placeholder="blur" />
          </div>
        </div>
      </section>
      <figure className="aspect-video relative w-full">
        <Image src={privatekCasesPage} layout="fill" placeholder="blur" />
      </figure>
      <section className="container mx-auto my-16 grid items-center">
        <Link href="/" passHref>
          <Button className="mx-auto">Back to home</Button>
        </Link>
      </section>
    </Layout>
  );
};

export default Privatek;
