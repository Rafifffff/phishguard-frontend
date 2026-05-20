import { useState, useEffect, useMemo } from "react";
import ArticleCard   from "./ArticleCard";
import ArticleFilter from "./ArticleFilter";

const CATEGORIES = ["Tips", "Modus", "Update Kasus"];
const API_URL = "https://be-phisguard-production.up.railway.app/api/articles";

export default function ArticleGrid({ onRead }) {
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
        
        if (!response.ok) {
          throw new Error(`Gagal mengambil data! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const articlesData = Array.isArray(data) ? data : data.data || [];
        
        setArticles(articlesData);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Gagal memuat artikel dari server. Periksa koneksi internet Anda.");
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

      const matchCat  = category === "" || cat === category;
      const matchQ    = q === "" ||
        title.toLowerCase().includes(q) ||
        excerpt.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q);
        
      return matchCat && matchQ;
    });
  }, [articles, query, category]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-32 gap-4">
        <svg className="animate-spin w-8 h-8 text-[rgba(255,0,0,1)]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-lg text-[rgba(26,28,28,1)] animate-pulse">
          Mengambil data artikel...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-20 gap-4">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,0,0,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-lg text-[rgba(255,0,0,1)] text-center">
          {error}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-6 py-2 border-2 border-[rgba(255,0,0,1)] text-[rgba(255,0,0,1)] rounded-[5px] hover:bg-[rgba(255,0,0,0.1)] transition-colors cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">

      <ArticleFilter
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
        categories={CATEGORIES}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-0 sm:px-4 lg:px-16 w-full">
          {filtered.map((article) => (
            <ArticleCard
              key={article.id}
              category={article.kategori_artikel}
              title={article.judul}
              excerpt={article.rangkuman}
              readTime="3 menit" 
              imageSrc={article.gambar}
              onClick={() => onRead?.(article)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-16 gap-3">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
            <circle cx="21" cy="21" r="14" stroke="rgba(119,119,119,1)" strokeWidth="2"/>
            <path d="M31 31L43 43" stroke="rgba(119,119,119,1)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 21H26M21 16V26" stroke="rgba(119,119,119,1)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-base text-[rgba(119,119,119,1)] text-center">
            Tidak ada artikel yang cocok dengan pencarian "<strong>{query}</strong>"
          </p>
          <button
            onClick={() => { setQuery(""); setCategory(""); }}
            className="text-sm text-[rgba(255,0,0,1)] [font-family:'Helvetica_Neue-Regular',Helvetica] hover:underline cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      )}

      <p className="[font-family:'Helvetica_Light-Regular',Helvetica] text-sm text-[rgba(119,119,119,1)] px-0 sm:px-4 lg:px-16">
        Menampilkan {filtered.length} dari {articles.length} artikel
      </p>
    </div>
  );
}