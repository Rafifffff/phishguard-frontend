import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";

export default function FollowUpPopup({ kontak = "", kategori = "", onClose }) {
  const [copiedField, setCopiedField] = useState(null);

  const templateText = `Laporan Anda telah kami tinjau. Berdasarkan hasil pemeriksaan, pesan tersebut terindikasi sebagai ${kategori || "Phishing"} yang mengatasnamakan institusi perbankan dan mengarahkan pengguna ke tautan tidak resmi. Kami menyarankan Anda untuk segera mengganti kata sandi akun terkait, menghubungi layanan resmi bank, serta memantau aktivitas rekening guna mencegah potensi penyalahgunaan lebih lanjut.`;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const CopyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer hover:opacity-70 transition-opacity">
      <path d="M16 4H6C4.89543 4 4 4.89543 4 6V16C4 17.1046 4.89543 18 6 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4Z" stroke="#6F0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 8V20C20 20.5523 19.5523 21 19 21H7" stroke="#6F0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(26,28,28,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-col w-full max-w-[700px] items-start gap-8 p-8 relative bg-[rgba(249,249,249,1)] rounded-[20px] shadow-[0px_16px_48px_#00000050] max-h-[95vh] overflow-y-auto">
        
        <header className="flex flex-col items-start gap-2 relative self-stretch w-full">
          <div className="inline-flex items-center gap-3 relative">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6F0000] flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                <path d="M4 11L9 16L18 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-black text-2xl sm:text-[32px] tracking-[-0.35px] leading-tight">
              Follow-up
            </h1>
          </div>
          <p className="relative flex items-center self-stretch [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base tracking-[-0.35px] mt-1">
            Follow-up pelapor untuk menginformasikan perkembangan Laporan,
          </p>
        </header>

        <div className="flex flex-col gap-6 w-full mt-2">
          
          <div className="flex flex-col gap-3">
            <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-[22px] tracking-[-0.35px]">
              Kontak Pelapor
            </h2>
            <div className="flex items-center gap-4 h-[46px] px-4 bg-transparent rounded-[5px] border border-solid border-[rgba(119,119,119,1)] relative">
              <button 
                type="button" 
                onClick={() => handleCopy(kontak, "kontak")}
                title="Salin kontak"
                className="flex-shrink-0"
              >
                <CopyIcon />
              </button>
              <span className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-lg">{kontak || "-"}</span>
              {copiedField === "kontak" && <span className="absolute right-4 text-xs text-green-600 font-bold">Tersalin!</span>}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-[22px] tracking-[-0.35px]">
              Template chat
            </h2>
            <div className="flex items-start gap-4 p-4 bg-transparent rounded-[5px] border border-solid border-[rgba(119,119,119,1)] min-h-[160px] relative">
              <button 
                type="button" 
                onClick={() => handleCopy(templateText, "template")}
                title="Salin template"
                className="flex-shrink-0 mt-1"
              >
                <CopyIcon />
              </button>
              <div className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base leading-relaxed">
                Laporan Anda telah kami tinjau. Berdasarkan hasil pemeriksaan, pesan tersebut terindikasi sebagai <span className="font-bold">{kategori || "Phishing"}</span> yang mengatasnamakan institusi perbankan dan mengarahkan pengguna ke tautan tidak resmi. Kami menyarankan Anda untuk segera mengganti kata sandi akun terkait, menghubungi layanan resmi bank, serta memantau aktivitas rekening guna mencegah potensi penyalahgunaan lebih lanjut.
              </div>
              {copiedField === "template" && <span className="absolute right-4 top-4 text-xs text-green-600 font-bold">Tersalin!</span>}
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end relative self-stretch w-full mt-4">
          <Button variant="outline-red" size="md" onClick={onClose} className="px-8 border-[#FF0000] text-[#FF0000]">
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}