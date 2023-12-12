---
title: "From Next.js to Astro in a weekend"
description: "How I migrated my Next.js blog and portfolio to Astro in a weekend"
date: 2023-12-12
updated: 2023-12-12
image: "./images/next-astro.png"
tags:
  ["next", "NextJS", "next.js", "blog", "astro", "typescript", "web components"]
---

# From Next.js to Astro in a weekend

The why and how I migrated my Next.js blog and portfolio to Astro 4 in a weekend.

## The why

Next.js has long served as my standard go-to meta-framework for building static web sites and applications. It's served me well, but after trying out Astro for some client work, I was hooked. I already knew I wanted to change the look and feel of my portfolio. So I figured I'd start there, but I quickly realized that we've come a long way in terms of DX and Performance, and in my opinion, Astro sits at the top.

### Next is a great framework, for fast computers...

This is the primary reason I love Astro so much. It's fast. Picture the period we went from greyscale television to color, felt like the future right? Well, now we can barely watch a movie in 480p without feeling something is off. When Next 12 came out, this was exactly how I felt. I was using the same machine I used now (a 2021 MBP M1), it felt lightning fast, but after using Astro for a while, the same feeling ocurred. For me, Astro feels an order of magnitude faster than Next, and for sites I consistently change, that's a big deal.

### Thinking in Javascript

Astro is not bound by React the same way Next is. For the longest time I've been "thinking in React", and while I still love React, I've been wanting to try something new. Astro allows me to do that, I am free to use any reactivity framework I want, or none at all. So as a challenge to myself, I decided to use vanilla JS Web components for the small interactions I needed.

## The how

The migration was simple. With Astro's DX, speed, content collections and integration support, nothing took longer than it needed to.

### The stack

Here is a quick comparison of the stack I used for both sites:

| Next.js                              | Astro                   |
| ------------------------------------ | ----------------------- |
| Tailwind CSS                         | Uno CSS + Lightning CSS |
| React                                | Web Components          |
| next-mdx                             | Astro                   |
| mdx-bundler                          | Astro                   |
| rehype-toc                           | Astro                   |
| prism                                | Astro                   |
| Handrolled MDX fetching              | Astro                   |
| `feed` + handrolled (RSS generation) | Astro                   |

Notice a trend? 😉

### Moving the blog

In terms of content, I had to do nothing. Astro supports MDX out of the box, so I just had to copy the content over and it worked. In order to achieve the same level of customizability in Next, I had to handroll a combination of `next-mdx` and `mdx-bundler`.

#### Previous Next.js setup

These are the steps (shortened heavily for this post) I had to take to get the blog up and running in Next:

##### 1. Create a custom MDX fetcher in Next

```ts
export const getAllFrontmatter = async (fromPath) => {
  const PATH = path.join(DATA_PATH, fromPath);
  const paths = await glob(unixify(`${PATH}/**/*.mdx`));

  return Promise.all(
    paths.map(async (filePath) => {
      const file = path.join(filePath);
      const source = await fs.readFile(file, "utf8");
      const stat = await fs.stat(file);
      const { data, content } = matter(source);

      return {
        ...(data as Frontmatter),
        publishedAt: stringToDate(data.publishedAt).toISOString(),
        slug: path.basename(filePath).replace(".mdx", ""), // file name without extension
        wordCount: content.split(/\s+/g).length,
        readingTime: readingTime(content),
        modified: stat.mtimeMs,
        created: stat.birthtimeMs,
      } as Frontmatter;
    })
  );
};

export const getMdxBySlug = async (basePath, slug) => {
  const source = await fs.readFile(
    path.join(DATA_PATH, basePath, `${slug}.mdx`),
    "utf8"
  );

  const { frontmatter, code } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypePrism,
        rehypeSlug,
        withTOC,
        [withTocExport, { name: "toc" }],
      ];

      return options;
    },
  });

  return {
    frontmatter: {
      ...(frontmatter as Frontmatter),
      publishedAt: stringToDate(frontmatter.publishedAt).toISOString(),
      slug,
      wordCount: code.split(/\s+/g).length,
      readingTime: readingTime(code),
    } as Frontmatter,
    code,
  };
};
```

##### 2. Load the data in Next's `getStaticProps` & `getStaticPaths`

```ts
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
```

##### 3. Render the thing

```tsx
const exportData = useMemo(() => getMDXExport(code) as ExportWithTOC, [code]);
const Component = useMemo(() => exportData.default, [exportData.default]);

return (
  <>
    <Component />
  </>
);
```

#### Current Astro setup

Albeit simplified for this post, the setup packs a punch. Astro's content collections control the entire rendering pipeline from fetching the articles to generating the table of contents and rss feeds.

##### 1. Create a collection config and paste the files

```ts
// src/content/config.ts
const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      updated: z.date().optional(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      image: image().optional(),
    }),
});

export const collections = {
  posts: postsCollection,
};
```

##### 2. Render the thing

```astro
---
// pages/blog/[slug].astro
export const getStaticPaths = async () => {
  const posts = await getCollection("posts");
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
    props: {
      post,
    },
  }));
  return paths;
};

const { post } = Astro.props;

const { Content } = await post.render();
---
<RootLayout>
  <SEO slot="head" {...seoProps} />
  <BlogLayout>
    {
      post.data.image && (
        <Picture
          loading="eager"
          src={post.data.image}
          widths={[300, 600, 900, 1200]}
          alt={`${post.data.title} main image`}
          class="rounded-2xl shadow-xl mt-8 border-2 border-black"
        />
      )
    }
    <Content />
  </BlogLayout>
</RootLayout>
```

Thats it!

### Client side interactivity

I wanted to keep the site as simple as possible, so I decided to use vanilla JS for the client side interactivity. As a matter of fact, the only JS used in this site is for the floating navigation bar. I used a combination of `Web Components` and the `URLPattern` API to achieve this.

##### The markup

```astro
---
import { classed } from "@tw-classed/core";
const navContainer = classed("...unoClasses");
const navItem = classed("...unoClasses");
---

<nav id="nav-container" class={navContainer()}>
  <div class="flex gap-4 justify-center items-center">
    <a class={navItem()} data-matcher="/" href="/">Home</a>
    <a class={navItem()} data-matcher="/blog/:path*" href="/blog">Blog</a>
    <a class={navItem()} data-matcher="/projects/:path*" href="/projects"
      >Projects</a
    >
  </div>
  <nav-indicator></nav-indicator>
</nav>

<template id="nav-indicator-template">
  <span
    id="thumb"
    class="left-0 absolute top-50% -translate-y-50% bg-black rounded-xl -z-1"
  ></span>
</template>

<style>
  .nav-item[data-indicated="true"] {
    color: white;
  }

  body {
    padding-bottom: 10rem;
    background-color: #f8f8f8;
  }
</style>
```

##### The JS

The Javascript is pretty simple, but can be cleaned up a bit. I used the `URLPattern` API to match the current URL to the navigation links, and then initialized the `nav-indicator` web component.

Polyfilling the `URLPattern` is a breeze with Astro, as it supports dynamic imports and top level `await` out of the box

```ts
// @ts-ignore: Property 'URLPattern' does not exist
if (!globalThis.URLPattern) {
  await import("urlpattern-polyfill");
}
```

Then for the element itself. I'm using Vanilla Web Components, but Lit or any other framework would work just as well.

```ts
class NavIndicator extends HTMLElement {
  connectedCallback() {
    const content = document
      .querySelector<HTMLTemplateElement>("#nav-indicator-template")!
      .content.cloneNode(true);
    this.appendChild(content);
    this.thumb = this.querySelector<HTMLSpanElement>("span")!;

    this.loadItems();

    this.addListeners();

    this.moveToActive();
  }

  loadItems() {
    // Loads the navigation items and creates a URLPattern for each
  }

  addListeners() {
    // Adds the listeners for the navigation items
  }

  moveToActive() {
    const item = this.matcher.match({ pathname: window.location.pathname });
    this.move(item);
  }

  move(item: HTMLElement) {
    // Moves the indicator to the current item
  }
}

customElements.define("nav-indicator", NavIndicator);
```

The full source code for this component can be found [here](https://github.com/sannajammeh/sannajammeh/blob/master/apps/web/src/sections/FooterNav.astro). To me, this felt like a breath of fresh air compared to the JSX I was used to writing.

## The little things that matter

### RSS feed generated in under 20 lines

A simple route in `pages/rss.xml.ts` is all it takes to generate an RSS feed. Astro takes care of the rest.

```ts
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
```

### Lightning CSS

As Astro and UNO both run in Vite, LightningCSS - a fast Rust CSS parser - can be plugged in with a simple config change. This allows for a much faster dev experience when working with large amounts of CSS.

```ts
// astro.config.mjs
  vite: {
    css: {
      transformer: "lightningcss",
    },
  },
```

### Not just `children`

Astro's `slot` API allows for "fine grained child placement". This means that you can place children in specific slots and decide where they end up in the parent component. This is how I use it to place my SEO tags in the `<head>` of the document.

`RootLayout.astro`

```astro
<html>
  <head>
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

`pages/blog/[slug].astro`

```astro
---
import {SEO} from "astro-seo"
---

<RootLayout>
  <SEO slot="head" {...seoProps} />
  <BlogLayout>
    <Content />
  </BlogLayout>
</RootLayout>
```

Now the SEO tags are placed in the `<head>` of the document, and the rest of the content is placed in the `<body>`.

## Results

In terms of hours, the migration took a little less than a weekend to complete. I'm very happy with the results and especially the DX gains achieved by switching to Astro.

### Performance

[![Lighthouse score](./images/lighthouse.png)](https://pagespeed.web.dev/analysis/https-sannajammeh-com/enlq7pv8ju?form_factor=mobile)

**Lower is better**
| | Next | Astro |
| ----------------------- | ----- | -------------- |
| Vercel Build time (avg) | 1m 2s | 31s |
| First Load JS | 112kb | 5.32kb + 4.9kb |
| Insights FCP | 2.2s | 1s |
| Insights TBT | 7s | 30ms |
| Speed index | 3s | 1.3s |

That is a 50% reduction in build time, 95% reduction in JS size, 54% reduction in FCP and 99.5% reduction in TBT. I'm very happy with these results, and I have barely started optimising for performance. When it comes to the build time, Next.js uses on demand image generation, whereas Astro is currently using build time image generation. I expect the build time to go down even further if I switch to Vercel's image service.

### Pros

- **DX** - Astro's DX is unmatched. The ability to use any reactivity framework, or none at all, is a huge plus. The content collections API is also a huge plus, and allows for a lot of customizability.
- **Performance** - Astro is fast. Looking at the numbers, they speak for themselves, and thats without any optimisation performed by me.
- **Simplicity** - Astro is simple. It's easy to get started, and the learning curve is not steep at all. The documentation is also very good, and the community is very helpful.

### Cons

- **Astro's LSP needs some work** - Astro's LSP can feel a bit clunky at times. Especially in regards to new folders. I've had to restart the entire VSCode extension host every time I add a new folder in order for types and auto imports to work properly. Additionally, Astro's `Reload projects` command does not seem to fix the issue, prompting a full extension host reset.
- **No multi component files** - This is a minor inconvenience coming from React. Being able to export - or just create - multiple components from a single file is definitely a nice to have.

## Conclusion

I'm very happy with the results of the migration. Astro has allowed me to simplify my stack, and focus on the things that matter. I'm looking forward to seeing how Astro evolves, and I'm excited to see what the future holds for this project. The DX and performance gains are well worth the switch.

The new Astro 4 source is available here:
https://github.com/sannajammeh/sannajammeh/tree/master
