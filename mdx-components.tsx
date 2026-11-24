import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { Figure, FigurePair, FlowDiagram, ModulesDiagram, PhotoSlot, PortsDiagram } from "@/components/mdx";
import { slugify } from "@/lib/slug";

const text = (node: ReactNode): string =>
  typeof node === "string" || typeof node === "number" ? String(node) : Array.isArray(node) ? node.map(text).join("") : "";

// Required by @next/mdx in the App Router. Elements are styled by the .prose wrapper in globals.css.
// Section headings get an id so the case-study index can link to them.
const components: MDXComponents = {
  Figure,
  FigurePair,
  FlowDiagram,
  ModulesDiagram,
  PhotoSlot,
  PortsDiagram,
  h2: ({ children }) => <h2 id={slugify(text(children))}>{children}</h2>,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
