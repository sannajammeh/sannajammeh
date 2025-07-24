import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string().optional(),
      view: z.boolean().optional().default(false),
      keywords: z.array(z.string()).optional(),
      image: image().optional(),
      dark_on_hover: z.boolean().optional().default(false),
      image_position: z.string().optional().default("top"),
      bury: z.boolean().optional().default(false),
      href: z.string().optional(),
      role: z.string().optional(),
      description: z.string().optional(),
      large: z.boolean().optional().default(false),
    }),
});

export const collections = { blog, projects };
