import { defineCollection } from "astro:content";
// `z` re-exported from `astro:content` is deprecated; import it from
// `astro/zod` (the pattern nimbus-docs' own schema helpers document).
import { z } from "astro/zod";
import { docsCollection, partialsCollection } from "@cloudflare/nimbus-docs/content";

export const collections = {
  docs: defineCollection(
    docsCollection({
      schemaFields: {
        // Nimbus docs are agent-friendly by default. Set `audience: human`
        // to flag a page that's written primarily for human readers.
        audience: z.literal("human").optional(),
        // 学习库自己的元数据。
        // YAML 会把 `2026-11-04` 解析成 Date，所以用 coerce。
        date: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        status: z
          .enum(["seed", "growing", "evergreen", "archived"])
          .default("seed"),
      },
      // 让 Nimbus 生成的 .md / .mdx 代理版本也保留这些字段。
      markdownFields: ["date", "tags", "status"],
    }),
  ),
  partials: defineCollection(partialsCollection()),
};
