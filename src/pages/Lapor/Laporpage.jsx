import { useState }        from "react";
import LaporForm           from "./LaporForm";
import ConfirmationPopup   from "./ConfirmationPopup";

const API_URL = "https://be-phisguard-production.up.railway.app/api/report";

export default function LaporPage({ onSuccess }) {
  const [step,      setStep]     = useState("form");
  const [formData,  setFormData] = useState(null);
  const [loading,   setLoading]  = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setStep("confirm");
  };

  const handleEdit = () => setStep("form");

  const handleConfirm = async () => {
    setLoading(true);

    const apiPayload = {
      reporter_name: formData.nama,
      channel_chat: formData.channel,
      sender_account: formData.senderAccount || "-", 
      chat_text: formData.teksChat,
      url: formData.url || "-",
      interaksi: formData.interaksi === "sudah",
      incident_summary: `[Waktu Kejadian: ${formData.tanggal || "-"}] - Kontak Pelapor: ${formData.kontak}`
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(apiPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Detail Error API:", errorData);
        throw new Error("Gagal mengirim laporan ke server. Pastikan semua data wajib terisi.");
      }

      if (onSuccess) {
        onSuccess(formData);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-start relative bg-[rgba(252,245,233,1)]">
      
      <div className="w-full pt-[80px] sm:pt-[100px] lg:pt-[120px]" />

      <div className="flex flex-col items-start gap-2.5 pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto]">
        <LaporForm onSubmit={handleFormSubmit} />
      </div>

      {step === "confirm" && (
        <ConfirmationPopup
          data={formData}
          onEdit={handleEdit}
          onSubmit={handleConfirm}
          loading={loading}
        />
      )}
    </div>
  );
}