"use client";
import React, { useState } from "react";

const recentShipments = [
  { id: "TRK-00921", customer: "Yuki Tanaka", status: "In Transit", location: "Tokyo, JP", update: "Departed Facility", date: "May 06, 2026", color: "text-brand-500" },
  { id: "TRK-00920", customer: "James O'Brien", status: "Delivered", location: "London, UK", update: "Signed by James", date: "May 05, 2026", color: "text-emerald-500" },
  { id: "TRK-00919", customer: "Sarah Chen", status: "In Transit", location: "San Francisco, USA", update: "Arrived at Hub", date: "May 05, 2026", color: "text-brand-500" },
  { id: "TRK-00918", customer: "Marcus Wright", status: "Pending", location: "New York, USA", update: "Label Created", date: "May 04, 2026", color: "text-amber-500" },
];

export default function GlobalTrackingPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Global Tracking</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time monitoring of all global shipments.</p>
        </div>
        <div className="flex items-center -space-x-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-800" />
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-brand-500 flex items-center justify-center text-[10px] font-bold text-white">+8</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl text-center max-w-2xl mx-auto shadow-2xl shadow-brand-500/5">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Track Any Shipment</h3>
        <p className="text-sm text-gray-500 mb-6">Enter a tracking number, order ID, or customer name.</p>
        <div className="relative">
          <input 
            type="text" 
            placeholder="e.g. TRK-00921..." 
            className="w-full pl-6 pr-32 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-lg font-bold focus:ring-2 focus:ring-brand-500/20 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="absolute right-2 top-2 bottom-2 px-6 bg-brand-500 text-white rounded-xl font-bold shadow-lg shadow-brand-500/25 hover:scale-105 transition-all">Track Now</button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 1,240 Delivered</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> 84 In Transit</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> 3 Exceptions</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white">Live Shipment Log</h3>
          <button className="text-[10px] font-black text-brand-500 hover:underline uppercase">Refresh Data</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800">
                <th className="px-6 py-4">Tracking ID</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Latest Update</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Last Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {recentShipments.map((s) => (
                <tr key={s.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{s.id}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{s.customer}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">{s.location}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{s.update}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Via Local Hub</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-current ${s.color}`} />
                      <span className={`text-xs font-bold ${s.color}`}>{s.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-xs text-gray-400 font-bold">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
