"use client";
import React, { useState } from "react";

const rmaData = [
  { id: "RMA-0291", order: "#ORD-9832", customer: "James O'Brien", product: "Hydro Flask Elite", reason: "Defective Product", status: "Approved", amount: "$89.00", submitted: "May 3", avatar: "JO", avatarColor: "bg-rose-500" },
  { id: "RMA-0290", order: "#ORD-9818", customer: "Sofia Reyes", product: "Summit Jacket Pro – L/Red", reason: "Wrong Item Sent", status: "Processing", amount: "$189.00", submitted: "May 2", avatar: "SR", avatarColor: "bg-emerald-500" },
  { id: "RMA-0289", order: "#ORD-9801", customer: "Marcus Chen", product: "Trail Blazer Pack 40L", reason: "Changed Mind", status: "Pending Review", amount: "$220.00", submitted: "May 1", avatar: "MC", avatarColor: "bg-blue-500" },
  { id: "RMA-0288", order: "#ORD-9794", customer: "Yuki Tanaka", product: "Carbon Frame XR-7 – M", reason: "Damaged on Arrival", status: "Refunded", amount: "$2,499.00", submitted: "Apr 28", avatar: "YT", avatarColor: "bg-amber-500" },
  { id: "RMA-0287", order: "#ORD-9787", customer: "Priya Sharma", product: "Yoga Mat Elite", reason: "Quality Not as Expected", status: "Rejected", amount: "$79.00", submitted: "Apr 27", avatar: "PS", avatarColor: "bg-cyan-500" },
];

const statusStyle: Record<string, { bg: string; text: string }> = {
  Approved:       { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400" },
  Processing:     { bg: "bg-blue-50 dark:bg-blue-900/20",       text: "text-blue-600 dark:text-blue-400" },
  "Pending Review":{ bg: "bg-amber-50 dark:bg-amber-900/20",    text: "text-amber-600 dark:text-amber-400" },
  Refunded:       { bg: "bg-gray-100 dark:bg-gray-800",         text: "text-gray-500" },
  Rejected:       { bg: "bg-red-50 dark:bg-red-900/20",         text: "text-red-600 dark:text-red-400" },
};

const reasonColors: Record<string, string> = {
  "Defective Product":       "bg-red-100 text-red-600",
  "Wrong Item Sent":         "bg-amber-100 text-amber-600",
  "Changed Mind":            "bg-gray-100 text-gray-500",
  "Damaged on Arrival":      "bg-orange-100 text-orange-600",
  "Quality Not as Expected": "bg-violet-100 text-violet-600",
};

export default function ReturnsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const statuses = ["All", "Pending Review", "Approved", "Processing", "Refunded", "Rejected"];
  const filtered = statusFilter === "All" ? rmaData : rmaData.filter(r => r.status === statusFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Operations / Sales</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Return Merchandise (RMA)</h1>
          <p className="text-gray-500 mt-1 text-sm">5 active RMAs · $3,076 under review</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30">+ Create RMA</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pending Review", value: "1", color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
          { label: "Approved", value: "1", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Value Under Review", value: "$3,076", color: "text-brand-500 bg-brand-50 dark:bg-brand-900/20" },
          { label: "Return Rate (MTD)", value: "2.1%", color: "text-rose-500 bg-rose-50 dark:bg-rose-900/20" },
        ].map(k => (
          <div key={k.label} className={`${k.color} rounded-2xl p-5`}>
            <p className="text-2xl font-bold">{k.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-70">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Common Return Reasons */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Return Reasons Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { reason: "Defective / Damaged", pct: 38, color: "bg-red-500" },
            { reason: "Wrong Item", pct: 28, color: "bg-amber-500" },
            { reason: "Changed Mind", pct: 20, color: "bg-gray-400" },
            { reason: "Quality Issues", pct: 10, color: "bg-violet-500" },
            { reason: "Other", pct: 4, color: "bg-blue-500" },
          ].map(r => (
            <div key={r.reason} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <div className={`w-2 h-10 rounded-full ${r.color} flex-shrink-0`} />
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{r.reason}</p>
                <div className="mt-1.5 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
              <span className="text-sm font-bold text-gray-500">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* RMA Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === s ? "bg-brand-500 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>{s}</button>
          ))}
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-800">
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">RMA / Order</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Customer</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">Product</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">Reason</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.map(r => {
              const s = statusStyle[r.status];
              return (
                <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{r.id}</p>
                    <p className="text-[10px] text-gray-400">{r.order} · {r.submitted}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${r.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>{r.avatar}</div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{r.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-500">{r.product}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${reasonColors[r.reason] || "bg-gray-100 text-gray-500"}`}>{r.reason}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{r.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${s.bg} ${s.text}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="opacity-0 group-hover:opacity-100 text-xs font-bold text-brand-500 hover:underline transition-all">Review →</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
