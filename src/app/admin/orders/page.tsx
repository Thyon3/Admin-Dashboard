"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const orders = [
  { id: "#ORD-9841", customer: "Alexandra Winters", product: "Ultra-Light Runner Pro", amount: "$1,299.00", date: "May 5, 2026", status: "Shipped", payment: "Visa •••• 4242", items: 2, avatar: "AW" },
  { id: "#ORD-9840", customer: "Yuki Tanaka", product: "Carbon Frame XR-7", amount: "$2,499.00", date: "May 5, 2026", status: "Processing", payment: "PayPal", items: 1, avatar: "YT" },
  { id: "#ORD-9839", customer: "Marcus Chen", product: "Trail Blazer Pack", amount: "$340.00", date: "May 4, 2026", status: "Delivered", payment: "Mastercard •••• 9181", items: 3, avatar: "MC" },
  { id: "#ORD-9838", customer: "Sofia Reyes", product: "Summit Jacket", amount: "$189.00", date: "May 4, 2026", status: "Pending", payment: "Stripe", items: 1, avatar: "SR" },
  { id: "#ORD-9837", customer: "James O'Brien", product: "Hydro Flask Set", amount: "$89.00", date: "May 3, 2026", status: "Cancelled", payment: "Amex •••• 7123", items: 2, avatar: "JO" },
  { id: "#ORD-9836", customer: "Priya Sharma", product: "Yoga Mat Elite", amount: "$220.00", date: "May 3, 2026", status: "Delivered", payment: "Visa •••• 5556", items: 4, avatar: "PS" },
];

const statusConfig: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  Shipped:    { label: "Shipped",    dot: "bg-blue-500",    bg: "bg-blue-50 dark:bg-blue-900/20",    text: "text-blue-600" },
  Processing: { label: "Processing", dot: "bg-amber-500",   bg: "bg-amber-50 dark:bg-amber-900/20",  text: "text-amber-600" },
  Delivered:  { label: "Delivered",  dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600" },
  Pending:    { label: "Pending",    dot: "bg-gray-400",    bg: "bg-gray-100 dark:bg-gray-800",      text: "text-gray-500" },
  Cancelled:  { label: "Cancelled",  dot: "bg-red-500",     bg: "bg-red-50 dark:bg-red-900/20",      text: "text-red-600" },
};

const avatarColors = ["bg-violet-500","bg-blue-500","bg-emerald-500","bg-rose-500","bg-amber-500","bg-cyan-500"];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Processing", "Shipped", "Delivered", "Pending", "Cancelled"];

  const revenueOptions: any = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "Outfit, sans-serif" },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "60%" } },
    dataLabels: { enabled: false },
    colors: ["#465fff"],
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], labels: { style: { colors: "#9ca3af", fontSize: "11px" } } },
    yaxis: { labels: { style: { colors: "#9ca3af" }, formatter: (v: number) => `$${v}k` } },
    grid: { borderColor: "rgba(156,163,175,0.08)" },
    tooltip: { theme: "dark" },
  };

  const filtered = activeTab === "All" ? orders : orders.filter(o => o.status === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Operations / Sales</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Order Management</h1>
          <p className="text-gray-500 mt-1 text-sm">12 new orders today · $48,200 GMV this week</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Export</button>
          <button className="px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30">+ Create Order</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "3,842", delta: "+12%", color: "text-brand-500", icon: "📦" },
          { label: "Revenue (MTD)", value: "$284K", delta: "+8.4%", color: "text-emerald-500", icon: "💰" },
          { label: "Avg. Order Value", value: "$184", delta: "+3.1%", color: "text-amber-500", icon: "🛒" },
          { label: "Return Rate", value: "2.1%", delta: "-0.4%", color: "text-rose-500", icon: "↩️" },
        ].map(k => (
          <div key={k.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">{k.icon}</span>
              <span className={`text-xs font-bold ${k.color}`}>{k.delta}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{k.value}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Daily Revenue (This Week)</h3>
          <Chart options={revenueOptions} series={[{ name: "Revenue", data: [38, 52, 41, 67, 55, 84, 72] }]} type="bar" height={220} />
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Order Status</h3>
          <div className="space-y-3 mt-2">
            {Object.entries({ Delivered: 58, Shipped: 22, Processing: 12, Pending: 5, Cancelled: 3 }).map(([s, pct]) => (
              <div key={s}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className={statusConfig[s]?.text || "text-gray-500"}>{s}</span>
                  <span className="text-gray-500">{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${statusConfig[s]?.dot || "bg-gray-400"}`} style={{ width: `${pct}%`, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs + Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-1 px-6 pt-5 border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-bold rounded-t-lg whitespace-nowrap transition-all -mb-px ${activeTab === tab ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"}`}>
              {tab}
            </button>
          ))}
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-800">
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Customer</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">Product</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.map((o, i) => {
              const s = statusConfig[o.status];
              return (
                <tr key={o.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{o.id}</p>
                    <p className="text-[10px] text-gray-400">{o.date}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>{o.avatar}</div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{o.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-500">{o.product}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{o.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${s.bg} ${s.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>{s.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="opacity-0 group-hover:opacity-100 text-xs font-bold text-brand-500 hover:underline transition-all">Details →</button>
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
