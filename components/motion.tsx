"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Page motion, re-armed on every route:
 * - [data-reveal] elements get .is-in once, when they scroll into view (the hidden state only applies
 *   under html.js with no reduced-motion preference, so content never depends on this running);
 * - [data-count] numbers count up once, from 0 to their own text;
 * - header links to #sections get aria-current while that section is on screen, and so does the
 *   case-study index (.toc) for the section being read;
 * - html.past-intro is set once the page title has scrolled out of view.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          reveal.unobserve(e.target);
          if (!reduced) e.target.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    const links = new Map<string, HTMLAnchorElement>();
    document.querySelectorAll<HTMLAnchorElement>('header nav a[href*="#"]').forEach((a) => {
      const id = a.hash.slice(1);
      if (id && a.pathname === window.location.pathname) links.set(id, a);
    });
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const a = links.get(e.target.id);
          if (!a) continue;
          if (e.isIntersecting) {
            links.forEach((other) => other.removeAttribute("aria-current"));
            a.setAttribute("aria-current", "location");
          } else if (a.getAttribute("aria-current")) {
            a.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });

    // Case-study index: the current section is the last heading above 40% of the screen height.
    const toc = [...document.querySelectorAll<HTMLAnchorElement>(".toc a")];
    const heads = toc.map((a) => document.getElementById(a.hash.slice(1)));
    const tocSpy = new IntersectionObserver(
      () => {
        const line = window.innerHeight * 0.4;
        const current = heads.findLastIndex((h) => h !== null && h.getBoundingClientRect().top < line);
        toc.forEach((a, i) => (i === current ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current")));
      },
      { rootMargin: "0px 0px -60% 0px" },
    );
    heads.forEach((h) => h && tocSpy.observe(h));

    // html.past-intro once the page title has scrolled away: the header wordmark and "back to top" show then.
    const root = document.documentElement;
    const title = document.querySelector("main h1");
    const past = new IntersectionObserver(([e]) => root.classList.toggle("past-intro", !e.isIntersecting));
    if (title) past.observe(title);

    return () => {
      reveal.disconnect();
      spy.disconnect();
      tocSpy.disconnect();
      past.disconnect();
      root.classList.remove("past-intro");
    };
  }, [pathname]);

  return null;
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const start = performance.now();
  const duration = 1100;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    // easeOutCubic: fast start, gentle landing on the real number.
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
