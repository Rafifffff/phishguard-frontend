import { useState }        from "react";
import { submitReport }    from "../../services/api";
import MessageCheckerForm  from "./MessageCheckerForm";
import ReportCTABanner     from "../../components/shared/ReportCTABanner";

export default function MessageCheckerPage({ initialMessage = "", onNavigate, onSubmitCheck }) {
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    try {
      const apiPayload = {
        reporter_name: "Pengguna Anonim",
        channel_chat: formData.channel || "Lainnya",
        sender_account: formData.sender || "-", 
        chat_text: formData.message,
        url: formData.url || "-",
        region: "-",
        interaksi: false,
        incident_summary: "Pengecekan mandiri via Message Checker"
      };

      const response = await submitReport(apiPayload);
      
      if (onSubmitCheck) {
        onSubmitCheck({ formData, backendResult: response });
      } else if (onNavigate) {
        onNavigate("result");
      }
    } catch (error) {
      console.error("Gagal melakukan pengecekan:", error);
      alert(error.message || "Gagal melakukan pengecekan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-start relative bg-[rgba(252,245,233,1)] min-h-screen">

      <div className="w-full pt-[80px] sm:pt-[100px] lg:pt-[120px]" />

      <div className="flex flex-col items-start gap-2.5 pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto]">
        <MessageCheckerForm 
          initialMessage={initialMessage} 
          onAnalyze={handleAnalyze} 
          loading={loading} 
        />
      </div>

      <ReportCTABanner onClick={() => { if (onNavigate) onNavigate("lapor"); }} />
      
    </div>
  );
}