import { useState } from "react";

const DEFAULT_CHANNELS = [
  { name: "SMS", value: 27, color: "#007AFF" },
  { name: "Whatsapp", value: 38, color: "#25D366" },
  { name: "Email", value: 20, color: "#FF9500" },
  { name: "Facebook", value: 10, color: "#1877F2" },
  { name: "Others", value: 5, color: "#8E8E93" },
];

function DonutSVG({ data, hovered, setHovered }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  const r = 80;
  const cx = 110;
  const cy = 110;
  const circumference = 2 * Math.PI * r;
  const gap = 3;

  let cumulative = 0;
  const slices = data.map((d) => {
    const pct = total > 0 ? d.value / total : 0;
    const dash = Math.max(pct * circumference - gap, 0);
    const space = circumference - dash;
    const rotation = total > 0 ? (cumulative / total) * 360 - 90 : -90;
    cumulative += d.value;
    return { ...d, dash, space, rotation };
  });

  return (
    <svg width={220} height={220} viewBox="0 0 220 220">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e8e8e8" strokeWidth={28} />

      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={s.color || "#8E8E93"}
          strokeWidth={hovered === i ? 34 : 26}
          strokeDasharray={`${s.dash} ${s.space}`}
          transform={`rotate(${s.rotation} ${cx} ${cy})`}
          style={{
            transition: "stroke-width 0.18s ease, opacity 0.18s ease",
            opacity: hovered !== null && hovered !== i ? 0.45 : 1,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}

      {hovered !== null && data[hovered] ? (
        <>
          <text x={cx} y={cy - 8} textAnchor="middle" fill="#1c1c1c" fontSize={18} fontWeight="bold" fontFamily="Helvetica Neue, Helvetica, sans-serif">
            {data[hovered].value}
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill="#6b6b6b" fontSize={11} fontFamily="Helvetica Neue, Helvetica, sans-serif">
            {data[hovered].name}
          </text>
        </>
      ) : (
        <>
          <text x={cx} y={cy - 8} textAnchor="middle" fill="#1c1c1c" fontSize={18} fontWeight="bold" fontFamily="Helvetica Neue, Helvetica, sans-serif">
            {total}
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill="#6b6b6b" fontSize={11} fontFamily="Helvetica Neue, Helvetica, sans-serif">
            Total
          </text>
        </>
      )}
    </svg>
  );
}

const LegendDot = ({ color }) => (
  <span
    className="inline-block w-3 h-3 rounded-full flex-shrink-0"
    style={{ backgroundColor: color || "#8E8E93" }}
  />
);

export default function DonutChart({ data }) {
  const [hovered, setHovered] = useState(null);

  // Use mapped data or fallback
  const chartData = data && data.length > 0 ? data.map(item => ({
    name: item.channel_chat || item.name || "Unknown",
    value: item.total || item.value || 0,
    color: item.color || "#8E8E93" // Ideally API or frontend determines color
  })) : DEFAULT_CHANNELS;

  // Add colors if missing (simple fallback)
  const colors = ["#007AFF", "#25D366", "#FF9500", "#1877F2", "#8E8E93"];
  chartData.forEach((d, i) => {
    if (!d.color || d.color === "#8E8E93") {
      d.color = colors[i % colors.length];
    }
  });

  return (
    <article className="flex flex-col items-start gap-8 p-8 relative flex-1 self-stretch grow bg-white rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]">

      <h2 className="relative flex items-center justify-center text-center self-stretch mt-[-1.00px] font-bold text-[#1c1c1c] text-2xl tracking-[-0.35px] leading-5">
        Channel paling sering digunakan
      </h2>

      <div className="relative flex-1 self-stretch w-full grow flex items-center justify-center">
        <DonutSVG data={chartData} hovered={hovered} setHovered={setHovered} />
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-2 px-4 py-0 relative flex-[0_0_auto]">
        {chartData.map((ch, i) => (
          <div
            key={ch.name}
            className="flex items-center gap-1.5 cursor-pointer"
            style={{ opacity: hovered !== null && hovered !== i ? 0.4 : 1, transition: "opacity 0.18s ease" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <LegendDot color={ch.color} />
            <span className="font-normal text-[#333333] text-xs leading-[normal] whitespace-nowrap">
              {ch.name}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}