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

const CardBorder = ({ className }: { className?: string }) => (
  <svg
    className={clsx(
      "absolute top-0 left-0 rounded-md pointer-events-none",
      className
    )}
    width="100%"
    height="100%"
  >
    <rect
      width="100%"
      height="100%"
      fill="none"
      stroke="var(--slate8)"
      strokeWidth="1px"
      strokeDasharray="4, 4"
      strokeLinejoin="round"
    />
  </svg>
);

const CardContent = ({ className, children }: Props) => {
  return <div className={clsx("p-4 md:p-6", className)}>{children}</div>;
};

// Exports

export const Root = CardRoot;
export const Border = CardBorder;
export const Content = CardContent;
