import { useState }    from "react";
import FormField       from "../../components/ui/FormField";
import Input           from "../../components/ui/Input";
import Select          from "../../components/ui/Select";
import Textarea        from "../../components/ui/Textarea";
import Button          from "../../components/ui/Button";
import RadioOption     from "../../components/ui/RadioOption";
import DatePicker      from "../../components/ui/DatePicker";

const CHANNEL_OPTIONS = [
  { value: "WhatsApp",  label: "WhatsApp" },
  { value: "SMS",       label: "SMS" },
  { value: "Email",     label: "Email" },
  { value: "Telegram",  label: "Telegram" },
  { value: "Facebook",  label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "Twitter",   label: "Twitter / X" },
  { value: "Lainnya",   label: "Lainnya" },
];

export default function LaporForm({ onSubmit, loading = false }) {
  const [reporter_name,    setReporter_name]    = useState("");
  const [channel_chat,     setChannel_chat]     = useState("");
  const [sender_account,   setSender_account]   = useState(""); 
  const [tanggal,          setTanggal]          = useState("");
  const [interaksi,        setInteraksi]        = useState(true);
  const [url,              setUrl]              = useState("");
  const [chat_text,        setChat_text]        = useState("");
  const [region,           setRegion]           = useState("");
  const [touched,          setTouched]          = useState(false);

  const incident_summary = `[Waktu Kejadian: ${tanggal || "-"}]`;

  const errors = {
    reporter_name:   touched && reporter_name.trim() === "",
    channel_chat:    touched && channel_chat === "",
    sender_account:  touched && sender_account.trim() === "",
    chat_text:       touched && chat_text.trim() === "",
    region:          touched && region.trim() === "",
  };

  const handleSubmit = () => {
    setTouched(true);

    const isFormIncomplete = 
      reporter_name.trim() === "" || 
      channel_chat === "" || 
      sender_account.trim() === "" || 
      chat_text.trim() === "" || 
      region.trim() === "";

    if (isFormIncomplete) {
      return; 
    }

    if (onSubmit) {
      onSubmit({ 
        channel_chat,
        sender_account,
        chat_text,
        url,
        reporter_name,
        region,
        interaksi,
        incident_summary
      });
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 p-8 sm:p-12 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">

      <img className="absolute top-[340px] right-0 w-[265px] h-[379px] hidden xl:block pointer-events-none" src="img/poligon-5-2.svg" alt="" />
      <img className="absolute top-0 left-0 w-[461px] h-96 hidden xl:block pointer-events-none" src="img/poligon-4-3.svg" alt="" />

      <div className="flex flex-col items-center px-0 py-8 sm:py-[54px] relative self-stretch w-full flex-[0_0_auto] z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-0 sm:px-3.5 py-2 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-16 h-16 sm:w-20 sm:h-20 items-center justify-center gap-2.5 p-4 relative rounded-[20px] aspect-[1] flex-shrink-0 [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)]">
            <img className="relative flex-1 grow aspect-[0.93]" src="img/image.svg" alt="icon" />
          </div>
          <h1 className="relative flex items-center justify-center [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-4xl sm:text-6xl lg:text-7xl text-center tracking-[-2px] sm:tracking-[-3.60px] leading-tight sm:leading-[72px] whitespace-nowrap">
            Lapor Insiden
          </h1>
        </div>
        <p className="relative flex items-center justify-center w-full max-w-[542px] mt-2 [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base text-center tracking-[0] leading-[normal]">
          Laporkan phishing yang sudah terjadi atau pesan mencurigakan yang Anda terima. Kami bantu analisis dan tindak lanjuti.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 pt-0 pb-8 sm:pb-[54px] px-0 relative self-stretch w-full flex-[0_0_auto] z-10">

        <div className="flex flex-col items-start gap-6 sm:gap-8 relative flex-1 grow w-full">

          <FormField label="Nama Pelapor" required>
            <Input
              value={reporter_name}
              onChange={(e) => setReporter_name(e.target.value)}
              placeholder="Cth. Budi Setiawan"
              className={errors.reporter_name ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : ""}
            />
            {errors.reporter_name && <p className="text-[rgba(255,0,0,1)] text-sm [font-family:'Helvetica_Neue-Regular',Helvetica] mt-1">Nama pelapor wajib diisi.</p>}
          </FormField>

          <FormField label="Channel Chat" required>
            <Select
              value={channel_chat}
              onChange={(e) => setChannel_chat(e.target.value)}
              placeholder="— Pilih channel chat —"
              options={CHANNEL_OPTIONS}
              className={errors.channel_chat ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : ""}
            />
            {errors.channel_chat && <p className="text-[rgba(255,0,0,1)] text-sm [font-family:'Helvetica_Neue-Regular',Helvetica] mt-1">Channel chat wajib dipilih.</p>}
          </FormField>

          <FormField label="Nomor / Akun Pengirim (Penipu)" required>
            <Input
              value={sender_account}
              onChange={(e) => setSender_account(e.target.value)}
              placeholder="Cth. 081234567890 / penipu@email.com"
              className={errors.sender_account ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : ""}
            />
            {errors.sender_account && <p className="text-[rgba(255,0,0,1)] text-sm [font-family:'Helvetica_Neue-Regular',Helvetica] mt-1">Akun pengirim wajib diisi.</p>}
          </FormField>

          <FormField label="Apakah Anda sudah berinteraksi dengan link/pesan ini?" required>
            <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <RadioOption
                label="Sudah"
                value={true}
                selected={interaksi === true}
                onChange={() => setInteraksi(true)}
              />
              <RadioOption
                label="Belum"
                value={false}
                selected={interaksi === false}
                onChange={() => setInteraksi(false)}
              />
            </div>
          </FormField>
        </div>

        <div className="flex flex-col items-start gap-6 sm:gap-8 relative flex-1 grow w-full">

          <FormField label="URL/Tautan mencurigakan">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Cth. https://www.website.com/url/ke/halaman"
            />
          </FormField>

          <FormField label="Teks Chat" required>
            <Textarea
              value={chat_text}
              onChange={(e) => setChat_text(e.target.value)}
              placeholder="Masukkan pesan lengkap disini ..."
              className={`min-h-[260px] resize-none ${errors.teksChat ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : ""}`}
            />
            {errors.chat_text && <p className="text-[rgba(255,0,0,1)] text-sm [font-family:'Helvetica_Neue-Regular',Helvetica] mt-1">Teks chat wajib diisi.</p>}
          </FormField>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto] z-10">

        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative flex-1 grow hidden lg:block" />

          <div className="flex flex-col items-start gap-6 sm:gap-8 relative flex-1 grow w-full">
            <FormField label="Kontak Anda untuk dihubungi (Email / No. HP)" required>
              <Input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Cth. email_anda@gmail.com"
                className={errors.region ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,1)]" : ""}
              />
              {errors.region && <p className="text-[rgba(255,0,0,1)] text-sm [font-family:'Helvetica_Neue-Regular',Helvetica] mt-1">Kontak wajib diisi.</p>}
            </FormField>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 relative self-stretch w-full flex-[0_0_auto]">
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
                Memproses...
              </span>
            ) : (
              "Kirim Laporan"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}