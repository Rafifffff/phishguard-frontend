export default function Button({
  variant = "dark",
  size = "md",
  children,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-[5px] font-bold tracking-[-0.35px] leading-5 whitespace-nowrap " +
    "transition-all duration-300 cursor-pointer select-none ";

  const sizes = {
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  const variants = {
    "dark":
      "shadow-[0px_4px_4px_#00000040] " +
      "[background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] " +
      "text-[rgba(249,249,249,1)] [font-family:'Helvetica_Neue-Bold',Helvetica] " +
      "hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:opacity-100",

    "outline-red":
      "bg-[rgba(249,249,249,1)] border border-solid border-[rgba(255,0,0,1)] " +
      "text-[rgba(255,0,0,1)] [font-family:'Helvetica_Neue-Bold',Helvetica] " +
      "hover:bg-[rgba(255,0,0,1)] hover:text-white hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
