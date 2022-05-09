import clsx from "clsx";
import React, { forwardRef } from "react";
import classes from "./button.module.scss";

interface Props extends React.HTMLProps<HTMLAnchorElement> {}

const Button = forwardRef<HTMLAnchorElement, Props>(
  ({ children, className, ...props }: Props, ref) => {
    return (
      <a
        ref={ref}
        className={clsx(
          classes.button,
          className,
          "font-space-mono uppercase font-bold"
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

export default Button;
