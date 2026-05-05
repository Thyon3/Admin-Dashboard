"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card/Card";
import DataTable from "@/components/ui/table/DataTable";
import Skeleton from "@/components/ui/Skeleton";
import { useNotifications } from "@/context/NotificationContext";

interface Variant {
  sku: string;
  size: string;
  color: string;
  stock: number;
  price: number;
}

interface ProductMatrix {
  id: string;
  name: string;
  category: string;
  vendor: string;
  variants: Variant[];
  totalStock: number;
}

const InventoryMatrixPage = () => {
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { showToast } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const inventory: ProductMatrix[] = [
    {
      id: "PROD-101",
      name: "Ultra-Light Performance Runner",
      category: "Footwear",
      vendor: "Velocity Sports",
      totalStock: 450,
      variants: [
        { sku: "VLT-8-BLK", size: "8", color: "Black", stock: 120, price: 129 },
        { sku: "VLT-9-BLK", size: "9", color: "Black", stock: 85, price: 129 },
        { sku: "VLT-8-WHT", size: "8", color: "White", stock: 145, price: 129 },
      ]
    },
    {
      id: "PROD-202",
      name: "Carbon Fiber Hybrid Frame",
      category: "Cycling",
      vendor: "Apex Gear",
      totalStock: 12,
      variants: [
        { sku: "APX-M-CARB", size: "Medium", color: "Carbon", stock: 5, price: 2499 },
        { sku: "APX-L-CARB", size: "Large", color: "Carbon", stock: 7, price: 2499 },
      ]
    }
  ];

  const columns = [
    {
      key: "name",
      label: "Product Entity",
      render: (value: string, row: ProductMatrix) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 dark:text-white">{value}</span>
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{row.id} • {row.vendor}</span>
        </div>
      )
    },
    { key: "category", label: "Category" },
    {
      key: "variants",
      label: "SKU Matrix",
      render: (variants: Variant[]) => (
        <div className="flex -space-x-2">
          {variants.map((v, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold" title={v.sku}>
              {v.size[0]}
            </div>
          ))}
          {variants.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold">
              +{variants.length - 3}
            </div>
          )}
        </div>
      )
    },
    {
      key: "totalStock",
      label: "Stock Health",
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-bold ${value < 20 ? "text-error-500" : "text-success-500"}`}>{value} units</span>
          {value < 20 && (
            <span className="px-2 py-0.5 bg-error-50 text-error-600 text-[10px] font-bold rounded-md animate-pulse">CRITICAL</span>
          )}
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Inventory Matrix</h1>
          <p className="text-gray-500 text-sm">Managing 2,492 SKUs across 4 regional warehouses.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            <span>Filters</span>
          </button>
          <button 
            onClick={() => showToast("Syncing with Warehouse...")}
            className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all"
          >
            Sync Matrix
          </button>
        </div>
      </div>

      <DataTable data={inventory} columns={columns as any} />

      {/* Complex Filter Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${isFilterOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-500 ${isFilterOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsFilterOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-500 ease-out ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Advanced Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Stock Status</label>
                <div className="space-y-2">
                  {["In Stock", "Low Stock", "Out of Stock"].map(s => (
                    <label key={s} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="w-5 h-5 border-2 border-gray-200 dark:border-gray-700 rounded flex items-center justify-center group-hover:border-brand-500 transition-colors">
                        <div className="w-2.5 h-2.5 bg-brand-500 rounded-sm opacity-0 group-hover:opacity-10" />
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Price Range</label>
                <input type="range" className="w-full h-1.5 bg-gray-100 rounded-full appearance-none accent-brand-500" min="0" max="5000" />
                <div className="flex justify-between mt-2 text-xs font-bold">$0 — $5,000</div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Warehouse Zone</label>
                <select className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20">
                  <option>All Locations</option>
                  <option>North America - East</option>
                  <option>Europe - Central</option>
                  <option>Asia - Pacific</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <button className="w-full py-3 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20">Apply Filters</button>
              <button onClick={() => setIsFilterOpen(false)} className="w-full py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold hover:bg-gray-200 transition-all">Clear All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMatrixPage;
