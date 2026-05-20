import { useState } from "react";
import TriageFilterBar    from "./TriageFilterBar";
import TriageTable        from "./TriageTable";
import TriageDetailPage   from "./TriageDetailPage";

export default function TriagePage() {
  const [filters, setFilters] = useState({
    sort: "Default",
    hideSelesai: false,
    query: "",
  });
  const [selectedTicket, setSelectedTicket] = useState(null);
  if (selectedTicket) {
    return (
      <TriageDetailPage
        ticket={selectedTicket}
        onBack={() => setSelectedTicket(null)}
      />
    );
  }
  return (
    <>
      <header className="gap-4 px-12 py-8 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">

        <img
          className="absolute top-0 left-0 w-[461px] h-[200px] pointer-events-none"
          src="img/polygon-1-dashboard.svg"
          alt=""
          aria-hidden="true"
        />

        <img
          className="absolute bottom-0 right-0 w-[303px] h-[113px] pointer-events-none"
          src="img/polygon-2-dashboard.svg"
          alt=""
          aria-hidden="true"
        />

        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] z-10">
          <div className="flex items-center justify-center gap-4 px-3.5 py-2 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-20 h-20 items-center justify-center gap-2.5 p-4 relative rounded-[20px] aspect-[1] [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)]">
              <img 
                className="w-full h-full object-contain" 
                src="img/icon-shield.svg" 
                alt="" 
                aria-hidden="true" 
              />
            </div>
            <h1 className="relative flex items-center justify-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-7xl text-center tracking-[-3.60px] leading-[72px] whitespace-nowrap">
              Report Triage
            </h1>
          </div>

          <p className="relative flex items-center justify-center w-[542px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base text-center tracking-[0] leading-[normal]">
            Kelola dan tinjau laporan phishing yang masuk. Lakukan analisis, beri keputusan, dan perbarui status tiket secara efisien.
          </p>
        </div>
      </header>

      <section
        className="flex flex-col items-start gap-6 p-8 sm:p-12 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]"
        aria-labelledby="triage-section-heading"
      >
        <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h2
            id="triage-section-heading"
            className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-2xl tracking-[0] leading-[normal] whitespace-nowrap"
          >
            Tickets
          </h2>
          <div className="flex-1 h-px bg-[rgba(26,28,28,1)] opacity-20" />
        </div>

        <TriageFilterBar filters={filters} setFilters={setFilters} />

        <TriageTable filters={filters} onViewTicket={setSelectedTicket} />
      </section>
    </>
  );
}