import type { MDXContent } from "mdx/types";
import type { StaticImageData } from "next/image";
import type { Locale } from "@/lib/i18n";
import tytHomeEn from "./images/tyt/home-en.webp";
import tytHomeEs from "./images/tyt/home-es.webp";
import AgujaEn from "./projects/aguja-de-oro.en.mdx";
import AgujaEs from "./projects/aguja-de-oro.es.mdx";
import InvoicingEn from "./projects/e-invoicing.en.mdx";
import InvoicingEs from "./projects/e-invoicing.es.mdx";
import MikuEn from "./projects/miku.en.mdx";
import MikuEs from "./projects/miku.es.mdx";
import ErpEn from "./projects/modular-erp.en.mdx";
import ErpEs from "./projects/modular-erp.es.mdx";
import TytEn from "./projects/tyt.en.mdx";
import TytEs from "./projects/tyt.es.mdx";

export type Kind = "live" | "internship" | "open-source";

type Text = {
  title: string;
  /** One line for the home card and the meta description (≤ 160 characters). */
  summary: string;
  role: string;
  team: string;
  /** Shown on the home page in the 5-minute reading mode. */
  detail: string;
};

export type Project = {
  slug: string;
  kind: Kind;
  /** YYYY-MM */
  start: string;
  end: string | null;
  stack: string[];
  cardStack: string[];
  links: { live?: string; repo?: string };
  cover?: Record<Locale, { src: StaticImageData; alt: string }>;
  text: Record<Locale, Text>;
  /** The case study, one MDX file per language. */
  body: Record<Locale, MDXContent>;
};

/** Featured projects, in the order they appear on the home page (ranked by impact). */
export const projects: Project[] = [
  {
    slug: "tyt",
    kind: "live",
    start: "2026-07",
    end: null,
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "next-intl", "TanStack Query", "Zustand", "Zod", "Tailwind CSS", "Cloudflare R2", "Gemini", "Vitest", "Playwright", "GitHub Actions", "Docker"],
    cardStack: ["Next.js", "Prisma", "PostgreSQL", "Playwright"],
    links: { live: "https://www.tytsoluciones.net" },
    cover: {
      en: { src: tytHomeEn, alt: "TyT Tecnología home page in English: security cameras and computers, with the services as four blocks built from the brand's shapes." },
      es: { src: tytHomeEs, alt: "Inicio de TyT Tecnología en español: cámaras de seguridad y computadoras, con los servicios en cuatro bloques hechos con las formas de la marca." },
    },
    text: {
      en: {
        title: "TyT Tecnología",
        summary: "Website, product catalog and admin dashboard for a tech repair and security camera shop. Sole developer.",
        role: "Sole developer: requirements, design, development, testing, deployment and support",
        team: "Sole developer",
        detail: "Bilingual site with technical SEO, WhatsApp checkout and AI-drafted promotions that an admin approves. Ports and adapters; 119 test files in CI.",
      },
      es: {
        title: "TyT Tecnología",
        summary: "Sitio web, catálogo y panel de administración para un taller de tecnología y cámaras de seguridad. Único desarrollador.",
        role: "Único desarrollador: requerimientos, diseño, desarrollo, pruebas, despliegue y soporte",
        team: "Único desarrollador",
        detail: "Sitio bilingüe con SEO técnico, checkout por WhatsApp y promociones preparadas con IA que un administrador aprueba. Puertos y adaptadores; 119 archivos de pruebas en CI.",
      },
    },
    body: { en: TytEn, es: TytEs },
  },
  {
    slug: "e-invoicing",
    kind: "internship",
    start: "2026-07",
    end: "2026-08",
    stack: ["TypeScript", "NestJS", "React", "PostgreSQL (row-level security)", "XAdES-EPES", "AES-256-GCM", "Argon2id", "JWT and API keys", "Webhooks", "pnpm + Turborepo"],
    cardStack: ["NestJS", "React", "PostgreSQL (RLS)"],
    links: {},
    text: {
      en: {
        title: "E-invoicing SaaS",
        summary: "Wrote the pre-launch audit of a multi-tenant e-invoicing platform and fixed all 17 findings.",
        role: "Software development intern (full stack)",
        team: "Product team at a software company",
        detail: "Full-repository audit with 8 tax-compliance defects and 9 business-logic bugs, all fixed; tenant isolation with PostgreSQL row-level security proven on all 20 tables in CI.",
      },
      es: {
        title: "SaaS de facturación electrónica",
        summary: "Auditoría previa al lanzamiento de una plataforma de facturación electrónica multiempresa, con sus 17 hallazgos corregidos.",
        role: "Practicante de desarrollo de software (full stack)",
        team: "Equipo de producto de una empresa de software",
        detail: "Auditoría completa del repositorio con 8 defectos fiscales y 9 de lógica de negocio, todos corregidos; aislamiento entre empresas con RLS de PostgreSQL probado en las 20 tablas en CI.",
      },
    },
    body: { en: InvoicingEn, es: InvoicingEs },
  },
  {
    slug: "miku",
    kind: "open-source",
    start: "2026-10",
    end: null,
    stack: ["Tauri v2", "TypeScript", "Vite", "PixiJS (Live2D)", "Python (asyncio)", "WebSocket", "Whisper", "Gemini", "edge-tts", "RVC"],
    cardStack: ["Tauri", "TypeScript", "Python asyncio"],
    links: { repo: "https://github.com/Allan2612/miku-assistant" },
    text: {
      en: {
        title: "Miku Assistant",
        summary: "Desktop voice assistant: local Whisper, Gemini function calling over a closed tool set, and a Live2D avatar.",
        role: "Personal project",
        team: "Solo",
        detail: "Two processes over a local WebSocket and a GPU worker that only exists while it is needed. Designed to answer in under 3 seconds and to release the GPU when idle. MIT licence.",
      },
      es: {
        title: "Miku Assistant",
        summary: "Asistente de voz de escritorio: Whisper local, function calling de Gemini sobre una lista cerrada de herramientas y un avatar Live2D.",
        role: "Proyecto personal",
        team: "Individual",
        detail: "Dos procesos sobre un WebSocket local y un proceso de GPU que solo existe mientras hace falta. Diseñado para responder en menos de 3 segundos y liberar la GPU en reposo. Licencia MIT.",
      },
    },
    body: { en: MikuEn, es: MikuEs },
  },
  {
    slug: "modular-erp",
    kind: "internship",
    start: "2026-08",
    end: "2026-11",
    stack: ["TypeScript", "NestJS", "Drizzle ORM", "PostgreSQL", "Redis", "MongoDB", "pnpm + Turborepo", "Vitest"],
    cardStack: ["NestJS", "Drizzle", "PostgreSQL", "Vitest"],
    links: {},
    text: {
      en: {
        title: "Modular ERP",
        summary: "Accounting rules built test-first, and a gap analysis of 311 requirements against an international accounting standard.",
        role: "Software development intern (backend)",
        team: "Team of five; top contributor",
        detail: "Turned an accounting standard into 311 verifiable requirements and checked each against the code and the running system, then built much of what was missing with TDD. 3,500+ tests in the codebase.",
      },
      es: {
        title: "ERP modular",
        summary: "Reglas contables desarrolladas con TDD y un análisis de brechas de 311 requisitos frente a una norma contable internacional.",
        role: "Practicante de desarrollo de software (backend)",
        team: "Equipo de cinco; principal contribuidor",
        detail: "Convertí una norma contable en 311 requisitos verificables, revisé cada uno contra el código y el sistema en ejecución, y construí con TDD buena parte de lo que faltaba. Más de 3500 pruebas en el proyecto.",
      },
    },
    body: { en: ErpEn, es: ErpEs },
  },
  {
    slug: "aguja-de-oro",
    kind: "live",
    start: "2024-09",
    end: null,
    stack: ["Odoo 17", "Python", "XML/QWeb", "PostgreSQL", "Docker Compose", "Ubuntu", "Nginx", "Let's Encrypt", "DigitalOcean"],
    cardStack: ["Odoo 17", "Python", "PostgreSQL", "Nginx"],
    links: { live: "https://agujadeoro.org" },
    text: {
      en: {
        title: "La Aguja de Oro",
        summary: "Odoo 17 ERP for a tailoring shop, built with a partner. I set up and run its production server.",
        role: "Full stack developer: sales, quick-service and reporting modules, and the production server",
        team: "With a partner",
        detail: "Sales, quick-service and reporting modules with Costa Rican print formats. Production server on DigitalOcean with HTTPS, hardened SSH, a firewall and daily backups.",
      },
      es: {
        title: "La Aguja de Oro",
        summary: "ERP en Odoo 17 para un taller de costura, desarrollado en pareja. Monté y administro su servidor de producción.",
        role: "Desarrollador full stack: módulos de ventas, servicio rápido y reportes, y el servidor de producción",
        team: "En pareja",
        detail: "Módulos de ventas, servicio rápido y reportes con impresos en formato de Costa Rica. Servidor de producción en DigitalOcean con HTTPS, SSH reforzado, firewall y respaldos diarios.",
      },
    },
    body: { en: AgujaEn, es: AgujaEs },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
