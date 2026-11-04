/**
 * Build-time transform for PlantUML fences.
 *
 * Runs in Sätteri's mdast stage (wired through Nimbus
 * `markdown.mdastPlugins`) before Shiki sees the block, so the diagram source
 * is never highlighted as code. The output is a plain
 * `<pre class="plantuml">`; `plantuml.client.ts` renders the SVG in the
 * browser.
 *
 * Fenced blocks without `@startuml` get the delimiters added, so a note can
 * carry bare PlantUML statements.
 */

type PlantumlCode = {
  lang?: string | null;
  value: string;
};

type PlantumlHtml = {
  type: "html";
  value: string;
};

type PlantumlPlugin = {
  name: string;
  code: (node: PlantumlCode) => PlantumlHtml | undefined;
};

const START_DIRECTIVE = /(^|\n)\s*@startuml\b/;

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export function plantumlBlocks(): PlantumlPlugin {
  return {
    name: "plantuml-blocks",
    code(node) {
      if (node.lang !== "plantuml") {
        return undefined;
      }
      const source = START_DIRECTIVE.test(node.value)
        ? node.value
        : `@startuml\n${node.value.trimEnd()}\n@enduml`;
      return {
        type: "html",
        value: `<pre class="plantuml">${escapeHtml(source)}</pre>`,
      };
    },
  };
}
