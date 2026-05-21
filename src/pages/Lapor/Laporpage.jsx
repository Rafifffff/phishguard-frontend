import { useState }        from "react";
import LaporForm           from "./LaporForm";
import ConfirmationPopup   from "./ConfirmationPopup";
import { submitReport }    from "../../services/api";

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
      reporter_name: formData.reporter_name,
      channel_chat: formData.channel_chat,
      sender_account: formData.sender_account || "-", 
      chat_text: formData.chat_text,
      url: formData.url || "-",
      region: formData.region,
      interaksi: formData.interaksi,
      incident_summary: formData.incident_summary || "-"
    };

    try {
      await submitReport(apiPayload);
      if (onSuccess) {
        onSuccess(formData);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan:", error);
      alert(error.message || "Gagal mengirim laporan ke server.");
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