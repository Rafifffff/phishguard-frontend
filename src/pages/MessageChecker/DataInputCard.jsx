function ReadOnlyField({ label, value, required = false, multiline = false }) {
  const displayValue = value ? value : "-";

  return (
    <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex items-center gap-1">
        <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-xl sm:text-2xl tracking-[-0.35px] leading-5 whitespace-nowrap">
          {label}
        </span>
        {required && (
          <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(255,0,0,1)] text-xl sm:text-2xl leading-5">
            *
          </span>
        )}
      </div>

      {multiline ? (
        <div className="flex items-start gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto] bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)]">
          <p className="relative flex-1 mt-[-0.50px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base tracking-[-0.35px] leading-5 whitespace-pre-wrap">
            {displayValue}
          </p>
        </div>
      ) : (
        <div className="flex h-[38px] items-center gap-2.5 px-4 py-2 relative self-stretch w-full bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)]">
          <span className="relative flex items-center flex-1 [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base tracking-[-0.35px] leading-5 truncate">
            {displayValue}
          </span>
        </div>
      )}
    </div>
  );
}

export default function DataInputCard({ channel, sender, url, message }) {
  return (
    <div className="flex flex-col items-start gap-6 sm:gap-8 p-[18px] relative flex-1 grow rounded-[10px] border border-solid border-[rgba(119,119,119,1)] shadow-[0px_4px_4px_#00000040] bg-[rgba(249,249,249,1)]">
      <div className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-black text-3xl sm:text-[40px] tracking-[-0.35px] leading-tight">
        Data input
      </div>

      <div className="flex flex-col items-start gap-4 pl-0 sm:pl-4 pr-0 py-0 relative self-stretch w-full flex-[0_0_auto]">
        <ReadOnlyField label="Channel Chat"        value={channel} />
        <ReadOnlyField label="Nomor/Akun Pengirim" value={sender}  />
        <ReadOnlyField label="URL di Pesan"        value={url}     />
        <ReadOnlyField label="Teks Chat"           value={message} required multiline />
      </div>
    </div>
  );
}