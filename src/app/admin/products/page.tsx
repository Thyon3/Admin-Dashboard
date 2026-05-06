"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={200} />
});

const products = [
  { id: "PRD-001", name: "Ultra-Light Runner Pro", sku: "ULR-PRO-BLK-9", category: "Footwear", price: "$129", stock: 482, sold: 1840, rating: 4.8, status: "Active", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id: "PRD-002", name: "Carbon Frame XR-7", sku: "CFX-7-CARB-M", category: "Cycling", price: "$2,499", stock: 12, sold: 94, rating: 4.9, status: "Low Stock", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80" },
  { id: "PRD-003", name: "Summit Jacket Pro", sku: "SJP-RED-L", category: "Apparel", price: "$189", stock: 230, sold: 620, rating: 4.6, status: "Active", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80" },
  { id: "PRD-004", name: "Hydro Flask Elite 32oz", sku: "HFE-32-BLU", category: "Accessories", price: "$49", stock: 0, sold: 3200, rating: 4.7, status: "Out of Stock", image: "https://images.unsplash.com/photo-1602143307185-84e0586d5bc8?w=600&q=80" },
  { id: "PRD-005", name: "Yoga Mat Elite", sku: "YME-TEAL-STD", category: "Fitness", price: "$79", stock: 155, sold: 892, rating: 4.5, status: "Active", image: "https://images.unsplash.com/photo-1592432676556-26d5bc882209?w=600&q=80" },
  { id: "PRD-006", name: "Trail Blazer Pack 40L", sku: "TBP-40-GRN", category: "Bags", price: "$220", stock: 67, sold: 340, rating: 4.8, status: "Active", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
];

const statusStyles: Record<string, string> = {
  Active: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
  "Low Stock": "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
  "Out of Stock": "text-rose-500 bg-rose-50 dark:bg-rose-500/10",
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const chartOptions: any = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "Outfit, sans-serif" },
    plotOptions: { bar: { borderRadius: 6, horizontal: true, barHeight: "55%" } },
    dataLabels: { enabled: false },
    colors: ["#465fff"],
    xaxis: { categories: products.map(p => p.name.split(" ").slice(0, 2).join(" ")), labels: { style: { colors: "#9ca3af", fontSize: "11px" } } },
    grid: { borderColor: "rgba(156,163,175,0.08)" },
    tooltip: { theme: "dark" },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Operations / Catalog</p>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Product Catalog</h1>
          <p className="text-gray-500 mt-1 text-sm hidden sm:block">1,284 products · 6 categories</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all">+ Add Product</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Products", value: "1,284", color: "text-brand-500 bg-brand-50 dark:bg-brand-900/20" },
          { label: "Active Listings", value: "1,102", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Low Stock Alerts", value: "24", color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
          { label: "Out of Stock", value: "8", color: "text-red-500 bg-red-50 dark:bg-red-900/20" },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4 sm:p-5`}>
            <p className="text-xl sm:text-2xl font-bold">{s.value}</p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1 opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-center">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Top Sellers Units</h3>
          <Chart options={chartOptions} series={[{ name: "Units Sold", data: products.map(p => p.sold) }]} type="bar" height={250} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products, SKUs..." className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20" />
            </div>
            <select className="w-40 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20">
              <option>All Categories</option>
              <option>Footwear</option>
              <option>Cycling</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">{p.category}</p>
                    <div className="flex items-center gap-0.5">
                      <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-[10px] font-bold text-gray-500">{p.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white truncate">{p.name}</h4>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 dark:border-gray-800">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Price</p>
                      <p className="text-sm font-black text-gray-900 dark:text-white">{p.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Stock</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{p.stock}</p>
                    </div>
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
