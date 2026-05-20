export default function DomainTag({ name }) {
  return (
    <div className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 relative flex-none bg-[rgba(252,245,233,1)] rounded-full shadow-[0px_4px_4px_#00000040] overflow-hidden">
      <div className="relative w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-lg text-center tracking-[-0.5px] leading-tight whitespace-nowrap">
        {name}
      </div>
    </div>
  );
}
