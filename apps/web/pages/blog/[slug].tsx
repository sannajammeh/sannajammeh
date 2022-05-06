import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import Layout from "../../components/Layout";
import { getAllFrontmatter, getMdxBySlug } from "utils/mdx";
import { Frontmatter } from "types/frontmatter";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";

interface Props {
  frontmatter: Frontmatter;
  code: string;
}

const BlogEntry: NextPage<Props> = ({ frontmatter, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Layout>
      <main className="mx-auto px-4 pt-32 prose prose-invert xl:max-w-[75ch]">
        {frontmatter.mainImage && (
          <div className="relative aspect-video">
            <Image
              src={frontmatter.mainImage}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <Component />
      </main>
    </Layout>
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

  return {
    props: {
      frontmatter,
      code,
    },
  };
};
