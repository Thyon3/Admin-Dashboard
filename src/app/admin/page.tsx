"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={220} />
});

const areaOpts: any = {
  chart: { type: "area", toolbar: { show: false }, fontFamily: "Outfit, sans-serif", zoom: { enabled: false } },
  stroke: { curve: "smooth", width: 2.5 },
  dataLabels: { enabled: false },
  fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
  colors: ["#465fff", "#10b981"],
  xaxis: { categories: ["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"], labels: { style: { colors: "#9ca3af", fontSize: "10px" } }, axisBorder: { show: false } },
  yaxis: { labels: { style: { colors: "#9ca3af" }, formatter: (v: number) => `$${v}k` } },
  grid: { borderColor: "rgba(156,163,175,0.08)" },
  legend: { position: "top" as const, horizontalAlign: "right" as const, markers: { radius: 12 }, fontSize: "12px" },
  tooltip: { theme: "dark" },
};

const kpis = [
  { label: "Global Revenue", value: "$2.4M", delta: "+14.2%", up: true, chart: [30,42,38,55,48,62,70,84] },
  { label: "Avg. Order Value", value: "$184.20", delta: "+3.1%", up: true, chart: [120,130,125,138,145,150,160,175] },
  { label: "Churn Rate", value: "1.24%", delta: "-0.8%", up: false, chart: [3.2,2.8,3.0,2.6,2.2,1.8,1.5,1.24] },
  { label: "Active Funnels", value: "12", delta: "Stable", up: true, chart: [8,9,10,9,11,10,12,12] },
];

const sparkOpts: any = {
  chart: { sparkline: { enabled: true } },
  stroke: { curve: "smooth", width: 2 },
  fill: { type: "gradient", gradient: { opacityFrom: 0.3, opacityTo: 0 } },
  tooltip: { enabled: false },
};

const channels = [
  { label: "Direct", value: 45, color: "bg-brand-500" },
  { label: "Organic Search", value: 25, color: "bg-emerald-500" },
  { label: "Social Media", value: 20, color: "bg-amber-500" },
  { label: "Referral", value: 10, color: "bg-rose-500" },
];

const salesLog = [
  { id: "#98142", time: "2 mins ago", amount: "+$249", status: "Paid", avatar: "AW", color: "bg-violet-500" },
  { id: "#98141", time: "8 mins ago", amount: "+$1,299", status: "Paid", avatar: "YT", color: "bg-amber-500" },
  { id: "#98140", time: "15 mins ago", amount: "+$89", status: "Paid", avatar: "MC", color: "bg-blue-500" },
];

export default function PulseDashboard() {
  const { preferences } = useUserPreferences();
  const isCompact = preferences.appearance.compactMode;

  return (
    <div className={`space-y-5 sm:space-y-6`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className={`${isCompact ? "text-xl" : "text-2xl sm:text-3xl"} font-bold text-gray-900 dark:text-white tracking-tight`}>
            Intelligence <span className="text-gray-400 font-normal text-lg sm:text-2xl">/ Pulse</span>
          </h1>
          {!isCompact && <p className="text-gray-500 mt-1 text-sm">Real-time system health and commercial performance.</p>}
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold ring-1 ring-emerald-500/20">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            LIVE
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((k, i) => (
          <div key={k.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{k.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{k.value}</p>
            <span className={`text-[10px] sm:text-xs font-bold mt-1 block ${k.up ? "text-emerald-500" : "text-red-400"}`}>{k.delta}</span>
            <div className="absolute bottom-0 left-0 right-0 h-12 opacity-40">
              <Chart options={{ ...sparkOpts, colors: [k.up ? "#10b981" : "#ef4444"] }} series={[{ data: k.chart }]} type="area" height="100%" width="100%" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart + Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Revenue vs Expenses</h3>
            <span className="self-start sm:self-auto px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-xs font-bold rounded-full">↑ 14% YoY</span>
          </div>
          <Chart options={areaOpts} series={[
            { name: "Revenue", data: [42,58,72,65,80,88,78,95] },
            { name: "Expenses", data: [28,35,40,38,45,50,44,52] },
          ]} type="area" height={isCompact ? 180 : 220} />
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Traffic Attribution</h3>
          <div className="space-y-4">
            {channels.map(c => (
              <div key={c.label}>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-600 dark:text-gray-400">{c.label}</span>
                  <span className="text-gray-500">{c.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Full Report →</button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-brand-500">84%</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Retention Rate</p>
            <div className="mt-4 h-2 w-32 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full w-[84%] bg-brand-500 rounded-full" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Real-time Sales Log</h3>
          <div className="space-y-3">
            {salesLog.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{s.avatar}</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Order {s.id}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{s.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-500">{s.amount}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{s.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
