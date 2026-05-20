import { useState } from "react";
import TicketDetailCard from "./TicketDetailCard";
import AdminResponseForm from "./AdminResponseForm";
import AuditTrail from "./AuditTrail";

const STATUS_CONFIG = {
  red: {
    bg: "#FF3B30",
    label: "Belum Ditangani",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
        <path d="M12 7v6M12 16.5v.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  yellow: {
    bg: "#FFCC00",
    label: "Diproses",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
        <path d="M12 8v4l2.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  green: {
    bg: "#34C759",
    label: "Selesai",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
        <path d="M8 12.5l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

const IconDate = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="white" strokeWidth="2" />
    <path d="M3 9h18" stroke="white" strokeWidth="2" />
    <path d="M8 2v4M16 2v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function TriageDetailPage({ ticket, onBack }) {
  const t = ticket || {
    id: "PH-20260427-8F21CD44",
    status: "Belum Ditangani",
    statusColor: "red",
    tanggalLaporan: "27 Apr 2026 | 09:14",
    riskScore: 90,
    namaPelapor: "Usman Iskandar",
    kontak: "081377894521",
    channelChat: "WhatsApp",
    waktuKejadian: "18 April 2026",
    sudahBerinteraksi: "Sudah",
    urlMencurigakan: "https://cimb-verifikasi-akun-secure.my.id/login",
    uploadScreenshot: "screenshot_chat_cimb_18042026.png",
    teksChat:
      "Halo nasabah CIMB Niaga, akun Anda terdeteksi aktivitas tidak wajar dan akan diblokir sementara.\nSegera lakukan verifikasi melalui link berikut untuk menghindari penonaktifan permanen:\nhttps://cimb-verifikasi-akun-secure.my.id/login\n\nJika tidak diverifikasi dalam 1x24 jam, akses mobile banking Anda akan dinonaktifkan.\nTerima kasih.\nCIMB Niaga Customer Service",
    auditLogs: [],
  };

  const [ticketStatusColor, setTicketStatusColor] = useState(t.statusColor);
  const [auditLogs, setAuditLogs] = useState(t.auditLogs || []);

  const statusCfg = STATUS_CONFIG[ticketStatusColor] || STATUS_CONFIG.red;

  const getFormattedDate = () => {
    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleSaveResponse = (payload) => {
    const isDone = payload.selesaikanTiket;
    
    if (isDone) {
      setTicketStatusColor("green");
    } else {
      setTicketStatusColor("yellow");
    }

    const newLog = {
      id: Date.now(),
      actor: "Admin@Phishguard",
      time: getFormattedDate(),
      kategori: payload.kategori || "Lainnya",
      status: isDone ? "Selesai" : "Diproses"
    };

    setAuditLogs((prevLogs) => {
      const safeLogs = Array.isArray(prevLogs) ? prevLogs : [];
      return [newLog, ...safeLogs];
    });
  };

  return (
    <>
      <header className="px-12 py-12 flex flex-col items-center justify-center relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] bg-[#f9f9f9]">
        <img className="absolute top-0 left-0 w-[461px] h-[265px] pointer-events-none" src="img/polygon-1-dashboard.svg" alt="" aria-hidden="true" />
        <img className="absolute bottom-0 right-0 w-[379px] h-[138px] pointer-events-none" src="img/polygon-2-dashboard.svg" alt="" aria-hidden="true" />

        <div className="flex flex-col items-center justify-center relative z-10 w-full">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <img className="w-[17px] h-[17px] object-contain" src="img/tameng.svg" alt="Tameng Icon" />
            <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#FF0000] text-2xl text-center tracking-[-0.35px] leading-5 whitespace-nowrap mt-1">
              Report Triage
            </h2>
          </div>

          <h1 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#1c1c1c] text-7xl text-center tracking-[-3.60px] leading-[72px] whitespace-nowrap mb-4">
            Triage Ticket
          </h1>

          <p className="max-w-[542px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[#555555] text-base text-center tracking-[0] leading-[normal]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </header>

      <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] bg-transparent">
        <section
          className="flex flex-col items-start gap-2.5 pt-2 pb-0 px-0 sticky top-0 self-stretch w-full flex-[0_0_auto] z-[50]"
          aria-labelledby="ticket-id-heading"
        >
          <div className="py-4 px-8 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] bg-[#f9f9f9]">
            <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 grow h-px bg-[#d0d0d0]" aria-hidden="true" />
              <h2
                id="ticket-id-heading"
                className="relative flex items-center w-fit mt-[-1.00px] font-bold text-[#1c1c1c] text-2xl tracking-[0] leading-[normal] whitespace-nowrap"
              >
                {t.id}
              </h2>
              <div className="relative flex-1 grow h-px bg-[#d0d0d0]" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section
          className="h-[119px] px-8 sm:px-12 z-[3] bg-collection-1-secondary flex flex-col justify-center relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]"
          aria-label="Ticket summary"
        >
          <img className="absolute bottom-0 left-0 w-[306px] h-[119px] z-0 pointer-events-none" src="img/polygon-1-status.svg" alt="" aria-hidden="true" />
          <img className="absolute top-0 right-0 w-[186px] h-[119px] z-0 pointer-events-none" src="img/polygon-2-status.svg" alt="" aria-hidden="true" />

          <div className="flex w-full items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-3.5 px-4 py-2.5 relative flex-1 bg-white rounded-[10px] shadow-[0px_2px_4px_#00000015] transition-colors duration-300">
              <div
                className="flex items-center justify-center w-11 h-11 shrink-0 rounded-[5px] transition-colors duration-300"
                style={{ backgroundColor: statusCfg.bg }}
              >
                {statusCfg.icon}
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-collection-1-black text-xl leading-none whitespace-nowrap">
                  Status saat ini
                </h3>
                <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-sm leading-tight whitespace-nowrap">
                  {statusCfg.label}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-4 py-2.5 relative flex-1 bg-white rounded-[10px] shadow-[0px_2px_4px_#00000015]">
              <div className="flex items-center justify-center w-11 h-11 shrink-0 bg-[#1c1c1c] rounded-[5px]">
                <IconDate />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-collection-1-black text-xl leading-none whitespace-nowrap">
                  Tanggal Laporan
                </h3>
                <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-sm leading-tight whitespace-nowrap">
                  {t.tanggalLaporan}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-4 py-2.5 relative flex-1 bg-white rounded-[10px] shadow-[0px_2px_4px_#00000015]">
              <div className="flex items-center justify-center w-11 h-11 shrink-0 bg-[#FF3B30] rounded-[5px]">
                <img className="w-6 h-6 object-contain" src="img/icon-risiko.svg" alt="Risk Icon" />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-baseline gap-1.5">
                  <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-collection-1-black text-xl leading-none whitespace-nowrap">
                    Risk Score
                  </h3>
                </div>
                <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-sm leading-tight whitespace-nowrap">
                  {String(t.riskScore)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <TicketDetailCard ticket={t} />

        <AdminResponseForm 
          ticketId={t.id} 
          kontak={t.kontak} 
          onSave={handleSaveResponse} 
        />

        <AuditTrail logs={auditLogs} />
      </div>
    </>
  );
}