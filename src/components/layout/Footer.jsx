const NAV_LINKS = [
  { label: "Home",            key: "beranda" },
  { label: "Message Checker", key: "message-checker" },
  { label: "Kanal Pelaporan", key: "lapor" },
  { label: "Edukasi",         key: "edukasi" },
  { label: "Admin Login",     key: "admin" }
];

const PROJECT_INFO = ["Netra Dharma Team", "Capstone Project", "FILKOM", "2026"];

export default function Footer({ onNavigate }) {
  
  const handleNavClick = (e, key) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(key);
    } else {
      console.error("❌ ERROR: Footer tidak menerima prop onNavigate");
    }
  };

  return (
    <footer className="flex flex-col w-full items-start gap-2.5 pt-2 pb-0 px-0 relative flex-[0_0_auto] bg-[rgba(252,245,233,1)]">
      
      <div className="gap-4 px-6 sm:px-16 py-8 sm:py-12 flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] rounded-[36px_36px_0px_0px] border border-solid border-[rgba(26,28,28,1)] shadow-[inset_0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(26,28,28,1)_0%,rgba(26,28,28,1)_100%)] flex flex-col items-start relative self-stretch w-full">

        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-4 relative self-stretch w-full flex-[0_0_auto]">

          <div className="flex flex-col items-start gap-2.5 px-0 py-2 relative flex-1 grow">
            <button 
              type="button"
              onClick={(e) => handleNavClick(e, "beranda")}
              className="px-0 py-2 inline-flex items-center gap-2.5 relative flex-[0_0_auto] rounded-md hover:opacity-80 transition-opacity cursor-pointer text-left"
            >
              <img
                className="w-[36px] h-[36px] sm:w-[44.68px] sm:h-[44.8px] relative aspect-[1]"
                src="img/subtract.svg"
                alt="PhishGuard logo"
              />
              <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(249,249,249,1)] text-2xl sm:text-[40px] tracking-[-1.20px] leading-8 whitespace-nowrap">
                Phishguard
              </span>
            </button>
            <p className="relative flex items-center self-stretch [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(249,249,249,1)] text-base sm:text-xl tracking-[-0.35px] leading-5 mt-2">
              Sistem deteksi dan pelaporan phishing berbasis data
            </p>
          </div>

          <div className="inline-flex flex-col items-start gap-4 px-2 py-2.5 relative flex-[0_0_auto]">
            <div className="relative flex items-center self-stretch mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(119,119,119,1)] text-base tracking-[-0.35px] leading-5">
              Navigation
            </div>
            <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
              {NAV_LINKS.map((item, i) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={(e) => handleNavClick(e, item.key)}
                  className={`relative flex items-center self-stretch text-left [text-shadow:0px_4px_4px_#00000040] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(249,249,249,1)] text-base tracking-[-0.35px] leading-5 cursor-pointer hover:opacity-70 transition-opacity duration-300 ${i === 0 ? "mt-[-1.00px]" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="inline-flex flex-col items-start gap-4 px-2 py-2.5 relative flex-[0_0_auto]">
            <div className="relative flex items-center w-fit mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(119,119,119,1)] text-base tracking-[-0.35px] leading-5 whitespace-nowrap">
              Project Info
            </div>
            <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
              {PROJECT_INFO.map((item, i) => (
                <div
                  key={item}
                  className={`relative flex items-center w-fit [text-shadow:0px_4px_4px_#00000040] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(119,119,119,1)] text-base tracking-[-0.35px] leading-5 whitespace-nowrap ${i === 0 ? "mt-[-1.00px]" : ""}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] mt-6 sm:mt-4">
          <div className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(119,119,119,1)] text-sm tracking-[-0.35px] leading-5 whitespace-nowrap">
            © 2026 PhishGuard
          </div>
        </div>
      </div>
    </footer>
  );
}