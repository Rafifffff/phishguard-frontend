import React, { useState, useEffect } from "react";
import HeroSection        from "../../components/shared/HeroSection";
import StatsSection       from "../../components/shared/StatsSection";
import ReportSection      from "../../components/shared/ReportSection";
import EducationSection   from "../../components/shared/EducationSection";

import TicketHistoryTable from "../Lapor/TicketHistoryTable"; 
import { getReports, getResponses } from "../../services/api";

export default function UserHomepage({ onNavigate, onViewTicket, onCheck }) {
  const [stats, setStats] = useState([
    {
      label: 'Total penggunaan "Message Checker"',
      value: "...",
      iconSrc: "img/vector-13.svg",
      iconBg: "bg-[rgba(0,136,255,1)]",
    },
    {
      label: "Total laporan diselesaikan",
      value: "...",
      iconSrc: "img/vector-2.svg",
      iconBg: "bg-[rgba(52,199,89,1)]",
    }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [reportsRes, responsesRes] = await Promise.all([
          getReports(),
          getResponses()
        ]);
        const actualReports = reportsRes?.data || reportsRes || [];
        const actualResponses = responsesRes?.data || responsesRes || [];

        const totalReports = actualReports.length;

        const totalClosed = actualReports.filter(report => {
          const reportResponses = actualResponses.filter(res => res.report_id === report.id);
          if (!reportResponses || reportResponses.length === 0) return false;
          reportResponses.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          const lastAction = reportResponses[reportResponses.length - 1];
          const isClosed = lastAction.hasil_keputusan === "Confirm Valid Phishing" || 
                           lastAction.hasil_keputusan === "False Positive" || 
                           lastAction.selesaikanTiket || 
                           lastAction.selesaikan_tiket;
          return isClosed;
        }).length;

        setStats([
          {
            label: 'Total penggunaan "Message Checker"',
            value: totalReports.toLocaleString('id-ID'),
            iconSrc: "img/vector-13.svg",
            iconBg: "bg-[rgba(0,136,255,1)]",
          },
          {
            label: "Total laporan diselesaikan",
            value: totalClosed.toLocaleString('id-ID'),
            iconSrc: "img/vector-2.svg",
            iconBg: "bg-[rgba(52,199,89,1)]",
          }
        ]);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col w-full items-start relative bg-[rgba(252,245,233,1)]">

      <HeroSection onCheck={onCheck} />

      <StatsSection stats={stats} />

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