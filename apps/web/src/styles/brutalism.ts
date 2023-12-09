import { classed } from "@tw-classed/core";

export const shadow = classed({
  variants: {
    size: {
      md: "shadow-[0.4vmin_0.4vmin_#000]",
    },
    hover: {
      true: "[&:not(:hover)]:shadow-none",
    },
  },
});
