import { useEffect, useRef, useState } from "react";
import dnaImg from "../assets/images/DNA.png";
import dna2Img from "../assets/images/DNA2.png";

  const CARDS = [
    {
      id: "01",
      title: ["DNA", "ABUNDANCE", "SORTER"],
      description:
        "The DNA Abundance Sorter (DAS for short) is a nanostructure that adopts a specific conformation based on relative levels of mRNA transcript in a cell",
      bg: "#BCBDEF",
      hero: { src: dnaImg, left: "43.13vw", top: 0, width: "79.22vw", transform: "rotate(90.26deg)" },
    },
    {
      id: "02",
      title: ["PLACEHOLDER", "TITLE TWO"],
      description: "Placeholder copy for slide two — replace with real project description once it's finalized.",
      bg: "#f5b5c0",
      hero: { src: dna2Img, left: "43vw", top: "8vh", width: "58vw", transform: "rotate(-18deg) scaleX(-1)" },
    },
    {
      id: "03",
      title: ["PLACEHOLDER", "TITLE THREE"],
      description: "Placeholder copy for slide three — swap in real content when it's ready.",
      bg: "#BCBDEF",
      hero: { src: dnaImg, left: "40vw", top: "-3vh", width: "68vw", transform: "rotate(24deg)" },
    },
    // New 4th placeholder slide requested
    {
      id: "04",
      title: ["PLACEHOLDER", "TITLE FOUR"],
      description: "Placeholder copy for slide four — final text and imagery still to come.",
      bg: "#f5b5c0",
      hero: { src: dna2Img, left: "45vw", top: "5vh", width: "60vw", transform: "rotate(10deg)" },
    },
  ];

  const Card: React.FC<{
    index: number;
    title: string[];
    description: string;
    bg: string;
    hero: { src: string; left: string; top: string | number; width: string; transform?: string };
    scrollY: number;
  }> = ({ index, title, description, bg, hero, scrollY }) => {
    const vh = window.innerHeight;
    const cardStart = index * vh;
    const progress = Math.max(0, Math.min(1, (scrollY - cardStart) / vh));
    const translate = progress * -100; // in vh

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${translate}vh)`,
          transition: "transform 120ms linear",
          zIndex: 50 - index,
          overflow: "hidden",
        }}
      >
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          <h1
            style={{
              position: "absolute",
              left: "6.11vw",
              top: "11.99vh",
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 8.89vw, 8rem)",
              lineHeight: 1.21,
              color: "#524573",
              textShadow: "-5px 5px 4px rgba(0,0,0,0.25)",
            }}
          >
            {title.map((t, i) => (
              <span key={i} style={{ display: "block" }}>
                {t}
              </span>
            ))}
          </h1>

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
            {description}
          </p>

          <img
            src={hero.src}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: hero.left,
              top: hero.top as any,
              width: hero.width,
              transform: hero.transform,
              height: "auto",
              pointerEvents: "none",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    );
  };

  export default function MainPage() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scrollY, setScrollY] = useState<number>(0);
    const [maxScrollTop, setMaxScrollTop] = useState<number | null>(null);
    const n = CARDS.length;

    // recompute maxScrollTop when layout/resizes happen
    useEffect(() => {
      const updateMax = () => {
        const footer = document.querySelector("footer");
        if (footer) {
          const footerTop = footer.getBoundingClientRect().top + window.scrollY;
          const maxTop = Math.max(0, footerTop - window.innerHeight);
          setMaxScrollTop(maxTop);
        } else {
          setMaxScrollTop(null);
        }
      };

      updateMax();
      window.addEventListener("resize", updateMax);
      // footer might be added later; check on a short interval then clear
      const t = setTimeout(updateMax, 250);
      return () => {
        window.removeEventListener("resize", updateMax);
        clearTimeout(t);
      };
    }, []);

    useEffect(() => {
      const onScroll = () => {
        let y = window.scrollY;
        if (maxScrollTop !== null && y > maxScrollTop) {
          // clamp so user cannot scroll past the point where footer starts showing
          window.scrollTo({ top: maxScrollTop });
          y = maxScrollTop;
        }
        setScrollY(y);
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll as any);
    }, [maxScrollTop]);

    const goToSlide = (i: number) => {
      const wrapper = containerRef.current;
      if (!wrapper) return;
      const target = wrapper.offsetTop + i * window.innerHeight;
      const finalTarget = maxScrollTop !== null ? Math.min(target, maxScrollTop) : target;
      window.scrollTo({ top: finalTarget, behavior: "smooth" });
    };

    return (
      <div ref={containerRef} style={{ position: "relative", width: "100%", height: `${n * 100}vh` }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          {CARDS.map((c, i) => (
            <Card key={c.id} index={i} title={c.title} description={c.description} bg={c.bg} hero={c.hero} scrollY={scrollY} />
          ))}

          <div
            role="tablist"
            aria-label="Slide navigation"
            style={{ position: "absolute", right: "28px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "10px", zIndex: 200 }}
          >
            {CARDS.map((c, i) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={Math.round(scrollY / window.innerHeight) === i}
                aria-label={`Go to slide ${c.id}`}
                onClick={() => goToSlide(i)}
                style={{ width: Math.round(scrollY / window.innerHeight) === i ? "44px" : "28px", height: "5px", borderRadius: "2px", border: "none", cursor: "pointer", background: Math.round(scrollY / window.innerHeight) === i ? "#524573" : "rgba(82,69,115,0.25)", transition: "width .3s ease, background .3s ease" }}
              />
            ))}
          </div>
        </div>

        {/* spacer to allow scrolling through the stack */}
        <div style={{ height: `${n * 100}vh` }} />
      </div>
    );
  }