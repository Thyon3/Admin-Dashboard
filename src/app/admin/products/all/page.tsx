"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";

const allProducts = [
  { id: "PRD-001", name: "Ultra-Light Runner Pro", sku: "ULR-PRO-BLK-9", category: "Footwear", price: 129, stock: 482, sold: 1840, status: "Active", image: "👟" },
  { id: "PRD-002", name: "Carbon Frame XR-7", sku: "CFX-7-CARB-M", category: "Cycling", price: 2499, stock: 12, sold: 94, status: "Low Stock", image: "🚲" },
  { id: "PRD-003", name: "Summit Jacket Pro", sku: "SJP-RED-L", category: "Apparel", price: 189, stock: 230, sold: 620, status: "Active", image: "🧥" },
  { id: "PRD-004", name: "Hydro Flask Elite 32oz", sku: "HFE-32-BLU", category: "Accessories", price: 49, stock: 0, sold: 3200, status: "Out of Stock", image: "🥤" },
  { id: "PRD-005", name: "Yoga Mat Elite", sku: "YME-TEAL-STD", category: "Fitness", price: 79, stock: 155, sold: 892, status: "Active", image: "🧘" },
  { id: "PRD-006", name: "Trail Blazer Pack 40L", sku: "TBP-40-GRN", category: "Bags", price: 220, stock: 67, sold: 340, status: "Active", image: "🎒" },
  { id: "PRD-007", name: "Aero Helmet Pro", sku: "AHP-WHT-L", category: "Cycling", price: 150, stock: 45, sold: 120, status: "Active", image: "🪖" },
  { id: "PRD-008", name: "Quick-Dry Shorts", sku: "QDS-BLK-M", category: "Apparel", price: 45, stock: 120, sold: 450, status: "Active", image: "🩳" },
  { id: "PRD-009", name: "Bluetooth Smart Scale", sku: "BSS-WHT", category: "Fitness", price: 99, stock: 85, sold: 310, status: "Active", image: "⚖️" },
  { id: "PRD-010", name: "Therapeutic Foam Roller", sku: "TFR-BLU", category: "Fitness", price: 35, stock: 200, sold: 560, status: "Active", image: "🧱" },
];

const categories = ["All", "Footwear", "Cycling", "Apparel", "Accessories", "Bags", "Fitness"];
const statuses = ["All", "Active", "Low Stock", "Out of Stock"];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Low Stock": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function AllProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock" | "sold">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || p.category === category;
        const matchesStatus = status === "All" || p.status === status;
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
      })
      .sort((a, b) => {
        const factor = sortOrder === "asc" ? 1 : -1;
        if (sortBy === "name") return a.name.localeCompare(b.name) * factor;
        return (a[sortBy] - b[sortBy]) * factor;
      });
  }, [search, category, status, priceRange, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Link href="/admin/products" className="text-xs font-bold text-brand-500 hover:underline flex items-center gap-1 mb-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            Back to Catalog
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">All Products</h1>
          <p className="text-gray-500 mt-1 text-sm">Full inventory management with advanced filters.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all">+ New Product</button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Search</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name or SKU..." className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all">
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
              Price Range <span>${priceRange[0]} - ${priceRange[1]}</span>
            </label>
            <input type="range" min="0" max="3000" step="50" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-brand-500" />
          </div>
        </div>
      </div>

      {/* Sorting & Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm font-medium text-gray-500">Showing <span className="text-gray-900 dark:text-white font-bold">{filteredProducts.length}</span> products</p>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase">Sort by:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="bg-transparent text-sm font-bold text-brand-500 outline-none cursor-pointer">
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
            <option value="sold">Sold</option>
          </select>
          <button onClick={() => setSortOrder(o => o === "asc" ? "desc" : "asc")} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Price</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Stock</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Sold</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl flex-shrink-0">{p.image}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{p.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white text-right">
                    ${p.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-right">
                    {p.stock.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-brand-500 text-right">
                    {p.sold.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-3">🔍</span>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">No products found</p>
                      <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search terms.</p>
                      <button onClick={() => { setSearch(""); setCategory("All"); setStatus("All"); setPriceRange([0, 3000]); }} className="mt-4 text-xs font-bold text-brand-500 hover:underline">Clear all filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
