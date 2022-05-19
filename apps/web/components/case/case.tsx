import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Children, isValidElement } from "react";

const CaseList = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // Filter children based on slug prop and router pathname
  const filteredChildren = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return null;
    const { slug } = child.props;
    if (slug === router.pathname) return null;
    return child;
  });
  return (
    <>
      <h2 className="font-bold text-4xl uppercase italic">More cases?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filteredChildren}
      </div>
    </>
  );
};

const CaseItem = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) => {
  return (
    <Link href={`${slug}`} passHref>
      <article className="group" role="link">
        {children}
      </article>
    </Link>
  );
};

const CaseTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-bold text-2xl uppercase mt-4">{children}</h2>;
};

const CaseDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-radix-slate11 text-lg">{children}</p>;
};

const CaseImage = ({
  src,
  children,
  aspectRatio,
}: {
  children?: React.ReactNode;
  src: string;
  aspectRatio?: string;
}) => {
  return (
    <div className="scale-100 group-hover:scale-105 overflow-hidden transition-transform will-change-transform rounded-md">
      <div
        className="relative aspect-[3/2] overflow-hidden scale-105 group-hover:scale-100 transition-transform will-change-transform"
        style={{ aspectRatio: aspectRatio }}
      >
        {children}
        <NextImage sizes="50vw" src={src} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

// Exports

const Image = CaseImage;
const Title = CaseTitle;
const Description = CaseDescription;
const List = CaseList;
const Item = CaseItem;

export { Image, Title, Description, List, Item };
