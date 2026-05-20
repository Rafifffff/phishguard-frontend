export default function GaugeChart({ value = 0 }) {
  const cx = 160;
  const cy = 155;
  const R  = 120;
  const r  = 85;

  const startAngle = Math.PI;      
  const endAngle   = 0;               
  const totalAngle = Math.PI;   

  const pt = (angle, radius) => ({
    x: cx + radius * Math.cos(angle),
    y: cy - radius * Math.sin(angle),
  });

  const bgOuter1 = pt(startAngle, R);
  const bgOuter2 = pt(endAngle,   R);
  const bgInner2 = pt(endAngle,   r);
  const bgInner1 = pt(startAngle, r);
  const bgPath = [
    `M ${bgOuter1.x} ${bgOuter1.y}`,
    `A ${R} ${R} 0 0 1 ${bgOuter2.x} ${bgOuter2.y}`,
    `L ${bgInner2.x} ${bgInner2.y}`,
    `A ${r} ${r} 0 0 0 ${bgInner1.x} ${bgInner1.y}`,
    "Z",
  ].join(" ");

  const fillAngle  = startAngle - (value / 100) * totalAngle;
  const fgOuter1   = pt(startAngle, R);
  const fgOuter2   = pt(fillAngle,  R);
  const fgInner2   = pt(fillAngle,  r);
  const fgInner1   = pt(startAngle, r);
  const largeArc   = value > 50 ? 1 : 0;
  const fgPath = value === 0 ? "" : [
    `M ${fgOuter1.x} ${fgOuter1.y}`,
    `A ${R} ${R} 0 ${largeArc} 1 ${fgOuter2.x} ${fgOuter2.y}`,
    `L ${fgInner2.x} ${fgInner2.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${fgInner1.x} ${fgInner1.y}`,
    "Z",
  ].join(" ");

  const labelColor =
    value >= 70 ? "rgba(111,0,0,1)" :
    value >= 40 ? "rgba(180,100,0,1)" :
                  "rgba(52,199,89,1)";

  const gradId = "gauge-grad";

  return (
    <div className="flex flex-col items-center justify-center relative w-full">
      <svg
        viewBox="0 0 320 170"
        className="w-full max-w-[320px]"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Gradient hijau → kuning → oranye → merah */}
          {/* <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#22c55e" />
            <stop offset="35%"  stopColor="#84cc16" />
            <stop offset="55%"  stopColor="#eab308" />
            <stop offset="75%"  stopColor="#f97316" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient> */}
        </defs>

        <path d={bgPath} fill="rgba(40,40,40,0.15)" />

        {value > 0 && (
          <path d={fgPath} fill={`url(#${gradId})`} />
        )}

        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          style={{
            fontFamily: "'Helvetica Neue-Regular', Helvetica",
            fontSize: "28px",
            fontWeight: "400",
            fill: labelColor,
            letterSpacing: "-0.5px",
          }}
        >
          {value}%
        </text>
      </svg>
    </div>
  );
}