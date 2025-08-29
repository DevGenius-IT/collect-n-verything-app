// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate",
    "@nuxt/image",
  ],
  typescript: {
    shim: true,
  },
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    locales: [
      {
        name: "Français",
        code: "fr",
        language: "fr-FR",
        file: "fr.json",
      },
      {
        name: "English",
        code: "en",
        language: "en-US",
        file: "en.json",
      },
    ],
    lazy: true,
    defaultLocale: "fr",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
    storageKey: "nuxt-color-mode",
    classSuffix: "",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  css: ["~/assets/css/tailwind.css", "~/assets/css/fonts.css"],
  experimental: {
    viewTransition: true,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  nitro: {
    compressPublicAssets: true,
  },
  ssr: true,
  vite: {
    build: {
      rollupOptions: {
        treeshake: true
      }
    }
  }
});