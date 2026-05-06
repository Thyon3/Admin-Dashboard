"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={200} />
});

const orders = [
  { id: "#ORD-9841", customer: "Alexandra Winters", product: "Ultra-Light Runner Pro", amount: "$1,299", date: "May 5", status: "Shipped",    avatar: "AW", avatarColor: "bg-violet-500" },
  { id: "#ORD-9840", customer: "Yuki Tanaka",       product: "Carbon Frame XR-7",     amount: "$2,499", date: "May 5", status: "Processing", avatar: "YT", avatarColor: "bg-amber-500" },
  { id: "#ORD-9839", customer: "Marcus Chen",       product: "Trail Blazer Pack",      amount: "$340",   date: "May 4", status: "Delivered",  avatar: "MC", avatarColor: "bg-blue-500" },
  { id: "#ORD-9838", customer: "Sofia Reyes",       product: "Summit Jacket",          amount: "$189",   date: "May 4", status: "Pending",    avatar: "SR", avatarColor: "bg-emerald-500" },
  { id: "#ORD-9837", customer: "James O'Brien",     product: "Hydro Flask Set",        amount: "$89",    date: "May 3", status: "Cancelled",  avatar: "JO", avatarColor: "bg-rose-500" },
  { id: "#ORD-9836", customer: "Priya Sharma",      product: "Yoga Mat Elite",         amount: "$220",   date: "May 3", status: "Delivered",  avatar: "PS", avatarColor: "bg-cyan-500" },
];

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  Shipped:    { bg: "bg-blue-50 dark:bg-blue-900/20",    text: "text-blue-600",    dot: "bg-blue-500" },
  Processing: { bg: "bg-amber-50 dark:bg-amber-900/20",  text: "text-amber-600",   dot: "bg-amber-500" },
  Delivered:  { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600", dot: "bg-emerald-500" },
  Pending:    { bg: "bg-gray-100 dark:bg-gray-800",       text: "text-gray-500",    dot: "bg-gray-400" },
  Cancelled:  { bg: "bg-red-50 dark:bg-red-900/20",       text: "text-red-600",     dot: "bg-red-500" },
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Processing", "Shipped", "Delivered", "Pending", "Cancelled"];
  const filtered = activeTab === "All" ? orders : orders.filter(o => o.status === activeTab);

  const revenueOptions: any = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "Outfit, sans-serif" },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "60%" } },
    dataLabels: { enabled: false },
    colors: ["#465fff"],
    xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], labels: { style: { colors: "#9ca3af", fontSize: "11px" } } },
    yaxis: { labels: { style: { colors: "#9ca3af" }, formatter: (v: number) => `$${v}k` } },
    grid: { borderColor: "rgba(156,163,175,0.08)" },
    tooltip: { theme: "dark" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Operations / Sales</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Order Management</h1>
          <p className="text-gray-500 mt-1 text-sm hidden sm:block">12 new orders today · $48,200 GMV this week</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Export</button>
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30">+ Create</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Orders", value: "3,842", delta: "+12%", icon: "📦" },
          { label: "Revenue (MTD)", value: "$284K", delta: "+8.4%", icon: "💰" },
          { label: "Avg. Order Value", value: "$184", delta: "+3.1%", icon: "🛒" },
          { label: "Return Rate", value: "2.1%", delta: "-0.4%", icon: "↩️" },
        ].map(k => (
          <div key={k.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg sm:text-xl">{k.icon}</span>
              <span className="text-xs font-bold text-emerald-500">{k.delta}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{k.value}</p>
            <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Daily Revenue (This Week)</h3>
          <Chart options={revenueOptions} series={[{ name: "Revenue", data: [38,52,41,67,55,84,72] }]} type="bar" height={200} />
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Order Status Breakdown</h3>
          <div className="space-y-3 mt-2">
            {Object.entries({ Delivered: 58, Shipped: 22, Processing: 12, Pending: 5, Cancelled: 3 }).map(([s, pct]) => {
              const cfg = statusConfig[s];
              return (
                <div key={s}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className={cfg?.text || "text-gray-500"}>{s}</span>
                    <span className="text-gray-500">{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${cfg?.dot || "bg-gray-400"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        {/* Tabs — scrollable on mobile */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-4 border-b border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-t-lg whitespace-nowrap transition-all -mb-px flex-shrink-0 ${activeTab === tab ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800">
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:table-cell">Customer</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">Product</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="text-left px-4 sm:px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map(o => {
                const s = statusConfig[o.status];
                return (
                  <tr key={o.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{o.id}</p>
                      <p className="text-[10px] text-gray-400">{o.date}</p>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full ${o.avatarColor} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{o.avatar}</div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{o.customer}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden lg:table-cell text-sm text-gray-500 max-w-[160px] truncate">{o.product}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">{o.amount}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${s.bg} ${s.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />{o.status}
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
