import React from "react";

const IconDateSmall = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-[#1c1c1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default function UserTicketDetailCard({ ticket }) {
  const t = ticket || {};
  const namaPelapor = t.namaPelapor || "-";
  const channelChat = t.channelChat || "-";
  const waktuKejadian = t.waktuKejadian || "-";
  const sudahBerinteraksi = t.sudahBerinteraksi || "-";
  const urlMencurigakan = t.urlMencurigakan || "-";
  const teksChat = t.teksChat || "-";

  return (
    <section
      className="p-8 sm:p-12 z-[2] bg-white flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]"
      aria-labelledby="ticket-detail-heading"
    >
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <h2
          id="ticket-detail-heading"
          className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#1c1c1c] text-2xl tracking-[0] leading-[normal] whitespace-nowrap"
        >
          Ticket Detail
        </h2>
        <div className="relative flex-1 grow h-px bg-[#d0d0d0]" aria-hidden="true" />
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
        
        <div className="flex flex-col items-start gap-6 relative flex-1 grow">
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Nama Pelapor
            </h3>
            <div className="flex items-center gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[5px] border border-solid border-[#1c1c1c] min-h-[46px]">
              <p className="relative flex-1 mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-base tracking-[0] leading-[normal]">
                {namaPelapor}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Channel Chat
            </h3>
            <div className="flex items-center gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[5px] border border-solid border-[#1c1c1c] min-h-[46px]">
              <p className="relative flex-1 mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-base tracking-[0] leading-[normal]">
                {channelChat}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Waktu kejadian
            </h3>
            <div className="flex items-center gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[5px] border border-solid border-[#1c1c1c] min-h-[46px]">
              <IconDateSmall />
              <p className="relative flex-1 mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-base tracking-[0] leading-[normal]">
                {waktuKejadian}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Sudah berinteraksi?
            </h3>
            <div className="flex items-center gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[5px] border border-solid border-[#1c1c1c] min-h-[46px]">
              <p className="relative flex-1 mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-base tracking-[0] leading-[normal]">
                {sudahBerinteraksi}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 relative flex-1 grow min-h-[352px]">
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              URL/Tautan mencurigakan
            </h3>
            <div className="flex items-center gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[5px] border border-solid border-[#1c1c1c] min-h-[46px] break-all">
              <p className="relative flex-1 mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-base tracking-[0] leading-[normal]">
                {urlMencurigakan}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 relative flex-1 self-stretch w-full grow">
            <h3 className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Teks Chat
            </h3>
            <div className="flex items-start gap-2.5 px-4 py-3 relative flex-1 self-stretch w-full grow bg-white rounded-[5px] border border-solid border-[#1c1c1c]">
              <p className="relative flex-1 mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#1c1c1c] text-base tracking-[0] leading-[normal] whitespace-pre-wrap">
                {teksChat}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}