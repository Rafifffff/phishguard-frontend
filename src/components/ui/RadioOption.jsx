export default function RadioOption({ label, value, selected, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className="flex items-center gap-2 relative flex-1 cursor-pointer group"
    >
      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200
        border-[1.5px] border-solid
        ${selected ? '' : ''}"
        style={{
          borderColor: selected ? "rgba(111,0,0,1)" : "rgba(119,119,119,1)",
          backgroundColor: "transparent",
        }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width:           selected ? "10px" : "0px",
            height:          selected ? "10px" : "0px",
            backgroundColor: selected ? "rgba(111,0,0,1)" : "transparent",
            opacity:         selected ? 1 : 0,
          }}
        />
      </div>

      <div
        className="h-[38px] items-center flex-1 grow flex gap-2.5 px-4 py-2 relative rounded-[5px] border border-solid shadow-[inset_0px_4px_4px_#00000040] transition-all duration-200 bg-[rgba(249,249,249,1)]"
        style={{
          borderColor: selected ? "rgba(111,0,0,1)" : "rgba(119,119,119,1)",
        }}
      >
        <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base tracking-[-0.35px] leading-5 whitespace-nowrap">
          {label}
        </span>
      </div>
    </button>
  );
}