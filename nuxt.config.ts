export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@pinia/nuxt", "@formkit/auto-animate/nuxt", "@formkit/nuxt"],
  tailwindcss: {
    cssPath: '~/assets/main.css'  ,
    configPath: 'tailwind.config.js'
  },

  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
    configFile: './my-configs/formkit.config.ts',
  }
})