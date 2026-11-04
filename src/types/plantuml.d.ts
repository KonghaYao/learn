/**
 * Minimal typings for @plantuml/core (the package ships plain JavaScript).
 * Only the surface used by `plantuml.client.ts` is declared.
 */

declare module "@plantuml/core/viz-global.js" {
  const Viz: unknown;
  export default Viz;
}

declare module "@plantuml/core/plantuml.js" {
  export interface PlantumlRenderOptions {
    dark?: boolean;
    maxSvgSize?: number;
  }

  export function render(
    lines: string[],
    targetId: string,
    options?: PlantumlRenderOptions,
  ): void;

  export function renderToString(
    lines: string[],
    onSuccess: (svg: string) => void,
    onError: (message: string) => void,
    options?: PlantumlRenderOptions,
  ): void;
}
