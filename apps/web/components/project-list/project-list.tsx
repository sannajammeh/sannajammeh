import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Children, isValidElement } from "react";

interface Project {
  title: string;
  mainImage: string;
  description: string;
  slug: string;
  themeColor?: string;
}
const projectMap: Record<string, Project> = {
  cartable: {
    title: "Cartable",
    mainImage: "/images/mockup.png",
    themeColor: "#6e56cf",
    description: "Producing the web's advanced solutions.",
    slug: "cartable",
  },
  privatek: {
    title: "Privatek",
    mainImage: "/images/privatek-case.png",
    description: "Making privacy mainstream.",
    slug: "privatek",
  },
};

interface Props {
  projects?: typeof projectMap;
  currentProject: keyof typeof projectMap;
}

const ProjectList: React.FC<Props> = ({
  projects = projectMap,
  currentProject,
}) => {
  const filteredProjects = Object.fromEntries(
    Object.entries(projects).filter(
      ([, { slug }]) => (slug as any) !== currentProject
    )
  );
  return (
    <>
      <h2 className="font-bold text-4xl uppercase italic">More cases?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Object.values(filteredProjects).map((project) => (
          <Link href={`/${project.slug}`} passHref>
            <article role="link">
              {!project.themeColor ? (
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg hover:scale-105 transition-transform">
                  <NextImage
                    sizes="50vw"
                    src={project.mainImage}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ) : (
                <div className="group relative aspect-[3/2] rounded-lg">
                  <div
                    style={{ backgroundColor: project.themeColor }}
                    className="absolute overflow-hidden w-full h-full group-hover:scale-105 transition-transform rounded-lg"
                  >
                    <svg
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                      height="100%"
                    >
                      <path
                        fill="rgba(0,0,0,0.1)"
                        d="M31.7,-50.9C44.5,-47.6,60.6,-45.9,68.4,-37.7C76.1,-29.5,75.6,-14.7,70.1,-3.2C64.6,8.4,54,16.7,45.7,24.1C37.4,31.4,31.4,37.7,24.2,43.8C16.9,49.9,8.5,55.8,-4,62.8C-16.5,69.7,-33,77.7,-40.8,71.9C-48.6,66.1,-47.7,46.6,-54.3,32.3C-60.9,18,-74.9,9,-75.1,-0.1C-75.2,-9.2,-61.5,-18.4,-53.4,-30C-45.3,-41.6,-42.7,-55.6,-34.8,-61.7C-26.8,-67.8,-13.4,-65.9,-2,-62.5C9.5,-59.2,19,-54.2,31.7,-50.9Z"
                        transform="translate(100 100)"
                      />
                    </svg>
                  </div>
                  <NextImage
                    sizes="50vw"
                    src={project.mainImage}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <h1 className="text-2xl font-bold mt-4">{project.title}</h1>
              <p className="text-radix-slate11 text-lg">
                {project.description}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProjectList;
