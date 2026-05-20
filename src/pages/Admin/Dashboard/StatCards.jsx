import { useEffect, useState } from "react";

const CARDS = [
  {
    label: "Laporan hari ini",
    value: 14,
    bg: "#007AFF",
    icon: <img className="w-10 h-10 object-contain" src="img/logo-laporan.svg" alt="" />,
  },
  {
    label: "Belum Ditangani",
    value: 6,
    bg: "#FF3B30",
    icon: <img className="w-10 h-10 object-contain" src="img/logo-jam-pasir.svg" alt="" />,
  },
  {
    label: "Sedang diproses",
    value: 5,
    bg: "#FFCC00",
    icon: <img className="w-10 h-10 object-contain" src="img/logo-setting.svg" alt="" />,
  },
  {
    label: "Selesai minggu ini",
    value: 31,
    bg: "#34C759",
    icon: <img className="w-10 h-10 object-contain" src="img/logo-centang.svg" alt="" />,
  },
];

function AnimatedValue({ target, delay }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let cur = 0;
      const step = Math.ceil(target / 20);
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        setVal(cur);
        if (cur >= target) clearInterval(iv);
      }, 40);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return <>{val}</>;
}

export default function StatCards() {
  return (
    <section
      className="h-[124px] px-12 bg-collection-1-secondary rounded-[20px] overflow-hidden shadow-[inset_0px_4px_4px_#00000040] flex flex-col justify-center relative self-stretch w-full flex-[0_0_auto]"
      aria-label="Key metrics"
    >
      <img 
        className="absolute top-0 right-0 w-[239px] h-[124px]" 
        src="img/polygon-2-keymetrics.svg" 
        alt="" 
        aria-hidden="true" 
      />
      <img 
        className="absolute top-0 left-0 w-[403px] h-[124px]" 
        src="img/polygon-keymetrics.svg" 
        alt="" 
        aria-hidden="true" 
      />

      <div className="flex items-center gap-5 relative w-full z-10">
        {CARDS.map((card, i) => (
          <article
            key={card.label}
            className="flex items-center justify-between gap-2.5 px-4 py-2 relative flex-1 bg-collection-1-white rounded-[10px] shadow-[0px_4px_4px_#00000040] hover:-translate-y-0.5 hover:shadow-[0px_6px_8px_#00000050] transition-all duration-200"
          >
            <div className="flex flex-col items-start justify-center gap-1">
              <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-collection-1-black text-base leading-tight whitespace-nowrap">
                {card.label}
              </h2>
              <p className="[font-family:'Helvetica_Neue-Light',Helvetica] font-light text-collection-1-secondary text-2xl leading-none whitespace-nowrap">
                <AnimatedValue target={card.value} delay={i * 150 + 200} />
              </p>
            </div>
            <div
              className="flex w-[60px] h-[60px] shrink-0 items-center justify-center rounded-[5px] shadow-[inset_0px_4px_4px_#00000040]"
              style={{ backgroundColor: card.bg }}
            >
              {card.icon}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}