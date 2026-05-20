const CATEGORY_COLORS = {
  "Tips":         "text-[rgba(255,0,0,1)]",
  "Modus":        "text-[rgba(255,0,0,1)]",
  "Update Kasus": "text-[rgba(255,0,0,1)]",
};

export default function ArticleCard({ category, title, excerpt, readTime, imageSrc, onClick, className = "" }) {
  return (
    <article
      onClick={onClick}
      className={`group flex flex-col h-full w-full items-start gap-4 p-4 relative bg-[rgba(249,249,249,1)] rounded-[10px] shadow-[0px_4px_4px_#00000040] cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-[0px_12px_24px_#00000025] ${className}`}
    >
      <div className="relative self-stretch w-full h-[155px] rounded-[5px] border-2 border-solid border-[rgba(111,0,0,1)] overflow-hidden bg-[rgba(228,218,205,1)] flex-shrink-0">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[rgba(252,245,233,1)] to-[rgba(228,210,185,1)]">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
              <rect x="6" y="6" width="36" height="36" rx="4" stroke="rgba(111,0,0,1)" strokeWidth="2"/>
              <circle cx="18" cy="18" r="4" stroke="rgba(111,0,0,1)" strokeWidth="2"/>
              <path d="M6 32L16 22L22 28L30 20L42 32" stroke="rgba(111,0,0,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 px-4 py-0 relative self-stretch w-full flex-grow">
        
        <p className={`relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-sm tracking-[0] leading-[normal] whitespace-nowrap ${CATEGORY_COLORS[category] ?? "text-[rgba(255,0,0,1)]"}`}>
          {category}
        </p>

        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-grow">
          <h3 className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-xl tracking-[0] leading-[normal] line-clamp-2 group-hover:text-[rgba(111,0,0,1)] transition-colors duration-300">
            {title}
          </h3>
          <p className="relative self-stretch [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm tracking-[0] leading-[normal] line-clamp-3">
            {excerpt}
          </p>
        </div>

        <p className="relative flex items-center justify-end self-stretch [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(119,119,119,1)] text-sm text-right tracking-[0] leading-[normal] pt-2">
          {readTime}
        </p>
      </div>
    </article>
  );
}