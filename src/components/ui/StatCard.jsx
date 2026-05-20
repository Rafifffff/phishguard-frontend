export default function StatCard({ label, value, iconSrc, iconBg }) {
  return (
    <div className="flex items-start gap-2.5 px-4 py-3 sm:px-5 sm:py-4 relative flex-1 grow bg-[rgba(249,249,249,1)] rounded-[10px] overflow-hidden shadow-[0px_4px_4px_#00000040]">
      <div className="flex flex-col items-start justify-center gap-1 p-2 relative flex-1 self-stretch grow">
        <div className="relative flex items-center w-full [font-family:'Helvetica_Neue-Light',Helvetica] font-light text-[rgba(255,0,0,1)] text-sm sm:text-base tracking-[0] leading-tight">
          {label}
        </div>
        <div className="relative flex items-center justify-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-black text-2xl sm:text-[40px] text-center tracking-[-1.00px] leading-none whitespace-nowrap">
          {value}
        </div>
      </div>
      <div className="flex flex-col w-12 h-12 sm:w-[70px] sm:h-[70px] items-center justify-center gap-2.5 px-0 py-[5px] relative rounded-[5px] overflow-hidden shrink-0">
        <div className={`flex flex-col items-center justify-center gap-2.5 px-[5px] py-[9px] relative flex-1 grow rounded-[5px] overflow-hidden shadow-[inset_0px_4px_4px_#00000040] aspect-[1] w-full ${iconBg}`}>
          <img className="relative flex-1 grow mb-[-8.00px] aspect-[1] w-full" src={iconSrc} alt="" />
        </div>
      </div>
    </div>
  );
}
