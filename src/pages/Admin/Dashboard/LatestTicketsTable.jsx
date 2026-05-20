import React from "react";

const TICKETS = [
  {
    id:       "PH-20260416-2B6F9D55",
    status:   "Submitted",
    channel:  "Email",
    risk:     87,
    priority: "High",
    dibuat:   "16 Apr 2026",
  },
  {
    id:       "PH-20260415-77AE219C",
    status:   "Confirmed",
    channel:  "Telegram",
    risk:     24,
    priority: "Low",
    dibuat:   "15 Apr 2026",
  },
  {
    id:       "PH-20260414-C8347B12",
    status:   "In review",
    channel:  "WhatsApp",
    risk:     68,
    priority: "Medium",
    dibuat:   "14 Apr 2026",
  },
  {
    id:       "PH-20260412-2D84AF76",
    status:   "Confirmed",
    channel:  "Facebook",
    risk:     31,
    priority: "Low",
    dibuat:   "12 Apr 2026",
  },
  {
    id:       "PH-20260412-5F91BE32",
    status:   "Closed",
    channel:  "Email",
    risk:     12,
    priority: "Low",
    dibuat:   "12 Apr 2026",
  },
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
    <path d="M1 1L9 9L1 17" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const COLUMNS = [
  { key: "id",       label: "Ticket ID",    className: "w-[20%] min-w-0 text-left" },
  { key: "status",   label: "Status",       className: "w-[16%] min-w-0 text-left" },
  { key: "channel",  label: "Channel Chat", className: "w-[15%] min-w-0 text-left" },
  { key: "risk",     label: "Risk",         className: "w-[10%] min-w-0 text-center" },
  { key: "priority", label: "Priority",     className: "w-[14%] min-w-0 text-left" },
  { key: "dibuat",   label: "Dibuat",       className: "w-[20%] min-w-0 text-right pr-4" },
  { key: "action",   label: "",             className: "w-[5%] min-w-0 text-center" },
];

export default function LatestTicketsTable() {
  return (
    <section
      className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] bg-transparent"
      aria-labelledby="latest-tickets-heading"
    >
      <div className="gap-8 p-8 sm:p-12 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] bg-[#f9f9f9]">

        <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h2
            id="latest-tickets-heading"
            className="relative flex items-center w-fit mt-[-1.00px] font-bold text-[#1c1c1c] text-2xl tracking-[0] leading-[72px] whitespace-nowrap"
          >
            Latest Tickets
          </h2>
          <div className="flex-1 grow relative h-px bg-[#d0d0d0]" aria-hidden="true" />
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse table-fixed min-w-[800px]">

            <colgroup>
              {COLUMNS.map((col) => (
                <col key={col.key} className={col.className} />
              ))}
            </colgroup>

            <thead className="bg-[#f9f9f9] z-10">
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
              {TICKETS.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="py-12 text-center">
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-[#9b9b9b]">
                      Belum ada tiket terbaru.
                    </span>
                  </td>
                </tr>
              ) : (
                TICKETS.map((ticket, idx) => (
                  <tr
                    key={ticket.id}
                    className={`transition-colors duration-150 hover:bg-[rgba(252,245,233,0.6)] ${idx % 2 === 0 ? "" : "bg-[rgba(252,245,233,0.25)]"}`}
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
                      <a
                        href="#"
                        className="p-2 inline-flex items-center justify-center hover:opacity-60 hover:scale-110 transition-all cursor-pointer bg-transparent border-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000]"
                        aria-label={`View ticket ${ticket.id}`}
                      >
                        <ArrowIcon />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </section>
  );
}