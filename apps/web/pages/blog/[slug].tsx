import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import Layout from "../../components/Layout";
import { getAllFrontmatter, getBlurDataURL, getMdxBySlug } from "utils/mdx";
import { Frontmatter } from "types/frontmatter";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import AtomDarkPrism from "styles/atomDarkPrism";
import { NextSeo } from "next-seo";

interface Props {
  frontmatter: Frontmatter;
  code: string;
  blurDataURL?: string | null;
}

const BlogEntry: NextPage<Props> = ({ frontmatter, code, blurDataURL }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const { title, description, tags, mainImage } = frontmatter;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          images: [
            {
              url: getFullImageUrl(mainImage),
            },
          ],
        }}
      />
      <Layout>
        <main className="mx-auto px-4 pt-32 prose prose-invert xl:max-w-[75ch]">
          {frontmatter.mainImage && (
            <div className="relative aspect-video mb-4">
              <Image
                priority
                src={frontmatter.mainImage}
                placeholder={blurDataURL ? "blur" : undefined}
                blurDataURL={blurDataURL}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <Component />
        </main>
        <AtomDarkPrism />
      </Layout>
    </>
  );
};

export default BlogEntry;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get paths from markdown files in posts directory
  const posts = await getAllFrontmatter("");

  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const { frontmatter, code } = await getMdxBySlug("", slug);

  const { mainImage } = frontmatter;

  return {
    props: {
      frontmatter,
      code,
      blurDataURL: mainImage ? await getBlurDataURL(mainImage) : null,
    },
  };
};

const getFullImageUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }
  return new URL(url, import.meta.url).href;
};
