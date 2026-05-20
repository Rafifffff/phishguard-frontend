import React from "react";

export default function UserAdminResponseCard({ response }) {
  return (
    <section className="relative flex flex-col items-start gap-6 p-8 sm:p-12 w-full rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] bg-[rgba(249,249,249,1)] mt-2">
      
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-[#FF8A65] opacity-25 blur-[90px] pointer-events-none rounded-full -translate-x-1/4 -translate-y-1/4" />

      <div className="flex items-center gap-4 relative w-full z-10">
        <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#1c1c1c] text-2xl whitespace-nowrap">
          Admin Response
        </h2>
        <div className="flex-1 h-px bg-[#1c1c1c] opacity-40" />
      </div>

      {response ? (
        <div className="flex flex-col lg:flex-row items-stretch gap-8 sm:gap-12 relative z-10 w-full mt-2">
          
          <div className="flex flex-col gap-6 flex-1 w-full">
            
            <div className="flex flex-col gap-2">
              <label className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-xl text-[#1c1c1c]">
                Hasil Keputusan
              </label>
              <div className="flex items-center px-4 py-2.5 min-h-[42px] bg-transparent border border-[#a0a0a0] rounded-[5px]">
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-[#1c1c1c]">
                  {response.hasilKeputusan || "-"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-xl text-[#1c1c1c]">
                Kategori Phishing
              </label>
              <div className="flex items-center px-4 py-2.5 min-h-[42px] bg-transparent border border-[#a0a0a0] rounded-[5px]">
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-[#1c1c1c]">
                  {response.kategoriPhishing || "-"}
                </span>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-2 flex-1 w-full">
            <label className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-xl text-[#1c1c1c]">
              Catatan Admin
            </label>
            <div className="flex items-start p-4 h-full min-h-[140px] bg-transparent border border-[#a0a0a0] rounded-[5px]">
              <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-[#1c1c1c] leading-relaxed">
                {response.catatanAdmin || "-"}
              </span>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 gap-4 relative z-10 w-full opacity-60">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-[#1c1c1c] text-lg text-center font-medium">
            Belum ada respon dari admin terkait laporan ini. <br/> Harap menunggu.
          </p>
        </div>
      )}
    </section>
  );
}