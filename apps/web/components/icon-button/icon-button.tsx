import clsx from "clsx";
import React, { forwardRef } from "react";
import classes from "./icon-button.module.scss";

interface Props extends React.HTMLProps<HTMLAnchorElement> {}

const IconButton = forwardRef<HTMLAnchorElement, Props>(
  ({ children, className, ...props }: Props, ref) => {
    return (
      <a ref={ref} {...props} className={clsx(className, classes.iconButton)}>
        {children}
      </a>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
