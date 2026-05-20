import { useState } from "react";

export default function AdminLoginPage({ onLogin, onReturnHome }) {
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");
  const [remember,  setRemember]  = useState(false);
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [touched,   setTouched]   = useState(false);
  const [error,     setError]     = useState("");

  const isValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    setLoading(true);
    setError("");

    try {
      await new Promise((r) => setTimeout(r, 1200));
      
      await onLogin?.({ username, password, remember }); 
      
    } catch (err) {
      setError("Username atau password salah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-stretch overflow-hidden bg-[rgba(111,0,0,1)]">

      <img
        className="absolute left-0 top-0 z-[1] h-[303px] w-[370px] pointer-events-none"
        src="img/poligon-login-1.svg"
        alt=""
        aria-hidden="true"
      />
      <div className="absolute right-0 top-0 z-[1] hidden lg:flex h-full w-[752px] items-center justify-end pointer-events-none">
        
        <img
          className="relative h-full max-h-[810px] w-auto object-cover object-right"
          src="img/gambar-kerja.svg"
          alt="Ilustrasi Admin"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(111,0,0,1) 0%, rgba(111,0,0,0.85) 0%, rgba(111,0,0,0.3) 0%, rgba(111,0,0,0) 0%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(111,0,0,0.4) 0%, rgba(111,0,0,0) 20%, rgba(111,0,0,0) 80%, rgba(111,0,0,0.4) 100%)",
          }}
        />
      </div>

      <main
        className="relative z-10 flex w-full lg:max-w-[750px] min-h-screen items-center px-4 py-11 sm:px-8"
        aria-labelledby="admin-signin-heading"
      >
          <section className="relative flex w-full flex-col items-start gap-8 overflow-hidden rounded-[20px] px-6 py-20 shadow-[0px_8px_32px_#00000060] sm:px-12 lg:px-16"
            style={{ background: "rgba(249,249,249,0.97)", backdropFilter: "blur(12px)" }}
          >
          <div className="absolute inset-0 rounded-[20px] pointer-events-none opacity-[0.015]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
          />

          <header className="flex items-center gap-2.5 self-center">
            <img 
              src="img/logo-login.svg" 
              alt="Phishguard Logo" 
              className="w-[27px] h-[28px]" 
            />
            <span className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(255,0,0,1)] text-2xl tracking-[-1.20px] leading-8 whitespace-nowrap">
              Phishguard
            </span>
          </header>

          <div className="flex flex-col items-start gap-3 z-10 w-full">
            <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-base leading-[normal] tracking-[0] text-[rgba(26,28,28,1)]">
              <span>Welcome to </span>
              <span className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(111,0,0,1)]">
                PhishGuard Admin Dashboard
              </span>
            </p>
            <h1
              id="admin-signin-heading"
              className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[rgba(26,28,28,1)] text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-[-2.4px] sm:tracking-[-3px]"
            >
              Admin Sign in
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="relative flex w-full flex-col items-start gap-6 z-10" noValidate>
            
            {error && (
              <div className="w-full px-4 py-3 rounded-[8px] bg-red-50 border border-[rgba(255,0,0,0.3)] flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                  <circle cx="8" cy="8" r="7" stroke="rgba(255,0,0,1)" strokeWidth="1.5"/>
                  <path d="M8 5V8M8 11H8.01" stroke="rgba(255,0,0,1)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-sm text-[rgba(255,0,0,1)]">
                  {error}
                </span>
              </div>
            )}

            <div className="flex w-full flex-col items-start gap-2">
              <label htmlFor="username" className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-xl tracking-[-0.35px] leading-5">
                User name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your user name"
                className={`flex h-[42px] w-full rounded-[5px] border border-solid px-4 py-2 bg-[rgba(249,249,249,1)] [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-base text-[rgba(26,28,28,1)] placeholder:text-[rgba(119,119,119,1)] tracking-[-0.35px] leading-5 shadow-[inset_0px_4px_4px_#00000020] outline-none transition-all duration-200 focus:ring-2 focus:ring-[rgba(111,0,0,0.3)] focus:border-[rgba(111,0,0,1)] ${touched && !username.trim() ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,0.3)]" : "border-[rgba(119,119,119,1)]"}`}
              />
              {touched && !username.trim() && (
                <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-xs text-[rgba(255,0,0,1)]">Username wajib diisi.</p>
              )}
            </div>

            <div className="flex w-full flex-col items-start gap-2">
              <label htmlFor="password" className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-xl tracking-[-0.35px] leading-5">
                Password
              </label>
              <div className={`relative flex h-[42px] w-full items-center gap-2 rounded-[5px] border border-solid px-4 py-2 bg-[rgba(249,249,249,1)] shadow-[inset_0px_4px_4px_#00000020] transition-all duration-200 focus-within:ring-2 focus-within:ring-[rgba(111,0,0,0.3)] focus-within:border-[rgba(111,0,0,1)] ${touched && !password.trim() ? "border-[rgba(255,0,0,1)] ring-1 ring-[rgba(255,0,0,0.3)]" : "border-[rgba(119,119,119,1)]"}`}>
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="relative flex-1 bg-transparent outline-none [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-base text-[rgba(26,28,28,1)] placeholder:text-[rgba(119,119,119,1)] tracking-[-0.35px] leading-5"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"} className="flex-shrink-0 text-[rgba(119,119,119,1)] hover:text-[rgba(26,28,28,1)] transition-colors duration-200 cursor-pointer">
                  {showPass ? (
                    <svg width="21" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="21" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {touched && !password.trim() && (
                <p className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-xs text-[rgba(255,0,0,1)]">Password wajib diisi.</p>
              )}

              <div className="flex w-full items-center justify-between mt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex-shrink-0">
                    <input type="checkbox" name="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="sr-only peer" />
                    <div className="w-4 h-4 rounded-[3px] border border-solid border-[rgba(26,28,28,1)] bg-[rgba(249,249,249,1)] peer-checked:bg-[rgba(111,0,0,1)] peer-checked:border-[rgba(111,0,0,1)] transition-all duration-200 flex items-center justify-center">
                      {remember && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                  <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-xs text-[rgba(119,119,119,1)] group-hover:text-[rgba(26,28,28,1)] transition-colors">Remember me</span>
                </label>
                <button type="button" className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-xs text-[rgba(111,0,0,1)] hover:underline cursor-pointer">Forgot Password?</button>
              </div>
            </div>

            <div className="flex w-full items-center justify-end">
              <button type="submit" disabled={loading} className={`inline-flex items-center justify-center gap-2.5 rounded-[5px] px-6 py-2.5 shadow-[0px_4px_4px_#00000040] [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:opacity-100 transition-all duration-200 cursor-pointer ${loading ? "opacity-60 cursor-not-allowed" : ""}`}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="rgba(249,249,249,1)" strokeWidth="4"/>
                      <path className="opacity-75" fill="rgba(249,249,249,1)" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-base text-[rgba(249,249,249,1)] tracking-[-0.35px] leading-5">Signing in...</span>
                  </span>
                ) : (
                  <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-base text-[rgba(249,249,249,1)] tracking-[-0.35px] leading-5 whitespace-nowrap">Sign in</span>
                )}
              </button>
            </div>
          </form>

          <footer className="relative flex w-full items-center justify-center gap-1 z-10">
            <span className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-xs text-[rgba(119,119,119,1)]">Not an Admin?</span>
            <button type="button" onClick={onReturnHome} className="[font-family:'Helvetica_Neue-Regular',Helvetica] text-xs text-[rgba(111,0,0,1)] hover:underline cursor-pointer">Return to Home</button>
          </footer>
        </section>
      </main>
    </div>
  );
}