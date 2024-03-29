// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    imports: {
        dirs: [
            // Scan top-level modules
            'composables',
            // ... or scan modules nested one level deep with a specific name and file extension
            'composables/*/index.{ts,js,mjs,mts}',
            // ... or scan all modules within given directory
            'composables/**',
            'stores/**',
            'stores/**'
        ]
    }
})
