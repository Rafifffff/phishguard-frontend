import { useState, useEffect } from "react";
import "./styles/globals.css";
import "./styles/styleguide.css";

import Header              from "./components/layout/Header"; 
import Footer              from "./components/layout/Footer"; 

import UserHomepage        from "./pages/Home/UserHomepage";
import MessageCheckerPage  from "./pages/MessageChecker/MessageCheckerPage";
import AnalysisResultPage  from "./pages/MessageChecker/AnalysisResultPage";
import LaporPage           from "./pages/Lapor/LaporPage";
import LaporSuccessPage    from "./pages/Lapor/LaporSuccessPage";
import EdukasiPage         from "./pages/Edukasi/EdukasiPage";
import ArticleDetailPage   from "./pages/Edukasi/ArticleDetailPage";
import UserTicketDetailPage from "./pages/Lapor/UserTicketDetailPage"; 

import AdminLayout         from "./pages/Admin/layout/AdminLayout";
import AdminLoginPage      from "./pages/Admin/AdminLoginPage"; 
import DashboardPage       from "./pages/Admin/Dashboard/DashboardPage";
import TriagePage          from "./pages/Admin/Triage/TriagePage"; 
import EduManagerPage      from "./pages/Admin/EduManager/EduManagerPage";
import ArticleFormPage     from "./pages/Admin/EduManager/ArticleFormPage";
import ArticleAdminDetailPage from "./pages/Admin/EduManager/ArticleAdminDetailPage";

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => localStorage.getItem("pg_isAdminLoggedIn") === "true");
  const [selectedTicketId, setSelectedTicketId] = useState(() => localStorage.getItem("pg_selectedTicketId") || null);
  const [adminSelectedArticle, setAdminSelectedArticle] = useState(() => {
    const saved = localStorage.getItem("pg_adminSelectedArticle");
    return saved ? JSON.parse(saved) : null;
  });
  const [laporData, setLaporData] = useState(null);

  const [initialCheckMessage, setInitialCheckMessage] = useState("");
  const [analysisData, setAnalysisData] = useState(null);

  const [currentPage, setCurrentPage] = useState("beranda");
  const [adminActivePage, setAdminActivePage] = useState("dashboard");

  useEffect(() => { localStorage.setItem("pg_isAdminLoggedIn", isAdminLoggedIn); }, [isAdminLoggedIn]);
  useEffect(() => { localStorage.setItem("pg_selectedTicketId", selectedTicketId || ""); }, [selectedTicketId]);
  useEffect(() => { 
    if (adminSelectedArticle) localStorage.setItem("pg_adminSelectedArticle", JSON.stringify(adminSelectedArticle));
    else localStorage.removeItem("pg_adminSelectedArticle");
  }, [adminSelectedArticle]);

  useEffect(() => {
    const syncStateWithHash = () => {
      const hash = window.location.hash.replace("#", "");
      
      if (!hash) {
        window.location.hash = "beranda";
      } else if (hash.startsWith("admin/")) {
        setCurrentPage("admin");
        setAdminActivePage(hash.replace("admin/", ""));
      } else if (hash === "admin") {
        setCurrentPage("admin");
        setAdminActivePage("dashboard");
      } else {
        setCurrentPage(hash);
      }
    };

    syncStateWithHash();
    window.addEventListener("hashchange", syncStateWithHash);
    return () => window.removeEventListener("hashchange", syncStateWithHash);
  }, []);

  const handleNavigation = (halamanBaru) => {
    window.location.hash = halamanBaru;
    window.scrollTo(0, 0);
  };

  const handleAdminNavigation = (halamanBaru) => {
    window.location.hash = `admin/${halamanBaru}`;
    window.scrollTo(0, 0);
  };

  const handleViewTicket = (ticketOrId) => {
    const id = typeof ticketOrId === "object" && ticketOrId !== null ? ticketOrId.id : ticketOrId;
    setSelectedTicketId(id);
    handleNavigation("ticket-detail");
  };

  const handleLaporSuccess = (formData) => {
    setLaporData(formData);
    handleNavigation("lapor-sukses"); 
  };

  const handleAdminLogin = async ({ username, password }) => {
    if (username === "admin" && password === "admin123") {
      setIsAdminLoggedIn(true);
      handleAdminNavigation("dashboard"); 
    } else {
      throw new Error("Kredensial tidak valid");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);       
    localStorage.removeItem("pg_adminSelectedArticle");
    handleNavigation("beranda");     
  };

  if (currentPage === "admin") {
    if (!isAdminLoggedIn) {
      return <AdminLoginPage onLogin={handleAdminLogin} onReturnHome={() => handleNavigation("beranda")} />;
    }

    return (
      <div className="w-full overflow-x-auto min-h-screen bg-[#f0f0f0]">
        <AdminLayout activePage={adminActivePage} setActivePage={handleAdminNavigation} onLogout={handleAdminLogout}>
          {adminActivePage === "dashboard" && <DashboardPage />}
          {adminActivePage === "triage" && <TriagePage />}
          {adminActivePage === "edu" && (
            <EduManagerPage 
              onAddArticle={() => handleAdminNavigation("edu-add")}
              onViewArticle={(article) => {
                setAdminSelectedArticle(article);
                handleAdminNavigation("edu-detail");
              }}
            />
          )}
          {adminActivePage === "edu-detail" && (
            <ArticleAdminDetailPage 
              article={adminSelectedArticle}
              onBack={() => handleAdminNavigation("edu")}
              onEdit={() => handleAdminNavigation("edu-edit")} 
            />
          )}
          {adminActivePage === "edu-add" && (
            <ArticleFormPage 
              mode="tambah"
              onBack={() => handleAdminNavigation("edu")}
              onSubmit={(data) => {
                alert("Artikel ditambahkan (Simulasi)"); handleAdminNavigation("edu");
              }}
            />
          )}
          {adminActivePage === "edu-edit" && (
            <ArticleFormPage 
              mode="edit"
              initialData={adminSelectedArticle}
              onBack={() => handleAdminNavigation("edu-detail")} 
              onSubmit={(data) => {
                alert("Artikel diedit (Simulasi)"); handleAdminNavigation("edu-detail");
              }}
              onDelete={() => {
                alert("Artikel dihapus (Simulasi)"); handleAdminNavigation("edu");
              }}
            />
          )}
        </AdminLayout>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header activePage={currentPage} onNavigate={handleNavigation} />
      <main className="flex-grow">
        
        {currentPage === "beranda" && (
          <UserHomepage 
            onNavigate={handleNavigation} 
            onViewTicket={handleViewTicket} 
            onCheck={(msg) => {
              setInitialCheckMessage(msg);
              handleNavigation("message-checker");
            }}
          />
        )}
        
        {currentPage === "message-checker" && (
          <MessageCheckerPage 
            initialMessage={initialCheckMessage} 
            onNavigate={handleNavigation}
            onSubmitCheck={(formData) => {
              setAnalysisData({
                 channel: formData.channel || "-",
                 sender: formData.sender || "-",
                 url: formData.url || "-",
                 message: formData.message,
                 score: 90,
                 verdict: "PENIPUAN (Phishing)",
                 isPhishing: true,
                 indicators: ["Urgensi tinggi", "Mengarahkan ke link eksternal"],
                 urlDomain: formData.url ? "domain-mencurigakan.com" : "-",
                 urlStatus: formData.url ? "Tidak terverifikasi / mencurigakan" : "-"
              });
              handleNavigation("result");
            }}
          />
        )}
        
        {currentPage === "result"          && <AnalysisResultPage result={analysisData} onNavigate={handleNavigation} />} 
        {currentPage === "lapor"           && <LaporPage onSuccess={handleLaporSuccess} />}
        {currentPage === "lapor-sukses"    && <LaporSuccessPage nama={laporData?.nama} kontak={laporData?.kontak} onBackToHome={() => handleNavigation("beranda")} onViewTicket={handleViewTicket} />}  
        {currentPage === "edukasi"         && <EdukasiPage />}
        {currentPage === "artikel"         && <ArticleDetailPage onBack={() => handleNavigation("edukasi")} />}
        {currentPage === "ticket-detail"   && <UserTicketDetailPage ticketId={selectedTicketId} onBack={() => handleNavigation("beranda")} />}
        
      </main>
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}