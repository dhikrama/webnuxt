// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nitro-cloudflare-dev', '@nuxt/content', '@nuxt/image'],

  colorMode: {
    preference: 'system', // Default ke pengaturan sistem pengguna (light/dark)
    fallback: 'light',    // Gunakan mode light jika sistem tidak mendukung
    classSuffix: 'dark',      // Tidak menambahkan akhiran pada class mode (misalnya `.dark` saja)
  },

  ui: {
    safelistColors:[
      "purple"
    ]
  },

  runtimeConfig: {
    GOOGLE_PHOTOS_CLIENT_ID: process.env.GOOGLE_PHOTOS_CLIENT_ID,
    GOOGLE_PHOTOS_CLIENT_SECRET: process.env.GOOGLE_PHOTOS_CLIENT_SECRET,
    GOOGLE_PHOTOS_REFRESH_TOKEN: process.env.GOOGLE_PHOTOS_REFRESH_TOKEN,
    GOOGLE_PHOTOS_ACCESS_TOKEN: process.env.GOOGLE_PHOTOS_ACCESS_TOKEN,
    // Variabel-variabel yang hanya tersedia di server-side
    public: {
      // Variabel-variabel yang juga tersedia di client-side
    },
  },
  
  nitro:{
    externals:{
      inline: ['googleapis'],
    },
    prerender:{
      autoSubfolderIndex: false
    }
  }
})
