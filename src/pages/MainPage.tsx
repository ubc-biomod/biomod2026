import { useEffect, useRef, useState } from "react";
import dna2Img from "../assets/images/DNA2.png";
import Three from "../components/Three";
import WorldMap, { type CountryConfig } from "../components/WorldMap";
import BarChart from "../components/BarChart";

type Hero = {
  src: string;
  className?: string;
};

const mapData: CountryConfig = {
  CA: {
    color: "#f5b5c0",
    info: (
      <div>
        <h3 className="mb-1 text-lg font-bold">Canada - High Income</h3>
        <p className="text-sm">7 Active RNA Projects</p>
      </div>
    ),
  },
  GB: {
    color: "#f5b5c0",
    info: (
      <div>
        <h3 className="mb-1 text-lg font-bold">United Kingdom</h3>
        <p className="text-sm">12 Clinical Trials</p>
      </div>
    ),
  },
  FR: {
    color: "#f5b5c0",
    info: <strong>France</strong>,
  },
};

const CARDS: Array<{
  id: string;
  title: string[];
  description: string;
  bg: string;
  hero?: Hero;
  children?: React.ReactNode;
}> = [
  {
    id: "01",
    title: ["RNA", "CANCER", "DETECTIVE"],
    description:
      "Our RNA Cancer Detective helps diagnose lung cancer subtypes by taking on different conformations based on relative levels of mRNA transcript in a cell",
    bg: "#BCBDEF",
    children: (
      <div className="flex w-full items-center justify-center">
        <Three />
      </div>
    ),
  },
  {
    id: "02",
    title: ["WHAT", "DOES IT", "EVEN DO?"],
    description: "How does our detective determine the subtype?",
    bg: "#f5b5c0",
    hero: { src: dna2Img, className: "w-full max-w-[760px]" },
  },
  {
    id: "03",
    title: ["WHY IS IT", "IMPORTANT?"],
    description: "The Mortality/Incidence Ratio of cancer is much higher in lower income countries, in large due to a reduced capacity to detect cancer early on.",
    bg: "#BCBDEF",
    children: (
      <div className="w-full max-w-[1000px]">
        {/* <WorldMap data={mapData} defaultColor="#e2e8f0" /> */}
        <BarChart />
      </div>
    ),
  },
  {
    id: "04",
    title: ["PROJECT", "VIDEO"],
    description: "Checkout our project video to learn more!",
    bg: "#f5b5c0",
    hero: { src: dna2Img, className: "w-full max-w-[760px]" },
    children: (
      <div className="flex w-full justify-center">
        <iframe
          title="Project video"
          src="https://www.youtube.com/embed/krcnwXdkRuU?si=3uzEiIuDTUkkHPDK"
          className="aspect-video w-full max-w-[720px] rounded-xl drop-shadow transition-all duration-300 hover:drop-shadow-xl hover:scale-[1.01]"
        />
      </div>
    ),
  },
];

const Card: React.FC<{
  index: number;
  title: string[];
  description: string;
  bg: string;
  hero?: Hero;
  children?: React.ReactNode;
  scrollY: number;
  isLast: boolean;
}> = ({ index, title, description, bg, hero, children, scrollY, isLast }) => {
  const vh = window.innerHeight;
  const cardStart = index * vh;
  const progress = isLast ? 0 : Math.max(0, Math.min(1, (scrollY - cardStart) / vh));
  const translate = progress * -100;

  return (
    <div
      className="absolute inset-0 flex overflow-hidden"
      style={{
        background: bg,
        transform: `translateY(${translate}vh)`,
        zIndex: 50 - index,
      }}
    >
      <div className="grid h-screen w-full grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:px-12 xl:px-20">
        <div className="flex flex-col justify-center lg:pt-16">
          <h1
            className="m-0 font-sans font-bold leading-[1.21] text-[#524573]"
            style={{
              fontSize: "clamp(3rem, 7vw, 8rem)",
              textShadow: "-5px 5px 4px rgba(0,0,0,0.25)",
              letterSpacing: "-0.04em",
            }}
          >
            {title.map((t, i) => (
              <span key={i} className="block">
                {t}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-[42rem] font-[Krub] font-medium text-[#664381]"
            style={{
              fontSize: "clamp(0.875rem, 1.39vw, 1.25rem)",
              lineHeight: "1.3",
              letterSpacing: "-0.05em",
            }}
          >
            {description}
          </p>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          {children ??
            (hero ? (
              <img
                src={hero.src}
                alt=""
                aria-hidden="true"
                className={`${hero.className ?? "w-full max-w-[760px]"} block h-auto select-none pointer-events-none`}
              />
            ) : null)}
        </div>
      </div>
    </div>
  );
};

export default function MainPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const n = CARDS.length;
  const activeSlide = Math.min(n - 1, Math.round(scrollY / window.innerHeight));

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const wrapper = containerRef.current;
        if (!wrapper) return;
        const containerTop = wrapper.getBoundingClientRect().top + window.scrollY;
        setScrollY(Math.max(0, window.scrollY - containerTop));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goToSlide = (i: number) => {
    const wrapper = containerRef.current;
    if (!wrapper) return;
    const containerTop = wrapper.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: containerTop + i * window.innerHeight, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {CARDS.map((c, i) => (
          <Card
            key={c.id}
            index={i}
            title={c.title}
            description={c.description}
            bg={c.bg}
            hero={c.hero}
            scrollY={scrollY}
            isLast={i === n - 1}
          >
            {c.children}
          </Card>
        ))}

        <div
          role="tablist"
          aria-label="Slide navigation"
          className="absolute right-7 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2.5"
        >
          {CARDS.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={activeSlide === i}
              aria-label={`Go to slide ${c.id}`}
              onClick={() => goToSlide(i)}
              className={`rounded-full border-0 transition-all duration-300 ${
                activeSlide === i ? "h-2.5 w-11 bg-[#524573]" : "h-1.5 w-7 bg-[#524573]/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}