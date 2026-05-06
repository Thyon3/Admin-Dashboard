"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={280} />
});

export default function RevenueAttributionPage() {
  const [range, setRange] = useState("30d");
  const ranges = ["7d", "30d", "90d", "1y"];

  const areaOptions: any = {
    chart: { type: "area", toolbar: { show: false }, fontFamily: "Outfit, sans-serif", zoom: { enabled: false } },
    stroke: { curve: "smooth", width: 2.5 },
    dataLabels: { enabled: false },
    fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    colors: ["#465fff", "#10b981"],
    xaxis: { categories: ["Apr 5","Apr 10","Apr 15","Apr 20","Apr 25","May 1","May 5"], labels: { style: { colors: "#9ca3af", fontSize: "10px" } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: "#9ca3af" }, formatter: (v: number) => `$${v}k` } },
    grid: { borderColor: "rgba(156,163,175,0.08)" },
    legend: { position: "top" as const, horizontalAlign: "right" as const, markers: { radius: 12 }, fontSize: "12px" },
    tooltip: { theme: "dark" },
  };

  const barOptions: any = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "Outfit, sans-serif" },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    colors: ["#465fff"],
    xaxis: { categories: ["Direct","Organic","Social","Email","Paid","Affiliate"], labels: { style: { colors: "#9ca3af", fontSize: "10px" } } },
    grid: { borderColor: "rgba(156,163,175,0.08)" },
    tooltip: { theme: "dark" },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Intelligence / Analytics</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Revenue Attribution</h1>
          <p className="text-gray-500 mt-1 text-sm hidden sm:block">Multi-touch attribution across all channels</p>
        </div>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 self-start sm:self-auto">
          {ranges.map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${range === r ? "bg-white dark:bg-gray-900 shadow-sm text-brand-500" : "text-gray-500"}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Revenue", value: "$284,400", delta: "+14.2%" },
          { label: "Revenue/Day", value: "$9,480", delta: "+8.4%" },
          { label: "Top Channel", value: "Organic", delta: "38% share" },
          { label: "ROAS", value: "4.8x", delta: "+0.3x" },
        ].map(k => (
          <div key={k.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{k.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{k.value}</p>
            <span className="text-xs font-bold text-emerald-500 mt-1 block">{k.delta}</span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Revenue vs Target</h3>
        <p className="text-xs text-gray-400 mb-4">Daily revenue against monthly target run-rate</p>
        <Chart options={areaOptions} series={[
          { name: "Actual Revenue", data: [42,58,51,67,62,78,84] },
          { name: "Target", data: [55,55,55,70,70,70,70] }
        ]} type="area" height={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Revenue by Channel</h3>
          <p className="text-xs text-gray-400 mb-4">First-touch attribution</p>
          <Chart options={barOptions} series={[{ name: "Revenue ($k)", data: [48,92,38,62,44,28] }]} type="bar" height={200} />
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Top Revenue Drivers</h3>
          <div className="space-y-4">
            {[
              { name: "Carbon Frame XR-7", revenue: "$142,800", pct: 90, img: "🚲" },
              { name: "Ultra-Light Runner Pro", revenue: "$84,200", pct: 68, img: "👟" },
              { name: "Summit Jacket Pro", revenue: "$52,400", pct: 42, img: "🧥" },
              { name: "Trail Blazer Pack", revenue: "$31,600", pct: 28, img: "🎒" },
              { name: "Hydro Flask Elite", revenue: "$18,800", pct: 15, img: "🥤" },
            ].map(p => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">{p.img}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{p.name}</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-500 ml-2 flex-shrink-0">{p.revenue}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-brand-500 transition-all duration-1000" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
