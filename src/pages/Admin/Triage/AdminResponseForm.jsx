import { useState } from "react";
import ConfirmResponsePopup from "./ConfirmResponsePopup"; 
import FollowUpPopup from "./FollowUpPopup";               
import { createAdminResponse } from "../../../services/api";

const KATEGORI_OPTIONS = [
  "Mengatasnamakan Bank",
  "E-Wallet / Fintech",
  "OTP / Verifikasi Akun",
  "Hadiah / Undian",
  "Paket / Kurir",
  "Customer Service Palsu",
  "Investasi Bodong",
  "Akun Marketplace",
  "Typosquatting / Domain Palsu",
  "Lainnya"
];  

export default function AdminResponseForm({ ticketId, kontak = "081377894521", onSave }) {
  const [hasilKeputusan, setHasilKeputusan] = useState("confirm-valid-phishing");
  const [kategori, setKategori] = useState("");
  const [catatanAdmin, setCatatanAdmin] = useState("");
  const [selesaikanTiket, setSelesaikanTiket] = useState(false);
  
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); 
  const [copiedField, setCopiedField] = useState(null);

  const templateText = `Laporan Anda telah kami tinjau. Berdasarkan hasil pemeriksaan, pesan tersebut terindikasi sebagai ${kategori || "Phishing"} yang mengatasnamakan institusi perbankan dan mengarahkan pengguna ke tautan tidak resmi. Kami menyarankan Anda untuk segera mengganti kata sandi akun terkait, menghubungi layanan resmi bank, serta memantau aktivitas rekening guna mencegah potensi penyalahgunaan lebih lanjut.`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selesaikanTiket) return; 
    setStep("confirm");
  };

  const handleEdit = () => {
    setStep("form");
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);

    const hasilMapping = {
      "confirm-valid-phishing": "Confirm Valid Phishing",
      "false-positive": "False Positive",
      "need-more-info": "Need More Info"
    };

    const payload = { 
      report_id: ticketId,
      hasil_keputusan: hasilMapping[hasilKeputusan], 
      kategori, 
      catatan: catatanAdmin,
    };
    
    try {
      await createAdminResponse(payload);
      if (onSave) onSave({ ...payload, selesaikanTiket });
      setStep("followup"); 
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan respon admin: " + (err.message || "Terjadi kesalahan"));
    } finally {
      setLoading(false);
    }
  };

  const handleCloseFollowUp = () => {
    setStep("form"); 
    setIsCompleted(true);
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer hover:opacity-70 transition-opacity">
      <path d="M16 4H6C4.89543 4 4 4.89543 4 6V16C4 17.1046 4.89543 18 6 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4Z" stroke="#6F0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 8V20C20 20.5523 19.5523 21 19 21H7" stroke="#6F0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
      <section
        className="gap-6 p-8 sm:p-10 z-[1] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] bg-collection-1-secondary"
        aria-labelledby="admin-response-heading"
      >
        <img className="w-44 h-[170px] absolute top-0 left-0 z-0 pointer-events-none" src="img/polygon-respons-1.svg" alt="" aria-hidden="true" />
        <img className="absolute bottom-0 right-0 w-[173px] h-[127px] z-0 pointer-events-none" src="img/polygon-respons-2.svg" alt="" aria-hidden="true" />
        
        <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto] z-10">
          <h2 id="admin-response-heading" className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-collection-1-black text-2xl tracking-[0] leading-[72px] whitespace-nowrap">
            Admin Response
          </h2>
          <img className="relative flex-1 grow h-px object-cover" src="img/garis-respons-1.svg" alt="" aria-hidden="true" />
        </div>
        
        {isCompleted ? (
          <div className="flex flex-col gap-6 w-full max-w-[700px] mt-4 z-10 mx-auto">
            <div className="flex flex-col gap-3">
              <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-[22px] tracking-[-0.35px]">
                Kontak Pelapor
              </h2>
              <div className="flex items-center gap-4 h-[46px] px-4 bg-white rounded-[5px] border border-solid border-[#1c1c1c] relative">
                <button type="button" onClick={() => handleCopy(kontak, "kontak")} title="Salin kontak" className="flex-shrink-0">
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
              <div className="flex items-start gap-4 p-4 bg-white rounded-[5px] border border-solid border-[#1c1c1c] min-h-[160px] relative">
                <button type="button" onClick={() => handleCopy(templateText, "template")} title="Salin template" className="flex-shrink-0 mt-1">
                  <CopyIcon />
                </button>
                <div className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base leading-relaxed">
                  Laporan Anda telah kami tinjau. Berdasarkan hasil pemeriksaan, pesan tersebut terindikasi sebagai <span className="font-bold">{kategori || "Phishing"}</span> yang mengatasnamakan institusi perbankan dan mengarahkan pengguna ke tautan tidak resmi. Kami menyarankan Anda untuk segera mengganti kata sandi akun terkait, menghubungi layanan resmi bank, serta memantau aktivitas rekening guna mencegah potensi penyalahgunaan lebih lanjut.
                </div>
                {copiedField === "template" && <span className="absolute right-4 top-4 text-xs text-green-600 font-bold">Tersalin!</span>}
              </div>
            </div>
          </div>
        ) : (
          <form className="contents z-10" onSubmit={handleSubmit}>
            <div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
              
              <div className="flex flex-col items-start gap-6 relative flex-1 grow">
                <fieldset className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <legend className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] mb-1">
                    <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[-0.35px] leading-5 whitespace-nowrap">Hasil Keputusan</span>
                    <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#FF0000] text-2xl tracking-[-0.35px] leading-5 whitespace-nowrap">*</span>
                  </legend>
                  
                  <div className="flex flex-col items-start justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    
                    <label className="flex h-9 items-center gap-1.5 relative self-stretch w-full cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="flex flex-col items-start gap-2.5 p-1.5 relative self-stretch aspect-[1]">
                        <div className={`flex flex-col items-start gap-2.5 p-1 relative flex-1 self-stretch w-full grow rounded-[99px] overflow-hidden border-[1.5px] border-solid transition-colors duration-200 ${hasilKeputusan === "confirm-valid-phishing" ? "border-collection-1-secondary" : "border-collection-1-grey"}`}>
                          <div className={`relative flex-1 self-stretch w-full grow rounded-[99px] transition-all duration-200 ${hasilKeputusan === "confirm-valid-phishing" ? "shadow-[inset_0px_2px_1px_1px_#ffffff40,inset_0px_0px_0.6px_1px_#6f0000] [background:linear-gradient(0deg,rgba(111,0,0,1)_0%,rgba(111,0,0,1)_100%)] bg-collection-1-secondary" : "shadow-[inset_0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] bg-collection-1-white"}`}></div>
                        </div>
                        <input type="radio" name="hasil-keputusan" value="confirm-valid-phishing" checked={hasilKeputusan === "confirm-valid-phishing"} onChange={() => setHasilKeputusan("confirm-valid-phishing")} className="sr-only" />
                      </div>
                      <div className="h-[38px] items-center px-0 py-2 flex-1 grow mt-[-1.00px] bg-transparent flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px]">
                        <div className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 whitespace-nowrap">Confirm valid phishing</div>
                      </div>
                    </label>
                    
                    <label className="flex h-9 items-center gap-1.5 relative self-stretch w-full cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="flex flex-col items-start gap-2.5 p-1.5 relative self-stretch aspect-[1]">
                        <div className={`flex flex-col items-start gap-2.5 p-1 relative flex-1 self-stretch w-full grow rounded-[99px] overflow-hidden border-[1.5px] border-solid transition-colors duration-200 ${hasilKeputusan === "false-positive" ? "border-collection-1-secondary" : "border-collection-1-grey"}`}>
                          <div className={`relative flex-1 self-stretch w-full grow rounded-[99px] transition-all duration-200 ${hasilKeputusan === "false-positive" ? "shadow-[inset_0px_2px_1px_1px_#ffffff40,inset_0px_0px_0.6px_1px_#6f0000] [background:linear-gradient(0deg,rgba(111,0,0,1)_0%,rgba(111,0,0,1)_100%)] bg-collection-1-secondary" : "shadow-[inset_0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] bg-collection-1-white"}`}></div>
                        </div>
                        <input type="radio" name="hasil-keputusan" value="false-positive" checked={hasilKeputusan === "false-positive"} onChange={() => setHasilKeputusan("false-positive")} className="sr-only" />
                      </div>
                      <div className="h-[38px] items-center px-0 py-2 flex-1 grow mt-[-1.00px] bg-transparent flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px]">
                        <div className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 whitespace-nowrap">False positive</div>
                      </div>
                    </label>

                    <label className="flex h-9 items-center gap-1.5 relative self-stretch w-full cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="flex flex-col items-start gap-2.5 p-1.5 relative self-stretch aspect-[1]">
                        <div className={`flex flex-col items-start gap-2.5 p-1 relative flex-1 self-stretch w-full grow rounded-[99px] overflow-hidden border-[1.5px] border-solid transition-colors duration-200 ${hasilKeputusan === "need-more-info" ? "border-collection-1-secondary" : "border-collection-1-grey"}`}>
                          <div className={`relative flex-1 self-stretch w-full grow rounded-[99px] transition-all duration-200 ${hasilKeputusan === "need-more-info" ? "shadow-[inset_0px_2px_1px_1px_#ffffff40,inset_0px_0px_0.6px_1px_#6f0000] [background:linear-gradient(0deg,rgba(111,0,0,1)_0%,rgba(111,0,0,1)_100%)] bg-collection-1-secondary" : "shadow-[inset_0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] bg-collection-1-white"}`}></div>
                        </div>
                        <input type="radio" name="hasil-keputusan" value="need-more-info" checked={hasilKeputusan === "need-more-info"} onChange={() => setHasilKeputusan("need-more-info")} className="sr-only" />
                      </div>
                      <div className="h-[38px] items-center px-0 py-2 flex-1 grow mt-[-1.00px] bg-transparent flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px]">
                        <div className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 whitespace-nowrap">Need more info</div>
                      </div>
                    </label>

                  </div>
                </fieldset>
                
                <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] mt-2">
                  <label htmlFor="kategori-phishing" className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[-0.35px] leading-5 whitespace-nowrap">Kategori Phishing</span>
                  </label>
                  <div className="relative self-stretch w-full">
                    <select 
                      id="kategori-phishing" 
                      name="kategori-phishing" 
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
                      className="appearance-none h-10 items-center px-4 py-2 self-stretch w-full ml-[-1.00px] bg-white border border-solid border-[#1c1c1c] flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 outline-none cursor-pointer"
                    >
                      <option value="">— Pilih Kategori Phishing —</option>
                      {KATEGORI_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <img className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-[14px] h-[7px]" src="img/panah-bawah-1.svg" alt="" aria-hidden="true" />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start gap-3.5 relative flex-1 grow">
                <label htmlFor="catatan-admin" className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[0] leading-5 whitespace-nowrap">Catatan Admin</span>
                </label>
                <textarea 
                  id="catatan-admin" 
                  name="catatan-admin" 
                  placeholder="Tambahkan catatan singkat untuk arsip internal..." 
                  value={catatanAdmin}
                  onChange={(e) => setCatatanAdmin(e.target.value)}
                  className="h-[220px] items-start p-4 self-stretch w-full ml-[-1.00px] bg-white border border-solid border-[#1c1c1c] rounded-[5px] resize-none outline-none [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 placeholder:text-[#999999]"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-6 relative self-stretch w-full flex-[0_0_auto] mt-4 pt-2 z-20">
              <label className="inline-flex items-center gap-2 relative cursor-pointer hover:opacity-80 transition-opacity select-none group">
                <input 
                  type="checkbox" 
                  name="selesaikan-tiket" 
                  className="sr-only peer" 
                  checked={selesaikanTiket}
                  onChange={(e) => setSelesaikanTiket(e.target.checked)}
                />
                <div className={`flex items-center justify-center relative w-[18px] h-[18px] border border-solid border-[#1c1c1c] rounded-sm aspect-[1] transition-all duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#4a90e2] ${selesaikanTiket ? 'bg-[#1c1c1c]' : 'bg-white'}`}>
                  <svg className={`w-3 h-2.5 transition-all duration-300 ease-out ${selesaikanTiket ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="relative w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[0] leading-[normal] whitespace-nowrap">Selesaikan Tiket</span>
              </label>
              
              <button 
                type="submit"
                disabled={!selesaikanTiket}
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-2.5 relative rounded-[5px] transition-all duration-300 ${selesaikanTiket ? "shadow-[0px_4px_4px_#00000040] [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] hover:scale-105 active:scale-95 cursor-pointer" : "bg-[#cccccc] text-[#666666] opacity-60 grayscale cursor-not-allowed"}`}
              >
                <span className={`relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-base tracking-[-0.35px] leading-5 whitespace-nowrap ${selesaikanTiket ? "text-white" : "text-[#666666]"}`}>
                  Simpan respon
                </span>
              </button>
            </div>
          </form>
        )}
      </section>

      {step === "confirm" && (
        <ConfirmResponsePopup
          data={{ hasilKeputusan, kategori, catatanAdmin, selesaikanTiket }}
          onEdit={handleEdit}
          onSubmit={handleConfirmSubmit}
          loading={loading}
        />
      )}

      {step === "followup" && (
        <FollowUpPopup
          kontak={kontak}
          kategori={kategori}
          onClose={handleCloseFollowUp}
        />
      )}
    </>
  );
}