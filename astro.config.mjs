// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    // Shiki emits var(--astro-code-*) references instead of hex colors,
    // so the code palette lives in global.css with the brand tokens.
    shikiConfig: { theme: 'css-variables' }
  },

  integrations: [mdx()]
});