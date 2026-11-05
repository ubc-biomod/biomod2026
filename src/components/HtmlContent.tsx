import { useEffect, useState } from "react";

const slug = (s: string) => s.trim().replace(/\s+/g, "-").toLowerCase();

export default function HtmlContent({ src, sections = [] }: { src: string; sections?: string[] }) {
  const [html, setHtml] = useState("");
  const sectionKey = sections.join("|"); // stable string so the effect doesn't loop

  useEffect(() => {
    fetch(src)
      .then((r) => r.text())
      .then((raw) => {
        const doc = new DOMParser().parseFromString(raw, "text/html");
        doc.querySelectorAll("h1, h2, h3").forEach((h) => {
          const text = h.textContent?.trim() ?? "";
          if (sectionKey.split("|").some((s) => s.trim() === text)) h.id = slug(text);
        });
        const styles = Array.from(doc.head.querySelectorAll("style"))
          .map((s) => s.outerHTML)
          .join("");
        setHtml(styles + doc.body.innerHTML);
      })
      .catch((e) => console.error(`Failed to load ${src}`, e));
  }, [src, sectionKey]);

  return <div className="html-content" dangerouslySetInnerHTML={{ __html: html }} />;
}