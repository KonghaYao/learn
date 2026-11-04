/**
 * Client-side PlantUML rendering.
 *
 * The build turns ```plantuml fences into `<pre class="plantuml">`. The
 * TeaVM runtime (plus its Graphviz/Viz engine) is imported only after such an
 * element exists, so pages without diagrams never download it. Re-renders
 * when BaseLayout flips `data-mode` (light/dark) and after Astro view
 * transitions.
 */

type PlantumlApi = typeof import("@plantuml/core/plantuml.js");
type Mode = "dark" | "light";

type PlantumlGlobal = typeof globalThis & {
  PLANTUML_VIZ?: unknown;
  Viz?: unknown;
};

const DIAGRAM_SELECTOR = "pre.plantuml";
const sources = new WeakMap<HTMLElement, string>();
const loggedFailures = new WeakSet<HTMLElement>();
let runtimePromise: Promise<PlantumlApi> | null = null;
let queue: Promise<void> = Promise.resolve();
let renderedMode: Mode | null = null;
let started = false;

async function loadPlantuml(): Promise<PlantumlApi> {
  runtimePromise ??= (async () => {
    // viz-global.js is a UMD. When a bundler wraps it as CommonJS its Viz
    // namespace lands on the default export instead of `globalThis.Viz`;
    // hand whichever we got to the engine before it is imported.
    const vizModule = await import("@plantuml/core/viz-global.js");
    const viz =
      vizModule.default ?? (globalThis as PlantumlGlobal).Viz ?? vizModule;
    (globalThis as PlantumlGlobal).PLANTUML_VIZ = viz;
    return import("@plantuml/core/plantuml.js");
  })();
  return runtimePromise;
}

function currentMode(): Mode {
  return document.documentElement.getAttribute("data-mode") === "dark"
    ? "dark"
    : "light";
}

function renderSvg(
  plantuml: PlantumlApi,
  source: string,
  dark: boolean,
): Promise<string> {
  return new Promise((resolve, reject) => {
    plantuml.renderToString(
      source.split("\n"),
      (svg) => resolve(svg),
      (message) => reject(new Error(message)),
      { dark },
    );
  });
}

async function renderPending(): Promise<void> {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(DIAGRAM_SELECTOR),
  );
  if (nodes.length === 0) return;

  const mode = currentMode();

  // Keep the authored source before the runtime replaces it with an SVG; a
  // theme switch restores every block from that copy and renders it again.
  for (const node of nodes) {
    if (!sources.has(node)) sources.set(node, node.textContent ?? "");
  }

  if (mode !== renderedMode) {
    for (const node of nodes) {
      const source = sources.get(node);
      if (source === undefined) continue;
      node.textContent = source;
      node.removeAttribute("data-processed");
    }
    renderedMode = mode;
  }

  const pending = nodes.filter((node) => !node.hasAttribute("data-processed"));
  if (pending.length === 0) return;

  const plantuml = await loadPlantuml();

  // renderToString queues its own calls, but awaiting each block keeps DOM
  // updates in source order and isolates failures.
  for (const node of pending) {
    const source = sources.get(node) ?? "";
    try {
      const svg = await renderSvg(plantuml, source, mode === "dark");
      // A view transition may have replaced the page while this was queued.
      if (!node.isConnected) continue;
      node.innerHTML = svg;
      node.setAttribute("data-processed", "true");
    } catch (error) {
      // Leave the source visible and log once per block; other diagrams on
      // the page still render.
      node.textContent = source;
      node.removeAttribute("data-processed");
      if (!loggedFailures.has(node)) {
        loggedFailures.add(node);
        console.error("[plantuml] render failed", error);
      }
    }
  }
}

function schedule(task: () => Promise<void>): void {
  queue = queue.then(task).catch((error: unknown) => {
    console.error("[plantuml] render failed", error);
  });
}

export function initPlantuml(): void {
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

  new MutationObserver((records) => {
    if (!records.some((record) => record.attributeName === "data-mode")) return;
    if (!document.querySelector(DIAGRAM_SELECTOR)) return;
    schedule(renderPending);
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-mode"],
  });
}
