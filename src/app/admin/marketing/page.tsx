"use client";
import React, { useState } from "react";

const campaigns = [
  { id: "CMP-001", name: "Summer Blowout Sale", type: "Discount", status: "Active", reach: "42K", ctr: "8.2%", revenue: "$28,400", channels: ["Email","SMS","Push"] },
  { id: "CMP-002", name: "Buy 2 Get 1 – Footwear", type: "BOGO", status: "Active", reach: "18K", ctr: "12.4%", revenue: "$15,800", channels: ["Email","Web"] },
  { id: "CMP-003", name: "Loyalty Double Points", type: "Loyalty", status: "Scheduled", reach: "—", ctr: "—", revenue: "—", channels: ["Push","Email"] },
  { id: "CMP-004", name: "Spring Affiliate Launch", type: "Affiliate", status: "Ended", reach: "91K", ctr: "5.1%", revenue: "$52,200", channels: ["Affiliate"] },
];

const statusStyle: Record<string, string> = {
  Active:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Ended:     "bg-gray-100 text-gray-500 dark:bg-gray-800",
};
const typeColors: Record<string, string> = {
  Discount:  "bg-violet-100 text-violet-600",
  BOGO:      "bg-amber-100 text-amber-600",
  Loyalty:   "bg-emerald-100 text-emerald-600",
  Affiliate: "bg-rose-100 text-rose-600",
};
const channelColors: Record<string, string> = {
  Email:     "bg-blue-100 text-blue-600",
  SMS:       "bg-amber-100 text-amber-600",
  Push:      "bg-violet-100 text-violet-600",
  Web:       "bg-emerald-100 text-emerald-600",
  Affiliate: "bg-rose-100 text-rose-600",
};

export default function MarketingPage() {
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Active", "Scheduled", "Ended"];
  const filtered = tab === "All" ? campaigns : campaigns.filter(c => c.status === tab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">Relationships / Marketing</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Campaign Builder</h1>
          <p className="text-gray-500 mt-1 text-sm hidden sm:block">4 active campaigns · $96,400 attributed revenue</p>
        </div>
        <button className="self-start sm:self-auto px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all">+ New Campaign</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Reach", value: "151K", color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
          { label: "Avg. CTR", value: "8.57%", color: "text-violet-500 bg-violet-50 dark:bg-violet-900/20" },
          { label: "Revenue", value: "$96.4K", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Active Discounts", value: "12", color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
        ].map(k => (
          <div key={k.label} className={`${k.color} rounded-2xl p-4 sm:p-5`}>
            <p className="text-xl sm:text-2xl font-bold">{k.value}</p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1 opacity-70">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Discount Logic */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Active Discount Rules</h3>
          <p className="text-xs text-gray-400 mb-4">Buy X Get Y logic engine</p>
          <div className="space-y-3">
            {[
              { rule: "Buy 2 Footwear → Get 1 Free", applied: 420, savings: "$8,400" },
              { rule: "Spend $200+ → 15% off cart", applied: 218, savings: "$6,180" },
              { rule: "First purchase → Free shipping", applied: 891, savings: "$13,400" },
            ].map(r => (
              <div key={r.rule} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{r.rule}</p>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                  <span>{r.applied} applied</span>
                  <span className="text-emerald-500">{r.savings} saved</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Performance */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Affiliate Performance</h3>
          <p className="text-xs text-gray-400 mb-5">Top affiliates this month</p>
          <div className="space-y-4">
            {[
              { name: "TechReviewHub", code: "TRH20", revenue: "$22,800", pct: 85 },
              { name: "FitnessPro Blog", code: "FPB15", revenue: "$14,400", pct: 65 },
              { name: "GearGuide.io", code: "GGI10", revenue: "$9,200", pct: 45 },
            ].map(a => (
              <div key={a.name} className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg flex-shrink-0">🔗</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-gray-900 dark:text-white truncate">{a.name}</span>
                    <span className="text-xs font-bold text-emerald-500 ml-2 flex-shrink-0">{a.revenue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${a.pct}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 flex-shrink-0">{a.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="flex gap-2 px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-hide">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${tab === t ? "bg-brand-500 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>{t}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800">
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Campaign</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Channels</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:table-cell">CTR</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</p>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-1 ${typeColors[c.type]}`}>{c.type}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap">{c.channels.map(ch => <span key={ch} className={`px-2 py-0.5 rounded text-[10px] font-bold ${channelColors[ch]}`}>{ch}</span>)}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden sm:table-cell text-sm font-bold text-brand-500">{c.ctr}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">{c.revenue}</td>
                  <td className="px-4 sm:px-6 py-4"><span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap ${statusStyle[c.status]}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
