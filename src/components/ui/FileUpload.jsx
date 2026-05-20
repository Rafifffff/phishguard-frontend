import { useRef, useState } from "react";

export default function FileUpload({
  value,
  onChange,
  accept = "image/jpeg,image/png",
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleClick = () => inputRef.current?.click();

  const handleFile = (file) => {
    if (file && onChange) onChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`flex h-[38px] items-center gap-2.5 px-4 py-2 relative self-stretch w-full
        bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid shadow-[inset_0px_4px_4px_#00000040]
        cursor-pointer transition-all duration-200
        ${dragOver
          ? "border-[rgba(111,0,0,1)] bg-red-50"
          : "border-[rgba(119,119,119,1)] hover:border-[rgba(111,0,0,1)]"
        }`}
    >
      <svg
        className="relative self-stretch w-auto flex-shrink-0"
        width="16" height="18" viewBox="0 0 16 18" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 12V1M8 1L4 5M8 1L12 5" stroke="rgba(111,0,0,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 13V15C1 16.1 1.9 17 3 17H13C14.1 17 15 16.1 15 15V13" stroke="rgba(111,0,0,1)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>

      <p className="relative flex items-center flex-1 [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(111,0,0,1)] text-base tracking-[-0.35px] leading-5 truncate">
        {value
          ? value.name
          : "Screenshot chat / bukti pesan mencurigakan (format JPG/PNG)"}
      </p>

      {value && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onChange(null); }}
          className="flex-shrink-0 text-[rgba(119,119,119,1)] hover:text-[rgba(255,0,0,1)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}