/**
 * Build-time transform for Mermaid fences.
 *
 * Runs in Sätteri's mdast stage (wired through Nimbus
 * `markdown.mdastPlugins`) before Shiki sees the block, so the diagram source
 * is never highlighted as code. The output is a plain
 * `<pre class="mermaid">`; `mermaid.client.ts` replaces it with an SVG in the
 * browser.
 */

type MermaidCode = {
  lang?: string | null;
  value: string;
};

type MermaidHtml = {
  type: "html";
  value: string;
};

type MermaidPlugin = {
  name: string;
  code: (node: MermaidCode) => MermaidHtml | undefined;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export function mermaidBlocks(): MermaidPlugin {
  return {
    name: "mermaid-blocks",
    code(node) {
      if (node.lang !== "mermaid") {
        return undefined;
      }
      return {
        type: "html",
        value: `<pre class="mermaid">${escapeHtml(node.value)}</pre>`,
      };
    },
  };
}
