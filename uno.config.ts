import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  shortcuts: {
    "btn-p": "px-4 py-2",
  },
});
