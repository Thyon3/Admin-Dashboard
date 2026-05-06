"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={200} />
});

const collections = [
  { id: "COL-001", name: "Summer Essentials 2026", products: 48, revenue: "$84,200", status: "Published", type: "Automated", lastUpdated: "May 5", image: "☀️" },
  { id: "COL-002", name: "Carbon Series — Premium", products: 12, revenue: "$142,800", status: "Published", type: "Manual", lastUpdated: "May 4", image: "🏆" },
  { id: "COL-003", name: "New Arrivals — May", products: 24, revenue: "$28,400", status: "Published", type: "Automated", lastUpdated: "May 1", image: "✨" },
  { id: "COL-004", name: "Flash Sale — Weekend", products: 30, revenue: "—", status: "Scheduled", type: "Manual", lastUpdated: "May 5", image: "⚡" },
  { id: "COL-005", name: "Clearance — Winter Stock", products: 92, revenue: "$31,600", status: "Published", type: "Automated", lastUpdated: "Apr 20", image: "❄️" },
];

const statusStyle: Record<string, string> = {
  Published: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Scheduled:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Draft:      "bg-gray-100 text-gray-500 dark:bg-gray-800",
};

const typeStyle: Record<string, string> = {
  Automated: "bg-violet-100 text-violet-600",
  Manual:    "bg-amber-100 text-amber-600",
};

export default function CollectionsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const perfOptions: any = {
    chart: { type: "area", toolbar: { show: false }, sparkline: { enabled: false }, fontFamily: "Outfit, sans-serif" },
    stroke: { curve: "smooth", width: 3 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    colors: ["#465fff"],
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"], labels: { style: { colors: "#9ca3af", fontSize: "11px" } } },
    yaxis: { labels: { style: { colors: "#9ca3af" }, formatter: (v: number) => `$${v}k` } },
    grid: { borderColor: "rgba(156,163,175,0.08)" },
    tooltip: { theme: "dark" },
    dataLabels: { enabled: false },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Operations / Catalog</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dynamic Collections</h1>
          <p className="text-gray-500 mt-1 text-sm">5 collections · 206 products · $287K total revenue</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
            {(["grid", "list"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === v ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}>{v === "grid" ? "Grid" : "List"}</button>
            ))}
          </div>
          <button className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30">+ New Collection</button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Collection Revenue Trend</h3>
            <p className="text-xs text-gray-400 mt-0.5">All collections combined, last 5 months</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-xs font-bold rounded-full">+18% this month</span>
        </div>
        <Chart options={perfOptions} series={[{ name: "Revenue", data: [42, 58, 67, 72, 84] }]} type="area" height={200} />
      </div>

      {/* Grid or List */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map(c => (
            <div key={c.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-2xl">{c.image}</div>
                <div className="flex gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${typeStyle[c.type]}`}>{c.type}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusStyle[c.status]}`}>{c.status}</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors">{c.name}</h3>
              <div className="flex gap-4 mt-3">
                <div>
                  <p className="text-xs text-gray-400">Products</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{c.products}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Revenue</p>
                  <p className="text-lg font-bold text-emerald-500">{c.revenue}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Updated {c.lastUpdated}</span>
                <button className="text-xs font-bold text-brand-500 opacity-0 group-hover:opacity-100 transition-all">Edit →</button>
              </div>
            </div>
          ))}
          {/* New Collection Card */}
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-brand-400 transition-all cursor-pointer group min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20 flex items-center justify-center text-gray-400 group-hover:text-brand-500 transition-all text-2xl mb-3">+</div>
            <p className="text-sm font-bold text-gray-400 group-hover:text-brand-500 transition-colors">Create New Collection</p>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800">
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Collection</th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Type</th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Products</th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {collections.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg">{c.image}</div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${typeStyle[c.type]}`}>{c.type}</span></td>
                  <td className="px-6 py-4 hidden md:table-cell text-sm font-semibold text-gray-700 dark:text-gray-300">{c.products}</td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-500">{c.revenue}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${statusStyle[c.status]}`}>{c.status}</span></td>
                  <td className="px-6 py-4"><button className="opacity-0 group-hover:opacity-100 text-xs font-bold text-brand-500 hover:underline transition-all">Edit →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
