export default function FormField({ label, required = false, children }) {
  return (
    <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex items-center gap-1 relative flex-[0_0_auto]">
        <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-xl sm:text-2xl tracking-[-0.35px] leading-5 whitespace-nowrap">
          {label}
        </span>
        {required && (
          <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(255,0,0,1)] text-xl sm:text-2xl tracking-[-0.35px] leading-5 whitespace-nowrap">
            *
          </span>
        )}
      </div>

      {children}
    </div>
  );
}
