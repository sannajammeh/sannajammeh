import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import Layout from "../../components/Layout";
import {
  findRelatedPosts,
  getAllFrontmatter,
  getBlurDataURL,
  getMdxBySlug,
  mdxCache,
} from "utils/mdx";
import { Frontmatter } from "types/frontmatter";
import { getMDXExport, MDXContentProps } from "mdx-bundler/client";
import Image from "next/image";
import AtomDarkPrism from "styles/atomDarkPrism";
import { NextSeo, ArticleJsonLd } from "next-seo";
import me from "public/images/me.jpg";
import { FiBookOpen, FiChevronDown, FiChevronUp, FiList } from "react-icons/fi";
import type { Toc } from "@stefanprobst/rehype-extract-toc";
import TocRenderer from "components/toc-renderer";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { Article } from "components/article";
import clsx from "clsx";

interface Props {
  frontmatter: Frontmatter;
  code: string;
  blurDataURL?: string | null;
  related: Frontmatter[];
}

type ExportWithTOC = {
  default: React.FunctionComponent<MDXContentProps>;
  frontmatter: unknown;
  toc: Toc;
};

const BlogEntry: NextPage<Props> = ({
  frontmatter,
  code,
  blurDataURL,
  related,
}) => {
  const [isTOCOpen, setIsTOCOpen] = React.useState(false);
  const exportData = useMemo(() => getMDXExport(code) as ExportWithTOC, [code]);
  const Component = useMemo(() => exportData.default, [exportData.default]);

  const { title, description, mainImage, slug } = frontmatter;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          images: mainImage
            ? [
                {
                  url: getFullImageUrl(mainImage),
                },
              ]
            : undefined,
        }}
      />
      <ArticleJsonLd
        type="Blog"
        title={title}
        description={description}
        url={`https://sannajammeh.com/blog/${slug}`}
        images={mainImage ? [getFullImageUrl(mainImage)] : undefined}
        authorName="Sanna Jammeh"
        datePublished={frontmatter.publishedAt}
      />

      <Layout className="mb-24">
        <div className="mx-auto min-h-screen xl:px-4 w-full xl:grid xl:grid-cols-[1fr,_min(100%,_95ch),_1fr] pt-16 lg:pt-40 gap-4 xl:gap-8">
          <div className="w-full"></div>
          <aside className="sticky top-0 col-[3]">
            <div
              className={clsx(
                "top-16 bg-radix-slate3 p-4 rounded-md z-50 origin-top white lg:max-w-[70vw] w-[95vw] shadow-md mx-auto mb-6",
                "xl:w-max xl:mr-auto xl:ml-0 xl:sticky xl:top-40 xl:bg-transparent xl:p-0 xl:-translate-x-0 xl:scale-y-full xl:shadow-none "
              )}
            >
              <div className="flex items-center gap-4 text-xl lg:text-2xl text-radix-slate11 xl:justify-start">
                <h1 className="hidden xl:block">
                  <a className="flex gap-2 items-center" href="#top">
                    <FiList /> Table of contents
                  </a>
                </h1>
                <h1
                  className="xl:hidden flex items-center w-full justify-between"
                  onClick={() => setIsTOCOpen(!isTOCOpen)}
                >
                  <a className="flex gap-2 items-center" href="#top">
                    <FiList /> Table of contents
                  </a>
                  <span className="xl:hidden">
                    {isTOCOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </h1>
              </div>

              <TocRenderer
                className={clsx(
                  "text-radix-slate10 mt-2",
                  {
                    hidden: !isTOCOpen,
                  },
                  "xl:block"
                )}
                toc={exportData.toc}
              />
            </div>
          </aside>

          <section
            className="px-4 md:col-span-full lg:col-span-auto row-start-1"
            style={{ gridColumn: 2 }}
          >
            <div className="flex justify-center items-center space-x-4 flex-wrap mb-4">
              <div className="relative">
                <Image
                  priority
                  src={me}
                  alt="Sanna Jammeh's avatar"
                  objectFit="cover"
                  width={54}
                  height={54}
                  className="overflow-hidden rounded-full"
                />
              </div>

              <p>
                <span className="text-xl text-radix-slate12">Sanna Jammeh</span>
              </p>
              <span>
                <span className="text-xl text-radix-slate11">
                  {new Date(frontmatter.publishedAt).toLocaleDateString()}
                </span>
              </span>
              <div className="flex items-center text-xl text-radix-slate11">
                <FiBookOpen />
                <span className="ml-2">
                  {parseInt(String(frontmatter.readingTime.minutes))}m read
                </span>
              </div>
            </div>
            {frontmatter.mainImage && (
              <div className="w-full lg:w-[95ch] max-w-full mx-auto mb-10">
                <figure className="relative aspect-video overflow-hidden rounded-md">
                  <Image
                    priority
                    src={frontmatter.mainImage}
                    placeholder={blurDataURL ? "blur" : undefined}
                    blurDataURL={blurDataURL}
                    layout="fill"
                    objectFit="cover"
                    alt="main image"
                  />
                </figure>
              </div>
            )}

            <div className="mx-auto prose prose-invert xl:max-w-[75ch]">
              <Component />
            </div>
          </section>
        </div>
        <section
          id="articles"
          className="col-span-full container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-24"
        >
          <div className="col-span-full">
            <h4 className="font-bold text-2xl">Related articles</h4>
          </div>
          {related.map((post) => (
            <Article frontmatter={post} key={post.slug} />
          ))}
        </section>
        <AtomDarkPrism />
      </Layout>
    </>
  );
};

export default BlogEntry;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get paths from markdown files in posts directory
  const posts = await getAllFrontmatter("");
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await mdxCache.set(posts);
  }

  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const { frontmatter, code } = await getMdxBySlug("", slug);
  const related = await findRelatedPosts(slug as string);

  const { mainImage } = frontmatter;

  return {
    props: {
      frontmatter,
      code,
      blurDataURL: mainImage ? await getBlurDataURL(mainImage) : null,
      related,
    },
  };
};

const getFullImageUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }
  return new URL(url, "https://sannajammeh.com").href;
};
