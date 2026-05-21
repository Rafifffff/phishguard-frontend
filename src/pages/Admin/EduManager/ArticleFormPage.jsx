import { useState, useRef } from "react";
import FormField  from "../../../components/ui/FormField";
import Input      from "../../../components/ui/Input";
import Select     from "../../../components/ui/Select";
import Textarea   from "../../../components/ui/Textarea";
import Button     from "../../../components/ui/Button";
import ArticleConfirmPopup from "./ArticleConfirmPopup"; 

const CATEGORY_OPTIONS = [
  { value: "Tips",         label: "Tips"         },
  { value: "Modus",        label: "Modus"        },
  { value: "Update Kasus", label: "Update Kasus" },
];

export default function ArticleFormPage({
  mode         = "tambah",
  initialData  = {},
  onSubmit,
  onDelete,
  onBack,
}) {
  const isEdit = mode === "edit";

  const [judul,      setJudul]      = useState(initialData.judul ?? initialData.title ?? "");
  const [kategori,   setKategori]   = useState(initialData.kategori_artikel ?? initialData.category ?? "");
  const [gambar,     setGambar]     = useState(null);
  
  // Try to extract image name from URL or Base64 if possible, or just use a default
  const getInitialImageName = () => {
    const imgStr = initialData.gambar ?? initialData.imageSrc;
    if (!imgStr) return "";
    if (imgStr.startsWith("data:image")) return "gambar_saat_ini.png";
    return imgStr.split("/").pop() || "gambar_saat_ini.png";
  };
  const [gambarName, setGambarName] = useState(getInitialImageName());
  
  const [altText,    setAltText]    = useState(initialData.alt_text ?? initialData.imageCaption ?? "");
  const [isi,        setIsi]        = useState(initialData.isi_artikel ?? initialData.content ?? "");
  const [rangkuman,  setRangkuman]  = useState(initialData.rangkuman ?? initialData.excerpt ?? "");

  const [touched,  setTouched]  = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fileInputRef = useRef(null);

  const errors = {
    judul:    touched && judul.trim()    === "",
    kategori: touched && kategori        === "",
    gambar:   touched && !gambarName,
    isi:      touched && isi.trim()      === "",
  };
  const isValid = !Object.values(errors).some(Boolean);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambar(file);
      setGambarName(file.name);
    }
  };

  const handleSubmit = () => {
    setTouched(true);

    const isFormIncomplete = 
      judul.trim() === "" || 
      kategori === "" || 
      !gambarName || 
      isi.trim() === "";

    if (isFormIncomplete) {
      return; 
    }

    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onSubmit?.({ judul, kategori, gambar, gambarName, altText, isi, rangkuman });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <section className="flex flex-col items-start gap-4 p-12 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">

        <img
          className="absolute top-0 left-0 w-[461px] h-96 pointer-events-none"
          src="img/polygon-edukasi-manager.svg"
          alt=""
          aria-hidden="true"
        />

        <header className="flex flex-col items-center gap-4 px-0 py-[54px] relative self-stretch w-full flex-[0_0_auto] z-10">
          <div className="flex items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <img 
              src="img/logo-edukasi-manager.svg" 
              alt="Logo" 
              className="w-6 h-6 object-contain" 
            />
            
            <span className="relative flex items-center justify-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(255,0,0,1)] text-2xl text-center tracking-[-0.35px] leading-5 whitespace-nowrap">
              Edukasi Manager
            </span>
          </div>

          <div className="flex flex-col items-center gap-[9px] relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="relative flex items-center justify-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-5xl sm:text-7xl text-center tracking-[-3.60px] leading-[72px] whitespace-nowrap">
              {isEdit ? "Edit Artikel" : "Tambah Artikel Baru"}
            </h1>
            <p className="relative flex items-center justify-center max-w-[542px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base text-center tracking-[0] leading-[normal]">
              {isEdit
                ? "Ubah konten artikel yang sudah ada. Pastikan semua informasi sudah benar sebelum menyimpan perubahan."
                : "Kelola artikel edukasi phishing — tambah, edit, dan hapus konten untuk membantu pengguna mengenali ancaman digital."}
            </p>
          </div>
        </header>

        <div className="flex flex-col items-start gap-8 pt-0 pb-[54px] px-4 relative self-stretch w-full z-10">
          <FormField label="Judul Artikel" required>
            <Input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Cth. Penipuan Mengatasnamakan Paket Tertahan"
              className={errors.judul ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : ""}
            />
          </FormField>

          <FormField label="Kategori Artikel" required>
            <Select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              placeholder="— Pilih kategori artikel —"
              options={CATEGORY_OPTIONS}
              className={errors.kategori ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : ""}
            />
          </FormField>

          <FormField label="Upload Gambar" required>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`flex h-[38px] items-center gap-2.5 px-4 py-2 relative self-stretch w-full cursor-pointer bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid transition-all duration-200 hover:border-[rgba(111,0,0,1)]
                ${errors.gambar ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : "border-[rgba(119,119,119,1)]"}`}
            >
              <img 
                src="img/logo-upload-edukasi.svg" 
                alt="" 
                className="w-4 h-4 object-contain flex-shrink-0" 
              />

              <span className="relative flex items-center flex-1 [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(111,0,0,1)] text-base tracking-[-0.35px] leading-5 truncate">
                {gambarName || 'Gambar "Picture Lead" (format JPG/PNG)'}
              </span>

              {gambarName && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setGambar(null); setGambarName(""); }}
                  className="flex-shrink-0 text-[rgba(119,119,119,1)] hover:text-[rgba(255,0,0,1)] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" className="sr-only" onChange={handleFileChange} />
          </FormField>

          <FormField label="Alt text gambar">
            <Input value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Tulisan kecil di bawah gambar artikel." />
          </FormField>

          <FormField label="Isi artikel" required>
            <Textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              placeholder="Masukkan teks lengkap artikel di sini"
              className={`min-h-[300px] ${errors.isi ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : ""}`}
            />
          </FormField>

          <FormField label="Rangkuman singkat Artikel">
            <Input value={rangkuman} onChange={(e) => setRangkuman(e.target.value)} placeholder="Teks singkat mewakili isi artikel (maks 50 kata)." />
          </FormField>
        </div>

        <div className="flex items-center justify-end gap-4 relative self-stretch w-full z-10 px-4">
          <Button variant="outline" size="md" onClick={onBack}>
            Batal
          </Button>

          {isEdit && (
            <Button variant="outline-red" size="md" onClick={onDelete}>
              Hapus Artikel
            </Button>
          )}

          <Button variant="dark" size="md" onClick={handleSubmit}>
            {isEdit ? "Simpan Perubahan" : "Unggah Artikel"}
          </Button>
        </div>
      </section>

      {showConfirm && (
        <ArticleConfirmPopup
          data={{ judul, kategori, gambarName, altText, isi, rangkuman }}
          isEdit={isEdit}
          onEdit={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}