export default function DatePicker({ value, onChange }) {
  return (
    <div className="relative self-stretch w-full">
      <div className="flex h-[38px] items-center gap-2.5 px-4 py-2 relative self-stretch w-full bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)] shadow-[inset_0px_4px_4px_#00000040] overflow-hidden focus-within:border-[rgba(111,0,0,1)] transition-colors ">

        <input
          type="date"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 w-full bg-transparent outline-none border-none [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-base tracking-[-0.35px] text-[rgba(26,28,28,1)] cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
    </div>
  );
}