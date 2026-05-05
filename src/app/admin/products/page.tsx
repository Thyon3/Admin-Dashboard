"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const products = [
  { id: "PRD-001", name: "Ultra-Light Runner Pro", sku: "ULR-PRO-BLK-9", category: "Footwear", price: "$129", stock: 482, sold: 1840, rating: 4.8, status: "Active", image: "👟" },
  { id: "PRD-002", name: "Carbon Frame XR-7", sku: "CFX-7-CARB-M", category: "Cycling", price: "$2,499", stock: 12, sold: 94, rating: 4.9, status: "Low Stock", image: "🚲" },
  { id: "PRD-003", name: "Summit Jacket Pro", sku: "SJP-RED-L", category: "Apparel", price: "$189", stock: 230, sold: 620, rating: 4.6, status: "Active", image: "🧥" },
  { id: "PRD-004", name: "Hydro Flask Elite 32oz", sku: "HFE-32-BLU", category: "Accessories", price: "$49", stock: 0, sold: 3200, rating: 4.7, status: "Out of Stock", image: "🥤" },
  { id: "PRD-005", name: "Yoga Mat Elite", sku: "YME-TEAL-STD", category: "Fitness", price: "$79", stock: 155, sold: 892, rating: 4.5, status: "Active", image: "🧘" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Low Stock": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const chartOptions: any = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "Outfit, sans-serif" },
    plotOptions: { bar: { borderRadius: 6, horizontal: true, barHeight: "60%" } },
    dataLabels: { enabled: false },
    colors: ["#465fff"],
    xaxis: { categories: products.map(p => p.name.split(" ").slice(0, 2).join(" ")), labels: { style: { colors: "#9ca3af", fontSize: "11px" } } },
    grid: { borderColor: "rgba(156,163,175,0.08)" },
    tooltip: { theme: "dark" },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Operations / Catalog</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Product Catalog</h1>
          <p className="text-gray-500 mt-1 text-sm">1,284 products · 6 categories</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Import CSV</button>
          <button className="px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30">+ Add Product</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: "1,284", color: "text-brand-500", bg: "bg-brand-50 dark:bg-brand-900/20" },
          { label: "Active Listings", value: "1,102", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Low Stock Alerts", value: "24", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
          { label: "Out of Stock", value: "8", color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} ${s.color} rounded-2xl p-5`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Top Sellers by Units Sold</h3>
        <Chart options={chartOptions} series={[{ name: "Units Sold", data: products.map(p => p.sold) }]} type="bar" height={200} />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all" />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-800">
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">SKU</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Stock</th>
              <th className="text-left px-6 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl">{p.image}</div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell"><span className="font-mono text-xs text-gray-500">{p.sku}</span></td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{p.price}</td>
                <td className="px-6 py-4 hidden md:table-cell text-sm font-semibold text-gray-700 dark:text-gray-300">{p.stock.toLocaleString()}</td>
                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${statusStyles[p.status]}`}>{p.status}</span></td>
                <td className="px-6 py-4"><button className="opacity-0 group-hover:opacity-100 text-xs font-bold text-brand-500 hover:underline transition-all">Edit →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
