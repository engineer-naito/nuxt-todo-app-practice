// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@prisma/nuxt", "@nuxtjs/supabase"],
  devtools: { enabled: true },

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
      },
    },
  },
});
