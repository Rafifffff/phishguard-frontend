import SuccessHero        from "./SuccessHero";
import TicketHistoryTable from "./TicketHistoryTable";

export default function LaporSuccessPage({
  nama         = "Usman Iskandar",
  kontak       = "081377894521",
  tickets,
  onBackToHome,
  onViewTicket
}) {
  return (
    <div className="flex flex-col w-full items-start relative bg-[rgba(252,245,233,1)]">

      <div className="w-full pt-[80px] lg:pt-[100px]" />

      <SuccessHero 
        nama={nama} 
        kontak={kontak} 
        onBack={onBackToHome} 
      />

      <TicketHistoryTable tickets={tickets} onViewTicket={onViewTicket} />
      
      <div className="w-full pb-4 sm:pb-6" />
    </div>
  );
}