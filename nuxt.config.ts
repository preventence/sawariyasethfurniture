export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',
  ],

  googleFonts: {
    families: {
      'Cormorant Garamond': [300, 400, 500, 600],
      'Jost': [300, 400, 500],
    },
    display: 'swap',
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Sawariya Seth Furniture — Handcrafted Furniture & Showroom',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Premium handcrafted furniture, designed and manufactured in our workshop. Visit our showroom to experience every piece.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  // Required for better-sqlite3 native binary
  nitro: {
    preset: 'node-server',
    externals: {
      external: ['better-sqlite3'],
    },
  },

  // Runtime config — ADMIN_PASSWORD set in .env
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || 'woodcraft2024',
    sessionSecret: process.env.SESSION_SECRET || 'change-me-in-production',
  },
})
