import { defineConfig, presetWind } from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";
import presetTypography from "@unocss/preset-typography";
import { presetBrutalism } from "./src/styles/preset-brutalism";

export default defineConfig({
  presets: [
    presetWind(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sans: ["Satoshi:400,500,700,900"],
      },
    }),
    presetTypography(),
    presetBrutalism,
  ],
});
