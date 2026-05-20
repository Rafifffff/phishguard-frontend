export default function LegendItem({ iconSrc, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <img className="w-3 h-3 object-contain" src={iconSrc} alt="" />
      <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#333333] text-[11px] leading-none whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}
