export default function SuccessHero({ nama = "Pengguna", kontak = "", onBack }) {
  return (
    <section className="relative flex w-full flex-col items-start gap-2.5 px-4 py-2">
      <div className="relative flex min-h-[400px] sm:min-h-[600px] w-full flex-col items-center justify-center gap-6 sm:gap-8 overflow-hidden rounded-[20px] shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] p-8 sm:p-12">

        <img className="absolute left-0 top-0 w-[280px] sm:w-[461px] h-auto pointer-events-none" src="img/merah-1.svg" alt="" />

        <div className="relative inline-flex flex-[0_0_auto] items-center justify-center gap-2 z-10">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 14V3.5C2.5 3.5 4 2.5 6.5 2.5C9 2.5 10.5 4 13 4C15.5 4 16 3.5 16 3.5V10C16 10 15.5 10.5 13 10.5C10.5 10.5 9 9 6.5 9C4 9 2.5 10 2.5 10" stroke="rgba(255,0,0,1)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="relative flex w-fit items-center justify-center whitespace-nowrap [font-family:'Helvetica_Neue-Bold',Helvetica] text-xl sm:text-2xl font-bold leading-5 tracking-[-0.35px] text-[rgba(255,0,0,1)]">
            Lapor Insiden
          </span>
        </div>

        <div className="relative inline-flex flex-[0_0_auto] flex-col items-center gap-4 z-10 px-4">
          <h1 className="relative w-full max-w-[1050px] text-center [font-family:'Helvetica_Neue-Bold',Helvetica] text-4xl sm:text-6xl lg:text-[72px] font-bold leading-[1.2] sm:leading-[1.1] tracking-[-2px] sm:tracking-[-3.60px]">
            <span className="text-[#1a1c1c]">Terima kasih </span>
            <span className="text-[#6f0000]">{nama}</span>
            <span className="text-[#1a1c1c]">,</span>
            <br />
            <span className="text-[#1a1c1c]">laporan Anda akan kami proses</span>
          </h1>

          <p className="relative w-full max-w-[815px] text-center [font-family:'Helvetica_Neue-Regular',Helvetica] text-base sm:text-xl font-normal leading-[1.5] tracking-[0] text-[rgba(26,28,28,1)]">
            Laporan dari Anda telah kami terima dan akan segera dianalisis oleh Admin kami.
            {kontak && (
              <>
                {" "}Jika diperlukan, tim kami akan 
                <br className="hidden sm:block" /> 
                menghubungi Anda melalui <strong className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold">{kontak}</strong> untuk tindak lanjut.
              </>
            )}
          </p>
        </div>

        <div className="relative flex w-full flex-[0_0_auto] items-center justify-center z-10">
          <button
            onClick={onBack}
            className="inline-flex flex-[0_0_auto] items-center gap-3 rounded-[5px] px-4 py-2 shadow-[0px_4px_4px_#00000040] [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L1 9.5L9 18" stroke="rgba(249,249,249,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="relative flex w-fit items-center whitespace-nowrap [font-family:'Helvetica_Neue-Regular',Helvetica] text-base font-normal leading-5 tracking-[-0.35px] text-[rgba(249,249,249,1)]">
              Kembali ke beranda
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}