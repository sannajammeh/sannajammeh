import clsx from "clsx";
import React from "react";
import classes from "./icon-button.module.scss";

interface Props extends React.HTMLProps<HTMLAnchorElement> {}

const IconButton = ({ children, className, ...props }: Props) => {
  return (
    <a {...props} className={clsx(className, classes.iconButton)}>
      {children}
    </a>
  );
};

export default IconButton;
