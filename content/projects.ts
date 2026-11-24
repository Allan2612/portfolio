import type { MDXContent } from "mdx/types";
import type { StaticImageData } from "next/image";
import type { Locale } from "@/lib/i18n";
import tytHomeEn from "./images/tyt/home-en.webp";
import tytHomeEs from "./images/tyt/home-es.webp";
import tytServices from "./images/tyt/services.webp";
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
  /** Three short points: the case study's "In short" box and the home page's 5-minute mode. */
  keyPoints: [string, string, string];
  /** The project's strongest fact, set large on the home page when there is no screenshot. */
  highlight: { value: string; label: string };
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
  /** Home-page picture for the project row (the cover is used in the intro instead). */
  thumb?: { src: StaticImageData; alt: Record<Locale, string> };
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
    thumb: {
      src: tytServices,
      alt: {
        en: "TyT services page: a large heading, filters by area and service cards with photos.",
        es: "Página de servicios de TyT: un título grande, filtros por área y tarjetas de servicio con fotos.",
      },
    },
    text: {
      en: {
        title: "TyT Tecnología",
        summary: "Website, product catalog and admin dashboard for a tech repair and security camera shop. Sole developer.",
        role: "Sole developer: requirements, design, development, testing, deployment and support",
        team: "Sole developer",
        keyPoints: [
          "Sole developer, from the first requirements to deployment",
          "WhatsApp checkout and an admin dashboard the owners run themselves",
          "119 test files in CI; images moved to Cloudflare R2 by swapping one adapter",
        ],
        highlight: { value: "119", label: "test files in CI, as the sole developer" },
      },
      es: {
        title: "TyT Tecnología",
        summary: "Sitio web, catálogo y panel de administración para un taller de tecnología y cámaras de seguridad. Único desarrollador.",
        role: "Único desarrollador: requerimientos, diseño, desarrollo, pruebas, despliegue y soporte",
        team: "Único desarrollador",
        keyPoints: [
          "Único desarrollador, desde los requerimientos hasta el despliegue",
          "Checkout por WhatsApp y un panel que los dueños manejan solos",
          "119 archivos de pruebas en CI; imágenes migradas a Cloudflare R2 cambiando un adaptador",
        ],
        highlight: { value: "119", label: "archivos de pruebas en CI, como único desarrollador" },
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
        keyPoints: [
          "Wrote the pre-launch audit and fixed all 17 findings",
          "Tenant isolation with PostgreSQL row-level security, tested on all 20 tables in CI",
          "Idempotent invoicing: a retry never issues the same invoice twice",
        ],
        highlight: { value: "17", label: "audit findings fixed before launch: 8 tax-compliance defects and 9 business-logic bugs" },
      },
      es: {
        title: "SaaS de facturación electrónica",
        summary: "Auditoría previa al lanzamiento de una plataforma de facturación electrónica multiempresa, con sus 17 hallazgos corregidos.",
        role: "Practicante de desarrollo de software (full stack)",
        team: "Equipo de producto de una empresa de software",
        keyPoints: [
          "Escribí la auditoría previa al lanzamiento y corregí sus 17 hallazgos",
          "Aislamiento entre empresas con RLS de PostgreSQL, probado en las 20 tablas en CI",
          "Emisión idempotente: un reintento nunca emite dos veces el mismo comprobante",
        ],
        highlight: { value: "17", label: "hallazgos de la auditoría corregidos antes del lanzamiento: 8 fiscales y 9 de lógica de negocio" },
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
        keyPoints: [
          "Designed to answer in under 3 seconds",
          "0 MB of GPU memory in use while idle",
          "A closed list of tools, with confirmation for anything destructive",
        ],
        highlight: { value: "< 3 s", label: "designed response time, with 0 MB of GPU memory in use while idle" },
      },
      es: {
        title: "Miku Assistant",
        summary: "Asistente de voz de escritorio: Whisper local, function calling de Gemini sobre una lista cerrada de herramientas y un avatar Live2D.",
        role: "Proyecto personal",
        team: "Individual",
        keyPoints: [
          "Diseñado para responder en menos de 3 segundos",
          "0 MB de memoria de GPU en uso en reposo",
          "Una lista cerrada de herramientas, con confirmación para todo lo destructivo",
        ],
        highlight: { value: "< 3 s", label: "tiempo de respuesta de diseño, con 0 MB de memoria de GPU en uso en reposo" },
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
        keyPoints: [
          "311 requirements checked against the code and the running system",
          "AI agents I designed cross-checked every verdict",
          "Accounting rules built test-first; top contributor on a team of five",
        ],
        highlight: { value: "311", label: "requirements checked against the code and the running system" },
      },
      es: {
        title: "ERP modular",
        summary: "Reglas contables desarrolladas con TDD y un análisis de brechas de 311 requisitos frente a una norma contable internacional.",
        role: "Practicante de desarrollo de software (backend)",
        team: "Equipo de cinco; principal contribuidor",
        keyPoints: [
          "311 requisitos contrastados con el código y con el sistema en ejecución",
          "Agentes de IA que diseñé verificaron cada veredicto",
          "Reglas contables construidas con TDD; principal contribuidor de un equipo de cinco",
        ],
        highlight: { value: "311", label: "requisitos contrastados con el código y con el sistema en ejecución" },
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
        keyPoints: [
          "Sales, quick-service and reporting modules, built with a partner",
          "A production server I set up: HTTPS, hardened SSH, firewall and daily backups",
          "The business has run on it every day since December 2025",
        ],
        highlight: { value: "Dec 2025", label: "the business has run its day-to-day on it since then" },
      },
      es: {
        title: "La Aguja de Oro",
        summary: "ERP en Odoo 17 para un taller de costura, desarrollado en pareja. Monté y administro su servidor de producción.",
        role: "Desarrollador full stack: módulos de ventas, servicio rápido y reportes, y el servidor de producción",
        team: "En pareja",
        keyPoints: [
          "Módulos de ventas, servicio rápido y reportes, desarrollados en pareja",
          "Un servidor de producción que monté yo: HTTPS, SSH reforzado, firewall y respaldos diarios",
          "El negocio lo usa a diario desde diciembre de 2025",
        ],
        highlight: { value: "dic. 2025", label: "desde entonces el negocio opera su día a día en el sistema" },
      },
    },
    body: { en: AgujaEn, es: AgujaEs },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
