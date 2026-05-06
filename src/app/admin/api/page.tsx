"use client";
import React, { useState } from "react";

const initialKeys = [
  { id: "key_live_9a2b...", name: "Production Web Store", created: "Jan 12, 2026", lastUsed: "2 mins ago", type: "Live" },
  { id: "key_test_4f8c...", name: "Staging Environment", created: "Feb 05, 2026", lastUsed: "1 hour ago", type: "Test" },
  { id: "key_dev_1d2e...", name: "Asnake Development", created: "May 01, 2026", lastUsed: "12 mins ago", type: "Dev" },
];

export default function ApiIntegrationsPage() {
  const [keys] = useState(initialKeys);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">API Integrations</h1>
          <p className="text-sm text-gray-500 mt-1">Connect your store to third-party services and custom apps.</p>
        </div>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/25 hover:scale-105 transition-all">+ Generate New Key</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 dark:text-white">API Credentials</h3>
              <span className="text-[10px] font-black text-brand-500 bg-brand-50 dark:bg-brand-500/10 px-2 py-1 rounded-md uppercase tracking-wider">REST v3.2</span>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {keys.map((k) => (
                <div key={k.id} className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${k.type === "Live" ? "bg-emerald-500" : "bg-brand-500"}`} />
                      <h4 className="font-bold text-gray-900 dark:text-white">{k.name}</h4>
                    </div>
                    <code className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">{k.id}</code>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Last Used</p>
                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{k.lastUsed}</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Request Rate (Last 24h)</h3>
            <div className="h-40 flex items-end gap-1.5">
              {[40, 65, 30, 85, 45, 90, 55, 75, 40, 60, 35, 80, 50, 70, 45, 95, 30, 65, 40, 85, 50, 75, 35, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-brand-500/10 dark:bg-brand-500/20 rounded-t-sm relative group">
                  <div className="absolute bottom-0 left-0 right-0 bg-brand-500 rounded-t-sm transition-all group-hover:bg-brand-400" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>12:00 AM</span>
              <span>Total Requests: 124,502</span>
              <span>11:59 PM</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 dark:bg-brand-950 p-6 rounded-3xl text-white">
            <h4 className="font-bold mb-4">Quick Integration</h4>
            <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-brand-300 overflow-x-auto">
              <p>curl -X GET "https://api.thyon.com/v3/orders" \</p>
              <p>-H "Authorization: Bearer YOUR_KEY"</p>
            </div>
            <button className="w-full mt-6 py-2.5 bg-brand-500 text-white text-xs font-bold rounded-xl hover:bg-brand-600 transition-all">Documentation</button>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-bold">API Gateway</span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-bold">Auth Service</span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-bold">Core DB Cluster</span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
