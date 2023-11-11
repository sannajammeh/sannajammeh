/* eslint-disable @next/next/no-img-element */
import { lazy, Suspense } from "react";
import Layout from "../components/Layout";
import { CgArrowDown } from "react-icons/cg";
import * as Section from "../components/section";
import * as Card from "components/card";
import { Parallax, useParallax } from "react-scroll-parallax";
import { SiFigma, SiNestjs, SiReact } from "react-icons/si";
import { NextSeo } from "next-seo";
import Button from "components/button";
import Image from "next/future/image";
import Link from "next/link";

import emilie from "public/images/emilie.jpeg";
import shad from "public/images/shad.jpeg";
import { Trophy } from "../components/Trophy";
import ProjectCard from "components/ProjectCard";

const Wave = lazy(() => import("components/wave"));
const SkillSlider = lazy(() => import("components/skill-slider"));

export default function Index() {
  const { ref: titleRef } = useParallax<HTMLDivElement>({
    speed: 10,
  });

  const { ref: asideRef } = useParallax<HTMLDivElement>({
    speed: -5,
    opacity: [0, 1],
  });

  const { ref: skillsAsideRef } = useParallax<HTMLDivElement>({
    speed: -5,
    opacity: [0, 1],
  });

  const { ref: proofAsideRef } = useParallax<HTMLDivElement>({
    speed: -5,
    opacity: [0, 1],
  });

  return (
    <>
      <NextSeo
        title="Sanna Jammeh | Fullstack Developer"
        description="Fullstack developer based in Oslo, Norway, with a passion for design and complex applications."
      />
      <Layout>
        <section id="hero" className="relative h-screen">
          <Suspense fallback={<></>}>
            <Wave />
          </Suspense>
          <div className="absolute top-1/2 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 w-3/4 px-4 md:px-0 md:w-auto">
            <div ref={titleRef}>
              <h1 className="text-6xl w-full md:text-8xl md:whitespace-nowrap xl:text-[9rem] font-bold">
                SANNA <span className="text-bordered-light">JAMMEH</span>
              </h1>
              <h2 className="text-2xl font-medium lg:text-right">
                I make cool stuff that performs.
              </h2>
              <div className="flex gap-4 mt-4 md:-mt-8">
                <Button href="/resume.pdf" target="_blank" className="!text-lg">
                  Download my CV
                </Button>
                <Button href="#contact" className="!text-lg">
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
          <button
            role="link"
            className="absolute bottom-16 md:bottom-8 right-8 flex flex-col items-center gap-1 !cursor-pointer"
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
          </button>
        </section>
        <Section.Root className="min-h-screen container mx-auto">
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
                full-stack engineering leads to excellent consumer experiences
                in digital goods.
              </p>
            </Parallax>
            <Parallax speed={5} opacity={[0, 1]}>
              <p>
                I aim to bridge the gap between design and engineering
                disciplines and function as a catalyst for quick, iterative
                engineering processes within agile product teams as an expert in
                modular design systems and component libraries.
              </p>
            </Parallax>
            <Parallax speed={5} opacity={[0, 1]}>
              <p>
                My technical knowledge covers a wide range of front- & back-end
                technologies, from current SPA/SSR app development to
                accessibility optimization, large enterprise backends and
                testing.
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
            <Parallax speed={5} opacity={[0, 1]}>
              <p>
                I lead, I consult or I just build the thing, it depends on you
                and the role you want me to take.
              </p>
            </Parallax>
            <Parallax speed={5} opacity={[0, 1]} easing="easeOutSine">
              <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-16">
                <div className="col-span-1">
                  <SiFigma className="text-8xl" />
                  <span className="dashed-x h-1 w-2/3 md:w-full block my-6"></span>

                  <h4 className="text-4xl font-bold uppercase mb-8 italic">
                    Design
                  </h4>
                  <ul className="text-base leading-8">
                    <li>Branding & identity</li>
                    <li>Web & mobile apps design</li>
                    <li>GFX</li>
                  </ul>
                </div>
                <div className="col-span-1">
                  <SiReact className="text-8xl" />
                  <span className="dashed-x h-1 w-2/3 md:w-full block my-6"></span>
                  <h4 className="text-4xl font-bold uppercase mb-8 italic">
                    Frontend
                  </h4>
                  <ul className="text-base leading-8">
                    <li>Next.js & React.js</li>
                    <li>Typescript & Javascript</li>
                    <li>Serverless</li>
                  </ul>
                </div>
                <div className="col-span-1 md:col-start-2">
                  <SiNestjs className="text-8xl" />
                  <span className="dashed-x h-1 w-2/3 md:w-full block my-6"></span>
                  <h4 className="text-4xl font-bold uppercase mb-8 italic">
                    Backend
                  </h4>
                  <ul className="text-base leading-8">
                    <li>Node.js & Nest.js</li>
                    <li>AWS, Supabase, Firebase</li>
                    <li>PostgresSQL, NoSQL</li>
                  </ul>
                </div>
              </div>
            </Parallax>
          </Section.Content>
          <Section.Content fullWidth className="pb-32 pt-24">
            <Suspense>
              <SkillSlider />
            </Suspense>
          </Section.Content>
        </Section.Root>
        <Section.Root className="mb-16 min-h-screen !grid-cols-[1fr,_1fr] flex-wrap">
          <Section.Aside ref={proofAsideRef}>
            <Section.Number>03</Section.Number>
            <Section.Title>
              WANT <br />
              PROOF?
            </Section.Title>
            <Section.Description>
              Have a look at what these clients have said about me.
            </Section.Description>
          </Section.Aside>
          <Section.Content className="pt-24 h-max">
            <Card.Root>
              <Card.Border />
              <Card.Content>
                <figure className="prose prose-invert !max-w-max">
                  <div className="not-prose p-2 border-dashed border-radix-slate9 border w-max mx-auto rounded-full mb-2">
                    <Image
                      src={shad}
                      placeholder="blur"
                      loading="lazy"
                      width={60}
                      height={60}
                      className="object-cover rounded-full"
                      alt="Emilie avatar"
                    />
                  </div>
                  <div className="flex flex-wrap items-center mb-4 gap-2 not-prose">
                    <div className="flex items-center">
                      {`</>`}
                      <p className="leading-tight">
                        Lead developer <br />
                        <small className="text-radix-slate11">
                          @ Cartable Nordic Ltd.
                        </small>
                      </p>
                    </div>
                    <Link href="/cartable" passHref>
                      <Button className="ml-auto">View case</Button>
                    </Link>
                  </div>
                  <blockquote className="text-radix-slate11 leading-loose">
                    Sanna has consistently delivered high-quality work for our
                    and client&apos;s projects. He is a pleasure to work with
                    and a pleasure to be around. He has great work ethic and is
                    always ready to help. Working with Sanna we were able to
                    develop our new course platform in record time. He&apos;s
                    been a great addition to our team as the lead developer.
                  </blockquote>
                  <figcaption className="text-center">
                    <span className="text-radix-slate12 text-lg font-medium text-center">
                      Shad Ibrahim Hussein
                    </span>
                    <br />
                    <span>CEO Cartable Nordic ltd.</span>
                  </figcaption>
                </figure>
              </Card.Content>
            </Card.Root>
          </Section.Content>

          <Section.Content>
            <div className="grid grid-cols-1 gap-16 mt-16">
              <Card.Root className="col-span-1">
                <Card.Border />
                <Card.Content>
                  <figure className="prose prose-invert !max-w-max">
                    <div className="not-prose p-2 border-dashed border-radix-slate9 border w-max mx-auto rounded-full mb-2">
                      <Image
                        src={emilie}
                        placeholder="blur"
                        loading="lazy"
                        width={60}
                        height={60}
                        className="object-cover rounded-full"
                        alt="Emilie avatar"
                      />
                    </div>
                    <div className="flex flex-wrap items-center mb-4 gap-2 not-prose">
                      <div className="flex items-center">
                        <Trophy />
                        <p className="leading-tight">
                          Awarded best website <br />
                          <small className="text-radix-slate11">
                            2018 Norwegian Young Entrepreneur Championship
                          </small>
                        </p>
                      </div>
                      <Link href="/privatek" passHref>
                        <Button className="ml-auto">View case</Button>
                      </Link>
                    </div>
                    <blockquote className="text-radix-slate11 leading-loose">
                      In a unique way, the winner motivates us to purchase the
                      goods. Because it is so professional and has such a
                      beautiful design. The page, which has all of the main
                      information, is simple to navigate. Furthermore, the
                      website is mobile-friendly and provides a variety of
                      payment alternatives and languages. This organization has
                      given careful consideration to every detail and, without a
                      doubt, provides the finest user experience.
                    </blockquote>
                    <figcaption className="text-center">
                      <span className="text-radix-slate12 text-lg font-medium text-center">
                        Emilie Caspara Røed Kjønnerud
                      </span>
                      <br />
                      <span>Product Manager Visma</span>
                    </figcaption>
                  </figure>
                </Card.Content>
              </Card.Root>
            </div>
          </Section.Content>
        </Section.Root>

        <Section.Root className="mb-16">
          <Section.Content fullWidth>
            <h1>
              <span className="text-3xl font-bold uppercase mb-8 italic">
                Projects & open source
              </span>
            </h1>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCard
                title="tRPC-SWR"
                description="Created and implemented RFC to add support for tRPC v10 Proxy API"
                href="https://github.com/sachinraja/trpc-swr/issues/19"
                role="Contributor"
                image="https://github.com/sachinraja/trpc-swr/raw/main/assets/banner.png"
                target="_blank"
              />
              <ProjectCard
                title="tw-classed"
                description="React library for creating reusable Tailwind components"
                href="https://tw-classed.vercel.app"
                image="https://tw-classed.vercel.app/api/og.png"
                role="Creator"
                target="_blank"
              />
              <ProjectCard
                title="Next.js"
                description="Enabled support for ES decorators"
                href="https://github.com/vercel/next.js/pull/32914"
                role="Contributor"
                target="_blank"
              />
            </div>
          </Section.Content>
        </Section.Root>
      </Layout>
    </>
  );
}
