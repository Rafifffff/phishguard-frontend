import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children, activePage, setActivePage, onLogout }) {
  return (
    <div className="flex h-screen min-w-[1440px] items-start relative bg-[var(--collection-1-background,#f0f0f0)] overflow-hidden">
      
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
      
      <main className="flex flex-col items-start gap-4 p-2 relative flex-1 grow h-screen overflow-y-auto bg-transparent">
        {children}
      </main>
    </div>
  );
}