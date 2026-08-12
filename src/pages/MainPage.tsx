import { useEffect, useRef, useState, useCallback } from "react";
import dnaImg from "../assets/images/DNA.png";
import dna2Img from "../assets/images/DNA2.png";

// All measurements scaled from Figma's 1440×917px canvas.
// Horizontal: px / 1440 * 100 = vw value
// Vertical:   px / 917  * 100 = vh value

// const NAV_LINKS = [
//   { label: "Home", to: "/" },
//   { label: "Project Ideas", to: "/project-ideas" },
//   { label: "Team", to: "/team" },
//   { label: "Sponsors", to: "/sponsors" },
// ];

// ── Slide content ──────────────────────────────────────────────────
// Slide 01 is the real, finished design. Slides 02–04 are placeholders
// that reuse the same headline/subtitle layout and the two existing DNA
// assets (repositioned for variety) — replace `title`, `subtitle`, and
// `heroImage` / `accentImage` per slide once real content is ready.
// Import any new images at the top of the file the same way DNA.png is.

const SCROLL_LENGTH_VH = 200; // higher = slower/more deliberate scroll per slide

const SLIDES = [
  {
    id: "01",
    bg: "#BCBDEF",
    title: ["DNA", "ABUNDANCE", "SORTER"],
    subtitle:
      "The DNA Abundance Sorter (DAS for short) is a nanostructure that adopts a specific conformation based on relative levels of mRNA transcript in a cell",
    heroImage: {
      src: dnaImg,
      left: "43.13vw",
      top: 0,
      width: "79.22vw",
      transform: "rotate(90.26deg)",
    },
    accentImage: {
      src: dna2Img,
      left: "25vw",
      top: "10.47vh",
      width: "clamp(70px, 10.42vw, 150px)",
      transform: "matrix(-0.93, 0.37, 0.37, 0.93, 0, 0)",
    },
  },
  {
    id: "02",
    bg: "#BCBDEF",
    title: ["PLACEHOLDER", "TITLE TWO"],
    subtitle:
      "Placeholder copy for slide two — replace with real project description once it's finalized.",
    heroImage: {
      src: dna2Img,
      left: "43vw",
      top: "8vh",
      width: "58vw",
      transform: "rotate(-18deg) scaleX(-1)",
    },
    accentImage: {
      src: dnaImg,
      left: "23vw",
      top: "9vh",
      width: "clamp(70px, 9vw, 130px)",
      transform: "rotate(28deg)",
    },
  },
  {
    id: "03",
    bg: "#BCBDEF",
    title: ["PLACEHOLDER", "TITLE THREE"],
    subtitle:
      "Placeholder copy for slide three — swap in real content when it's ready.",
    heroImage: {
      src: dnaImg,
      left: "40vw",
      top: "-3vh",
      width: "68vw",
      transform: "rotate(24deg)",
    },
    accentImage: {
      src: dna2Img,
      left: "27vw",
      top: "12vh",
      width: "clamp(70px, 9vw, 130px)",
      transform: "matrix(0.9, -0.3, 0.3, 0.9, 0, 0)",
    },
  },
  {
    id: "04",
    bg: "#BCBDEF",
    title: ["PLACEHOLDER", "TITLE FOUR"],
    subtitle:
      "Placeholder copy for slide four — final text and imagery still to come.",
    heroImage: {
      src: dna2Img,
      left: "45vw",
      top: "5vh",
      width: "60vw",
      transform: "rotate(10deg)",
    },
    accentImage: {
      src: dnaImg,
      left: "24vw",
      top: "8vh",
      width: "clamp(70px, 10vw, 145px)",
      transform: "rotate(-22deg)",
    },
  },
];

export default function MainPage() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const n = SLIDES.length;

  const update = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.min(1, Math.max(0, scrolled / Math.max(1, scrollable)));
    const p = progress * (n - 1);
    const nearest = Math.round(p);
    setActiveIndex((prev) => (prev === nearest ? prev : nearest));

    SLIDES.forEach((_, i) => {
      const diff = p - i;
      const absDiff = Math.min(1, Math.abs(diff));
      const opacity = Math.max(0, 1 - absDiff * 1.5);
      const scale = 1 - absDiff * 0.06;
      const heroShift = diff * 40; // px, image parallax
      const textShift = diff * 90; // px, text moves faster = depth

      const slideEl = slideRefs.current[i];
      const heroEl = heroImgRefs.current[i];
      const textEl = textRefs.current[i];
      if (slideEl) {
        slideEl.style.opacity = opacity.toFixed(3);
        slideEl.style.zIndex = String(Math.round((1 - absDiff) * 100));
        slideEl.style.pointerEvents = opacity < 0.05 ? "none" : "auto";
      }
      if (heroEl) {
        heroEl.style.transform = `translateY(${heroShift}px) scale(${scale})`;
      }
      if (textEl) {
        textEl.style.transform = `translateY(${textShift}px)`;
      }
    });

    rafRef.current = null;
  }, [n]);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll, update]);

  const goToSlide = (i: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scrollable = wrapper.getBoundingClientRect().height - window.innerHeight;
    const target = wrapper.offsetTop + (scrollable * i) / (n - 1);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", width: "100%", height: `${n * SCROLL_LENGTH_VH}vh` }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => { slideRefs.current[i] = el; }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: s.bg,
              overflow: "hidden",
            }}
          >
            {/* ── Hero Title ─────────────────────────────────────── */}
            {/* Figma: left 88px, top 110px, Inter 700 128px, color #000 */}
            {/* text-shadow: -5px 5px 4px rgba(0,0,0,0.25)              */}
            <h1
              ref={(el) => { textRefs.current[i] = el; }}
              style={{
                position: "absolute",
                left: "6.11vw",
                top: "11.99vh",
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "clamp(3rem, 8.89vw, 8rem)",
                lineHeight: 1.21,
                color: "#524573",
                textShadow: "-5px 5px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              {s.title.map((line, li) => (
                <span key={li} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </h1>

            {/* ── Small accent DNA icon (next to headline) ─────────── */}
            <img
              src={s.accentImage.src}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                left: s.accentImage.left,
                top: s.accentImage.top,
                width: s.accentImage.width,
                height: "auto",
                transform: s.accentImage.transform,
                pointerEvents: "none",
              }}
            />

            {/* ── Subtitle ──────────────────────────────────────── */}
            {/* Figma: left 92px, top 595px, Krub 500 20px, color #664381 */}
            <p
              style={{
                position: "absolute",
                left: "6.39vw",
                top: "64.89vh",
                width: "clamp(200px, 42.78vw, 616px)",
                margin: 0,
                fontFamily: "'Krub', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(0.875rem, 1.39vw, 1.25rem)",
                lineHeight: "1.3",
                letterSpacing: "-0.05em",
                color: "#664381",
              }}
            >
              {s.subtitle}
            </p>

            {/* ── Large DNA helix image ───────────────────────────── */}
            <img
              ref={(el) => { heroImgRefs.current[i] = el; }}
              src={s.heroImage.src}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                left: s.heroImage.left,
                top: s.heroImage.top,
                width: s.heroImage.width,
                height: "auto",
                transformOrigin: "center center",
                pointerEvents: "none",
                willChange: "transform",
              }}
            />
          </div>
        ))}

        {/* ── Progress rail: doubles as slide navigation ────────── */}
        <div
          role="tablist"
          aria-label="Slide navigation"
          style={{
            position: "absolute",
            right: "28px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 200,
          }}
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${s.id}`}
              onClick={() => goToSlide(i)}
              style={{
                width: i === activeIndex ? "44px" : "28px",
                height: "5px",
                borderRadius: "2px",
                border: "none",
                cursor: "pointer",
                background: i === activeIndex ? "#524573" : "rgba(82, 69, 115, 0.25)",
                transition: "width .3s ease, background .3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}