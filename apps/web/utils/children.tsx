import React, { Children, isValidElement } from "react";

export const pickChildByType = (children: React.ReactNode, type) => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return null;
    if (child.type === type) {
      return child;
    }
    return null;
  });
};

export const pickChildByProps = (children: React.ReactNode, props) => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return null;
    if (Object.keys(props).every((key) => child.props[key] === props[key])) {
      return child;
    }
    return null;
  });
};
