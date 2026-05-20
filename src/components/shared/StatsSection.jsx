import StatCard from "../ui/StatCard";

const DEFAULT_STATS = [
  {
    label: 'Total penggunaan "Message Checker"',
    value: "12.847",
    iconSrc: "img/vector-13.svg",
    iconBg: "bg-[rgba(0,136,255,1)]",
  },
  {
    label: "Total laporan diselesaikan",
    value: "3.426",
    iconSrc: "img/vector-2.svg",
    iconBg: "bg-[rgba(52,199,89,1)]",
  },
  {
    label: "Akses 1 minggu terakhir",
    value: "1.845",
    iconSrc: "img/union.svg",
    iconBg: "bg-[rgba(255,141,40,1)]",
  },
];

export default function StatsSection({ stats = DEFAULT_STATS }) {
  return (
    <section className="flex flex-col items-start gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto]">
      <div className="gap-2.5 p-6 sm:p-8 flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[inset_0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(111,0,0,1)_0%,rgba(111,0,0,1)_100%)] flex flex-col items-start relative self-stretch w-full">
        {/* Dekorasi */}
        <img className="absolute top-0 right-0 w-[230px] h-[186px] hidden xl:block pointer-events-none" src="img/polygon-4-2.svg" alt="" />
        <img className="absolute top-0 left-0 w-[403px] h-[186px] hidden xl:block pointer-events-none" src="img/polygon-3-3.svg" alt="" />

        <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-5 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] shadow-[0px_4px_4px_#00000040]">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              iconSrc={stat.iconSrc}
              iconBg={stat.iconBg}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
