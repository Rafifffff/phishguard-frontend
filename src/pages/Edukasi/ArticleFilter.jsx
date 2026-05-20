export default function ArticleFilter({
  query,
  onQuery,
  category,
  onCategory,
  categories = [],
}) {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex flex-wrap items-center gap-3 sm:gap-6 px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-[rgba(249,249,249,1)] rounded-[10px] overflow-hidden border border-solid border-[rgba(119,119,119,1)] shadow-[inset_0px_4px_4px_#00000040]"
    >
      <div className="flex flex-col items-center justify-center gap-2.5 relative self-stretch aspect-[1] flex-shrink-0">
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H17M4 8H14M7 15H11" stroke="rgba(26,28,28,1)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="self-stretch w-px bg-[rgba(119,119,119,1)] opacity-40 hidden sm:block" />

      <div className="inline-flex items-center gap-2 relative self-stretch flex-[0_0_auto]">
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M1 1H17M1 8H11M1 15H7" stroke="rgba(26,28,28,1)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        <div className="relative inline-flex items-center gap-2.5 px-4 py-2 flex-[0_0_auto] bg-[rgba(249,249,249,1)] rounded-[5px] border border-solid border-[rgba(119,119,119,1)] shadow-[0px_4px_4px_#00000040]">
          <select
            value={category}
            onChange={(e) => onCategory(e.target.value)}
            className="appearance-none bg-transparent border-0 p-0 pr-5 [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] text-base tracking-[-0.35px] leading-5 whitespace-nowrap focus:outline-none cursor-pointer"
          >
            <option value="">Default</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <path d="M1 1L7 7L13 1" stroke="rgba(119,119,119,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="self-stretch w-px bg-[rgba(119,119,119,1)] opacity-40 hidden sm:block" />

      <label className="flex flex-col items-start gap-2.5 px-4 py-2 relative flex-1 grow min-w-[160px] bg-[rgba(249,249,249,1)] rounded-[5px] overflow-hidden border border-solid border-[rgba(119,119,119,1)] shadow-[0px_4px_4px_#00000040]">
        <span className="sr-only">Cari artikel</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Cari artikel ..."
          className="w-full bg-transparent border-0 p-0 [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(26,28,28,1)] placeholder:text-[rgba(119,119,119,1)] text-base tracking-[0] leading-[normal] focus:outline-none"
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[5px] shadow-[0px_4px_4px_#00000040] [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)] cursor-pointer hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
      >
        <span className="relative flex items-center w-fit [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-[rgba(249,249,249,1)] text-base tracking-[-0.35px] leading-5 whitespace-nowrap">
          Search
        </span>
      </button>
    </form>
  );
}