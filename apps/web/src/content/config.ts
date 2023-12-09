import { z, defineCollection } from "astro:content";

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

const workCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      location: z.string().optional(),
      role: z.string(),
      startDate: z.date(),
      endDate: z.date().optional(),
      image: image().optional(),
      projects: z
        .array(
          z.union([
            z.string(),
            z.object({
              name: z.string(),
              slug: z.string(),
            }),
          ])
        )
        .optional(),
    }),
});

const projectsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      image: image(),
      startDate: z.date(),
      type: z.enum(["case-study", "link"]).optional().default("case-study"),
      href: z.string().optional(),
    }),
});

export const collections = {
  posts: postsCollection,
  work: workCollection,
  projects: projectsCollection,
};
