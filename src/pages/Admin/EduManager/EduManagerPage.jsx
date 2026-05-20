import { useState, useEffect, useMemo } from "react";
import ArticleFilter     from "../../Edukasi/ArticleFilter";
import ArticleCard       from "../../Edukasi/ArticleCard";

const API_URL = "https://be-phisguard-production.up.railway.app/api/articles";

export default function EduManagerPage({ onNavigate, onAddArticle, onViewArticle }) {
  const [query,    setQuery]    = useState("");
  const [category, setCategory] = useState("");

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Gagal mengambil data dari server");
        
        const data = await response.json();
        const articlesData = Array.isArray(data) ? data : data.data || [];
        
        setArticles(articlesData);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Gagal memuat artikel. Periksa koneksi internet Anda.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return articles.filter((a) => {
      const cat     = a.kategori_artikel || "";
      const title   = a.judul || "";
      const excerpt = a.rangkuman || "";

      const matchCat = category === "" || cat === category;
      const matchQ   = q === "" ||
        title.toLowerCase().includes(q) ||
        excerpt.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q);
        
      return matchCat && matchQ;
    });
  }, [articles, query, category]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <header className="gap-4 px-12 py-8 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">
        <img className="absolute top-0 left-0 w-[461px] h-[200px] pointer-events-none" src="img/polygon-1-dashboard.svg" alt="" aria-hidden="true" />
        <img className="absolute bottom-0 right-0 w-[303px] h-[113px] pointer-events-none" src="img/polygon-2-dashboard.svg" alt="" aria-hidden="true" />
        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] z-10">
          <div className="flex items-center justify-center gap-4 px-3.5 py-2 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-20 h-20 items-center justify-center gap-2.5 p-4 relative rounded-[20px] aspect-[1] [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)]">
              <img className="relative self-stretch w-full aspect-[1.03]" src="img/logo-edumanager.svg" alt="" aria-hidden="true" />
            </div>
            <h1 className="relative flex items-center justify-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-7xl text-center tracking-[-3.60px] leading-[72px] whitespace-nowrap">
              Edukasi Manager
            </h1>
          </div>
          <p className="relative flex items-center justify-center w-[542px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base text-center tracking-[0] leading-[normal]">
            Kelola artikel edukasi phishing — tambah, edit, dan hapus konten untuk membantu pengguna mengenali ancaman digital.
          </p>
        </div>
      </header>

      <section className="flex flex-col items-start gap-8 p-12 relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)]">
        <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-2xl tracking-[0] leading-[normal] whitespace-nowrap">
            Artikel
          </h2>
          <div className="flex-1 h-px bg-[rgba(26,28,28,1)] opacity-20" />
        </div>

        <ArticleFilter query={query} onQuery={setQuery} category={category} onCategory={setCategory} categories={["Tips", "Modus", "Update Kasus"]} />

        {isLoading ? (
          <div className="flex flex-col justify-center items-center w-full py-16 gap-4">
             <svg className="animate-spin w-8 h-8 text-[#6F0000]" viewBox="0 0 24 24" fill="none">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
             </svg>
             <p className="font-bold animate-pulse text-[#1c1c1c]">Memuat artikel...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center w-full py-16 text-red-600 font-bold">
            {error}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filtered.map((article) => (
              <ArticleCardAdmin
                key={article.id}
                article={article}
                onClick={() => onViewArticle?.(article)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-16 gap-3">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-30">
              <circle cx="21" cy="21" r="14" stroke="rgba(119,119,119,1)" strokeWidth="2"/>
              <path d="M31 31L43 43" stroke="rgba(119,119,119,1)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-[rgba(119,119,119,1)] text-center">
              Tidak ada artikel yang cocok dengan pencarian "<strong>{query}</strong>"
            </p>
            <button onClick={() => { setQuery(""); setCategory(""); }} className="text-sm text-[rgba(255,0,0,1)] hover:underline cursor-pointer">
              Reset filter
            </button>
          </div>
        )}

        <p className="[font-family:'Helvetica_Light-Regular',Helvetica] text-sm text-[rgba(119,119,119,1)]">
          Menampilkan {filtered.length} dari {articles.length} artikel
        </p>
      </section>

      <button onClick={onAddArticle} className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-[10px] shadow-[0px_4px_16px_#00000040] [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1V15M1 8H15" stroke="rgba(249,249,249,1)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(249,249,249,1)] text-base tracking-[-0.35px] leading-5 whitespace-nowrap">
          Tambah Artikel Baru
        </span>
      </button>
    </div>
  );
}

function ArticleCardAdmin({ article, onClick }) {
  return (
    <div className="relative group cursor-pointer h-full flex flex-col" onClick={onClick}>
      <ArticleCard
        category={article.kategori_artikel || article.category}
        title={article.judul || article.title}
        excerpt={article.rangkuman || article.excerpt}
        readTime="3 Menit"
        imageSrc={article.gambar || article.imageSrc}
        className="h-full" 
      />
      <div className="absolute inset-0 rounded-[10px] bg-[rgba(26,28,28,0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-end justify-end p-3">
        <span className="text-xs [font-family:'Helvetica_Neue-Regular',Helvetica] bg-[rgba(26,28,28,0.8)] text-white px-2 py-1 rounded-[5px]">
          Klik untuk melihat
        </span>
      </div>
    </div>
  );
}