// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "@nuxt/eslint",
    "@prisma/nuxt",
  ],
  devtools: { enabled: true },
  css: [
    "@unocss/reset/tailwind.css",
  ],
  compatibilityDate: "2024-04-03",
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: "double",
        semi: true,
      },
    },
  },
});
