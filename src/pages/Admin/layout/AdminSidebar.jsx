import { useState } from "react";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <img
        className="relative self-stretch w-full aspect-[1]"
        src="img/logo-dashboard.svg"
        alt=""
        aria-hidden="true"
      />
    ),
  },
  {
    key: "triage",
    label: "Triage",
    icon: (
      <img
        className="relative flex-1 grow aspect-[0.94]"
        src="img/logo-triage.svg"
        alt=""
        aria-hidden="true"
      />
    ),
  },
  {
    key: "edu",
    label: "Edu-Manager",
    icon: (
      <img
        className="relative self-stretch w-full aspect-[1.03]"
        src="img/logo-edumanager.svg"
        alt=""
        aria-hidden="true"
      />
    ),
  },
];

export default function AdminSidebar({ activePage, setActivePage, onLogout }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className="inline-flex flex-col h-screen items-start gap-2.5 p-2 sticky top-0 flex-[0_0_auto] bg-transparent transition-all duration-300 z-50"
      style={{ width: expanded ? "220px" : "80px" }}
    >
      <div className="inline-flex flex-col items-center gap-8 px-4 py-8 relative flex-1 grow bg-[#1c1c1c] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] w-full">

        <a
          href="#"
          className={`flex items-center py-2 relative flex-[0_0_auto] rounded-md w-full transition-all duration-200 ${
            expanded ? "px-[18px] justify-start" : "px-0 justify-center"
          }`}
        >
          <img
            className="relative w-[27.13px] h-[27.2px] aspect-[1] flex-shrink-0"
            src="img/icon-phishguard.svg"
            alt="PhishGuard Logo"
            aria-hidden="true"
          />
          <span
            className="font-bold [font-family:'Helvetica_Neue-Bold',Helvetica] text-[#FF0000] text-xl tracking-[-1.20px] leading-8 whitespace-nowrap overflow-hidden transition-all duration-300"
            style={{
              maxWidth: expanded ? "150px" : "0px",
              opacity: expanded ? 1 : 0,
              marginLeft: expanded ? "8px" : "0px",
            }}
          >
            PhishGuard
          </span>
        </a>

        <nav className="flex flex-col items-start gap-4 px-0 py-2.5 relative flex-1 self-stretch w-full grow">

          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center py-2 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] bg-transparent hover:bg-white/10 transition-colors duration-200 ${
              expanded ? "px-4 justify-between" : "justify-center"
            }`}
          >
            <div
              className="font-bold [font-family:'Helvetica_Neue-Bold',Helvetica] text-white text-base text-left tracking-[0] leading-[normal] whitespace-nowrap overflow-hidden transition-all duration-300"
              style={{ maxWidth: expanded ? "200px" : "0px", opacity: expanded ? 1 : 0 }}
            >
              Admin Control
            </div>
            <div className="flex flex-col w-[17.6px] h-[17.6px] items-center justify-center relative flex-shrink-0">
              {expanded ? (
                <svg viewBox="0 0 12 18" fill="white" className="w-[10px] h-[17.6px]">
                  <path d="M10 1L2 9L10 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 18" fill="white" className="w-[10px] h-[17.6px]">
                  <path d="M2 1L10 9L2 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              )}
            </div>
          </button>

          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.key || activePage.startsWith(`${item.key}-`);
            
            return (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`flex items-center py-2 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] transition-all duration-200 text-left ${
                  isActive
                    ? "shadow-[0px_4px_4px_#00000040]"
                    : "bg-transparent hover:bg-white/10"
                } ${expanded ? "px-4 justify-start" : "justify-center"}`}
                style={
                  isActive
                    ? { background: "linear-gradient(24deg, rgba(111,0,0,1) 0%, rgba(255,0,0,1) 100%)" }
                    : {}
                }
              >
                <div className="flex flex-col w-[17.6px] h-[17.6px] items-center justify-center relative aspect-[1] flex-shrink-0">
                  {item.icon}
                </div>
                <span
                  className={`relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] text-[#f9f9f9] text-base tracking-[-0.35px] leading-5 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isActive ? "font-bold" : "font-normal"
                  }`}
                  style={{
                    maxWidth: expanded ? "160px" : "0px",
                    opacity: expanded ? 1 : 0,
                    marginLeft: expanded ? "8px" : "0px",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col items-center justify-center gap-2.5 px-0 py-2 relative self-stretch w-full flex-[0_0_auto]">
          <p
            className="relative w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[#f9f9f9] text-xs tracking-[0] leading-[normal] whitespace-nowrap overflow-hidden transition-all duration-300"
            style={{ maxWidth: expanded ? "200px" : "0px", opacity: expanded ? 1 : 0 }}
          >
            <button 
              type="button"
              onClick={onLogout} 
              className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#ff0000] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
            >
              Log out
            </button>
          </p>
        </div>

      </div>
    </aside>
  );
}