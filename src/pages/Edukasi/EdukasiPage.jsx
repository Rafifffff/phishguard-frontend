import { useState }       from "react";
import ArticleGrid        from "./ArticleGrid";
import ArticleDetailPage  from "./ArticleDetailPage";

export default function EdukasiPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (selectedArticle) {
    return (
      <ArticleDetailPage
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  return (
    <div className="flex flex-col w-full items-start relative bg-[rgba(252,245,233,1)]">

      <div className="w-full pt-[80px] sm:pt-[100px] lg:pt-[120px]" />

      <section className="flex flex-col items-start gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 p-8 sm:p-12 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">
          <img className="absolute top-0 left-0 w-[461px] h-96 hidden xl:block pointer-events-none" src="img/segitiga-1.svg" alt="" />

          <div className="flex flex-col items-center px-0 py-8 sm:py-[54px] relative self-stretch w-full flex-[0_0_auto] z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-0 sm:px-3.5 py-2 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col w-16 h-16 sm:w-20 sm:h-20 items-center justify-center gap-2.5 p-4 relative rounded-[20px] aspect-[1] flex-shrink-0 [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)]">
                <img className="relative flex-1 grow aspect-[1.4]" src="img/toga.svg" alt="" />
              </div>
              <h1 className="relative flex items-center justify-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-4xl sm:text-6xl lg:text-7xl text-center tracking-[-2px] sm:tracking-[-3.60px] leading-tight sm:leading-[72px] whitespace-nowrap">
                Edukasi
              </h1>
            </div>
            <p className="relative flex items-center justify-center w-full max-w-[542px] mt-2 [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-sm sm:text-base text-center tracking-[0] leading-[normal]">
              Pelajari berbagai jenis phishing, cara mengenalinya, dan langkah yang tepat untuk menghindarinya agar Anda tetap aman saat beraktivitas digital.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-start gap-2.5 pt-4 pb-2 px-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-6 sm:gap-8 p-8 sm:p-12 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">
          <img className="absolute top-0 left-0 w-[190px] h-[362px] hidden xl:block pointer-events-none" src="img/segitiga-2.svg" alt="" />

          <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto] z-10">
            <h2 className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-[24px] tracking-normal leading-normal whitespace-nowrap">
              Artikel
            </h2>
            <div className="flex-1 h-0.5 bg-[rgba(26,28,28,1)] opacity-20" />
          </div>

          <div className="relative self-stretch w-full z-10">
            <ArticleGrid onRead={setSelectedArticle} />
          </div>
        </div>
      </section>

    </div>
  );
}