import fs from "fs/promises";
import path from "path";
import glob from "glob";
import matter from "gray-matter";
import readingTime from "reading-time";
import { bundleMDX } from "mdx-bundler";
import rehypePrism from "rehype-prism-plus";
import type { Frontmatter } from "types/frontmatter";
import sharp from "sharp";

const ROOT_PATH = process.cwd();
export const DATA_PATH = path.join(ROOT_PATH, "posts");

// the front matter and content of all mdx files based on `docsPaths`
export const getAllFrontmatter = (fromPath) => {
  const PATH = path.join(DATA_PATH, fromPath);
  const paths = glob.sync(`${PATH}/**/*.mdx`);

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
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];

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

export const getBlurDataURL = async (url: string) => {
  let source: string | Buffer;
  if (url.startsWith("http")) {
    source = Buffer.from(await (await fetch(url)).arrayBuffer());
  } else {
    source = path.join(ROOT_PATH, "public", url);
  }

  const image = await sharp(source)
    .resize(16, 9, {
      fit: "cover",
    })
    .jpeg()
    .toBuffer();

  return bufferToDataURL(image);
};

const bufferToDataURL = (buffer: Buffer) => {
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
};

const stringToDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/");
  return new Date([month, day, year].join("/"));
};
