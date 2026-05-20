export default function Textarea({ className = "", ...props }) {
  return (
    <div className="relative self-stretch w-full">
      <textarea
        className={`flex min-h-[226px] items-start gap-2.5 px-4 py-2 w-full resize-none
          bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)]
          shadow-[inset_0px_4px_4px_#00000040]
          [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal
          text-[rgba(26,28,28,1)] placeholder:text-[rgba(119,119,119,1)]
          text-base tracking-[-0.35px] leading-5
          outline-none focus:border-[rgba(255,0,0,1)] focus:ring-1 focus:ring-[rgba(255,0,0,1)]
          transition-all duration-200
          ${className}`}
        {...props}
      />

      <div className="absolute right-1.5 bottom-1.5 pointer-events-none opacity-40">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 1L1 13M13 7L7 13M13 13L13 13" stroke="rgba(119,119,119,1)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}
