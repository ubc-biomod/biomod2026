import { useEffect, useRef, useState } from "react";

const bars = [
  { label: "High income", subtitle: ">13846", value: 0.364, color: "#524573" },
  { label: "Upper-middle", subtitle: "4466-13846", value: 0.525, color: "#7b6aa6" },
  { label: "Lower-middle", subtitle: "1136-4465", value: 0.634, color: "#c49bbd" },
  { label: "Low income", subtitle: "<1135", value: 0.697, color: "#f5b5c0" },
];

export default function BarChart() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full max-w-[860px] rounded-[24px] bg-white/20 p-4 shadow-sm backdrop-blur-sm sm:p-5">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="mt-1 text-xl font-bold text-[#524573] sm:text-2xl">Wealth disparities and cancer outcomes</h2>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#524573]/70">
            Cancer Mortality/Incidence Ratio vs Gross National Income per capita
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center font-semibold uppercase ">
          <p className="text-[0.62rem] text-[#524573]/60">gross national income per capita (USD)</p>
        </div>

        <div className="space-y-3">
          {bars.map((bar) => (
            <div key={bar.label} className="group flex items-center sm:gap-2">
              <div className="w-24 shrink-0 text-right font-semibold uppercase tracking-[0.12em]">
                <h3 className="text-[0.67rem] text-[#524573]/80">{bar.label}</h3>
                <p className="text-[0.55rem] text-[#524573]/70">{bar.subtitle}</p>
              </div>

              <div className="relative h-9 flex-1 rounded-full bg-[#f2edf8]">
                <div
                  className="h-full rounded-full shadow-md transition-all duration-700 ease-out group-hover:brightness-110 group-hover:scale-y-110 group-hover:shadow-lg"
                  style={{
                    width: isVisible ? `${bar.value * 100}%` : "0%",
                    background: bar.color,
                    boxShadow: "0 10px 16px rgba(82,69,115,0.18)",
                  }}
                />
              </div>

              <div className="w-12 shrink-0 text-left text-xs font-bold text-[#524573]">{bar.value}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center pt-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#524573]/60">
          <span>Mortality / Incidence</span>
        </div>
      </div>
    </div>
  );
}