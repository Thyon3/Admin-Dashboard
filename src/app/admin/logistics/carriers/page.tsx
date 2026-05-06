"use client";
import React from "react";

const carriers = [
  { name: "FedEx Express", code: "FEDEX", status: "Active", delay: "Normal", orders: 1240, img: "🚢" },
  { name: "UPS Logistics", code: "UPS", status: "Active", delay: "Minor Delay", orders: 850, img: "🚛" },
  { name: "DHL Global", code: "DHL", status: "Warning", delay: "High Latency", orders: 420, img: "✈️" },
  { name: "USPS", code: "USPS", status: "Active", delay: "Normal", orders: 2100, img: "📬" },
  { name: "Royal Mail", code: "ROYAL", status: "Inactive", delay: "Disconnected", orders: 0, img: "✉️" },
];

export default function CarriersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Carrier Network</h1>
          <p className="text-sm text-gray-500 mt-1">Manage shipping integrations and service health.</p>
        </div>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/25 hover:scale-105 transition-all">+ Add New Carrier</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carriers.map((c) => (
          <div key={c.code} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl hover:shadow-xl transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {c.img}
              </div>
              <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                c.status === "Active" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : 
                c.status === "Warning" ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10" : 
                "text-gray-400 bg-gray-50 dark:bg-gray-800"
              }`}>
                {c.status}
              </span>
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">{c.name}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Provider Code: {c.code}</p>
            
            <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Shipments</p>
                <p className="text-sm font-black text-gray-900 dark:text-white">{c.orders.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Health</p>
                <p className={`text-sm font-bold ${c.delay === "Normal" ? "text-emerald-500" : "text-amber-500"}`}>{c.delay}</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-brand-500 hover:text-white rounded-xl transition-all">Service Settings</button>
          </div>
        ))}
      </div>
    </div>
  );
}
