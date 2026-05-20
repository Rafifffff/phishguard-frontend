import { useEffect } from "react";
import Button from "../../../components/ui/Button";

const Label = ({ text, required }) => (
  <label className="flex items-center gap-2 [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base tracking-[-0.35px]">
    {text} {required && <span className="text-[#FF0000]">*</span>}
  </label>
);

const ReadOnlyInput = ({ value, icon }) => (
  <div className="flex items-center gap-2.5 h-[42px] px-4 bg-transparent rounded-[5px] border border-solid border-[rgba(119,119,119,1)] w-full overflow-hidden">
    {icon && (
      <div className="flex items-center justify-center w-5 h-5 text-[#1c1c1c] flex-shrink-0">
        {icon}
      </div>
    )}
    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-[rgba(26,28,28,1)] text-base truncate w-full block">
      {value || "—"}
    </span>
  </div>
);

const ReadOnlySelect = ({ value }) => (
  <div className="flex items-center justify-between h-[42px] px-4 bg-transparent rounded-[5px] border border-solid border-[rgba(119,119,119,1)] w-full overflow-hidden">
    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-[rgba(26,28,28,1)] text-base truncate">
      {value || "—"}
    </span>
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="flex-shrink-0">
      <path d="M1 1.5L8 8.5L15 1.5" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const ReadOnlyTextarea = ({ value, isScrollable = false, containerClass = "", showResizeIcon = false }) => {
  const baseClass = `bg-transparent rounded-[5px] border border-solid border-[rgba(119,119,119,1)] w-full relative overflow-hidden ${containerClass}`;
  const textClass = "[font-family:'Helvetica_Neue-Regular',Helvetica] text-[rgba(26,28,28,1)] text-base leading-relaxed whitespace-pre-wrap break-words";
  
  const ResizeIcon = showResizeIcon ? (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute bottom-2 right-2 opacity-40 pointer-events-none">
      <path d="M11 1L1 11M11 6L6 11" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ) : null;

  if (isScrollable) {
    return (
      <div className={`${baseClass} flex flex-col`}>
        <div className="flex-1 overflow-y-auto p-4 pr-6">
          <span className={`block w-full ${textClass}`}>
            {value || "—"}
          </span>
        </div>
        {ResizeIcon}
      </div>
    );
  }

  return (
    <div className={`${baseClass} flex items-start p-4`}>
      <span className={`w-full ${textClass}`}>
        {value || "—"}
      </span>
      {ResizeIcon}
    </div>
  );
};

export default function ArticleConfirmPopup({ data = {}, isEdit = false, onEdit, onConfirm }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onEdit?.(); };
    window.addEventListener("keydown", handler);
    return () => { 
      document.body.style.overflow = ""; 
      window.removeEventListener("keydown", handler);
    };
  }, [onEdit]);

  const ImageIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  );

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "rgba(26,28,28,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onEdit()}
    >

      <div className="flex flex-col w-full max-w-[1024px] bg-[rgba(249,249,249,1)] rounded-[20px] shadow-[0px_16px_48px_#00000050] max-h-[95vh] overflow-hidden">

        <header className="flex flex-col items-start gap-2 flex-shrink-0 p-6 sm:p-8 pb-4">
          <div className="inline-flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1c1c1c] flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 22 22" fill="none">
                <path d="M4 11L9 16L18 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-black text-2xl sm:text-[32px] tracking-[-0.35px]">
              Konfirmasi
            </h1>
          </div>
          <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-sm mt-1">
            Pastikan isi Artikel sudah sesuai sebelum diunggah.
          </p>
        </header>

        <div className="flex flex-col flex-1 overflow-y-auto px-6 sm:px-8 pb-4 min-h-0">
          
          <div className="flex flex-col lg:flex-row gap-6 w-full flex-shrink-0">
            <div className="flex flex-col gap-4 sm:gap-6 flex-1 min-w-0">
              <div className="flex flex-col gap-2">
                <Label text="Judul Artikel" required />
                <ReadOnlyInput value={data.judul} />
              </div>
              <div className="flex flex-col gap-2">
                <Label text="Kategori Artikel" required />
                <ReadOnlySelect value={data.kategori} />
              </div>
              <div className="flex flex-col gap-2">
                <Label text="Rangkuman singkat Artikel" />
                <ReadOnlyTextarea value={data.rangkuman} isScrollable={true} containerClass="h-[120px]" showResizeIcon={false} />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 flex-1 min-w-0">
              <div className="flex flex-col gap-2">
                <Label text="Upload Gambar" required />
                <ReadOnlyInput value={data.gambarName} icon={ImageIcon} />
              </div>
              <div className="flex flex-col gap-2">
                <Label text="Alt text gambar" />
                <ReadOnlyTextarea value={data.altText} isScrollable={true} containerClass="h-[120px]" showResizeIcon={false} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 lg:mt-6 w-full flex-1 min-h-[200px] flex-shrink-0 lg:flex-shrink">
            <Label text="Isi artikel" required />
            <ReadOnlyTextarea 
              value={data.isi} 
              isScrollable={true} 
              showResizeIcon={true} 
              containerClass="flex-1 min-h-[150px] h-full" 
            />
          </div>

        </div>

        <div className="flex items-center justify-end gap-4 w-full flex-shrink-0 p-6 sm:p-8 pt-4 border-t border-solid border-[#e5e5e5] bg-[rgba(249,249,249,1)]">
          <Button variant="outline-red" size="md" onClick={onEdit} className="px-6 sm:px-8 border-[#FF0000] text-[#FF0000]">
            Ubah kembali
          </Button>
          <Button 
            variant="dark" 
            size="md" 
            onClick={onConfirm}
            className="px-6 sm:px-8 [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] text-white"
          >
            {isEdit ? "Simpan Perubahan" : "Unggah Artikel"}
          </Button>
        </div>

      </div>
    </div>
  );
}