import type { Toc } from "@stefanprobst/rehype-extract-toc";
import clsx from "clsx";

import React from "react";

const TocRenderer = ({
  toc,
  isChild = false,
  className,
}: {
  toc: Toc;
  isChild?: boolean;
  className?: string;
}) => {
  const Comp = !isChild ? "nav" : React.Fragment;

  return (
    <Comp
      {...(isChild ? {} : { className: clsx(className, "w-full max-w-full") })}
    >
      <ul className="w-full max-w-full overflow-hidden">
        {toc.map(({ depth, value, children, id }) => {
          if (depth > 2) return;
          return (
            <li
              className={clsx(
                "leading-loose text-ellipsis lg:max-w-[250px] xl:max-w-[250] overflow-hidden whitespace-nowrap xl:leading-[2.5]",

                {
                  "text-lg lg:text-xl": depth === 1,
                  "text-base lg:text-lg pl-4": depth === 2,
                  "list-['<']": depth !== 1,
                }
              )}
              key={id}
            >
              <a title={value} className="hover:underline" href={"#" + id}>
                {value}
              </a>
              {children && <TocRenderer toc={children} isChild />}
            </li>
          );
        })}
      </ul>
    </Comp>
  );
};

export default TocRenderer;
