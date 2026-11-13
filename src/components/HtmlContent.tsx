import { useEffect, useState } from "react";

const slug = (s: string) => s.trim().replace(/\s+/g, "-").toLowerCase();

const inlineHtmlStyles = `
  .html-content img {
    display: inline-block !important;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    margin: 0 0.15em;
  }
  .html-content p,
  .html-content li,
  .html-content span {
    overflow-wrap: anywhere;
  }
`;

const normalizeRelativeUrls = (doc: Document, sourceUrl: string) => {
  const base = new URL(sourceUrl, window.location.href);

  doc.querySelectorAll("img[src], source[src], video[src], audio[src], a[href]").forEach((el) => {
    const attr = el.tagName === "A" ? "href" : "src";
    const value = el.getAttribute(attr);

    if (!value || value.startsWith("#") || value.startsWith("data:") || /^([a-z]+:)?\/\//i.test(value)) {
      return;
    }

    try {
      el.setAttribute(attr, new URL(value, base).toString());
    } catch {
      // Ignore malformed URLs; the browser will handle them as-is.
    }
  });
};

export default function HtmlContent({ src, sections = [] }: { src: string; sections?: string[] }) {
  const [html, setHtml] = useState("");
  const sectionKey = sections.join("|"); // stable string so the effect doesn't loop

  useEffect(() => {
    fetch(src)
      .then((r) => r.text())
      .then((raw) => {
        const doc = new DOMParser().parseFromString(raw, "text/html");
        normalizeRelativeUrls(doc, src);

        doc.querySelectorAll("h1, h2, h3").forEach((h) => {
          const text = h.textContent?.trim() ?? "";
          if (sectionKey.split("|").some((s) => s.trim() === text)) h.id = slug(text);
        });
        const styles = Array.from(doc.head.querySelectorAll("style"))
          .map((s) => s.outerHTML)
          .join("");
        setHtml(`<style>${inlineHtmlStyles}</style>${styles}${doc.body.innerHTML}`);
      })
      .catch((e) => console.error(`Failed to load ${src}`, e));
  }, [src, sectionKey]);

  return <div className="html-content" dangerouslySetInnerHTML={{ __html: html }} />;
}