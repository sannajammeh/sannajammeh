import dynamic from "next/dynamic";
import { ComponentType, Suspense } from "react";
import Layout from "../components/Layout";
import { CgArrowDown } from "react-icons/cg";
import * as Section from "../components/section";
import { Parallax, useParallax } from "react-scroll-parallax";

// Logos
import Vercel from "components/logo/vercel";
import NextJSLogo from "components/logo/nextjs";
import TSLogo from "components/logo/typescript";
import JSLogo from "components/logo/javascript";
import Supabase from "components/logo/supabase";
import Figma from "components/logo/figma";

const Wave = dynamic(() => import("../components/Wave"), {
  suspense: true,
}) as ComponentType;

export default function Index() {
  const { ref: titleRef } = useParallax<HTMLDivElement>({
    speed: 10,
  });

  const { ref: asideRef } = useParallax<HTMLDivElement>({
    speed: -10,
    opacity: [0, 1],
  });

  const { ref: skillsAsideRef } = useParallax<HTMLDivElement>({
    speed: -5,
    opacity: [0, 1],
  });
  return (
    <Layout>
      <section id="hero" className="relative h-screen">
        <Suspense fallback={null}>
          <Wave />
        </Suspense>
        <div className="absolute top-1/2 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 w-3/4 px-4 md:px-0 md:w-auto">
          <div ref={titleRef}>
            <h1 className="text-6xl w-full md:text-8xl md:whitespace-nowrap xl:text-[9rem] font-bold">
              SANNA <span className="text-bordered-light">JAMMEH</span>
            </h1>
            <h2 className="text-2xl font-medium lg:text-right">
              I make cool sh#t that performs.
            </h2>
          </div>
        </div>
        <a
          className="absolute bottom-8 right-8 flex flex-col items-center gap-1 !cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <span className="text-down font-bold uppercase text-lg">
            There is more where that came from
          </span>
          <CgArrowDown className="animate-pulse" size="2rem" />
        </a>
      </section>
      <Section.Root className="h-screen container mx-auto">
        <Section.Aside ref={asideRef}>
          <Section.Number>01</Section.Number>
          <Section.Title>
            My <br />
            Philosophy
          </Section.Title>
        </Section.Aside>
        <Section.Content className="text-2xl md:text-4xl flex flex-col gap-6 pt-24 leading-normal">
          <Parallax speed={5} opacity={[0, 1]}>
            <p>
              I think that tight collaboration between design, research, and
              front-end engineering leads to excellent consumer experiences in
              digital goods.
            </p>
          </Parallax>
          <Parallax speed={5} opacity={[0, 1]}>
            <p>
              I aim to bridge the gap between design and engineering disciplines
              and function as a catalyst for quick, iterative design processes
              within agile product teams as an expert in modular design systems
              and component libraries.
            </p>
          </Parallax>
          <Parallax speed={5} opacity={[0, 1]}>
            <p>
              My technical knowledge covers a wide range of front- & back-end
              technologies, from current SPA/SSR app development to
              accessibility optimization, large enterprise backends and testing.
            </p>
          </Parallax>
        </Section.Content>
      </Section.Root>
      <Section.Root className="mt-64 md:mt-0">
        <Section.Aside ref={skillsAsideRef}>
          <Section.Number>02</Section.Number>
          <Section.Title>
            WHAT <br />I DO
          </Section.Title>
        </Section.Aside>
        <Section.Content className="text-2xl md:text-4xl flex flex-col gap-6 pt-24 leading-normal">
          {/* Logos */}
        </Section.Content>
        <Section.Content fullWidth className="pb-16">
          <div className="flex gap-12 items-center filter grayscale opacity-60">
            <Suspense>
              <Vercel />
              <NextJSLogo />
              <Supabase />
              <Figma />
              <TSLogo />
              <JSLogo />
            </Suspense>
          </div>
        </Section.Content>
      </Section.Root>
    </Layout>
  );
}
