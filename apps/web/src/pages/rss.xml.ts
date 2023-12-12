import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const blog = await getCollection("posts");
  return rss({
    title: "Sanna Jammeh’s Blog",
    description:
      "A blog about web development and other things I find interesting.",
    site: context.site!,
    items: blog
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/blog/${post.slug}`,
      }))
      .toSorted((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
