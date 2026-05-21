import React from "react";

export default function ArticleAdminDetailPage({ article, onBack, onEdit }) {
  const safeArticle = {
    title: article?.judul || article?.title || "-",
    category: article?.kategori_artikel || article?.category || "-",
    excerpt: article?.rangkuman || article?.excerpt || "-",
    date: article?.created_at ? new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : article?.date || "-",
    readTime: article?.readTime || "3 Menit",
    imageSrc: article?.gambar || article?.imageSrc || "",
    imageCaption: article?.alt_text || article?.imageCaption || "-",
    content: article?.isi_artikel || article?.content || "-",
  };

  const paragraphs = safeArticle.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col w-full h-full relative pb-24">

      <div className="flex flex-col items-start gap-12 pt-8 sm:pt-12 pb-16 sm:pb-24 px-8 sm:px-12 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">

        <img className="absolute z-0 top-0 left-0 w-full h-[582px] object-cover pointer-events-none hidden sm:block" src="img/mask-group.svg" alt="" />
        <img className="absolute z-0 top-0 left-0 w-[461px] h-96 hidden xl:block pointer-events-none" src="img/poligon-1-edukasi.svg" alt="" />
        <img className="absolute z-0 top-[198px] right-0 w-[180px] h-[273px] hidden xl:block pointer-events-none" src="img/poligon-5-edukasi.svg" alt="" />
        <img className="absolute top-0 left-0 z-10 w-full pointer-events-none hidden lg:block" src="img/hero-bg-edukasi.svg" alt="" />

        <div className="flex flex-col items-center gap-4 px-0 py-8 sm:py-[54px] relative z-20 self-stretch w-full flex-[0_0_auto]">

          <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
            <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 13V2.5C2 2.5 4 1.5 6.5 1.5C9 1.5 11 3 13.5 3C16 3 16.5 2.5 16.5 2.5V9.5C16.5 9.5 16 10 13.5 10C11 10 9 8.5 6.5 8.5C4 8.5 2 9.5 2 9.5" stroke="rgba(255,0,0,1)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="relative flex items-center justify-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(255,0,0,1)] text-xl sm:text-2xl text-center tracking-[-0.35px] leading-5 whitespace-nowrap">
              Edukasi Manager
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 px-0 sm:px-3.5 py-2 relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="relative flex items-center justify-center w-full max-w-[850px] mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-3xl sm:text-5xl lg:text-7xl text-center tracking-[-2px] sm:tracking-[-3.60px] leading-tight sm:leading-[72px]">
              {safeArticle.title}
            </h1>
            <p className="relative flex items-center justify-center w-full max-w-[600px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base text-center tracking-[0] leading-[normal] mt-4">
              {safeArticle.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 relative self-stretch w-full flex-[0_0_auto] mt-4">
            <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(255,0,0,1)] text-sm tracking-[0] leading-[normal] whitespace-nowrap">
              {safeArticle.category}
            </span>
            <div className="w-px h-4 bg-[rgba(119,119,119,1)] opacity-50" />
            <span className="relative flex items-center justify-end w-fit [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(119,119,119,1)] text-sm text-right tracking-[0] leading-[normal] whitespace-nowrap">
              {safeArticle.date}
            </span>
            <div className="w-px h-4 bg-[rgba(119,119,119,1)] opacity-50" />
            <span className="relative flex items-center justify-end w-fit [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(119,119,119,1)] text-sm text-right tracking-[0] leading-[normal] whitespace-nowrap">
              Bacaan {safeArticle.readTime}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-8 sm:gap-12 px-0 sm:px-16 lg:px-32 py-0 relative z-20 self-stretch w-full flex-[0_0_auto]">

          <div className="flex flex-col items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-full max-w-[900px] mx-auto rounded-[20px] border-2 border-solid border-[rgba(111,0,0,1)] overflow-hidden aspect-[2.2] bg-[rgba(228,210,185,1)]">
              {safeArticle.imageSrc ? (
                <img src={safeArticle.imageSrc} alt={safeArticle.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg width="64" height="64" viewBox="0 0 48 48" fill="none" className="opacity-20">
                    <rect x="6" y="6" width="36" height="36" rx="4" stroke="rgba(111,0,0,1)" strokeWidth="2"/>
                    <circle cx="18" cy="18" r="4" stroke="rgba(111,0,0,1)" strokeWidth="2"/>
                    <path d="M6 32L16 22L22 28L30 20L42 32" stroke="rgba(111,0,0,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            {safeArticle.imageCaption !== "-" && (
              <p className="relative flex items-center w-full max-w-[900px] mx-auto [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base tracking-[0] leading-[normal]">
                {safeArticle.imageCaption}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            {paragraphs.map((para, i) => (
              <p key={i} className="relative self-stretch [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-lg sm:text-xl lg:text-2xl tracking-[0] leading-[1.7]">
                {para}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-start w-full pt-4">
            <button onClick={onBack} className="inline-flex items-center gap-3 px-4 py-2 rounded-[5px] border border-solid border-[rgba(119,119,119,1)] bg-[rgba(249,249,249,1)] hover:border-[rgba(111,0,0,1)] hover:text-[rgba(111,0,0,1)] transition-all duration-200 cursor-pointer group">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
                <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-base tracking-[-0.35px] leading-5">
                Kembali ke List Artikel
              </span>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="fixed bottom-8 right-8 z-[100] flex items-center justify-center gap-2.5 px-6 py-4 bg-[rgba(26,28,28,1)] text-white rounded-full shadow-[0px_8px_16px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0px_12px_20px_rgba(0,0,0,0.4)] hover:bg-[rgba(111,0,0,1)] transition-all duration-300 group cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110">
          <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-base tracking-[-0.35px] leading-5 whitespace-nowrap">
          Edit Artikel
        </span>
      </button>

    </div>
  );
}