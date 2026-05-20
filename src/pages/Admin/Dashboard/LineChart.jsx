import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { day: "Senin", laporan: 9 },
  { day: "Selasa", laporan: 12 },
  { day: "Rabu", laporan: 8 },
  { day: "Kamis", laporan: 16 },
  { day: "Jumat", laporan: 13 },
  { day: "Sabtu", laporan: 6 },
  { day: "Minggu", laporan: 4 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-[10px] px-3 py-2 shadow-[0px_4px_4px_#00000040]">
        <p className="text-xs text-[#6b6b6b]">{label}</p>
        <p className="text-sm font-bold text-[#1c1c1c]">{payload[0].value} laporan</p>
      </div>
    );
  }
  return null;
};

export default function LineChart() {
  return (
    <article className="flex flex-col w-[717.46px] items-center gap-8 p-8 relative bg-white rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]">
      <h2 className="relative flex items-center text-center justify-center self-stretch mt-[-1.00px] font-bold text-[#1c1c1c] text-2xl tracking-[-0.35px] leading-5">
        Jumlah laporan 7 hari terakhir
      </h2>

      <div className="w-full" style={{ height: 226 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart
            data={weeklyData}
            margin={{ top: 8, right: 8, left: -28, bottom: 0 }}
          >
            <defs>
              <linearGradient id="redLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#cc0000" />
                <stop offset="100%" stopColor="#ff0000" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#1c1c1c", fontFamily: "Helvetica Neue, Helvetica, sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#1c1c1c", fontFamily: "Helvetica Neue, Helvetica, sans-serif" }}
              axisLine={false}
              tickLine={false}
              ticks={[0, 4, 8, 12, 16]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="laporan"
              stroke="url(#redLineGrad)"
              strokeWidth={2.5}
              dot={{ fill: "#ff0000", r: 4, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#ff0000", stroke: "#fff", strokeWidth: 2 }}
              animationDuration={1000}
            />
          </ReLineChart>
        </ResponsiveContainer>
      </div>

      <div
        className="grid gap-[4px_8px] px-[60px] py-0 w-full"
        style={{
          gridTemplateColumns: "minmax(0,1.50fr) repeat(7, minmax(0,1fr))",
          gridTemplateRows: "repeat(3, fit-content(100%))",
        }}
      >
        <div className="flex items-center justify-center row-[1/2] col-[1/2] justify-self-center self-center w-full h-[34px] font-bold text-[#1c1c1c] text-base text-center">
          Hari
        </div>
        {weeklyData.map((d, i) => (
          <div
            key={d.day}
            className="flex items-center justify-center w-full h-[34px] font-normal text-[#1c1c1c] text-sm text-center"
            style={{ gridRow: "1/2", gridColumn: `${i + 2}/${i + 3}` }}
          >
            {d.day === "Jumat" ? "Jum'at" : d.day}
          </div>
        ))}

        <div
          className="self-center w-full h-px bg-[#d0d0d0]"
          style={{ gridRow: "2/3", gridColumn: "1/9" }}
        />

        <div className="flex items-center justify-center row-[3/4] col-[1/2] justify-self-center self-center w-full h-[34px] font-bold text-[#1c1c1c] text-base text-center">
          Laporan
        </div>
        {weeklyData.map((d, i) => (
          <div
            key={`val-${d.day}`}
            className="flex items-center justify-center w-full h-[34px] font-normal text-[#1c1c1c] text-sm text-center"
            style={{ gridRow: "3/4", gridColumn: `${i + 2}/${i + 3}` }}
          >
            {d.laporan}
          </div>
        ))}
      </div>
    </article>
  );
}