import HeroSection        from "../../components/shared/HeroSection";
import StatsSection       from "../../components/shared/StatsSection";
import ReportSection      from "../../components/shared/ReportSection";
import EducationSection   from "../../components/shared/EducationSection";

import TicketHistoryTable from "../Lapor/TicketHistoryTable"; 

export default function UserHomepage({ onNavigate, onViewTicket, onCheck }) {

  return (
    <div className="flex flex-col w-full items-start relative bg-[rgba(252,245,233,1)]">

      <HeroSection onCheck={onCheck} />

      <StatsSection />

      <section className="flex flex-col lg:flex-row lg:h-auto items-stretch gap-4 pt-4 pb-2 px-4 relative self-stretch w-full">
        <div className="flex-1 flex w-full">
          <ReportSection onClick={() => onNavigate("lapor")} />
        </div>
        <div className="flex-1 flex w-full">
          <EducationSection onClick={() => onNavigate("edukasi")} />
        </div>
      </section>

      <TicketHistoryTable />

      <div className="w-full pb-4 sm:pb-6" />

    </div>
  );
}