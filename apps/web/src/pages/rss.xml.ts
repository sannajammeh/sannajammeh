import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const blog = await getCollection("posts");
  return rss({
    // `<title>` field in output xml
    title: "Sanna Jammeh’s Blog",
    // `<description>` field in output xml
    description:
      "A blog about web development and other things I find interesting.",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site!,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
