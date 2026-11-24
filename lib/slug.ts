/** "Qué construí" → "que-construi": ids for case-study headings, shared by the headings and the index. */
export const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
