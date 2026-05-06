"use client";
import React from "react";
import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={260} />
});

const cohorts = [
  { month: "Jan 2026", n: 840, d30: "$284", d90: "$612", d180: "$980", d365: "$1,840", ret: "78%" },
  { month: "Feb 2026", n: 920, d30: "$310", d90: "$640", d180: "$1,020", d365: "—", ret: "81%" },
  { month: "Mar 2026", n: 1080, d30: "$298", d90: "$628", d180: "—", d365: "—", ret: "76%" },
  { month: "Apr 2026", n: 960, d30: "$322", d90: "—", d180: "—", d365: "—", ret: "83%" },
  { month: "May 2026", n: 482, d30: "—", d90: "—", d180: "—", d365: "—", ret: "—" },
];

const heatData = [
  [8,12,18,24,32,28,22],[6,10,15,20,28,24,18],[4,8,12,16,22,20,15],
  [2,6,10,13,18,16,12],[1,3,6,9,14,12,9],[0,2,4,6,10,9,7],[0,1,2,4,7,6,5],
];
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const hours = ["6am","9am","12pm","3pm","6pm","9pm","12am"];
const maxHeat = 32;

export default function LTVPage() {
  const areaOpts: any = {
    chart: { type: "area", toolbar: { show: false }, fontFamily: "Outfit, sans-serif", zoom: { enabled: false } },
    stroke: { curve: "smooth", width: 3 },
    dataLabels: { enabled: false },
    fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0.05 } },
    colors: ["#8b5cf6", "#465fff", "#10b981"],
    xaxis: { categories: ["Mo 1","Mo 2","Mo 3","Mo 4","Mo 5","Mo 6","Mo 12"], labels: { style: { colors: "#9ca3af", fontSize: "11px" } }, axisBorder: { show: false } },
    yaxis: { labels: { style: { colors: "#9ca3af" }, formatter: (v: number) => `$${v}` } },
    grid: { borderColor: "rgba(156,163,175,0.08)" },
    legend: { position: "top" as const, horizontalAlign: "right" as const, markers: { radius: 12 }, fontSize: "12px" },
    tooltip: { theme: "dark" },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-1">Intelligence / Analytics</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Customer Lifetime Value</h1>
        <p className="text-gray-500 mt-1 text-sm">Cohort analysis and long-term revenue projections</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg. LTV (All)", value: "$1,840", delta: "+12%", color: "text-violet-500 bg-violet-50 dark:bg-violet-900/20" },
          { label: "Avg. LTV (Platinum)", value: "$12,480", delta: "+18%", color: "text-brand-500 bg-brand-50 dark:bg-brand-900/20" },
          { label: "Predicted LTV (12mo)", value: "$2,240", delta: "+8.5%", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Payback Period", value: "4.2 mo", delta: "-0.3mo", color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
        ].map(k => (
          <div key={k.label} className={`${k.color} rounded-2xl p-5`}>
            <p className="text-2xl font-bold">{k.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-70">{k.label}</p>
            <p className="text-xs font-bold mt-1 opacity-60">{k.delta} vs last period</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">LTV Growth Curves by Segment</h3>
        <p className="text-xs text-gray-400 mb-4">Cumulative avg. revenue per customer by month since acquisition</p>
        <Chart options={areaOpts} series={[
          { name: "Platinum Tier", data: [284,612,980,1240,1520,1720,1840] },
          { name: "Gold Tier", data: [210,440,700,880,1050,1180,1260] },
          { name: "Silver Tier", data: [140,280,420,540,640,720,760] },
        ]} type="area" height={260} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Purchase Activity Heatmap</h3>
          <p className="text-xs text-gray-400 mb-5">Orders by day of week & time of day</p>
          <div className="space-y-1.5">
            {heatData.map((row, hi) => (
              <div key={hi} className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-gray-400 w-8 flex-shrink-0 text-right">{hours[hi]}</span>
                <div className="flex gap-1.5 flex-1">
                  {row.map((val, di) => (
                    <div key={di} title={`${days[di]} ${hours[hi]}: ${val} orders`}
                      className="flex-1 h-7 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                      style={{ background: `rgba(70,95,255,${0.06 + (val/maxHeat)*0.94})` }}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-8 flex-shrink-0" />
              <div className="flex gap-1.5 flex-1">
                {days.map(d => <span key={d} className="flex-1 text-[10px] font-bold text-gray-400 text-center">{d}</span>)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-[10px] text-gray-400">Low</span>
            <div className="flex gap-1">
              {[0.06,0.25,0.45,0.65,0.85,1].map(o => (
                <div key={o} className="w-5 h-3 rounded" style={{ background: `rgba(70,95,255,${o})` }} />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">High</span>
          </div>
        </div>

        {/* Cohort Table */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Cohort LTV Table</h3>
          <p className="text-xs text-gray-400 mb-5">Avg. cumulative revenue per customer by acquisition month</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  {["Cohort","N","30d","90d","180d","365d","Retain"].map(h => (
                    <th key={h} className="text-left pb-3 pr-3 font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {cohorts.map(c => (
                  <tr key={c.month} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 font-bold text-gray-900 dark:text-white pr-3 whitespace-nowrap">{c.month}</td>
                    <td className="py-3 text-gray-500 pr-3">{c.n}</td>
                    {[c.d30,c.d90,c.d180,c.d365].map((v,i) => (
                      <td key={i} className={`py-3 pr-3 font-semibold ${v === "—" ? "text-gray-300 dark:text-gray-600" : "text-brand-500"}`}>{v}</td>
                    ))}
                    <td className={`py-3 font-bold ${c.ret === "—" ? "text-gray-300 dark:text-gray-600" : "text-emerald-500"}`}>{c.ret}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
