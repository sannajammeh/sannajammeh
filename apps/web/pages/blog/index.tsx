import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Frontmatter } from "types/frontmatter";
import { getAllFrontmatter } from "utils/mdx";
import Layout from "../../components/Layout";
import { sortBy } from "lodash-es";
import { NextSeo } from "next-seo";
import { generateRSS } from "utils/rss";
import Image from "next/image";
import clsx from "clsx";
import { FiArrowLeft } from "react-icons/fi";
import IconButton from "components/icon-button";

interface Props {
  posts: Frontmatter[];
}

const BlogArticles: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <NextSeo title="Blogs | Sanna Jammeh" />
      <Layout>
        <main className="mx-auto px-4 pt-32 max-w-[65ch] xl:max-w-[75ch]">
          <header className="mb-4 relative">
            <Link passHref href="/">
              <IconButton className="!absolute top-1/2 -translate-y-1/2 -translate-x-full">
                <FiArrowLeft size="1.75rem" />
              </IconButton>
            </Link>
            <h1 className="text-4xl font-bold">Articles</h1>
          </header>
          {/* cards */}
          <section
            id="articles"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {posts.map((post) => (
              <Article frontmatter={post} key={post.slug} />
            ))}
          </section>
        </main>
      </Layout>
    </>
  );
};

export default BlogArticles;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFrontmatter("");

  const sortedPosts = sortBy(posts, "created").reverse();

  await generateRSS(posts);

  return {
    props: {
      posts: sortedPosts,
    },
  };
};

export const Article = ({ frontmatter }: { frontmatter: Frontmatter }) => {
  const date = new Date(frontmatter.publishedAt);
  return (
    <Link href={`/blog/${frontmatter.slug}`} passHref>
      <article
        role="link"
        className="group rounded-lg overflow-hidden relative"
      >
        <div className="aspect-video relative">
          <Image
            src={frontmatter.mainImage}
            sizes="30vw"
            layout="fill"
            alt="Article main image"
          />
        </div>
        <section className="flex group-hover:bg-radix-blue3 items-center gap-4 group cursor-pointer transition-all rounded-b-lg p-2">
          <div className="flex-1">
            <h2 className="text-xl font-semibold group-hover:text-radix-blue11 transition-all">
              {frontmatter.title}
            </h2>
            <p className="text-radix-slate11 text-base">
              {frontmatter.description}
            </p>
          </div>
          <aside
            className={clsx(
              "bg-radix-slate1 top-0 right-0 px-2 py-1 text-xs rounded-bl-lg",
              {
                absolute: frontmatter.mainImage,
              }
            )}
          >
            <time dateTime={date.toISOString()}>
              {date.toLocaleDateString("no-NB")}
            </time>
          </aside>
        </section>
      </article>
    </Link>
  );
};
