import type { TechIcon } from "@/lib/tech-icons";

type Used = { en: string; es: string };
type Tech = { icon?: TechIcon; used?: Used };

const site = { en: "this site", es: "este sitio" };
const both = (en: string, es = en): Used => ({ en, es });

/**
 * Icon and "where I used it" for each stack item, keyed by the item's name as written in
 * site.<locale>.ts (both languages' spellings). Only facts stated elsewhere on the site or in the CV;
 * an item without `used` simply does not flip.
 */
const techs: Record<string, Tech> = {
  TypeScript: { icon: "typescript", used: both(`TyT · SaaS · ERP · Miku · ${site.en}`, `TyT · SaaS · ERP · Miku · ${site.es}`) },
  JavaScript: { icon: "javascript" },
  Python: { icon: "python", used: both("Miku · La Aguja de Oro · PlanTica") },
  SQL: { used: both("TyT · SaaS · ERP · La Aguja de Oro") },
  "HTML/CSS": { icon: "html5", used: both(`TyT · ${site.en}`, `TyT · ${site.es}`) },
  C: { icon: "c", used: both("Quimera") },
  "C++": { icon: "cplusplus" },
  "Java (coursework)": { icon: "openjdk", used: both("University coursework") },
  "Java (cursos)": { icon: "openjdk", used: both("Cursos de la universidad") },
  React: { icon: "react", used: both(`TyT · SaaS · ${site.en}`, `TyT · SaaS · ${site.es}`) },
  "Next.js": { icon: "nextdotjs", used: both(`TyT · Digital Kids · ${site.en}`, `TyT · Digital Kids · ${site.es}`) },
  "React Native": { icon: "react", used: both("Rutica · PlanTica") },
  Expo: { icon: "expo", used: both("Rutica · PlanTica") },
  "Tailwind CSS": { icon: "tailwindcss", used: both(`TyT · ${site.en}`, `TyT · ${site.es}`) },
  "shadcn/ui": { icon: "shadcnui", used: both("TyT") },
  NestJS: { icon: "nestjs", used: both("SaaS · ERP · Digital Kids") },
  "Node.js": { icon: "nodedotjs", used: both("TyT · SaaS · ERP") },
  FastAPI: { icon: "fastapi", used: both("PlanTica") },
  "REST APIs": { used: both("E-invoicing SaaS") },
  "API REST": { used: both("SaaS de facturación") },
  Odoo: { icon: "odoo", used: both("La Aguja de Oro") },
  PostgreSQL: { icon: "postgresql", used: both("TyT · SaaS · ERP · La Aguja de Oro") },
  Prisma: { icon: "prisma", used: both("TyT · Digital Kids") },
  Drizzle: { icon: "drizzle", used: both("ERP") },
  Supabase: { icon: "supabase", used: both("Rutica") },
  Firebase: { icon: "firebase", used: both("PlanTica · Andromeda") },
  "Oracle (coursework)": { used: both("University coursework") },
  "Oracle (cursos)": { used: both("Cursos de la universidad") },
  Git: { icon: "git", used: both("Every project", "Todos los proyectos") },
  "GitHub Actions": { icon: "githubactions", used: both(`TyT · SaaS · ERP · ${site.en}`, `TyT · SaaS · ERP · ${site.es}`) },
  Docker: { icon: "docker", used: both("TyT · La Aguja de Oro (dev)", "TyT · La Aguja de Oro (desarrollo)") },
  Vitest: { icon: "vitest", used: both(`TyT · ERP · ${site.en}`, `TyT · ERP · ${site.es}`) },
  Playwright: { used: both(`TyT · ERP · ${site.en}`, `TyT · ERP · ${site.es}`) },
  "Linux (Debian/Ubuntu)": { icon: "linux", used: both("La Aguja de Oro (server)", "La Aguja de Oro (servidor)") },
  Nginx: { icon: "nginx", used: both("La Aguja de Oro") },
  DigitalOcean: { icon: "digitalocean", used: both("La Aguja de Oro") },
  Vercel: { icon: "vercel", used: both(`TyT · ${site.en}`, `TyT · ${site.es}`) },
  TDD: { used: both("ERP") },
  "Scrum (weekly sprints)": { used: both("Internship at Argana") },
  "Scrum (sprints semanales)": { used: both("Práctica en Argana") },
  "ports and adapters": { used: both("TyT") },
  "puertos y adaptadores": { used: both("TyT") },
  "security reviews": { used: both("E-invoicing SaaS") },
  "revisiones de seguridad": { used: both("SaaS de facturación") },
  "LLM integration": { used: both("Miku · TyT · PlanTica") },
  "integración de LLM": { used: both("Miku · TyT · PlanTica") },
};

export const getTech = (name: string): Tech => techs[name] ?? {};
