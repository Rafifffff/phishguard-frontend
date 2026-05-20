export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`flex h-[38px] items-center gap-2.5 px-4 py-2 w-full
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
  );
}
