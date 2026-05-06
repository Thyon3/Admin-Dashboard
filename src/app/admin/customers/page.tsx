"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={48} />
});

const customers = [
  { id: "C-8841", name: "Alexandra Winters", email: "alex.w@gmail.com", ltv: "$12,480", orders: 42, tier: "Platinum", location: "New York, US", status: "Active", avatar: "AW", color: "bg-violet-500" },
  { id: "C-8842", name: "Marcus Chen", email: "m.chen@outlook.com", ltv: "$8,920", orders: 31, tier: "Gold", location: "Toronto, CA", status: "Active", avatar: "MC", color: "bg-blue-500" },
  { id: "C-8843", name: "Sofia Reyes", email: "sofia.r@icloud.com", ltv: "$5,340", orders: 18, tier: "Silver", location: "Madrid, ES", status: "Active", avatar: "SR", color: "bg-emerald-500" },
  { id: "C-8844", name: "James O'Brien", email: "jobrien@corp.io", ltv: "$2,100", orders: 9, tier: "Bronze", location: "Dublin, IE", status: "Inactive", avatar: "JO", color: "bg-rose-500" },
  { id: "C-8845", name: "Yuki Tanaka", email: "y.tanaka@mail.jp", ltv: "$19,750", orders: 67, tier: "Platinum", location: "Tokyo, JP", status: "Active", avatar: "YT", color: "bg-amber-500" },
];

const tierStyle: Record<string, { bg: string; text: string }> = {
  Platinum: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
  Gold:     { bg: "bg-amber-100 dark:bg-amber-900/30",   text: "text-amber-600 dark:text-amber-400" },
  Silver:   { bg: "bg-gray-100 dark:bg-gray-800",         text: "text-gray-600 dark:text-gray-400" },
  Bronze:   { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400" },
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === "All" || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const sparkOpts: any = {
    chart: { sparkline: { enabled: true } },
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0 } },
    colors: ["#8b5cf6"],
    tooltip: { enabled: false },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Relationships</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Customer Profiles</h1>
          <p className="text-gray-500 mt-1 text-sm hidden sm:block">6,284 customers across 42 countries</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Export</button>
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all">+ Add</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Avg. LTV", value: "$9,232", data: [30,40,35,50,49,60,70,91] },
          { label: "Repeat Rate", value: "68.4%", data: [20,35,28,45,40,55,60] },
          { label: "Churn (30d)", value: "1.8%", data: [60,50,55,40,45,30,35] },
          { label: "New (30d)", value: "482", data: [10,15,12,18,20,28,35] },
        ].map(k => (
          <div key={k.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{k.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{k.value}</p>
            <div className="absolute bottom-0 left-0 right-0 h-12 opacity-50">
              <Chart options={sparkOpts} series={[{ data: k.data }]} type="area" height="100%" width="100%" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters — wrap on small screens */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers…" className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["All","Platinum","Gold","Silver","Bronze"].map(t => (
            <button key={t} onClick={() => setTierFilter(t)} className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all ${tierFilter === t ? "bg-brand-500 text-white shadow-md shadow-brand-500/30" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-brand-300"}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Table — scrollable on mobile */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left px-4 sm:px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="text-left px-4 sm:px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Tier</th>
                <th className="text-left px-4 sm:px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">Location</th>
                <th className="text-left px-4 sm:px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:table-cell">Orders</th>
                <th className="text-left px-4 sm:px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">LTV</th>
                <th className="text-left px-4 sm:px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map(c => {
                const ts = tierStyle[c.tier];
                return (
                  <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${c.color} flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0`}>{c.avatar}</div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{c.name}</p>
                          <p className="text-[11px] text-gray-400 truncate hidden sm:block">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${ts.bg} ${ts.text}`}>{c.tier}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden lg:table-cell text-sm text-gray-500">{c.location}</td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell text-sm font-semibold text-gray-700 dark:text-gray-300">{c.orders}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">{c.ltv}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${c.status === "Active" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`} />{c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
