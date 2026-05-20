export default function Select({
  options = [],
  value,
  onChange,
  placeholder = "— Pilih —",
  className = "",
  ...props
}) {
  return (
    <div className="relative self-stretch w-full">
      <select
        value={value}
        onChange={onChange}
        className={`flex h-[38px] items-center gap-2.5 px-4 py-2 w-full appearance-none
          bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)]
          shadow-[inset_0px_4px_4px_#00000040]
          [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal
          text-base tracking-[-0.35px] leading-5
          outline-none focus:border-[rgba(255,0,0,1)] focus:ring-1 focus:ring-[rgba(255,0,0,1)]
          transition-all duration-200 cursor-pointer
          ${value ? "text-[rgba(26,28,28,1)]" : "text-[rgba(119,119,119,1)]"}
          ${className}`}
        {...props}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-[rgba(26,28,28,1)]">
            {opt.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L9 9L17 1" stroke="rgba(119,119,119,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
