import { useEffect } from "react";
import Button from "../../../components/ui/Button";

export default function ConfirmResponsePopup({ data = {}, onEdit, onSubmit, loading = false }) {
  const { 
    hasilKeputusan = "", 
    kategori = "", 
    catatanAdmin = "", 
    selesaikanTiket = false 
  } = data;

  const formatKeputusan = (val) => {
    if (val === "terkonfirmasi-phishing") return "Terkonfirmasi Phishing";
    if (val === "bukan-phishing") return "Bukan Phishing / Aman";
    return val;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onEdit?.(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onEdit]);

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(26,28,28,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onEdit?.(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-col w-full max-w-[1024px] items-start gap-6 p-8 relative bg-[rgba(249,249,249,1)] rounded-[20px] shadow-[0px_16px_48px_#00000050] max-h-[95vh] overflow-y-auto">
        
        <header className="flex flex-col items-start gap-2 relative self-stretch w-full">
          <div className="inline-flex items-center gap-3 relative">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6F0000] flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                <path d="M4 11L9 16L18 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-black text-2xl sm:text-[32px] tracking-[-0.35px] leading-tight">
              Konfirmasi
            </h1>
          </div>
          <p className="relative flex items-center self-stretch [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm tracking-[-0.35px] mt-1">
            Pastikan semua informasi wajib (*) yang Anda masukkan sudah benar sebelum menyimpan respond.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-2">
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-xl tracking-[-0.35px]">Hasil Keputusan</span>
                <span className="text-[#FF0000] text-xl">*</span>
              </label>
              <div className="flex items-center h-[42px] px-4 bg-transparent rounded-[5px] border border-solid border-[rgba(119,119,119,1)]">
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-[rgba(26,28,28,1)] text-base">{formatKeputusan(hasilKeputusan)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-xl tracking-[-0.35px]">Kategori Phishing</span>
              </label>
              <div className="flex items-center h-[42px] px-4 bg-transparent rounded-[5px] border border-solid border-[rgba(119,119,119,1)]">
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-[rgba(26,28,28,1)] text-base">{kategori || "-"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-xl tracking-[-0.35px]">Catatan Admin</span>
              </label>
              <div className="flex items-start p-4 bg-transparent rounded-[5px] border border-solid border-[rgba(119,119,119,1)] min-h-[140px]">
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-[rgba(26,28,28,1)] text-sm leading-relaxed">{catatanAdmin || "-"}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-xl tracking-[-0.35px]">Status akan berubah menjadi :</span>
              </label>
              <div className="flex items-center h-[42px] px-4 gap-2.5 bg-[#F9F9F9] rounded-[5px] border border-solid border-[rgba(119,119,119,1)]">
                {selesaikanTiket ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="10" fill="#22C55E"/>
                      <path d="M7 12.5L10.5 16L17 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-[rgba(26,28,28,1)] text-base">Selesai</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="10" fill="#F59E0B"/>
                      <circle cx="8" cy="12" r="1.5" fill="white"/>
                      <circle cx="12" cy="12" r="1.5" fill="white"/>
                      <circle cx="16" cy="12" r="1.5" fill="white"/>
                    </svg>
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-[rgba(26,28,28,1)] text-base">Diproses</span>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end gap-4 relative self-stretch w-full mt-4">
          <Button variant="outline-red" size="md" onClick={onEdit} disabled={loading} className="px-8 border-[#FF0000] text-[#FF0000]">
            Ubah data
          </Button>
          <Button
            variant="dark"
            size="md"
            onClick={onSubmit}
            disabled={loading}
            className={`px-8 [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] text-white ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Menyimpan..." : "Kirim Respond"}
          </Button>
        </div>
      </div>
    </div>
  );
}