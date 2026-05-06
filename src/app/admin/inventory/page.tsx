"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={200} />
});

const inventory = [
  { id: "PROD-101", name: "Ultra-Light Runner Pro", category: "Footwear", vendor: "Velocity Sports", totalStock: 450, sku: "ULR-PRO-9-BLK", variants: 6, warehouse: "NY-East", reorder: 100, status: "Healthy" },
  { id: "PROD-202", name: "Carbon Frame XR-7", category: "Cycling", vendor: "Apex Gear", totalStock: 12, sku: "CFX-7-M-CARB", variants: 2, warehouse: "LA-West", reorder: 20, status: "Critical" },
  { id: "PROD-303", name: "Summit Jacket Pro", category: "Apparel", vendor: "Peak Wear", totalStock: 230, sku: "SJP-RED-L", variants: 8, warehouse: "EU-Central", reorder: 50, status: "Healthy" },
  { id: "PROD-404", name: "Hydro Flask Elite 32oz", category: "Accessories", vendor: "HF Corp", totalStock: 0, sku: "HFE-32-BLU", variants: 3, warehouse: "TX-South", reorder: 80, status: "Out" },
  { id: "PROD-505", name: "Trail Blazer Pack 40L", category: "Bags", vendor: "Nomad Gear", totalStock: 67, sku: "TBP-40-GRN", variants: 4, warehouse: "NY-East", reorder: 40, status: "Low" },
];

const statusStyle: Record<string, { bg: string; text: string; dot: string }> = {
  Healthy:  { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600", dot: "bg-emerald-500" },
  Low:      { bg: "bg-amber-50 dark:bg-amber-900/20",     text: "text-amber-600",   dot: "bg-amber-500" },
  Critical: { bg: "bg-red-50 dark:bg-red-900/20",         text: "text-red-600",     dot: "bg-red-500 animate-pulse" },
  Out:      { bg: "bg-gray-100 dark:bg-gray-800",          text: "text-gray-500",    dot: "bg-gray-400" },
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = inventory.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const stockOpts: any = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "Outfit, sans-serif" },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "55%", distributed: true } },
    dataLabels: { enabled: false },
    colors: ["#10b981","#f59e0b","#ef4444","#6b7280","#465fff"],
    legend: { show: false },
    xaxis: { categories: inventory.map(p => p.name.split(" ").slice(0,2).join(" ")), labels: { style: { colors: "#9ca3af", fontSize: "10px" }, rotate: -15 } },
    yaxis: { labels: { style: { colors: "#9ca3af" } } },
    grid: { borderColor: "rgba(156,163,175,0.08)" },
    tooltip: { theme: "dark" },
  };

  if (loading) return (
    <div className="space-y-4 sm:space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl" />)}
      </div>
      <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Operations / Catalog</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Inventory Matrix</h1>
          <p className="text-gray-500 mt-1 text-sm hidden sm:block">Managing 2,492 SKUs across 4 regional warehouses</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="px-3 sm:px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all">Sync</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total SKUs", value: "2,492", color: "text-brand-500 bg-brand-50 dark:bg-brand-900/20" },
          { label: "In Stock", value: "2,460", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Low / Critical", value: "24", color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
          { label: "Out of Stock", value: "8", color: "text-red-500 bg-red-50 dark:bg-red-900/20" },
        ].map(k => (
          <div key={k.label} className={`${k.color} rounded-2xl p-4 sm:p-5`}>
            <p className="text-xl sm:text-2xl font-bold">{k.value}</p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1 opacity-70">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Stock Level by Product</h3>
        <Chart options={stockOpts} series={[{ name: "Units", data: inventory.map(p => p.totalStock) }]} type="bar" height={200} />
      </div>

      {/* Search + Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative max-w-xs sm:max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inventory…" className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800">
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Warehouse</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:table-cell">Variants</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map(p => {
                const s = statusStyle[p.status];
                const stockPct = Math.min((p.totalStock / 500) * 100, 100);
                return (
                  <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                    <td className="px-4 sm:px-6 py-4">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{p.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">{p.sku}</p>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden md:table-cell text-sm text-gray-500">{p.warehouse}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${p.status === "Out" ? "text-gray-400" : p.status === "Critical" ? "text-red-500" : "text-gray-900 dark:text-white"}`}>{p.totalStock}</span>
                        <div className="hidden sm:block flex-1 min-w-[60px] max-w-[80px] h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.dot}`} style={{ width: `${stockPct}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell text-sm text-gray-500">{p.variants} SKUs</td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${s.bg} ${s.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />{p.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${isFilterOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${isFilterOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsFilterOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-white dark:bg-gray-900 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Advanced Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Stock Status</label>
              <div className="space-y-2">
                {["In Stock", "Low Stock", "Out of Stock", "Critical"].map(s => (
                  <label key={s} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 border-2 border-gray-200 dark:border-gray-700 rounded group-hover:border-brand-400 transition-colors" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{s}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Price Range</label>
              <input type="range" className="w-full accent-brand-500" min="0" max="5000" />
              <div className="flex justify-between mt-2 text-xs font-bold text-gray-400">$0 <span>$5,000</span></div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Warehouse Zone</label>
              <select className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20">
                <option>All Locations</option>
                <option>NY-East</option>
                <option>LA-West</option>
                <option>EU-Central</option>
                <option>TX-South</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {["Footwear","Cycling","Apparel","Accessories","Bags","Fitness"].map(c => (
                  <button key={c} className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-500 hover:border-brand-400 hover:text-brand-500 transition-all">{c}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <button className="w-full py-3 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20">Apply Filters</button>
            <button onClick={() => setIsFilterOpen(false)} className="w-full py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Clear All</button>
          </div>
        </div>
      </div>
    </div>
  );
}
