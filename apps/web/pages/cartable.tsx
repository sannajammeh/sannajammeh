import Layout from "components/Layout";
import React from "react";
import Button from "components/button";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { SiCodio, SiFigma } from "react-icons/si";
import Image from "next/image";
import mockup from "public/images/mockup.png";
import dualIphone from "public/images/dual-iphone.png";
import * as Section from "components/section";
import { Parallax, useParallax } from "react-scroll-parallax";
import { GiSpeedometer } from "react-icons/gi";

const Cartable = () => {
  const { ref: asideRef } = useParallax<HTMLDivElement>({
    speed: -10,
    opacity: [0, 1],
  });
  return (
    <>
      <NextSeo
        title="Cartable - Sanna Jammeh"
        description="Case study of my role with Cartable Nordic Ltd."
      />
      <Layout>
        <section className="container mx-auto mt-32 mb-32">
          <SiCodio size="100px" className="mb-16" />
          <div className="prose prose-invert md:max-w-[75ch]">
            <h1>Lead developer & UI/UX designer at Cartable</h1>
            <p>
              Cartable does a little bit of everything tech. From consulted
              design & development to shipping their own course platform. I
              jumped in as a lead developer and spearheaded the development of
              Course Exposure (Kurshub.no), a fully fledged course platform
              tailored for the Norwegian market and exclusive courses with lots
              customer value.
            </p>
            <div className="flex gap-16">
              <div>
                <a href="https://kurshub.no" target="_blank">
                  Visit website
                </a>
              </div>
              <div>
                <span className="underline">Roles</span>
                <ul>
                  <li>
                    <span>Fullstack development</span>
                  </li>
                  <li>
                    <span>Database Engineering</span>
                  </li>
                  <li>
                    <span>Graphic design & content creation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="h-[50vh] xl:h-[125vh] grid items-center">
          <Parallax speed={-10}>
            <figure className="opacity-80 lg:-mt-32 xl:-mt-64 pointer-events-none">
              <Image
                placeholder="blur"
                className="filter drop-shadow-md"
                objectFit="contain"
                src={mockup}
              />
            </figure>
          </Parallax>
        </section>
        <Section.Root className="h-screen items-center">
          <Section.Aside ref={asideRef}>
            <Section.Number>01</Section.Number>
            <Section.Title>
              The <br />
              challenge
            </Section.Title>
          </Section.Aside>
          <Section.Content className="mt-24">
            <Parallax speed={5} opacity={[0, 1]}>
              <p className="text-2xl">
                Cartable needed a unique and modern platform for their own and
                future customers' courses. The platform needed to scale, perform
                and most importantly convert. Performance was a must. Multiple
                architectural choices were made in order to keep costs down and
                performance up.
              </p>
            </Parallax>
          </Section.Content>
        </Section.Root>

        <section className="container mx-auto mt-24">
          <div className="md:grid grid-cols-12 gap-4">
            <Parallax
              className="col-span-8"
              speed={-10}
              opacity={[0, 1]}
              easing="easeInOutQuad"
            >
              <div className="relative aspect-video filter opacity-80 drop-shadow-lg">
                <Image
                  src={dualIphone}
                  placeholder="blur"
                  layout="fill"
                  objectFit="contain"
                  sizes="30vw"
                />
              </div>
            </Parallax>
            <div className="col-span-4 mt-8">
              <SiFigma className="text-8xl" />
              <span className="dashed-x h-1 w-full md:w-full block my-6"></span>

              <h1 className="text-4xl font-bold uppercase mb-8 italic">
                Design
              </h1>
              <p className="text-2xl">
                The product team at Cartable are visionaries and as such had
                plenty of ideas for the design. They needed someone which could
                polish the ideas and make this a reality.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto mt-24 lg:h-screen grid place-items-center">
          <div className="md:grid grid-cols-2">
            <Parallax speed={10} opacity={[0.5, 1]}>
              <div>
                <GiSpeedometer className="text-8xl" />
                <span className="dashed-x h-1 w-full md:w-full block my-6"></span>
                <h1 className="text-3xl font-bold uppercase mb-8 italic">
                  Performance, performance, performance.
                </h1>
                <p className="text-2xl max-w-[65ch]">
                  From database queries, page load times, to user experience,
                  and event development environment. Nothing was left
                  unoptimized.
                </p>
              </div>
            </Parallax>
          </div>
        </section>
        <section className="container mx-auto my-16 grid items-center">
          <Link href="/" passHref>
            <Button className="mx-auto">Back to home</Button>
          </Link>
        </section>
      </Layout>
    </>
  );
};

export default Cartable;
