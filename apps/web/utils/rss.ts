import { Feed } from "feed";
import { Frontmatter } from "types/frontmatter";
import fs from "fs/promises";

export const generateRSS = async (posts: Frontmatter[]) => {
  const author = {
    name: "Sanna Jammeh",
    email: "hello@sannajammeh.com",
    link: "https://sannajammeh.com",
  };

  const siteURL = "https://sannajammeh.com";

  const date = new Date();

  const feed = new Feed({
    title: "Sanna Jammeh's blog",
    description: "Sanna Jammeh | Fullstack developer",
    id: "https://sannajammeh.com",
    copyright: `All rights reserved ${date.getFullYear()}, Sanna Jammeh`,
    updated: date,
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.description,
      date: new Date(post.publishedAt),
      author: [author],
      contributor: [author],
    });
  });

  await fs.mkdir("./public/rss", { recursive: true });
  await Promise.all([
    fs.writeFile("./public/rss/feed.xml", feed.rss2()),
    fs.writeFile("./public/rss/atom.xml", feed.atom1()),
    fs.writeFile("./public/rss/feed.json", feed.json1()),
  ]);

  console.log("RSS:", "Generated all RSS feeds");
};
