"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const customers = [
  { id: "C-8841", name: "Alexandra Winters", email: "alex.w@gmail.com", ltv: "$12,480", orders: 42, tier: "Platinum", location: "New York, US", joined: "Jan 2023", status: "Active", avatar: "AW" },
  { id: "C-8842", name: "Marcus Chen", email: "m.chen@outlook.com", ltv: "$8,920", orders: 31, tier: "Gold", location: "Toronto, CA", joined: "Mar 2023", status: "Active", avatar: "MC" },
  { id: "C-8843", name: "Sofia Reyes", email: "sofia.r@icloud.com", ltv: "$5,340", orders: 18, tier: "Silver", location: "Madrid, ES", joined: "Jul 2023", status: "Active", avatar: "SR" },
  { id: "C-8844", name: "James O'Brien", email: "jobrien@corp.io", ltv: "$2,100", orders: 9, tier: "Bronze", location: "Dublin, IE", joined: "Nov 2023", status: "Inactive", avatar: "JO" },
  { id: "C-8845", name: "Yuki Tanaka", email: "y.tanaka@mail.jp", ltv: "$19,750", orders: 67, tier: "Platinum", location: "Tokyo, JP", joined: "Jun 2022", status: "Active", avatar: "YT" },
  { id: "C-8846", name: "Priya Sharma", email: "priya.s@enterprise.in", ltv: "$6,800", orders: 24, tier: "Gold", location: "Mumbai, IN", joined: "Sep 2023", status: "Active", avatar: "PS" },
];

const tierConfig: Record<string, { color: string; bg: string }> = {
  Platinum: { color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
  Gold: { color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  Silver: { color: "text-gray-600", bg: "bg-gray-100 dark:bg-gray-800" },
  Bronze: { color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" },
};

const avatarColors = ["bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500", "bg-cyan-500"];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === "All" || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const growthOptions: any = {
    chart: { sparkline: { enabled: true }, animations: { enabled: true } },
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0 } },
    colors: ["#8b5cf6"],
    tooltip: { enabled: false },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Relationship Management</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Customer Profiles</h1>
          <p className="text-gray-500 mt-1 text-sm">6,284 total customers across 42 countries</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            Export CSV
          </button>
          <button className="px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30">
            + Add Customer
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Avg. LTV", value: "$9,232", delta: "+14%", chart: [30, 40, 35, 50, 49, 60, 70, 91] },
          { label: "Repeat Rate", value: "68.4%", delta: "+5.2%", chart: [20, 35, 28, 45, 40, 55, 60] },
          { label: "Churn This Month", value: "1.8%", delta: "-0.3%", chart: [60, 50, 55, 40, 45, 30, 35] },
          { label: "New (30d)", value: "482", delta: "+22%", chart: [10, 15, 12, 18, 20, 28, 35] },
        ].map((kpi, i) => (
          <div key={kpi.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
            <span className="text-xs font-bold text-emerald-500 mt-1 block">{kpi.delta} vs last month</span>
            <div className="absolute bottom-0 left-0 right-0 h-14 opacity-40">
              <Chart options={growthOptions} series={[{ data: kpi.chart }]} type="area" height="100%" width="100%" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers…" className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" />
        </div>
        <div className="flex gap-2">
          {["All", "Platinum", "Gold", "Silver", "Bronze"].map(t => (
            <button key={t} onClick={() => setTierFilter(t)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${tierFilter === t ? "bg-brand-500 text-white shadow-md shadow-brand-500/30" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-brand-300"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Tier</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">Location</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Orders</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">LTV</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.map((c, i) => (
              <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}>{c.avatar}</div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${tierConfig[c.tier].bg} ${tierConfig[c.tier].color}`}>{c.tier}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-500">{c.location}</td>
                <td className="px-6 py-4 hidden md:table-cell text-sm font-semibold text-gray-700 dark:text-gray-300">{c.orders}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{c.ltv}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${c.status === "Active" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`}></span>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-xs font-bold text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-all">View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
