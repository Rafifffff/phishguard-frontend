import { useState }        from "react";
import MessageCheckerForm  from "./MessageCheckerForm";
import ReportCTABanner     from "../../components/shared/ReportCTABanner";

export default function MessageCheckerPage({ initialMessage = "", onNavigate, onSubmitCheck }) {
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    
    if (onSubmitCheck) {
      onSubmitCheck(formData);
    } else if (onNavigate) {
      onNavigate("result");
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