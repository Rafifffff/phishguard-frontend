export default function ReportSection({ onClick }) {
  return (
    <div className="flex flex-col w-full lg:w-[773px] items-start gap-4 p-8 sm:p-12 relative self-stretch rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(111,0,0,1)_0%,rgba(111,0,0,1)_100%)] min-h-[400px] lg:min-h-[729px]">
      <img className="absolute top-[335px] left-0 w-[278px] h-[370px] hidden lg:block pointer-events-none" src="img/polygon-4.svg" alt="" />
      <img className="absolute top-[110px] left-[351px] w-[422px] h-[488px] hidden lg:block pointer-events-none" src="img/polygon-3.svg" alt="" />
      <img className="absolute w-full max-w-[623px] h-auto bottom-0 left-0 hidden lg:block pointer-events-none" src="img/group-4.svg" alt="" />

      <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto] z-10">
        <p className="relative flex items-center self-stretch mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(255,0,0,1)] text-lg sm:text-2xl tracking-[-0.35px] leading-5">
          Akun anda teretas karena phishing?
        </p>
        <div className="relative flex items-center self-stretch [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(249,249,249,1)] text-3xl sm:text-5xl lg:text-[64px] tracking-[-2px] sm:tracking-[-3.60px] leading-tight sm:leading-[72px]">
          Laporkan insiden phising anda!
        </div>
      </div>

      <p className="relative flex items-center self-stretch [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(249,249,249,1)] text-sm sm:text-base tracking-[-0.35px] leading-5 z-10">
        Laporkan link atau pesan mencurigakan yang Anda terima agar dapat segera dianalisis dan ditindaklanjuti. Sistem kami akan membantu mengidentifikasi tingkat risiko serta memberikan rekomendasi langkah yang perlu Anda lakukan untuk melindungi akun Anda.
      </p>

      <div className="[background:linear-gradient(360deg,rgba(111,0,0,1)_0%,rgba(121,0,0,0)_100%)] absolute left-0 bottom-0 w-full h-48 sm:h-64 pointer-events-none" />

      <div className="relative z-10 mt-auto self-end">
        <button 
          onClick={onClick} 
          className="relative w-[56.25px] h-[56.25px] block cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-300 bg-transparent border-none p-0"
        >
          <img className="absolute top-0 -left-1 w-16 h-16 aspect-[1]" src="img/vector-12.svg" alt="" />
        </button>
      </div>
    </div>
  );
}