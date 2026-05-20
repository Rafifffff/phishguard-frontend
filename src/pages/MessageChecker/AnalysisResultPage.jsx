import DataInputCard      from "./DataInputCard";
import AnalysisResultCard from "./AnalysisResultCard";
import ReportCTABanner    from "../../components/shared/ReportCTABanner";

const DUMMY_RESULT = {
  channel:    "WhatsApp",
  sender:     "+62 812-3456-7890",
  url:        "https://cimb-verifikasi-akun-secure.my.id/login",
  message:
    "Halo nasabah CIMB Niaga, akun Anda terdeteksi aktivitas tidak wajar dan akan diblokir sementara.\nSegera lakukan verifikasi melalui link berikut untuk menghindari penonaktifan permanen:\nhttps://cimb-verifikasi-akun-secure.my.id/login\n\nJika tidak diverifikasi dalam 1x24 jam, akses mobile banking Anda akan dinonaktifkan.\nTerima kasih.\nCIMB Niaga Customer Service",
  score:      90,
  verdict:    "PENIPUAN (Phishing)",
  isPhishing: true,
  indicators: [
    'Urgensi tinggi ("akun akan diblokir")',
    "Menyamar sebagai institusi resmi (CIMB Niaga)",
    "Mengarahkan ke link eksternal",
    "Kata kunci phishing terdeteksi",
  ],
  urlDomain: "cimb-verifikasi-akun-secure.my.id",
  urlStatus: "Tidak terverifikasi / mencurigakan",
};

export default function AnalysisResultPage({ result = DUMMY_RESULT, onNavigate }) {
  return (
    <div className="flex flex-col w-full items-start relative bg-[rgba(252,245,233,1)]">
      <div className="w-full pt-[80px] sm:pt-[100px] lg:pt-[120px]" />

      <div className="flex flex-col items-start gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 p-8 sm:p-12 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">

          <img className="absolute top-0 left-0 w-[461px] h-96 hidden xl:block pointer-events-none" src="img/dekor-1.svg" alt="" />
          <img className="absolute top-[340px] right-0 w-[265px] h-[379px] hidden xl:block pointer-events-none" src="img/dekor-2.svg" alt="" />

          <div className="flex flex-col items-center gap-4 px-0 py-8 sm:py-[54px] relative self-stretch w-full flex-[0_0_auto] z-10">
            <div className="flex items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="5.5" stroke="rgba(255,0,0,1)" strokeWidth="1.5"/>
                <path d="M11 11L15 15" stroke="rgba(255,0,0,1)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(255,0,0,1)] text-xl sm:text-2xl text-center tracking-[-0.35px] leading-5 whitespace-nowrap">
                Message Checker
              </span>
            </div>

            <div className="flex flex-col items-center gap-[9px] relative self-stretch w-full flex-[0_0_auto]">
              <h1 className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-4xl sm:text-6xl lg:text-7xl text-center tracking-[-2px] sm:tracking-[-3.60px] leading-tight sm:leading-[72px] whitespace-nowrap">
                Hasil Analisis
              </h1>
              <p className="relative flex items-center justify-center w-full max-w-[724px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base text-center tracking-[0] leading-[normal]">
                Berikut hasil analisis dari pesan yang Anda masukkan. Sistem kami mengevaluasi tingkat risiko serta mengidentifikasi indikasi phishing untuk membantu Anda mengambil keputusan yang tepat.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 pt-0 pb-8 sm:pb-[54px] px-0 relative self-stretch w-full flex-[0_0_auto] z-10">
            <DataInputCard
              channel={result.channel}
              sender={result.sender}
              url={result.url}
              message={result.message}
            />
            <AnalysisResultCard
              score={result.score}
              verdict={result.verdict}
              isPhishing={result.isPhishing}
              indicators={result.indicators}
              urlDomain={result.urlDomain}
              urlStatus={result.urlStatus}
            />
          </div>
        </div>
      </div>

      <ReportCTABanner onClick={() => onNavigate && onNavigate("lapor")} />
    </div>
  );
}