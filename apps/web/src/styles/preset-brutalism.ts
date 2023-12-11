import { definePreset } from "unocss";

// The prefix is brutalism

export const presetBrutalism = definePreset(() => {
  return {
    name: "brutalism",
    rules: [
      [
        /^shadow-brutalism-(\d+)$/,
        ([, d]: [any, number]) => ({
          "box-shadow": `${d / 4.25}vmin ${
            d / 4.25
          }vmin var(--un-shadow-color, #000)`,
        }),
      ],
    ],
  };
});
