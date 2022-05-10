import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Frontmatter } from "types/frontmatter";
import { getAllFrontmatter } from "utils/mdx";
import Layout from "../../components/Layout";
import { sortBy } from "lodash-es";
import { NextSeo } from "next-seo";
import { generateRSS } from "utils/rss";

interface Props {
  posts: Frontmatter[];
}

const BlogArticles: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <NextSeo title="Blogs | Sanna Jammeh" />
      <Layout>
        <main className="mx-auto px-4 pt-32 max-w-[65ch] xl:max-w-[75ch]">
          {/* cards */}
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <Article frontmatter={post} key={post.slug} />
            ))}
          </div>
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
  return (
    <Link href={`/blog/${frontmatter.slug}`} passHref>
      <div
        className="flex hover:bg-radix-blue3 items-center gap-4 group cursor-pointer transition-all rounded"
        role="link"
      >
        <img
          className="aspect-[2/3] max-w-[64px] rounded object-cover flex-shrink-0"
          src={
            frontmatter.mainImage ||
            "https://images.unsplash.com/photo-1651719500430-630f9d7abd7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80"
          }
          alt=""
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold group-hover:text-radix-blue11 transition-all">
            {frontmatter.title}
          </h2>
          <p className="text-gray-600 text-base">{frontmatter.description}</p>
        </div>
      </div>
    </Link>
  );
};
