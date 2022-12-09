/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as Card from "components/card";
import Link from "next/link";
import classes from "./ProjectCard.module.scss";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/future/image";

type Props = {
  title: string;
  description: string;
  image?: string;
  href?: string;
  target?: React.HTMLProps<HTMLAnchorElement>["target"];
  role?: string;
  nextImage?: boolean;
};

const ProjectCard = ({
  title,
  description,
  image,
  href: url,
  target,
  role,
  nextImage = false,
}: Props) => {
  const withLink = (children: React.ReactNode) => {
    if (url)
      return (
        <Link
          className={classes.link}
          target={target}
          href={url}
          legacyBehavior={false}
        >
          {children}
        </Link>
      );
    return <>{children}</>;
  };

  return withLink(
    <>
      <Card.Root>
        <Card.Border />
        <Card.Content>
          <div className="flex gap-4">
            <figure>
              {nextImage && image ? (
                <Image
                  width={130}
                  height={130 / 1.77}
                  className="object-cover aspect-video w-[130px] h-[calc(130px_/_1.77)] max-w-none"
                  src={image}
                  alt={title}
                />
              ) : (
                <img
                  src={image ? image : `/api/og.png?title=${title}`}
                  loading="lazy"
                  width={130}
                  height={130 / 1.77}
                  className="object-cover aspect-video w-[130px] h-[calc(130px_/_1.77)] max-w-none"
                  alt="Project thumbnail"
                />
              )}
            </figure>
            <div>
              <h2 className="text-lg">
                <code className="italic">{title}</code>
              </h2>
              <p className="text-radix-slate11">{description}</p>
              {role && <span className="text-sm">Role: {role}</span>}
            </div>
          </div>
        </Card.Content>
        {url && (
          <span className="absolute top-4 right-4">
            <FiExternalLink className={classes.applyColor} />
          </span>
        )}
      </Card.Root>
    </>
  );
};

export default ProjectCard;
