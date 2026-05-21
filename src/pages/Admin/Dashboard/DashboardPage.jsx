import { useEffect, useState } from "react";
import StatCards from "./StatCards";
import LineChart from "./LineChart";
import DonutChart from "./DonutChart";
import LatestTicketsTable from "./LatestTicketsTable";
import { getReports, getWeeklyTrend, getTopChannel, getResponses } from "../../../services/api";

export default function DashboardPage() {
  const [reports, setReports] = useState([]);
  const [weeklyTrend, setWeeklyTrend] = useState([]);
  const [topChannel, setTopChannel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      let actualReports = [];
      try {
        const [reportsRes, responsesRes] = await Promise.all([
          getReports(),
          getResponses()
        ]);
        actualReports = reportsRes?.data || reportsRes || [];
        const actualResponses = responsesRes?.data || responsesRes || [];

        // Stitch responses into reports because backend does not eager load admin_actions
        actualReports = actualReports.map(report => {
          const reportResponses = actualResponses.filter(res => res.report_id === report.id);
          reportResponses.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          return {
            ...report,
            admin_actions: reportResponses
          };
        });

        setReports(actualReports);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }

      try {
        const trendRes = await getWeeklyTrend();
        const actualTrend = trendRes?.data || trendRes || [];
        if (actualTrend.length > 0) {
          setWeeklyTrend(actualTrend);
        } else {
          throw new Error("Empty trend");
        }
      } catch (err) {
        console.warn("Computing weekly trend locally");
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const counts = { "Senin": 0, "Selasa": 0, "Rabu": 0, "Kamis": 0, "Jumat": 0, "Sabtu": 0, "Minggu": 0 };
        actualReports.forEach(r => {
          if (r.created_at) {
            const dayName = days[new Date(r.created_at).getDay()];
            counts[dayName]++;
          }
        });
        setWeeklyTrend([
          { day: "Senin", total: counts["Senin"] },
          { day: "Selasa", total: counts["Selasa"] },
          { day: "Rabu", total: counts["Rabu"] },
          { day: "Kamis", total: counts["Kamis"] },
          { day: "Jumat", total: counts["Jumat"] },
          { day: "Sabtu", total: counts["Sabtu"] },
          { day: "Minggu", total: counts["Minggu"] },
        ]);
      }

      try {
        const channelRes = await getTopChannel();
        const actualChannel = channelRes?.data || channelRes || [];
        if (actualChannel.length > 0) {
          setTopChannel(actualChannel);
        } else {
          throw new Error("Empty top channel");
        }
      } catch (err) {
        console.warn("Computing top channel locally");
        const channelCounts = {};
        actualReports.forEach(r => {
          const ch = r.channel_chat || "Lainnya";
          channelCounts[ch] = (channelCounts[ch] || 0) + 1;
        });
        const computedTopChannel = Object.entries(channelCounts)
          .map(([name, value]) => ({ channel_chat: name, total: value }))
          .sort((a, b) => b.total - a.total);
        setTopChannel(computedTopChannel);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  const today = new Date().toDateString();
  const laporanHariIni = reports.filter(r => new Date(r.created_at).toDateString() === today).length;
  const belumDitangani = reports.filter(r => !r.admin_actions || r.admin_actions.length === 0).length;
  const sedangDiproses = reports.filter(r => {
    if (!r.admin_actions || r.admin_actions.length === 0) return false;
    const lastAction = r.admin_actions[r.admin_actions.length - 1];
    const isClosed = lastAction.hasil_keputusan === "Confirm Valid Phishing" || 
                     lastAction.hasil_keputusan === "False Positive" || 
                     lastAction.selesaikanTiket || 
                     lastAction.selesaikan_tiket;
    return !isClosed;
  }).length;

  const selesaiMingguIni = reports.filter(r => {
    if (!r.admin_actions || r.admin_actions.length === 0) return false;
    const lastAction = r.admin_actions[r.admin_actions.length - 1];
    const isClosed = lastAction.hasil_keputusan === "Confirm Valid Phishing" || 
                     lastAction.hasil_keputusan === "False Positive" || 
                     lastAction.selesaikanTiket || 
                     lastAction.selesaikan_tiket;
    return isClosed;
  }).length;

  const stats = { laporanHariIni, belumDitangani, sedangDiproses, selesaiMingguIni };

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

      <StatCards stats={stats} />

      <section className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]" aria-label="Dashboard charts">
        <LineChart data={weeklyTrend} />
        <DonutChart data={topChannel} />
      </section>

      <LatestTicketsTable reports={reports} />
    </>
  );
}