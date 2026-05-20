import { useState, useRef } from "react";

export default function HeroSection({ onCheck }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (onCheck) {
      onCheck(message);
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="pt-[80px] sm:pt-[100px] lg:pt-[120px] gap-2.5 pb-2 px-4 flex flex-col items-start relative self-stretch w-full bg-transparent">
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-[50px] p-4 sm:p-2.5 relative flex-1 self-stretch w-full rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] min-h-[500px] sm:min-h-[700px] lg:min-h-[725px] h-auto pb-16">

        <img className="absolute top-[210px] left-0 w-[481px] h-[506px] hidden xl:block pointer-events-none" src="img/polygon-2.svg" alt="" />
        <img className="absolute top-[399px] left-[926px] w-[366px] h-[366px] hidden xl:block pointer-events-none" src="img/polygon-3-2.svg" alt="" />
        <img className="absolute top-[253px] left-[1250px] w-[158px] h-[265px] hidden 2xl:block pointer-events-none" src="img/polygon-5-3.svg" alt="" />
        <img className="absolute top-0 left-0 w-full h-[70%] object-cover hidden sm:block pointer-events-none" src="img/mask-group.svg" alt="" />
        <img className="absolute top-0 left-0 w-[346px] h-[284px] hidden lg:block pointer-events-none" src="img/polygon-4-6.svg" alt="" />
        <img className="absolute w-full h-full top-0 left-0 object-cover pointer-events-none" src="img/hero-bg.png" alt="" />

        <div className="inline-flex flex-col items-center justify-center gap-2.5 relative flex-[0_0_auto] z-10">
          <img className="relative w-[36px] h-[36px] sm:w-[43.4px] sm:h-[43.52px] aspect-[1]" src="img/vector-5.svg" alt="logo" />
          <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(255,0,0,1)] text-xl sm:text-2xl tracking-[-1.20px] leading-8 whitespace-nowrap">
            Phishguard
          </span>
        </div>

        <div className="inline-flex flex-col items-center relative flex-[0_0_auto] z-10 px-4">
          <p className="relative w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-3xl sm:text-5xl lg:text-7xl text-center tracking-[-2px] sm:tracking-[-3.60px] leading-tight sm:leading-[72px]">
            <span className="text-[#1a1c1c]">LINDUNGI DIRI ANDA DARI<br /></span>
            <span className="text-[#ff0000]">ANCAMAN PHISHING.</span>
          </p>
          <p className="relative flex items-center justify-center w-full max-w-[749px] mt-3 sm:mt-0 [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base sm:text-xl text-center tracking-[0] leading-[normal]">
            Verifikasi setiap tautan sebelum Anda klik. Sistem pertahanan proaktif kami menganalisis ancaman secara real-time untuk menjaga aset digital Anda tetap aman.
          </p>
        </div>

        <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto] z-10 w-full max-w-[827px] px-4 sm:px-0">
          <div className="flex w-full items-end sm:items-center gap-2 sm:gap-4 p-2 relative flex-[0_0_auto] bg-[rgba(249,249,249,1)] rounded-[10px] shadow-[0px_4px_4px_#00000040] border border-solid border-[rgba(26,28,28,1)]">
            <div className="flex items-center gap-2.5 pl-3.5 pr-2 sm:pr-4 py-2 relative flex-1 self-stretch bg-[rgba(249,249,249,1)] rounded-[5px] shadow-[inset_0px_4px_4px_#00000040]">
              <img className="relative w-5 h-2.5 flex-none mt-1" src="img/icon.svg" alt="" />
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ketik pesan yang ingin anda periksa..."
                className="w-full bg-transparent outline-none border-none [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] placeholder:text-[rgba(119,119,119,1)] text-sm sm:text-xl tracking-[-0.35px] leading-relaxed resize-none overflow-y-auto max-h-[200px]"
                style={{ minHeight: "28px" }}
              />
            </div>
            <div className="flex items-center gap-2.5 p-0.5 relative flex-none self-stretch pb-1.5 sm:pb-0.5">
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-6 h-[42px] sm:h-[50px] relative rounded-[5px] [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(249,249,249,1)] text-sm sm:text-xl tracking-[-0.35px] leading-5 whitespace-nowrap">
                  Periksa pesan
                </span>
                <img className="relative w-4 h-4 aspect-[1]" src="img/vector-11.svg" alt="" />
              </button>
            </div>
          </div>
          <p className="relative flex items-center w-fit [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-xs sm:text-sm tracking-[0] leading-[normal] mt-1">
            Sistem akan memproses pesan yang anda kirim secara anonimus, dan memeriksa potensi phishing.
          </p>
        </div>
      </div>
    </section>
  );
}