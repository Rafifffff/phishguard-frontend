import { useState, useEffect } from "react";
import FormField from "../../components/ui/FormField";
import Input    from "../../components/ui/Input";
import Select   from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";
import Button   from "../../components/ui/Button";

const CHANNEL_OPTIONS = [
  { value: "whatsapp",  label: "WhatsApp" },
  { value: "sms",       label: "SMS" },
  { value: "email",     label: "Email" },
  { value: "telegram",  label: "Telegram" },
  { value: "facebook",  label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter",   label: "Twitter / X" },
  { value: "other",     label: "Lainnya" },
];

export default function MessageCheckerForm({ initialMessage = "", onAnalyze, loading = false }) {
  const [channel, setChannel] = useState("");
  const [sender,  setSender]  = useState("");
  const [url,     setUrl]     = useState("");
  
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    setMessage(initialMessage);
  }, [initialMessage]);

  const [touched, setTouched] = useState(false);
  const isMessageEmpty = message.trim() === "";

  const handleSubmit = () => {
    setTouched(true);
    if (isMessageEmpty) return;
    if (onAnalyze) onAnalyze({ channel, sender, url, message });
  };

  return (
    <div className="flex flex-col items-start gap-4 p-8 sm:p-12 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">

      <img className="absolute top-[396px] right-0 w-72 h-[373px] hidden xl:block pointer-events-none" src="img/poligon-6.svg" alt="" />
      <img className="absolute top-0 left-0 w-[461px] h-96 hidden xl:block pointer-events-none" src="img/poligon-4.svg" alt="" />

      <div className="flex flex-col items-center px-0 py-8 sm:py-[54px] relative self-stretch w-full flex-[0_0_auto] z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-0 sm:px-3.5 py-2 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-16 h-16 sm:w-20 sm:h-20 items-center justify-center gap-2.5 p-4 relative rounded-[20px] aspect-[1] flex-shrink-0 [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)]">
            <img className="relative flex-1 grow aspect-[1]" src="img/vector-stroke.svg" alt="icon" />
          </div>
          <h1 className="relative flex items-center justify-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-4xl sm:text-6xl lg:text-7xl text-center tracking-[-2px] sm:tracking-[-3.60px] leading-tight sm:leading-[72px] whitespace-nowrap">
            Message Checker
          </h1>
        </div>
        <p className="relative flex items-center justify-center w-full max-w-[542px] mt-2 [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base text-center tracking-[0] leading-[normal]">
          Tempel pesan atau link yang ingin diperiksa, lalu dapatkan hasil analisis risiko secara instan beserta alasan di balik penilaiannya.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 pt-0 pb-8 sm:pb-[54px] px-0 relative self-stretch w-full flex-[0_0_auto] z-10">

        <div className="flex flex-col items-start gap-6 sm:gap-8 relative flex-1 grow w-full">

          <FormField label="Channel Chat">
            <Select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              placeholder="— Pilih channel chat —"
              options={CHANNEL_OPTIONS}
            />
          </FormField>

          <FormField label="Nomor/Akun Pengirim">
            <Input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Cth. 081234567890 / contoh@email.com"
            />
          </FormField>

          <FormField label="URL di Pesan">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Cth. https://www.website.com/url/ke/halaman"
            />
          </FormField>
        </div>
        <div className="flex flex-col w-full lg:w-[632px] min-h-[253px] items-start gap-2.5 relative self-stretch">
          <FormField label="Teks Chat" required>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Masukkan pesan lengkap disini ..."
              className={`min-h-[226px] lg:min-h-[260px] ${touched && isMessageEmpty ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : ""}`}
            />
            {touched && isMessageEmpty && (
              <p className="text-[rgba(255,0,0,1)] text-sm [font-family:'Helvetica_Neue-Regular',Helvetica] mt-1">
                Teks chat wajib diisi.
              </p>
            )}
          </FormField>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 relative self-stretch w-full flex-[0_0_auto] z-10">
        <Button
          variant="dark"
          size="md"
          onClick={handleSubmit}
          disabled={loading}
          className={loading ? "opacity-60 cursor-not-allowed" : ""}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Menganalisis...
            </span>
          ) : (
            "Analisis Chat"
          )}
        </Button>
      </div>
    </div>
  );
}