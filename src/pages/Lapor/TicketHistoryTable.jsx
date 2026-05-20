import React, { useState, useEffect } from "react";

const DUMMY_TICKETS = [
  { id: "PH-20260416-2B6F9D55", status: "Submitted", channel: "Email", risk: 87, priority: "High", dibuat: "16 Apr 2026" },
  { id: "PH-20260415-77AE219C", status: "Confirmed", channel: "Telegram", risk: 24, priority: "Low", dibuat: "15 Apr 2026" },
  { id: "PH-20260414-C8347B12", status: "In review", channel: "WhatsApp", risk: 68, priority: "Medium", dibuat: "14 Apr 2026" },
  { id: "PH-20260412-2D84AF76", status: "Confirmed", channel: "Facebook", risk: 31, priority: "Low", dibuat: "12 Apr 2026" },
  { id: "PH-20260412-5F91BE32", status: "Closed", channel: "Email", risk: 12, priority: "Low", dibuat: "12 Apr 2026" },
  { id: "PH-20260411-8A27CD14", status: "Confirmed", channel: "SMS", risk: 29, priority: "Low", dibuat: "11 Apr 2026" },
  { id: "PH-20260410-63643B91", status: "In review", channel: "WhatsApp", risk: 74, priority: "Medium", dibuat: "10 Apr 2026" },
];

const COLUMNS = [
  { key: "id",       label: "Ticket ID",    className: "w-[20%] min-w-0 text-left" },
  { key: "status",   label: "Status",       className: "w-[15%] min-w-0 text-left" },
  { key: "channel",  label: "Channel Chat", className: "w-[14%] min-w-0 text-left" },
  { key: "risk",     label: "Risk",         className: "w-[10%] min-w-0 text-center" },
  { key: "priority", label: "Priority",     className: "w-[14%] min-w-0 text-left" },
  { key: "dibuat",   label: "Dibuat",       className: "w-[22%] min-w-0 text-right pr-4" },
  { key: "action",   label: "",             className: "w-[5%] min-w-0 text-center" },
];

const StatusIcon = ({ status }) => {
  switch (status) {
    case "Submitted":
      return (
        <svg className="w-5 h-5 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      );
    case "Confirmed":
      return (
        <svg className="w-5 h-5 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case "In review":
      return (
        <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
    case "Mitigated":
      return (
        <svg className="w-5 h-5 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case "Closed":
      return (
        <svg className="w-5 h-5 text-red-900 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
};

const ArrowIcon = () => (
  <svg className="w-[10.06px] h-[17.6px]" viewBox="0 0 10 18" fill="none">
    <path d="M1 1L9 9L1 17" stroke="#1c1c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const API_URL = "https://be-phisguard-production.up.railway.app/api/reports";

export default function TicketHistoryTable({ maxRows = 6, onViewTicket }) {
  const ROW_HEIGHT  = 52;
  const HEADER_H    = 44;
  const maxHeight   = HEADER_H + maxRows * ROW_HEIGHT + 16;

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) throw new Error("Gagal memuat data dari server");
        
        const data = await response.json();
        const reportsData = Array.isArray(data) ? data : data.data || []
        const formattedTickets = reportsData.map((item) => ({
          id: item.id ? `PH-${item.id}` : `PH-${Math.floor(Math.random() * 10000)}`,
          status: item.status || "Submitted",
          channel: item.channel_chat || "-",
          risk: item.risk_score || "-", 
          priority: item.priority || "-",
          dibuat: item.created_at 
            ? new Date(item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) 
            : "-",
        }));

        setTickets(formattedTickets);
      } catch (error) {
        console.warn("API Backend gagal/404, menggunakan DUMMY_TICKETS sebagai fallback.");
        setTickets(DUMMY_TICKETS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <section className="relative flex w-full flex-col items-start gap-2.5 px-4 pb-0 pt-4">
      <div className="relative flex w-full flex-col items-start gap-6 overflow-hidden rounded-[20px] shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] p-6 sm:px-8 sm:py-6">

        <div className="flex w-full items-center gap-4 flex-[0_0_auto]">
          <h2 className="relative flex w-fit items-center whitespace-nowrap [font-family:'Helvetica_Neue-Bold',Helvetica] text-[24px] font-bold leading-normal tracking-normal text-[rgba(26,28,28,1)]">
            Ticket History
          </h2>
          <div className="flex-1 h-px bg-[rgba(26,28,28,1)] opacity-20" />
        </div>

        <div
          className="w-full overflow-y-auto"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          <table className="w-full border-collapse table-fixed">
            <colgroup>
              {COLUMNS.map((col) => (
                <col key={col.key} className={col.className} />
              ))}
            </colgroup>

            <thead className="sticky top-0 bg-[rgba(249,249,249,1)] z-10">
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={`pb-3 pt-1 [font-family:'Helvetica_Neue-Bold',Helvetica] text-sm font-bold text-[rgba(26,28,28,1)] ${col.className}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
              <tr>
                <td colSpan={COLUMNS.length} className="p-0">
                  <div className="w-full h-px bg-[rgba(26,28,28,1)] opacity-20" />
                </td>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={COLUMNS.length} className="py-12 text-center">
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-[rgba(119,119,119,1)] animate-pulse">
                      Memuat data laporan...
                    </span>
                  </td>
                </tr>
              )}

              {!isLoading && tickets.map((ticket, idx) => (
                <tr
                  key={ticket.id}
                  onClick={() => onViewTicket && onViewTicket(ticket)}
                  className={`transition-colors duration-150 ${
                    onViewTicket ? "cursor-pointer hover:bg-[rgba(252,245,233,0.8)]" : ""
                  } ${idx % 2 === 0 ? "" : "bg-[rgba(252,245,233,0.25)]"}`}
                >
                <td className="py-3 pr-4 align-middle">
                  <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-sm text-[rgba(26,28,28,1)] tracking-[-0.2px] leading-normal break-all">
                      {ticket.id}
                    </span>
                  </td>

                <td className="py-3 pr-4 align-middle">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={ticket.status} />
                      <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-sm text-[rgba(26,28,28,1)] leading-normal">
                        {ticket.status}
                      </span>
                    </div>
                  </td>

                <td className="py-3 pr-4 align-middle">
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-sm text-[rgba(26,28,28,1)] leading-normal">
                      {ticket.channel}
                    </span>
                  </td>

                <td className="py-3 pr-4 align-middle text-center">
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-sm text-[rgba(26,28,28,1)] leading-normal">
                      {ticket.risk}
                    </span>
                  </td>

                <td className="py-3 pr-4 align-middle">
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-sm text-[rgba(26,28,28,1)] leading-normal">
                      {ticket.priority}
                    </span>
                  </td>

                <td className="py-3 pr-4 align-middle text-right">
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-sm text-[rgba(26,28,28,1)] leading-normal whitespace-nowrap">
                      {ticket.dibuat}
                    </span>
                  </td>

                  <td className="py-3 align-middle text-center">
                    {onViewTicket && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          onViewTicket(ticket);
                        }}
                        className="p-2 inline-flex items-center justify-center hover:opacity-60 hover:scale-110 transition-all cursor-pointer bg-transparent border-none"
                        aria-label={`Lihat tiket ${ticket.id}`}
                      >
                        <ArrowIcon />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {!isLoading && tickets.length === 0 && (
                <tr>
                  <td colSpan={COLUMNS.length} className="py-12 text-center">
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-[rgba(119,119,119,1)]">
                      Belum ada riwayat laporan.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && (
          <p className="[font-family:'Helvetica_Light-Regular',Helvetica] text-sm text-[rgba(119,119,119,1)]">
            Menampilkan {tickets.length} tiket
          </p>
        )}

      </div>
    </section>
  );
}