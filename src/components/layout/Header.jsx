import { useState } from "react";

const NAV_ITEMS = [
  { key: "beranda",         label: "Beranda",         icon: "/img/vector-18.svg", aspect: "aspect-[1.1]" },
  { key: "message-checker", label: "Message Checker", icon: "/img/vector-stroke.svg", aspect: "aspect-[1]" },
  { key: "lapor",           label: "Lapor",           icon: "/img/vector-6.svg",  aspect: "aspect-[0.93]" },
  { key: "edukasi",         label: "Edukasi",         icon: "/img/vector-3.svg",  aspect: "aspect-[1.4]" },
];

export default function Header({ activePage = "beranda", onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getActiveMenuKey = (page) => {
    if (page === "result") return "message-checker";
    if (page === "lapor-sukses" || page === "ticket-detail") return "lapor";
    if (page === "artikel") return "edukasi";
    return page;
  };

  const currentMenu = getActiveMenuKey(activePage);

  const handleNavClick = (e, key) => {
    e.preventDefault(); 
    if (onNavigate) {
      onNavigate(key); 
    }
    setMenuOpen(false); 
  };

  return (
    <>
      <header className="flex w-full items-center justify-between px-4 sm:px-7 py-4 sm:py-9 fixed top-0 left-0 z-[9999] bg-[#f9f9f903]">
        <div className="flex items-center justify-between px-3 sm:px-[18px] py-2 w-full rounded-[10px] shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">

          <button 
            type="button"
            onClick={(e) => handleNavClick(e, "beranda")}
            className="justify-center px-2 sm:px-[18px] py-2 inline-flex items-center gap-2.5 flex-[0_0_auto] rounded-md cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              className="w-[22px] h-[22px] sm:w-[27.13px] sm:h-[27.2px] relative aspect-[1]"
              src="/img/vector-5.svg"
              alt="PhishGuard logo"
            />
            <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(255,0,0,1)] text-lg sm:text-2xl tracking-[-1.20px] leading-8 whitespace-nowrap">
              Phishguard
            </span>
          </button>

          <nav className="hidden md:inline-flex items-center gap-4 lg:gap-6 p-[3px] flex-[0_0_auto] bg-[rgba(249,249,249,1)] rounded-[5.5px]">
            {NAV_ITEMS.map((item) => {
              const isActive = currentMenu === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={(e) => handleNavClick(e, item.key)}
                  className={`inline-flex items-center justify-center gap-2 px-2 lg:px-3 py-2 relative flex-[0_0_auto] rounded-[5px] cursor-pointer transition-all duration-300
                    ${isActive
                      ? "[background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] hover:opacity-90"
                      : "hover:bg-gray-100 hover:-translate-y-0.5"
                    }`}
                >
                  <img 
                    className={`relative h-5 object-contain transition-all duration-300 ${item.aspect} ${isActive ? "brightness-0 invert" : "brightness-0"}`} 
                    src={item.icon} 
                    alt="" 
                  />
                  <span className={`relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-base lg:text-xl tracking-[-0.35px] leading-5 whitespace-nowrap transition-colors duration-300
                    ${isActive ? "text-[rgba(249,249,249,1)]" : "text-[rgba(26,28,28,1)]"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={(e) => handleNavClick(e, "admin")}
            className="group hidden md:inline-flex flex-col items-center justify-center gap-2.5 px-3 lg:px-3.5 py-2 flex-[0_0_auto] bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(255,0,0,1)] shadow-[0px_4px_4px_#00000040] cursor-pointer hover:bg-[rgba(255,0,0,1)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
          >
            <span className="relative flex items-center justify-center [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(255,0,0,1)] group-hover:text-white transition-colors duration-300 text-sm lg:text-base text-center tracking-[1.00px] leading-5 whitespace-nowrap">
              Admin Log In
            </span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[rgba(26,28,28,1)] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[rgba(26,28,28,1)] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[rgba(26,28,28,1)] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full z-[9998] bg-[rgba(249,249,249,1)] shadow-lg border-t border-gray-200 flex flex-col px-4 py-4 gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = currentMenu === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={(e) => handleNavClick(e, item.key)}
                className={`px-4 py-3 rounded-[5px] [font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-left
                  ${isActive
                    ? "[background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] text-[rgba(249,249,249,1)]"
                    : "text-[rgba(26,28,28,1)] hover:bg-gray-100"
                  }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <button
            type="button"
            onClick={(e) => handleNavClick(e, "admin")}
            className="px-4 py-3 rounded-[5px] border border-solid border-[rgba(255,0,0,1)] text-[rgba(255,0,0,1)] [font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-center mt-2"
          >
            Admin Log In
          </button>
        </div>
      )}
    </>
  );
}