import type { MDXComponents } from "mdx/types";
import { FigurePair, FlowDiagram, ModulesDiagram, PortsDiagram } from "@/components/mdx";

// Required by @next/mdx in the App Router. Elements are styled by the .prose wrapper in globals.css.
const components: MDXComponents = { FigurePair, FlowDiagram, ModulesDiagram, PortsDiagram };

export function useMDXComponents(): MDXComponents {
  return components;
}
