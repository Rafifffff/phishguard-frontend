import StatCards from "./StatCards";
import LineChart from "./LineChart";
import DonutChart from "./DonutChart";
import LatestTicketsTable from "./LatestTicketsTable";

export default function DashboardPage() {
  return (
    <>
      <header className="gap-4 px-12 py-8 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] [background:linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,1)_100%)] bg-collection-1-secondary">
        
        <img className="absolute top-0 left-0 w-[461px] h-[200px]" src="img/polygon-1-dashboard.svg" alt="" aria-hidden="true" />
        
        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center justify-center gap-4 px-3.5 py-2 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-20 h-20 items-center justify-center gap-2.5 p-4 relative rounded-[20px] aspect-[1] [background:radial-gradient(50%_50%_at_95%_60%,rgba(119,119,119,1)_0%,rgba(74,74,74,1)_25%,rgba(28,28,28,1)_75%)]">
              <img className="relative self-stretch w-full aspect-[1]" src="img/logo-dashboard.svg" alt="" aria-hidden="true" />
            </div>
            <h1 className="relative flex items-center justify-center w-fit [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-collection-1-black text-7xl text-center tracking-[-3.60px] leading-[72px] whitespace-nowrap">
              Dashboard
            </h1>
          </div>
          <p className="relative flex items-center justify-center w-[542px] [font-family:'Helvetica_Light-Regular',Helvetica] font-normal text-collection-1-black text-base text-center tracking-[0] leading-[normal]">
            Pantau statistik pelaporan insiden, kelola tiket masuk, dan awasi keseluruhan aktivitas sistem PhishGuard secara real-time
          </p>
        </div>

        <img className="absolute bottom-0 right-0 w-[303px] h-[113px]" src="img/polygon-2-dashboard.svg" alt="" aria-hidden="true" />
        
      </header>

      <StatCards />

      <section className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]" aria-label="Dashboard charts">
        <LineChart />
        <DonutChart />
      </section>

      <LatestTicketsTable />
    </>
  );
}