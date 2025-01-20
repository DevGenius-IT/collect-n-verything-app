// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-lucide-icons',
    '@nuxtjs/i18n'
  ],
  typescript: {
    shim: true,
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      { code: 'fr', language: 'fr-FR' },
      { code: 'en', language: 'en-US' },
    ],
    defaultLocale: 'fr',
  },
  app: {
      pageTransition: { name: 'page', mode: 'out-in' },
      layoutTransition: { name: 'layout', mode: 'out-in' },
    },
    css: ['~/assets/css/tailwind.css', '~/assets/css/fonts.css'],
    experimental: {
      viewTransition: true,
    },
  shadcn: {
    /**
      * Prefix for all the imported component
      */
    prefix: '',
    /**
      * Directory that the component lives in.
      * @default "./components/ui"
      */
    componentDir: './components/ui'
  }
})