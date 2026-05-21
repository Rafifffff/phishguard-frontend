const IconCalendar = () => (
  <svg className="relative self-stretch aspect-[0.93]" viewBox="0 0 14 15" fill="none" style={{ width: "13px" }}>
    <rect x="1" y="2.5" width="12" height="11" rx="1.5" stroke="#1c1c1c" strokeWidth="1.3" />
    <path d="M1 6h12" stroke="#1c1c1c" strokeWidth="1.3" />
    <path d="M4.5 1v3M9.5 1v3" stroke="#1c1c1c" strokeWidth="1.3" strokeLinecap="round" />
    <rect x="3.5" y="8" width="2" height="2" rx="0.3" fill="#1c1c1c" />
    <rect x="6.5" y="8" width="2" height="2" rx="0.3" fill="#1c1c1c" />
  </svg>
);

const IconPaperclip = () => (
  <svg className="relative self-stretch aspect-[1]" viewBox="0 0 14 14" fill="none" style={{ width: "14px" }}>
    <path
      d="M12.5 6.5L7 12a4 4 0 0 1-5.657-5.657l5.5-5.5a2.5 2.5 0 0 1 3.536 3.536L4.879 9.88A1 1 0 0 1 3.464 8.464L8.5 3.5"
      stroke="#1c1c1c"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ReadOnlyInput({ id, label, value, type = "text", prefix }) {
  return (
    <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
      <label
        htmlFor={id}
        className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]"
      >
        <span className="relative flex items-center w-fit mt-[-1.00px] font-normal text-[#1c1c1c] text-2xl tracking-[0] leading-5 whitespace-nowrap">
          {label}
        </span>
      </label>

      {prefix ? (
        <div className="h-[38px] items-center px-4 py-2 self-stretch w-full ml-[-1.00px] border border-solid border-[#9b9b9b] flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px]">
          {prefix}
          <input
            id={id}
            name={id}
            type={type}
            defaultValue={value}
            readOnly
            className="relative flex items-center flex-1 font-normal text-[#1c1c1c] text-base tracking-[-0.35px] leading-5 bg-transparent outline-none"
          />
        </div>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          defaultValue={value}
          readOnly
          className="h-[38px] items-center px-4 py-2 self-stretch w-full ml-[-1.00px] border border-solid border-[#9b9b9b] flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px] bg-transparent font-normal text-[#1c1c1c] text-base tracking-[-0.35px] leading-5 outline-none"
        />
      )}
    </div>
  );
}

export default function TicketDetailCard({ ticket }) {
  const t = ticket || {
    namaPelapor: "Usman Iskandar",
    channelChat: "WhatsApp",
    waktuKejadian: "18 April 2026",
    sudahBerinteraksi: "Sudah",
    urlMencurigakan: "https://cimb-verifikasi-akun-secure.my.id/login",
    uploadScreenshot: "screenshot_chat_cimb_18042026.png",
    teksChat: `Halo nasabah CIMB Niaga, akun Anda terdeteksi aktivitas tidak wajar dan akan diblokir sementara.\nSegera lakukan verifikasi melalui link berikut untuk menghindari penonaktifan permanen:\nhttps://cimb-verifikasi-akun-secure.my.id/login\n\nJika tidak diverifikasi dalam 1x24 jam, akses mobile banking Anda akan dinonaktifkan.\nTerima kasih.\nCIMB Niaga Customer Service`,
  };

  return (
    <section
      className="gap-8 p-12 z-[2] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] bg-collection-1-secondary"
      aria-labelledby="ticket-detail-heading"
    >
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <h2
          id="ticket-detail-heading"
          className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-collection-1-black text-2xl tracking-[0] leading-[72px] whitespace-nowrap"
        >
          Ticket Detail
        </h2>
        <img className="relative flex-1 grow h-px object-cover" src="img/garis-detail-1.svg" alt="" />
      </div>

      <div className="flex items-start gap-12 relative self-stretch w-full flex-[0_0_auto]">
        
        <div className="flex flex-col items-start gap-8 relative flex-1 grow">
          
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <label htmlFor="nama-pelapor" className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[0] leading-5 whitespace-nowrap">Nama Pelapor</span>
            </label>
            <input id="nama-pelapor" name="nama-pelapor" type="text" defaultValue={t.namaPelapor} readOnly className="h-[38px] items-center px-4 py-2 self-stretch w-full ml-[-1.00px] border border-solid border-collection-1-grey flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px] bg-transparent [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 outline-none" />
          </div>

          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <label htmlFor="channel-chat" className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[0] leading-5 whitespace-nowrap">Channel Chat</span>
            </label>
            <input id="channel-chat" name="channel-chat" type="text" defaultValue={t.channelChat} readOnly className="h-[38px] items-center px-4 py-2 self-stretch w-full ml-[-1.00px] border border-solid border-collection-1-grey flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px] bg-transparent [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 outline-none" />
          </div>

          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <label htmlFor="waktu-kejadian" className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[0] leading-5 whitespace-nowrap">Waktu kejadian</label>
            <div className="h-[38px] items-center px-4 py-2 self-stretch w-full ml-[-1.00px] border border-solid border-collection-1-grey flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px]">
              <img className="relative self-stretch aspect-[0.93]" src="img/icon-tgl-item.svg" alt="" />
              <input id="waktu-kejadian" name="waktu-kejadian" type="text" defaultValue={t.waktuKejadian} readOnly className="relative flex items-center flex-1 [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 bg-transparent outline-none" />
            </div>
          </div>

          <fieldset className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto] min-w-0">
            <legend className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] mb-2">
              <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[0] leading-5 whitespace-nowrap">Sudah berinteraksi?</span>
            </legend>
            <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex items-center gap-1 relative flex-1 self-stretch grow">
                <label className="h-[38px] items-center px-4 py-2 flex-1 grow mt-[-1.00px] ml-[-1.00px] bg-collection-1-white border border-solid border-collection-1-grey flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px] cursor-default">
                  <input type="radio" name="interaksi" defaultChecked disabled className="sr-only" />
                  <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 whitespace-nowrap">{t.sudahBerinteraksi}</span>
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col items-start gap-8 relative flex-1 grow">
          
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <label htmlFor="url-mencurigakan" className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[0] leading-5 whitespace-nowrap">URL/Tautan mencurigakan</label>
            <input id="url-mencurigakan" name="url-mencurigakan" type="url" defaultValue={t.urlMencurigakan} readOnly className="h-[38px] items-center px-4 py-2 self-stretch w-full ml-[-1.00px] bg-collection-1-white border border-solid border-collection-1-grey flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 outline-none" />
          </div>

          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <label htmlFor="kontak" className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[0] leading-5 whitespace-nowrap">Kontak</span>
            </label>
            <input id="kontak" name="kontak" type="text" defaultValue={t.kontak} readOnly className="h-[38px] items-center px-4 py-2 self-stretch w-full ml-[-1.00px] bg-collection-1-white border border-solid border-collection-1-grey flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5 outline-none" />
          </div>

          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <label htmlFor="teks-chat" className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-2xl tracking-[0] leading-5 whitespace-nowrap">Teks Chat</span>
            </label>
            <div className="min-h-[131px] items-start px-4 py-2 self-stretch w-full flex-[0_0_auto] ml-[-1.00px] bg-collection-1-white border border-solid border-collection-1-grey flex gap-2.5 relative mb-[-1.00px] mr-[-1.00px] rounded-[5px]">
              <textarea id="teks-chat" name="teks-chat" readOnly defaultValue={t.teksChat} className="relative flex-1 mt-[-0.50px] min-h-[115px] resize-none bg-transparent outline-none [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-collection-1-black text-base tracking-[-0.35px] leading-5"></textarea>
              <div className="absolute right-0.5 bottom-0.5 w-8 h-8"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}