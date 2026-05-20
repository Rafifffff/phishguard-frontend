import { useState, useEffect } from "react";
import UserTicketDetailCard from "./UserTicketDetailCard";
import UserAdminResponseCard from "./UserAdminResponseCard";

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
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="white" strokeWidth="2" />
    <path d="M3 9h18" stroke="white" strokeWidth="2" />
    <path d="M8 2v4M16 2v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DUMMY_TICKET = {
  id: "PH-20260427-8F21CD44",
  statusColor: "green",
  tanggalLaporan: "27 Apr 2026 | 09:14",
  riskScore: 90,
  namaPelapor: "Budi Santoso",
  channelChat: "WhatsApp",
  waktuKejadian: "26 Apr 2026 | 20:30",
  sudahBerinteraksi: "Sudah",
  urlMencurigakan: "https://cimb-verifikasi-akun-secure.my.id/login",
  teksChat: "Pesan bahwa akun CIMB saya diblokir.",
  adminResponse: {
    hasilKeputusan: "Confirm Valid Phishing",
    kategoriPhishing: "Mengatasnamakan Bank",
    catatanAdmin: "Domain mencurigakan menggunakan nama CIMB namun bukan domain resmi. Disarankan segera ubah password dan hubungi pihak bank."
  }
};

const BASE_URL = "https://be-phisguard-production.up.railway.app/api";

export default function UserTicketDetailPage({ ticketId, onBack }) {
  const [ticketData, setTicketData] = useState(DUMMY_TICKET);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetailTicket = async () => {
      setIsLoading(true);
      try {
        const numericId = String(ticketId).replace(/\D/g, "");
        if (!numericId) throw new Error("ID tidak valid");

        const reportRes = await fetch(`${BASE_URL}/report/${numericId}`);
        if (!reportRes.ok) throw new Error("Laporan tidak ditemukan");
        
        const reportData = await reportRes.json();
        const item = reportData.data || reportData;

        let adminResp = null;
        try {
          const respRes = await fetch(`${BASE_URL}/respons?report_id=${numericId}`);
          if (respRes.ok) {
            const respData = await respRes.json();
            const list = respData.data || respData;
            if (list && list.length > 0) {
              adminResp = {
                hasilKeputusan: list[0].hasil_keputusan,
                kategoriPhishing: list[0].kategori,
                catatanAdmin: list[0].catatan
              };
            }
          }
        } catch (e) {
          console.log("Belum ada respon dari admin atau gagal memuat respon.");
        }

        let statusColor = "red";
        if (item.status === "In review") statusColor = "yellow";
        if (["Confirmed", "Mitigated", "Closed"].includes(item.status)) statusColor = "green";

        setTicketData({
          id: ticketId || `PH-${item.id}`,
          statusColor: statusColor,
          tanggalLaporan: item.created_at 
            ? new Date(item.created_at).toLocaleString("id-ID", { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' }) 
            : "-",
          riskScore: item.risk_score || 0,
          namaPelapor: item.reporter_name || "-",
          channelChat: item.channel_chat || "-",
          waktuKejadian: item.incident_summary || "Lihat detail interaksi",
          sudahBerinteraksi: item.interaksi ? "Sudah" : "Belum",
          urlMencurigakan: item.url || "-",
          teksChat: item.chat_text || "-",
          adminResponse: adminResp
        });

      } catch (error) {
        console.warn("API Gagal, menggunakan data DUMMY_TICKET.", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (ticketId) {
      fetchDetailTicket();
    } else {
      setIsLoading(false);
    }
  }, [ticketId]);

  const statusCfg = STATUS_CONFIG[ticketData.statusColor] || STATUS_CONFIG.red;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[rgba(252,245,233,1)] gap-4">
        <svg className="animate-spin w-10 h-10 text-[rgba(255,0,0,1)]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-xl animate-pulse">Memuat detail tiket...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center relative bg-[rgba(252,245,233,1)] min-h-screen">
      
      <div className="w-full pt-[80px] sm:pt-[100px] lg:pt-[120px]" />

      <div className="w-full px-6 sm:px-12 xl:px-4 flex flex-col gap-6 sm:gap-4 pb-16 sm:pb-8">

        <header className="px-8 sm:px-12 py-20 flex flex-col items-center justify-center relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] bg-[#f9f9f9]">
          <img className="absolute top-0 left-0 w-[461px] h-[330px] pointer-events-none" src="img/polygon-1-dashboard.svg" alt="" aria-hidden="true" />
          <img className="absolute bottom-0 right-0 w-[379px] h-[138px] pointer-events-none" src="img/polygon-2-dashboard.svg" alt="" aria-hidden="true" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-red-500 opacity-20 blur-[100px] pointer-events-none rounded-full transform -translate-x-1/4 -translate-y-1/4" />
          
          <div className="flex flex-col items-center justify-center relative z-10 w-full">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 14V3.5C2.5 3.5 4 2.5 6.5 2.5C9 2.5 10.5 4 13 4C15.5 4 16 3.5 16 3.5V10C16 10 15.5 10.5 13 10.5C10.5 10.5 9 9 6.5 9C4 9 2.5 10 2.5 10" stroke="rgba(255,0,0,1)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#FF0000] text-2xl text-center tracking-[-0.35px] leading-5 whitespace-nowrap mt-1">
                Lapor Insiden
              </h2>
            </div>

            <h1 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#1c1c1c] text-5xl sm:text-7xl text-center tracking-[-3.60px] leading-[72px] whitespace-nowrap mb-4">
              Ticket Detail
            </h1>

            <p className="max-w-[542px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[#555555] text-base text-center tracking-[0] leading-[normal]">
              Lihat detail mengenai tiket yang sebelumnya sudah dibuka, dan pantau perkembangan dari pelaporan.
            </p>
          </div>
        </header>

        <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto] bg-transparent">
          
          <section className="flex flex-col items-start gap-2.5 pt-2 pb-2 px-0 top-0 self-stretch w-full flex-[0_0_auto] z-[50]">
            <div className="py-8 px-8 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] bg-[#f9f9f9]">
              <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative flex-1 grow h-px bg-[#d0d0d0]" aria-hidden="true" />
                <h2 className="relative flex items-center w-fit mt-[-1.00px] font-bold text-[#1c1c1c] text-xl sm:text-2xl tracking-[0] leading-[normal] whitespace-nowrap">
                  {ticketData.id}
                </h2>
                <div className="relative flex-1 grow h-px bg-[#d0d0d0]" aria-hidden="true" />
              </div>
            </div>
          </section>

          <section className="min-h-[119px] py-6 px-8 sm:px-12 z-[3] flex flex-col justify-center relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] transition-colors duration-500" style={{ backgroundColor: statusCfg.bg }}>
            <img className="absolute bottom-0 left-0 w-[306px] h-[119px] z-0 pointer-events-none opacity-40 mix-blend-overlay" src="img/polygon-1-status.svg" alt="" aria-hidden="true" />
            <img className="absolute top-0 right-0 w-[186px] h-[119px] z-0 pointer-events-none opacity-40 mix-blend-overlay" src="img/polygon-2-status.svg" alt="" aria-hidden="true" />

            <div className="flex flex-col md:flex-row w-full items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-3.5 px-4 py-2.5 relative flex-1 w-full bg-white rounded-[10px] shadow-[0px_2px_4px_#00000015]">
                <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-[5px]" style={{ backgroundColor: statusCfg.bg }}>
                  {statusCfg.icon}
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#1c1c1c] text-xl leading-none whitespace-nowrap">
                    Status saat ini
                  </h3>
                  <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-sm leading-tight whitespace-nowrap">
                    {statusCfg.label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 px-4 py-2.5 relative flex-1 w-full bg-white rounded-[10px] shadow-[0px_2px_4px_#00000015]">
                <div className="flex items-center justify-center w-11 h-11 shrink-0 bg-[#1c1c1c] rounded-[5px]">
                  <IconDate />
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#1c1c1c] text-xl leading-none whitespace-nowrap">
                    Tanggal Laporan
                  </h3>
                  <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-sm leading-tight whitespace-nowrap">
                    {ticketData.tanggalLaporan}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 px-4 py-2.5 relative flex-1 w-full bg-white rounded-[10px] shadow-[0px_2px_4px_#00000015]">
                <div className="flex items-center justify-center w-11 h-11 shrink-0 bg-[#FF3B30] rounded-[5px]">
                  <img className="w-6 h-6 object-contain" src="img/icon-risiko.svg" alt="Risk Icon" />
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#1c1c1c] text-xl leading-none whitespace-nowrap">
                      Risk Score
                    </h3>
                  </div>
                  <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-sm leading-tight whitespace-nowrap">
                    {String(ticketData.riskScore)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <UserTicketDetailCard ticket={ticketData} />

          <UserAdminResponseCard response={ticketData.adminResponse} />

          <div className="w-full flex justify-start mt-4">
            <button onClick={onBack} className="inline-flex items-center gap-3 px-6 py-3 rounded-[5px] border border-solid border-[rgba(119,119,119,1)] bg-[rgba(249,249,249,1)] hover:border-[rgba(111,0,0,1)] hover:text-[rgba(111,0,0,1)] transition-all duration-200 cursor-pointer group shadow-[0px_2px_4px_#00000015]">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
                <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-base tracking-[-0.35px] leading-5">
                Kembali ke Riwayat
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}