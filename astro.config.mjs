import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"

const src = fileURLToPath(new URL("./src", import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: "https://astro-sphere-demo.vercel.app",
  integrations: [mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
  // Bundler-side aliases. Kept in sync with `compilerOptions.paths` in tsconfig.json
  // (which covers tsc / the language service only). Both are needed because the alias
  // has to exist twice: TypeScript resolves types here, Vite resolves modules there.
  //
  // Declaring these here instead of relying on Astro's tsconfig sniffing lets us drop
  // `baseUrl`, which Astro's vite-plugin-config-alias requires but TypeScript has
  // deprecated. Plain string keys are intentional — they match `@lib` and `@lib/utils`
  // alike, so the same map serves extensionless and directory imports.
  vite: {
    resolve: {
      alias: {
        "@consts": `${src}/consts.ts`,
        "@types": `${src}/types.ts`,
        "@lib": `${src}/lib`,
        "@components": `${src}/components`,
        "@layouts": `${src}/layouts`,
        "@styles": `${src}/styles`,
      },
    },
  },
})
