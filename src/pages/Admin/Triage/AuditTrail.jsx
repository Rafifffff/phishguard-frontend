export default function AuditTrail({ logs }) {
  const entries = logs || [];

  return (
    <section
      className="gap-8 p-8 sm:p-12 z-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] bg-[#f9f9f9]"
      aria-labelledby="audit-trail-heading"
    >
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <h2
          id="audit-trail-heading"
          className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#1c1c1c] text-2xl tracking-[0] leading-[normal] whitespace-nowrap"
        >
          Audit Trail
        </h2>
        <div className="relative flex-1 grow h-px bg-[#d0d0d0]" aria-hidden="true" />
      </div>

      {entries.length === 0 ? (
        <p className="relative flex items-center justify-center self-stretch [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#9b9b9b] text-base text-center tracking-[-0.35px] leading-5">
          Belum ada audit trail untuk ticket ini.
        </p>
      ) : (
        <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
          {entries.map((log) => (
            <div key={log.id} className="relative flex items-start self-stretch w-full [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-base tracking-[-0.35px] leading-6">
              <span>
                {log.time} - <span className="font-bold">{log.actor}</span> - Ticket diproses, teridentifikasi sebagai <span className="font-bold">“{log.kategori}”</span>, status diperbarui menjadi <span className="font-bold">{log.status}</span>.
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}