import GaugeChart from "../../components/ui/GaugeChart";

function verdictColor(score) {
  if (score >= 70) return "rgba(111,0,0,1)";
  if (score >= 40) return "rgba(180,100,0,1)";
  return "rgba(52,199,89,1)";
}

export default function AnalysisResultCard({
  score      = 0,
  verdict    = "Belum dianalisis",
  indicators = [],
  urlDomain  = "",
  urlStatus  = "",
  isPhishing = false,
}) {
  return (
    <div className="flex flex-col items-start justify-center gap-6 sm:gap-8 relative flex-1 self-stretch grow">
      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">

        <div className="flex flex-col items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex flex-col items-center gap-6 sm:gap-8 p-4 relative flex-[0_0_auto] bg-[rgba(249,249,249,1)] rounded-[20px] shadow-[inset_0px_4px_4px_#00000040] w-full max-w-[380px] mx-auto">

            <div className="flex flex-col items-center justify-center relative self-stretch w-full">
              <GaugeChart value={score} />
            </div>

            <div className="flex flex-col items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-black text-lg sm:text-2xl tracking-[-0.35px] leading-5 whitespace-nowrap">
                Pesan terdeteksi sebagai :
              </div>
              <div
                className="relative flex items-center justify-center w-full [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-3xl sm:text-[40px] tracking-[-0.35px] leading-tight text-center"
                style={{ color: verdictColor(score) }}
              >
                {verdict}
              </div>
            </div>
          </div>
        </div>

        {indicators.length > 0 && (
          <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] pl-0 sm:pl-4">
            {/* Header indikator */}
            <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
              {/* Flag icon */}
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 15C3 15 4 14 7 14C10 14 12 16 15 16C18 16 19 15 19 15V3C19 3 18 4 15 4C12 4 10 2 7 2C4 2 3 3 3 3V15Z" fill="rgba(255,0,0,1)" stroke="rgba(255,0,0,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 22V15" stroke="rgba(255,0,0,1)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-xl sm:text-2xl tracking-[-0.35px] leading-5 whitespace-nowrap">
                Indikator resiko
              </span>
            </div>

            <div className="flex items-start gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto] bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)]">
              <ul className="relative w-fit mt-[-0.50px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base tracking-[-0.35px] leading-5 list-disc list-inside space-y-1">
                {indicators.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {urlDomain && (
          <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] pl-0 sm:pl-4">
            <div className="inline-flex items-center gap-2 relative flex-[0_0_auto] flex-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="rgba(26,28,28,1)" strokeWidth="1.5"/>
                <path d="M12 3C12 3 9 7 9 12C9 17 12 21 12 21" stroke="rgba(26,28,28,1)" strokeWidth="1.5"/>
                <path d="M12 3C12 3 15 7 15 12C15 17 12 21 12 21" stroke="rgba(26,28,28,1)" strokeWidth="1.5"/>
                <path d="M3 12H21" stroke="rgba(26,28,28,1)" strokeWidth="1.5"/>
                <path d="M4.5 7.5H19.5M4.5 16.5H19.5" stroke="rgba(26,28,28,1)" strokeWidth="1.5"/>
              </svg>
              <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-xl sm:text-2xl tracking-[-0.35px] leading-5 whitespace-nowrap">
                Analisis URL
              </span>
              <div className="inline-flex flex-col items-center justify-center gap-[5px] px-2 py-1 relative flex-[0_0_auto] bg-[rgba(119,119,119,1)] rounded-[10px]">
                <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(249,249,249,1)] text-sm sm:text-base tracking-[-0.35px] leading-5 whitespace-nowrap">
                  {urlDomain}
                </span>
              </div>
            </div>

            <div className="flex h-[38px] items-center gap-2.5 px-4 py-2 relative self-stretch w-full bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)]">
              <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base tracking-[-0.35px] leading-5 whitespace-nowrap">
                Status: {urlStatus}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}