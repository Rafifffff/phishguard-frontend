import { useState } from "react";

const IconFilter = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2.5A.5.5 0 0 1 1.5 2h13a.5.5 0 0 1 .354.854l-5 5A.5.5 0 0 0 9.5 8.207V13.5a.5.5 0 0 1-.276.447l-3 1.5A.5.5 0 0 1 5.5 15V8.207a.5.5 0 0 0-.146-.353l-5-5A.5.5 0 0 1 1 2.5z" />
  </svg>
);
const IconSort = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L3.5 11.293V2.5zm4 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
  </svg>
);

const IconChevronDown = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
  </svg>
);

const IconCheckbox = ({ checked }) => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
    <rect
      x="1"
      y="1"
      width="14"
      height="14"
      rx="2"
      stroke="#1c1c1c"
      strokeWidth="1.5"
      fill={checked ? "#1c1c1c" : "white"}
    />
    {checked && (
      <path
        d="M3.5 8L6.5 11L12.5 5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

const SORT_OPTIONS = ["Default", "Terbaru", "Terlama", "Status A-Z"];

export default function TriageFilterBar({ filters, setFilters }) {
  const [sortOpen, setSortOpen] = useState(false);

  const handleSortSelect = (opt) => {
    setFilters((prev) => ({ ...prev, sort: opt }));
    setSortOpen(false);
  };

  const handleHideSelesai = () => {
    setFilters((prev) => ({ ...prev, hideSelesai: !prev.hideSelesai }));
  };

  const handleSearch = (e) => {
    setFilters((prev) => ({ ...prev, query: e.target.value }));
  };

  const handleSearchSubmit = () => {
  };

  return (
    <div className="flex items-center gap-0 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] overflow-hidden border border-[#d0d0d0] bg-white shadow-[0px_4px_4px_#00000020]">

      <button
        className="flex items-center justify-center px-4 py-[10px] text-[#1c1c1c] hover:bg-[#f5f5f5] transition-colors flex-shrink-0 border-r border-[#d0d0d0] h-full"
        title="Filter"
        aria-label="Filter"
      >
        <IconFilter />
      </button>

      <div className="relative flex-shrink-0 border-r border-[#d0d0d0]">
        <button
          className="flex items-center justify-center px-3 py-[10px] text-[#1c1c1c] hover:bg-[#f5f5f5] transition-colors h-full"
          title="Urutkan"
          aria-label="Urutkan"
          onClick={() => setSortOpen(!sortOpen)}
        >
          <IconSort />
        </button>
        {sortOpen && (
          <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-[#d0d0d0] rounded-[10px] shadow-[0px_4px_12px_#00000030] z-20 overflow-hidden">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSortSelect(opt)}
                className={`w-full text-left px-4 py-2.5 text-sm font-normal text-[#1c1c1c] hover:bg-[#f5f5f5] transition-colors ${
                  filters.sort === opt ? "font-bold bg-[#f0f0f0]" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative flex-shrink-0 border-r border-[#d0d0d0]">
        <button
          onClick={() => setSortOpen(!sortOpen)}
          className="flex items-center gap-2 px-4 py-[10px] text-sm font-normal text-[#1c1c1c] hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
        >
          {filters.sort}
          <IconChevronDown />
        </button>
      </div>

      <button
        onClick={handleHideSelesai}
        className="flex items-center gap-2 px-4 py-[10px] text-sm font-normal text-[#1c1c1c] hover:bg-[#f5f5f5] transition-colors whitespace-nowrap border-r border-[#d0d0d0] flex-shrink-0"
      >
        <IconCheckbox checked={filters.hideSelesai} />
        <span>Sembunyikan Ticket &ldquo;Selesai&rdquo;</span>
      </button>

      <div className="w-px h-full bg-[#d0d0d0] flex-shrink-0" />

      <input
        type="text"
        placeholder="Cari tiket..."
        value={filters.query}
        onChange={handleSearch}
        className="flex-1 px-4 py-[10px] text-sm font-normal text-[#1c1c1c] placeholder-[#9b9b9b] bg-transparent outline-none min-w-0"
      />

      <button
        onClick={handleSearchSubmit}
        className="flex items-center justify-center px-6 py-[10px] text-sm font-bold text-white bg-[#1c1c1c] hover:bg-[#333333] transition-colors whitespace-nowrap flex-shrink-0"
      >
        Search
      </button>
    </div>
  );
}