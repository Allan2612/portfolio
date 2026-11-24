import type { SiteCopy } from "./site.en";

// Textos de la interfaz y datos del perfil, en español. Fuente de verdad: el CV (ver README).
const site: SiteCopy = {
  name: "Allan Vargas Torres",
  role: "Desarrollador Full Stack",
  meta: {
    title: "Allan Vargas Torres · Desarrollador Full Stack",
    description:
      "Desarrollador full stack en Costa Rica. Construyo aplicaciones web completas con TypeScript y PostgreSQL, y las entrego probadas y en producción.",
    notFoundTitle: "Página no encontrada",
  },
  nav: {
    label: "Principal",
    work: "Proyectos",
    experience: "Experiencia",
    about: "Sobre mí",
    cv: "CV",
    contact: "Contacto",
    switchLocale: "English",
    skip: "Saltar al contenido",
    home: "Inicio",
  },
  hero: {
    statement:
      "Construyo aplicaciones web completas con TypeScript y PostgreSQL, y las entrego probadas y en producción.",
    location: "Pérez Zeledón, Costa Rica · UTC−6 · Disponibilidad inmediata, abierto a trabajo remoto",
    education: "Egresado de Ingeniería en Sistemas de Información (UNA), graduación en mayo de 2027.",
    primary: "Ver proyectos",
    cv: "Descargar CV",
    contact: "Contacto",
    proof: [
      "2 sistemas en producción para clientes",
      "119 archivos de pruebas en CI, como único desarrollador",
      "Análisis de brechas de 311 requisitos",
    ],
    reading: { legend: "Leer esta página en", short: "1 minuto", full: "5 minutos" },
  },
  kinds: { live: "En producción", internship: "Práctica profesional", "open-source": "Código abierto" },
  months: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "set.", "oct.", "nov.", "dic."],
  present: "actualidad",
  work: {
    heading: "Proyectos destacados",
    readCase: "Leer el caso",
  },
  experience: {
    heading: "Experiencia",
    items: [
      {
        role: "Practicante de Desarrollo de Software",
        org: "Empresa de software",
        start: "2026-07",
        end: "2026-11",
        line: "ERP modular y facturación electrónica; Práctica Profesional Supervisada (UNA).",
        detail: [
          "Implementación con TDD de reglas del módulo contable en NestJS, Drizzle y PostgreSQL. Principal contribuidor de un equipo de cinco; más de 3500 pruebas en el proyecto.",
          "Análisis de brechas del mismo ERP frente a una norma contable internacional: 311 requisitos contrastados con el código y con el sistema en ejecución.",
          "Auditoría del repositorio de un SaaS de facturación electrónica y corrección de sus 17 hallazgos antes del lanzamiento; aislamiento entre empresas con RLS probado en CI.",
        ],
      },
      {
        role: "Desarrollador Full Stack (independiente)",
        org: "TyT Tecnología",
        start: "2026-07",
        end: null,
        line: "Diseño, desarrollo y puesta en producción del sitio web, el catálogo y el panel de administración, como único desarrollador.",
        detail: [
          "Diseño, desarrollo y puesta en producción del sitio web, el catálogo y el panel de administración (Next.js, Prisma, PostgreSQL, Auth.js, Cloudflare R2).",
          "Sitio bilingüe con SEO técnico, pedidos por WhatsApp y promociones con IA revisadas antes de publicarse.",
        ],
      },
      {
        role: "Desarrollador Full Stack",
        org: "La Aguja de Oro",
        start: "2024-09",
        end: null,
        line: "ERP en Odoo 17, en pareja, iniciado en un curso de la UNA.",
        detail: [
          "Módulos de ventas, servicio rápido y reportes; aportes en reparaciones y garantías, con impresos fiscales de Costa Rica. El negocio lo usa a diario.",
          "Configuración y mantenimiento del servidor de producción en DigitalOcean: Nginx, HTTPS, SSH reforzado, firewall y respaldos diarios.",
        ],
      },
    ],
  },
  about: {
    heading: "Sobre mí",
    paragraphs: [
      "Construyo aplicaciones web de punta a punta: el modelo de datos, la API, la interfaz, las pruebas y el servidor donde corren. En TyT eso significó definir con los dueños lo que el negocio necesitaba, diseñar el modelo de datos, construir el sitio y su panel, y desplegarlo. En La Aguja de Oro significó aprender Odoo lo suficiente para adaptarlo a la forma en que trabaja un taller de costura, y después montar y mantener el servidor donde corre.",
      "Mis hábitos: pruebas primero cuando las reglas importan, CI en cada push y documentación que otra persona pueda retomar. En la práctica profesional eso fue escribir reglas contables con TDD en un equipo de cinco y auditar una plataforma de facturación electrónica antes de su lanzamiento.",
      "Uso asistentes de IA para programar todos los días. Cada cambio pasa igual por las pruebas y por mi revisión, y puedo explicar cualquier línea que entrego. En el análisis de brechas del ERP diseñé los agentes de IA que verificaban cada requisito, incluido uno cuya única tarea era intentar desmentir cada veredicto de “falta”; yo integré y validé lo que encontraron.",
    ],
    facts: [
      { label: "Ubicación", value: "Pérez Zeledón, Costa Rica (UTC−6)" },
      { label: "Formación", value: "Universidad Nacional de Costa Rica, graduación en mayo de 2027" },
      { label: "Idiomas", value: "Español (nativo), inglés (B2)" },
    ],
    stackHeading: "Tecnologías",
    stack: [
      { label: "Lenguajes", items: "TypeScript, JavaScript, Python, SQL, HTML/CSS, C; Java (cursos)" },
      { label: "Frontend y móvil", items: "React, Next.js, React Native, Expo, Tailwind CSS, shadcn/ui" },
      { label: "Backend", items: "NestJS, Node.js, FastAPI, API REST, Odoo" },
      { label: "Datos", items: "PostgreSQL, Prisma, Drizzle, Supabase, Firebase; Oracle (cursos)" },
      {
        label: "DevOps y calidad",
        items: "Git, GitHub Actions, Docker, Vitest, Playwright, Linux (Debian/Ubuntu), Nginx, DigitalOcean, Vercel",
      },
      { label: "Prácticas", items: "TDD, Scrum (sprints semanales), puertos y adaptadores, revisiones de seguridad, integración de LLM" },
    ],
  },
  more: {
    heading: "Otros proyectos",
    items: [
      {
        name: "PlanTica",
        text: "Identificación de plantas a partir de una foto: filtro previo en el celular (TensorFlow.js, COCO-SSD) e identificación con un LLM de visión (Llama 4 Scout vía Groq) detrás de un backend en FastAPI. Proyecto individual.",
        href: "https://github.com/Allan2612/plantApp",
      },
      {
        name: "Digital Kids",
        text: "Sistema de evaluación y reportes para una guardería, hecho por un equipo de unas 30 personas. Principal contribuidor del frontend y, a la par de otro compañero, del backend.",
        href: null,
      },
      {
        name: "Quimera",
        text: "Un lenguaje de programación diseñado con otro estudiante: gramática EBNF, analizador léxico, parser, AST e intérprete en C, más un editor en PyQt5.",
        href: null,
      },
      {
        name: "Andromeda",
        text: "Proyecto de curso en equipo: una app móvil de supervivencia con una cola sin conexión para el reconocimiento de imágenes con IA. Desarrollé los recursos, los viajes, los paneles y las alertas.",
        href: null,
      },
    ],
    code: "Código en GitHub",
  },
  contactSection: {
    heading: "Contacto",
    prompt: "Busco un puesto de tiempo completo, remoto o en Costa Rica.",
    lead: "Hablemos.",
    cvLabel: "CV (PDF)",
    cvEn: "Inglés",
    cvEs: "Español",
  },
  footer: { description: "Allan Vargas Torres · Desarrollador full stack", source: "Código en GitHub" },
  caseStudy: {
    role: "Rol",
    period: "Período",
    team: "Equipo",
    stack: "Tecnologías",
    status: "Estado",
    links: "Enlaces",
    live: "Ver el sitio en vivo",
    repo: "Ver el código en GitHub",
    private: "El código es privado, así que este caso describe el trabajo en lugar de enlazarlo.",
    previous: "Proyecto anterior",
    next: "Proyecto siguiente",
    cta: "¿Quiere saber más de este proyecto? Con gusto lo explico en una entrevista.",
    ctaButton: "Contactar",
    back: "Todos los proyectos",
  },
  cvPage: {
    title: "CV",
    description: "Experiencia, proyectos, habilidades y formación de Allan Vargas Torres, desarrollador full stack. PDF en español y en inglés.",
    intro: "La misma información de mi CV en PDF, en una sola página.",
    downloadEn: "Descargar PDF (inglés)",
    downloadEs: "Descargar PDF (español)",
    phone: "Teléfono a pedido.",
    profileHeading: "Perfil",
    profile:
      "Egresado de Ingeniería en Sistemas de Información (UNA, graduación en mayo de 2027) y desarrollador full stack con dos sistemas en producción para clientes. Práctica profesional en una empresa de software, en un ERP modular y una plataforma de facturación electrónica. Experiencia en TypeScript (Next.js, NestJS, React Native) y Python, pruebas automatizadas e integración continua.",
    projectsHeading: "Proyectos",
    projects: [
      {
        name: "Miku Assistant",
        stack: "Tauri, TypeScript, Python asyncio, Whisper, Gemini",
        note: "Código abierto (MIT)",
        text: "Asistente de voz de escritorio: Whisper local, Gemini con function calling sobre un conjunto cerrado de herramientas y avatar Live2D. Diseñado para responder en menos de 3 s y liberar la GPU en reposo.",
        href: "https://github.com/Allan2612/miku-assistant",
      },
      {
        name: "PlanTica",
        stack: "Expo, TensorFlow.js, FastAPI, Firebase",
        note: "Proyecto individual",
        text: "Identificación de plantas por foto: filtro previo en el celular y un LLM de visión detrás de un backend propio.",
        href: "https://github.com/Allan2612/plantApp",
      },
      {
        name: "Quimera",
        stack: "C, Python, PyQt5",
        note: "Proyecto de curso, en pareja",
        text: "Lenguaje de programación propio: gramática EBNF, lexer, parser, AST e intérprete en C, con un editor en PyQt5.",
        href: null,
      },
      {
        name: "Digital Kids",
        stack: "Next.js, NestJS, Prisma, PostgreSQL",
        note: "Proyecto de curso, equipo de unas 30 personas",
        text: "Sistema de evaluaciones para una guardería. Principal contribuidor del frontend y, a la par de otro compañero, del backend.",
        href: null,
      },
    ],
    skillsHeading: "Habilidades",
    educationHeading: "Educación",
    education: [
      {
        title: "Bachillerato en Ingeniería en Sistemas de Información",
        place: "Universidad Nacional de Costa Rica, Sede Regional Brunca",
        when: "2021 – mayo de 2027 (prevista)",
        note: "Plan de estudios completo. Optativas: IA, Seguridad Informática, Servidores con Software Libre y Aplicaciones Educativas.",
      },
      {
        title: "Técnico Medio en Informática en Soporte",
        place: "Colegio Técnico Profesional de Pejibaye",
        when: "2020",
        note: null,
      },
    ],
    languagesHeading: "Idiomas",
    languages: "Español (nativo) · inglés (B2)",
  },
  notFound: {
    heading: "Página no encontrada",
    text: "La página que busca no existe o cambió de dirección.",
    home: "Ir al inicio",
    projects: "Ver los proyectos",
    cv: "Descargar el CV",
  },
  contact: {
    email: "alanvartor@gmail.com",
    linkedin: "https://www.linkedin.com/in/allanvargastorres/",
    github: "https://github.com/Allan2612",
    repo: "https://github.com/Allan2612/portfolio",
  },
  cv: { en: "/cv/Allan-Vargas-Torres-CV-EN.pdf", es: "/cv/Allan-Vargas-Torres-CV-ES.pdf" },
};

export default site;
