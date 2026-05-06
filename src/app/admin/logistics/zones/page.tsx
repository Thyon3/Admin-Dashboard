"use client";
import React from "react";

const zones = [
  { id: "Z-1", name: "Domestic (USA)", countries: "United States", rate: "$0.00 - $15.00", method: "Standard & Express", status: "Active" },
  { id: "Z-2", name: "European Union", countries: "27 Countries", rate: "$12.00 - $45.00", method: "DHL Express", status: "Active" },
  { id: "Z-3", name: "Asia Pacific", countries: "Japan, China, HK", rate: "$15.00 - $60.00", method: "FedEx Intl", status: "Active" },
  { id: "Z-4", name: "Canada & Mexico", countries: "North America", rate: "$8.00 - $25.00", method: "UPS Ground", status: "Inactive" },
];

export default function ShippingZonesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Shipping Zones</h1>
          <p className="text-sm text-gray-500 mt-1">Define geographical regions and shipping rates.</p>
        </div>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/25 hover:scale-105 transition-all">+ Add Zone</button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white">Active Zones</h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{zones.length} Regions defined</span>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {zones.map((z) => (
            <div key={z.id} className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{z.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{z.countries}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-8 md:gap-12">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Rates</p>
                  <p className="text-sm font-black text-gray-900 dark:text-white">{z.rate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Method</p>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{z.method}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Status</p>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${z.status === "Active" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-gray-400 bg-gray-50 dark:bg-gray-800"}`}>
                    {z.status}
                  </span>
                </div>
                <button className="text-xs font-black text-brand-500 hover:underline uppercase">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
