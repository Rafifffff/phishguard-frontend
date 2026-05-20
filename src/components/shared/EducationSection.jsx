export default function EducationSection({ onClick }) {
  return (
    <div className="flex flex-col items-start gap-2.5 p-8 sm:p-12 relative flex-1 self-stretch bg-[rgba(249,249,249,1)] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] min-h-[400px] lg:min-h-[729px]">
      <img className="absolute top-[222px] left-[390px] w-[238px] h-[404px] hidden lg:block pointer-events-none" src="img/polygon-4-3.svg" alt="" />
      <img className="absolute top-[363px] left-0 w-[295px] h-[310px] hidden lg:block pointer-events-none" src="img/polygon-5-5.svg" alt="" />
      <img className="absolute w-full max-w-[462px] h-auto bottom-0 left-0 hidden lg:block pointer-events-none" src="img/group-8.svg" alt="" />

      <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto] z-10">
        <div className="relative flex items-center self-stretch mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(255,0,0,1)] text-lg sm:text-2xl tracking-[-0.35px] leading-5">
          Jangan jadi korban berikutnya,
        </div>
        <p className="relative flex items-center self-stretch [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-3xl sm:text-5xl lg:text-[64px] tracking-[-2px] sm:tracking-[-3.60px] leading-none">
          Pahami ancaman phishing sejak dini!
        </p>
      </div>

      <p className="relative flex items-center self-stretch [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base tracking-[-0.35px] leading-5 z-10">
        Akses materi edukasi singkat, tips praktis, dan quiz interaktif untuk membantu Anda memahami ciri-ciri phishing serta langkah yang perlu dilakukan untuk melindungi akun dan data pribadi Anda.
      </p>

      <div className="relative z-10 mt-auto self-end">
        <button 
          onClick={onClick} 
          className="relative w-[56.25px] h-[56.25px] block cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-300 bg-transparent border-none p-0"
        >
          <img className="absolute top-0 -left-1 w-16 h-16 aspect-[1]" src="img/vector-9.svg" alt="" />
          <img className="absolute top-3 left-2 w-8 h-8" src="img/subtract-3.svg" alt="" />
        </button>
      </div>
    </div>
  );
}