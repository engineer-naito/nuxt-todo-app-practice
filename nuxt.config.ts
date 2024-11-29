// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@prisma/nuxt",
    "@nuxtjs/supabase",
    "@unocss/nuxt",
  ],
  devtools: { enabled: true },
  css: [
    "@unocss/reset/tailwind.css",
  ],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-01",
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: "double",
        semi: true,
        blockSpacing: false,
      },
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/todos",
      exclude: ["/"],
    },
  },
});
