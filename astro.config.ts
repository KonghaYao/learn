import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";
import { mermaidBlocks } from "./src/lib/mermaid-mdast";
import { plantumlBlocks } from "./src/lib/plantuml-mdast";

const nimbusConfig = defineNimbusConfig({
  // 正式部署地址（不要结尾斜杠）。
  // 它会影响 canonical、OG 图片、robots.txt、sitemap 和 llms.txt。
  site: "https://konghaoyao.github.io",
  title: "我的学习库",
  description: "一个阅读友好的个人学习库。先记下来，再慢慢整理。",
  locale: "zh-CN",
  // 没有公开仓库时留空，页头不会显示 GitHub 链接。
  github: null,
  socialImageAlt: "我的学习库",
  // The library starts at notes. There is no separate home page.
  // Top tabs split the library into its main areas; the rail follows the
  // current area so it stays short.
  sidebar: {
    items: [{ autogenerate: { collection: "docs" } }],
    scope: "section",
    // Keep the rail focused on the current note domain.
    isolate: { boundaries: ["notes/*"] },
  },
});

export default defineConfig({
  // nimbus:adapter
  output: "static",
  // GitHub Pages 项目站点部署在 `/learn` 子路径。
  base: "/learn",
  // Tailwind v4 via its Vite plugin (the integration Astro recommends for
  // Tailwind v4 — replaces the PostCSS plugin, which doesn't build under
  // Astro 7's Vite 8 bundler).
  vite: {
    plugins: [tailwindcss()],
    // Prebundle the diagram runtimes in dev. The clients import them lazily,
    // so without this the first request can hit "504 Outdated Optimize Dep"
    // after a cache reset (for example, a production build sharing
    // node_modules/.vite).
    optimizeDeps: {
      include: [
        "pele",
        "@plantuml/core/plantuml.js",
        "@plantuml/core/viz-global.js",
      ],
    },
  },
  // Hover-prefetch link targets so full-page navigations feel instant without
  // a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    nimbus(nimbusConfig, {
      // Authoring rules are opt-in by design — your repo, your taste. The
      // two below are the load-bearing pair: frontmatter has to validate
      // against the content schema for the page to render properly, and
      // broken internal links are 404s for your readers. Add the others
      // (heading hierarchy, code-block language, style, etc.) when you're
      // ready to enforce them — see `nimbus-docs lint --help`.
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      markdown: {
        // Turn ```mermaid / ```plantuml fences into plain containers before
        // Shiki runs; the client scripts render the SVG on demand.
        mdastPlugins: [mermaidBlocks(), plantumlBlocks()],
        // Wrap wide tables so they scroll instead of overflowing the page
        // (styled by `.nb-table-scroll` in src/styles/prose.css).
        hastPlugins: [tableScroll()],
        // `## Install {#install}` gives a heading a fixed id. A heading that
        // ends in other `{…}` text, such as `{account_id}` in a .md file, is
        // read as attributes too; remove this to keep it as text.
        features: { headingAttributes: true },
      },
    }),
  ],
});
