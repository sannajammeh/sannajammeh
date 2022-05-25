import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Frontmatter } from "types/frontmatter";

export const Article = ({
  frontmatter,
  priority,
}: {
  frontmatter: Frontmatter;
  priority?: boolean;
}) => {
  const date = new Date(frontmatter.publishedAt);
  return (
    <Link href={`/blog/${frontmatter.slug}`}>
      <a className="rounded-lg overflow-hidden outline-none focus:outline-dashed focus:outline-radix-blue9">
        <article className="group rounded-lg overflow-hidden relative">
          <div className="aspect-video relative">
            {frontmatter.mainImage && (
              <Image
                src={frontmatter.mainImage}
                sizes="30vw"
                layout="fill"
                alt="Article main image"
                priority={priority}
              />
            )}
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
      </a>
    </Link>
  );
};
