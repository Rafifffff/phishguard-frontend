import { useEffect } from "react";
import FormField    from "../../components/ui/FormField";
import RadioOption  from "../../components/ui/RadioOption";
import Button       from "../../components/ui/Button";

export default function ConfirmationPopup({ data = {}, onEdit, onSubmit, loading = false }) {
  const { reporter_name = "", channel_chat = "", interaksi = true, chat_text = "", region = "" } = data;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onEdit?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onEdit]);

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(26,28,28,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onEdit?.(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div className="flex flex-col w-full max-w-[1248px] items-start gap-8 p-8 relative bg-[rgba(249,249,249,1)] rounded-[20px] shadow-[0px_16px_48px_#00000050] max-h-[90vh] overflow-y-auto">

        <header className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
            <div className="flex items-center justify-center w-[44.8px] h-[44.8px] rounded-full bg-[rgba(26,28,28,1)] flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11L9 16L18 6" stroke="rgba(249,249,249,1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 id="popup-title" className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-black text-3xl sm:text-[40px] tracking-[-0.35px] leading-tight">
              Konfirmasi
            </h1>
          </div>
          <p className="relative flex items-center self-stretch [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base tracking-[-0.35px] leading-5">
            Pastikan semua informasi wajib (*) yang Anda masukkan sudah benar sebelum mengirim laporan.
          </p>
        </header>

        <div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto] w-full">

          <div className="flex w-full items-start gap-8 sm:gap-12 relative flex-col lg:flex-row">

            <div className="flex flex-col items-start gap-6 sm:gap-8 relative flex-1 grow w-full">

              <FormField label="Nama Pelapor" required>
                <div className="flex h-[38px] items-center gap-2.5 px-4 py-2 self-stretch w-full bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)] shadow-[inset_0px_4px_4px_#00000040]">
                  <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base tracking-[-0.35px] leading-5">{reporter_name}</span>
                </div>
              </FormField>

              <FormField label="Channel Chat" required>
                <div className="flex h-[38px] items-center gap-2.5 px-4 py-2 self-stretch w-full bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)] shadow-[inset_0px_4px_4px_#00000040]">
                  <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base tracking-[-0.35px] leading-5 capitalize">{channel_chat}</span>
                </div>
              </FormField>

              <FormField label="Apakah Anda sudah berinteraksi dengan link/pesan ini?" required>
                <div className="flex items-center gap-4 self-stretch w-full pointer-events-none">
                  <RadioOption label="Sudah" value={true} selected={interaksi === true} onChange={() => {}} />
                  <RadioOption label="Belum" value={false} selected={interaksi === false} onChange={() => {}} />
                </div>
              </FormField>
            </div>

            <div className="flex flex-col items-start gap-6 sm:gap-8 relative flex-1 self-stretch grow w-full">
              <FormField label="Teks Chat" required>
                <div className="relative self-stretch w-full">
                  <textarea
                    readOnly
                    value={chat_text}
                    className="min-h-[260px] resize-none w-full px-4 py-2 bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)] shadow-[inset_0px_4px_4px_#00000040] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base tracking-[-0.35px] leading-5 outline-none"
                  />
                  <div className="absolute right-1.5 bottom-1.5 pointer-events-none opacity-30">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M13 1L1 13M13 7L7 13" stroke="rgba(119,119,119,1)" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </FormField>
            </div>
          </div>

          <div className="flex w-full items-start gap-8 sm:gap-12 relative flex-col lg:flex-row">
            <div className="relative flex-1 self-stretch grow hidden lg:block" />
            <div className="flex flex-col items-start gap-6 sm:gap-8 relative flex-1 grow w-full">
              <FormField label="Kontak untuk dihubungi (Email / No. HP)" required>
                <div className="flex h-[38px] items-center gap-2.5 px-4 py-2 self-stretch w-full bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)] shadow-[inset_0px_4px_4px_#00000040]">
                  <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base tracking-[-0.35px] leading-5">{region}</span>
                </div>
              </FormField>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <Button variant="outline-red" size="md" onClick={onEdit} disabled={loading}>
              Ubah data
            </Button>
            <Button
              variant="dark"
              size="md"
              onClick={onSubmit}
              disabled={loading}
              className={loading ? "opacity-60 cursor-not-allowed" : ""}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Mengirim...
                </span>
              ) : "Kirim Laporan"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}