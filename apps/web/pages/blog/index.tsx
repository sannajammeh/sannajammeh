import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Frontmatter } from "types/frontmatter";
import { getAllFrontmatter } from "utils/mdx";
import Layout from "../../components/Layout";
import { sortBy } from "lodash-es";
import { NextSeo } from "next-seo";
import { generateRSS } from "utils/rss";
import { FiArrowLeft } from "react-icons/fi";
import IconButton from "components/icon-button";
import { Article } from "components/article";

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
