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
import Performance from "components/performance";

import studio from "public/images/studio.png";
import lightStudio from "public/images/create-course.png";
import loginIphone from "public/images/login-iphone.png";
import iphone from "public/images/iphone.png";
import { useIsMobile } from "hooks/useMediaQuery";

const Cartable = () => {
  const isMobile = useIsMobile();
  const { ref: asideRef } = useParallax<HTMLDivElement>({
    speed: -10,
    opacity: [0, 1],
  });

  const { ref: iphoneRef } = useParallax<HTMLDivElement>({
    speed: isMobile ? 10 : 20,
  });
  const { ref: iphone2Ref } = useParallax<HTMLDivElement>({
    speed: isMobile ? 5 : 5,
  });

  const { ref: desktopRef } = useParallax<HTMLDivElement>({
    speed: isMobile ? -3 : -10,
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
          <Parallax speed={5} opacity={[0, 1]} easing={"easeOutQuint"}>
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
              speed={-5}
              opacity={[0, 1]}
              easing="easeOutQuint"
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
        <section className="container mx-auto h-screen grid place-items-center md:mt-24">
          <div className="relative w-full md:w-[70%] aspect-video mx-auto rounded-lg">
            <div className="relative w-full aspect-video" ref={desktopRef}>
              <Image
                layout="fill"
                objectFit="contain"
                src={lightStudio}
                placeholder="blur"
              />
            </div>
            <div
              className="absolute aspect-[9/18] h-[250px] md:h-[400px] left-0 md:left-[10%] shadow-md bottom-0 shadow-radix-slate3 rounded-lg overflow-hidden"
              ref={iphoneRef}
            >
              <Image
                src={loginIphone}
                placeholder="blur"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div
              className="absolute aspect-[9/18] h-[250px]  md:h-[400px] shadow-md right-0 md:right-[10%] bottom-0 shadow-radix-slate3 rounded-lg overflow-hidden"
              ref={iphone2Ref}
            >
              <Image
                src={iphone}
                placeholder="blur"
                objectFit="cover"
                objectPosition="top"
                layout="fill"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto mt-24 lg:h-screen grid place-items-center">
          <div className="md:grid grid-cols-2 gap-4 md:gap-8">
            <Parallax speed={5} opacity={[0.5, 1]}>
              <div>
                <GiSpeedometer className="text-8xl" />
                <span className="dashed-x h-1 w-full md:w-full block my-6"></span>
                <h1 className="text-3xl font-bold uppercase mb-8 italic">
                  <span className="hidden md:inline-block">
                    Performance, performance,{" "}
                  </span>{" "}
                  performance<span className="hidden md:inline-block">.</span>
                </h1>
                <p className="text-2xl max-w-[65ch]">
                  From database queries, page load times, to user experience,
                  and event development environment. Nothing was left
                  unoptimized.
                </p>
              </div>
            </Parallax>
            <div className="flex justify-between items-center mt-16 md:mt-0">
              <div className="flex flex-col items-center">
                <Performance score={98} />
                <p className="font-bold text-lg">Performance</p>
              </div>
              <div className="flex flex-col items-center">
                <Performance score={100} />
                <p className="font-bold text-lg">Accessibility</p>
              </div>
              <div className="flex flex-col items-center">
                <Performance score={100} />
                <p className="font-bold text-lg">SEO</p>
              </div>
            </div>
          </div>
        </section>

        <Section.Root className="mt-24">
          <Section.Aside>
            <Section.Number>02</Section.Number>
            <Section.Title>
              Some
              <br />
              Numbers
            </Section.Title>
            <Section.Description>For those who care</Section.Description>
          </Section.Aside>
          <Section.Content className="text-2xl md:text-4xl flex flex-col gap-6 pt-24 leading-normal">
            <p>The end result of three months of hard work and counting.</p>
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:gap-y-28">
              <div>
                <span className="font-bold font-space-mono text-8xl">
                  17.6K
                </span>
                <span className="dashed-x h-1 md:w-full block my-6"></span>
                <span className="font-bold font-space-mono uppercase">
                  Lines of code added
                </span>
              </div>
              <div>
                <span className="font-bold font-space-mono text-8xl">13+</span>
                <span className="dashed-x h-1 md:w-full block my-6"></span>
                <span className="font-bold font-space-mono uppercase">
                  Pages built
                </span>
              </div>
              <div className="md:col-start-2">
                <span className="font-bold font-space-mono text-8xl">270+</span>
                <span className="dashed-x h-1 md:w-full block my-6"></span>
                <span className="font-bold font-space-mono uppercase">
                  Commits
                </span>
              </div>
            </div>
          </Section.Content>
        </Section.Root>
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
