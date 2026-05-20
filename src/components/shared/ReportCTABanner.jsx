export default function ReportCTABanner({
  onClick, // Menerima onClick dari parent
  subtitle = "Akun anda SUDAH teretas karena phishing?",
  title    = "Segera laporkan insiden phishing Anda!",
  body     = "Laporkan link atau pesan mencurigakan yang Anda terima agar dapat segera dianalisis dan ditindaklanjuti. Sistem kami akan membantu mengidentifikasi tingkat risiko serta memberikan rekomendasi langkah yang perlu Anda lakukan untuk melindungi akun Anda.",
}) {
  return (
    <section className="pt-4 pb-2 px-4 flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex flex-col lg:flex-row items-start gap-4 p-8 sm:p-12 relative flex-1 grow rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(111,0,0,1)_0%,rgba(111,0,0,1)_100%)] min-h-[240px] sm:min-h-[341px]">

        <img className="absolute top-[116px] right-0 w-[236px] h-[225px] hidden xl:block pointer-events-none" src="img/poligon-4-2.svg" alt="" />
        <img className="absolute top-0 left-[440px] w-[488px] h-full hidden lg:block pointer-events-none" src="img/poligon-3.svg" alt="" />
        <img className="absolute top-0 left-0 w-[190px] h-full hidden lg:block pointer-events-none" src="img/poligon-5.svg" alt="" />
        <img className="absolute w-[623px] h-[316px] top-[25px] right-0 hidden lg:block pointer-events-none object-contain" src="img/group-4.svg" alt="" />
        <div className="absolute left-0 bottom-0 w-full h-[105px] [background:linear-gradient(360deg,rgba(111,0,0,1)_0%,rgba(121,0,0,0)_100%)] pointer-events-none" />

        <div className="flex flex-col items-start gap-4 relative z-10 flex-1 grow">
          <div className="flex flex-col w-full max-w-[648px] items-start gap-2 relative flex-[0_0_auto]">
            <p className="relative flex items-center self-stretch mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(255,0,0,1)] text-lg sm:text-2xl tracking-[-0.35px] leading-5">
              {subtitle}
            </p>
            <p className="relative flex items-center self-stretch [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(249,249,249,1)] text-3xl sm:text-5xl lg:text-[64px] tracking-[-2px] sm:tracking-[-3.60px] leading-tight sm:leading-[72px]">
              {title}
            </p>
          </div>
          <p className="relative flex items-center w-full max-w-[648px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(249,249,249,1)] text-sm sm:text-base tracking-[-0.35px] leading-5">
            {body}
          </p>
        </div>

        <div className="relative z-10 mt-auto lg:mt-0 lg:absolute lg:right-16 lg:top-1/2 lg:-translate-y-1/2">
          <button
            onClick={onClick}
            className="group flex items-center justify-center w-14 h-14 sm:w-[56.25px] sm:h-[56.25px] rounded-full bg-[rgba(249,249,249,1)] shadow-[0px_4px_4px_#00000040] cursor-pointer hover:scale-110 hover:bg-white transition-all duration-300 border-none"
            aria-label="Lapor sekarang"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="rgba(26,28,28,1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
      </div>
    </section>
  );
}