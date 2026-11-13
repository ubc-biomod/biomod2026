import { useEffect, useRef, useState } from "react";
import dna2Img from "../assets/images/DNA2.png";
import diagram from "../assets/images/what_does_it_even_do.png";
import Three from "../components/Three";
import WorldMap, { type CountryConfig } from "../components/WorldMap";
import BarChart from "../components/BarChart";

type Hero = {
  src: string;
  className?: string;
};

const incomeColors = {
  low: "#f5b5c0",
  lowerMiddle: "#c49bbd",
  upperMiddle: "#7b6aa6",
  high: "#524573",
} as const;

const incomeLabels = {
  low: "Low-income",
  lowerMiddle: "Lower-middle income",
  upperMiddle: "Upper-middle income",
  high: "High income",
} as const;

const incomeCountries = {
  low: [
    { code: "AF", name: "Afghanistan" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "CF", name: "Central African Republic" },
    { code: "TD", name: "Chad" },
    { code: "CD", name: "Congo, Dem. Rep." },
    { code: "ER", name: "Eritrea" },
    { code: "ET", name: "Ethiopia" },
    { code: "GM", name: "Gambia, The" },
    { code: "GW", name: "Guinea-Bissau" },
    { code: "KP", name: "Korea, Dem. People's Rep." },
    { code: "LR", name: "Liberia" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malawi" },
    { code: "ML", name: "Mali" },
    { code: "MZ", name: "Mozambique" },
    { code: "NE", name: "Niger" },
    { code: "RW", name: "Rwanda" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SO", name: "Somalia" },
    { code: "SS", name: "South Sudan" },
    { code: "SD", name: "Sudan" },
    { code: "SY", name: "Syrian Arab Republic" },
    { code: "UG", name: "Uganda" },
    { code: "YE", name: "Yemen, Rep." },
  ],
  lowerMiddle: [
    { code: "AO", name: "Angola" },
    { code: "BD", name: "Bangladesh" },
    { code: "BJ", name: "Benin" },
    { code: "BT", name: "Bhutan" },
    { code: "BO", name: "Bolivia" },
    { code: "KH", name: "Cambodia" },
    { code: "CM", name: "Cameroon" },
    { code: "KM", name: "Comoros" },
    { code: "CG", name: "Congo, Rep." },
    { code: "CI", name: "Côte d'Ivoire" },
    { code: "DJ", name: "Djibouti" },
    { code: "EG", name: "Egypt, Arab Rep." },
    { code: "SZ", name: "Eswatini" },
    { code: "GH", name: "Ghana" },
    { code: "GN", name: "Guinea" },
    { code: "HT", name: "Haiti" },
    { code: "HN", name: "Honduras" },
    { code: "IN", name: "India" },
    { code: "KE", name: "Kenya" },
    { code: "KI", name: "Kiribati" },
    { code: "KG", name: "Kyrgyz Republic" },
    { code: "LA", name: "Lao PDR" },
    { code: "LB", name: "Lebanon" },
    { code: "LS", name: "Lesotho" },
    { code: "MR", name: "Mauritania" },
    { code: "MA", name: "Morocco" },
    { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibia" },
    { code: "NP", name: "Nepal" },
    { code: "NG", name: "Nigeria" },
    { code: "PK", name: "Pakistan" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "ST", name: "São Tomé and Principe" },
    { code: "SN", name: "Senegal" },
    { code: "SB", name: "Solomon Islands" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TZ", name: "Tanzania" },
    { code: "TL", name: "Timor-Leste" },
    { code: "TG", name: "Togo" },
    { code: "TN", name: "Tunisia" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VU", name: "Vanuatu" },
    { code: "PS", name: "West Bank and Gaza" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabwe" },
  ],
  upperMiddle: [
    { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" },
    { code: "AR", name: "Argentina" },
    { code: "AM", name: "Armenia" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "BY", name: "Belarus" },
    { code: "BR", name: "Brazil"}, 
    { code: "BZ", name: "Belize" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BW", name: "Botswana" },
    { code: "CV", name: "Cabo Verde" },
    { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" },
    { code: "CU", name: "Cuba" },
    { code: "DM", name: "Dominica" },
    { code: "DO", name: "Dominican Republic" },
    { code: "EC", name: "Ecuador" },
    { code: "SV", name: "El Salvador" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "FJ", name: "Fiji" },
    { code: "GA", name: "Gabon" },
    { code: "GE", name: "Georgia" },
    { code: "GD", name: "Grenada" },
    { code: "GT", name: "Guatemala" },
    { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran, Islamic Rep." },
    { code: "IQ", name: "Iraq" },
    { code: "JM", name: "Jamaica" },
    { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "XK", name: "Kosovo" },
    { code: "LY", name: "Libya" },
    { code: "MY", name: "Malaysia" },
    { code: "MV", name: "Maldives" },
    { code: "MH", name: "Marshall Islands" },
    { code: "MU", name: "Mauritius" },
    { code: "MX", name: "Mexico" },
    { code: "FM", name: "Micronesia, Fed. Sts." },
    { code: "MD", name: "Moldova" },
    { code: "MN", name: "Mongolia" },
    { code: "ME", name: "Montenegro" },
    { code: "MK", name: "North Macedonia" },
    { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Peru" },
    { code: "PH", name: "Philippines" },
    { code: "WS", name: "Samoa" },
    { code: "RS", name: "Serbia" },
    { code: "ZA", name: "South Africa" },
    { code: "LK", name: "Sri Lanka" },
    { code: "LC", name: "St. Lucia" },
    { code: "VC", name: "St. Vincent and the Grenadines" },
    { code: "SR", name: "Suriname" },
    { code: "TH", name: "Thailand" },
    { code: "TO", name: "Tonga" },
    { code: "TR", name: "Türkiye" },
    { code: "TM", name: "Turkmenistan" },
    { code: "TV", name: "Tuvalu" },
    { code: "UA", name: "Ukraine" },
    { code: "VN", name: "Vietnam" },
  ],
  high: [
    { code: "AU", name: "Australia" },
    { code: "AT", name: "Austria" },
    { code: "BH", name: "Bahrain" },
    { code: "BB", name: "Barbados" },
    { code: "BE", name: "Belgium" },
    { code: "BM", name: "Bermuda" },
    { code: "BG", name: "Bulgaria" },
    { code: "CA", name: "Canada" },
    { code: "KY", name: "Cayman Islands" },
    { code: "CL", name: "Chile" },
    { code: "HR", name: "Croatia" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czechia" },
    { code: "DK", name: "Denmark" },
    { code: "EE", name: "Estonia" },
    { code: "FI", name: "Finland" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "GR", name: "Greece" },
    { code: "GL", name: "Greenland" },
    { code: "HK", name: "Hong Kong SAR, China" },
    { code: "HU", name: "Hungary" },
    { code: "IS", name: "Iceland" },
    { code: "IE", name: "Ireland" },
    { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" },
    { code: "JP", name: "Japan" },
    { code: "KW", name: "Kuwait" },
    { code: "LV", name: "Latvia" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MO", name: "Macao SAR, China" },
    { code: "MT", name: "Malta" },
    { code: "MC", name: "Monaco" },
    { code: "NL", name: "Netherlands" },
    { code: "NZ", name: "New Zealand" },
    { code: "NO", name: "Norway" },
    { code: "OM", name: "Oman" },
    { code: "PA", name: "Panama" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "QA", name: "Qatar" },
    { code: "RO", name: "Romania" },
    { code: "RU", name: "Russian Federation" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SC", name: "Seychelles" },
    { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovak Republic" },
    { code: "SI", name: "Slovenia" },
    { code: "ES", name: "Spain" },
    { code: "SE", name: "Sweden" },
    { code: "KR", name: "South Korea" },
    { code: "CH", name: "Switzerland" },
    { code: "TW", name: "Taiwan, China" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "UY", name: "Uruguay" },
  ],
} as const;

const mapData: CountryConfig = Object.fromEntries(
  Object.entries(incomeCountries).flatMap(([tier, countries]) =>
    countries.map(({ code, name }) => [
      code,
      {
        color: incomeColors[tier as keyof typeof incomeColors],
        info: (
          <div>
            <h3 className="mb-1 text-lg font-bold">{name}</h3>
            <p className="text-sm">{incomeLabels[tier as keyof typeof incomeLabels]}</p>
          </div>
        ),
      },
    ]),
  ),
) as CountryConfig;

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
    description: "Our structure has complement regions for both VIM and CDH1, and takes on a different conformation depending on the combination that is present. Deploying a bunch of these nanostructures in a cell allows us to subtype it using gel electrophoresis to measure the relative levels of each conformation.",
    bg: "#f5b5c0",
    hero: { src: diagram, className: "w-full" },
  },
  {
    id: "03",
    title: ["WHY IS IT", "IMPORTANT?"],
    description: "The Mortality/Incidence Ratio of cancer is much higher in lower income countries, in large due to a reduced capacity to detect cancer early on.",
    bg: "#BCBDEF",
    children: (
      <div className="w-full max-w-[1000px] flex-column justify-center items-center gap-10">
        <WorldMap data={mapData} defaultColor="#e2e8f0" />
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-[#334155]">
          {/* {Object.entries(incomeColors).map(([tier, color]) => (
            <div key={tier} className="flex items-center gap-2 rounded-full border border-[#dbe2f0] bg-white/60 px-3 py-1.5">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
              <span>{incomeLabels[tier as keyof typeof incomeLabels]}</span>
            </div>
          ))} */}
        </div>
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
          className="aspect-video w-full rounded-xl drop-shadow transition-all duration-300 hover:drop-shadow-xl hover:scale-[1.01]"
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
            className="mt-8 max-w-[42rem] font-[Inter] text-[#664381]"
            style={{
              fontSize: "clamp(0.875rem, 1.39vw, 1.75rem)",
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