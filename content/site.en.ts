// Interface copy and profile data, English. Source of truth: the CV (see README).
const site = {
  name: "Allan Vargas Torres",
  role: "Full Stack Developer",
  location: "Pérez Zeledón, Costa Rica · UTC−6 · Open to remote",
  meta: {
    title: "Allan Vargas Torres · Full Stack Developer",
    description:
      "Full stack developer in Costa Rica building web applications with TypeScript and PostgreSQL.",
  },
  nav: {
    switchLocale: "Español",
    switchLocaleLabel: "Ver este sitio en español",
  },
  contact: {
    email: "alanvartor@gmail.com",
    linkedin: "https://www.linkedin.com/in/allanvargastorres/",
    github: "https://github.com/Allan2612",
  },
};

export type SiteCopy = typeof site;
export default site;
