/**
 * Client-side Mermaid rendering via Pele.
 *
 * The build turns ```mermaid fences into `<pre class="mermaid">`. Pele is
 * imported only after such an element exists, so pages without diagrams never
 * download it. Pele emits SVG coloured through CSS variables, so a light/dark
 * switch recolours diagrams without re-rendering them.
 */

import type { Mounted } from "pele/core";

type PeleModule = typeof import("pele");

const DIAGRAM_SELECTOR = "pre.mermaid";
const mounted = new Map<HTMLElement, Mounted>();
const failures = new WeakSet<HTMLElement>();
let pelePromise: Promise<PeleModule> | null = null;
let queue: Promise<void> = Promise.resolve();
let started = false;

function loadPele(): Promise<PeleModule> {
  pelePromise ??= import("pele");
  return pelePromise;
}

async function renderPending(): Promise<void> {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(DIAGRAM_SELECTOR),
  ).filter((node) => !node.hasAttribute("data-processed"));
  if (nodes.length === 0) return;

  const pele = await loadPele();

  for (const node of nodes) {
    const source = node.textContent ?? "";
    const instance = pele.mount(node, source, {
      onError: (error) => {
        if (failures.has(node)) return;
        failures.add(node);
        console.error("[mermaid] render failed", error);
      },
    });
    mounted.set(node, instance);
    // Pele renders its own error panel and leaves the source in place; keep
    // the block outside the processed set so a later pass can retry it.
    node.setAttribute(
      instance.error === undefined ? "data-processed" : "data-error",
      "true",
    );
  }
}

function schedule(task: () => Promise<void>): void {
  queue = queue.then(task).catch((error: unknown) => {
    console.error("[mermaid] render failed", error);
  });
}

export function initMermaid(): void {
  if (started) return;
  started = true;

  const renderNow = (): void => {
    if (document.querySelector(DIAGRAM_SELECTOR)) schedule(renderPending);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNow, { once: true });
  } else {
    renderNow();
  }

  // ClientRouter swaps the content without reloading this module.
  document.addEventListener("astro:page-load", renderNow);

  // Drop resize observers held by diagrams on the outgoing page.
  document.addEventListener("astro:before-swap", () => {
    for (const instance of mounted.values()) instance.destroy();
    mounted.clear();
  });
}
