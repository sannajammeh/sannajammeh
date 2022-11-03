import clsx from "clsx";
import React from "react";

type Props = {} & React.HTMLProps<HTMLDivElement>;

const CardRoot = ({ className, children, ...props }: Props) => {
  return (
    <div className={clsx(className, "leading-normal relative")} {...props}>
      {children}
    </div>
  );
};

const CardBorder = ({
  className,
  ...rest
}: { className?: string } & React.SVGProps<SVGSVGElement>) => (
  <>
    <svg
      className={clsx(
        "card-border absolute top-0 left-0 rounded-md pointer-events-none",
        className
      )}
      width="100%"
      height="100%"
      {...rest}
    >
      <rect
        width="100%"
        height="100%"
        fill="none"
        strokeWidth="1px"
        strokeDasharray="4, 4"
        strokeLinejoin="round"
      />
    </svg>
    <style jsx>
      {`
        .card-border rect {
          stroke: var(--border-color, var(--slate8));
        }
      `}
    </style>
  </>
);

const CardContent = ({ className, children }: Props) => {
  return <div className={clsx("p-4 md:p-6", className)}>{children}</div>;
};

// Exports

export const Root = CardRoot;
export const Border = CardBorder;
export const Content = CardContent;
