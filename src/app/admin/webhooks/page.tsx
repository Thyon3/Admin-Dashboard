"use client";
import React, { useState } from "react";

const initialWebhooks = [
  { id: "wh_01h2...", url: "https://api.thirdparty.com/webhooks/orders", event: "order.created", status: "Healthy", delivery: "99.8%", lastSuccess: "4 mins ago" },
  { id: "wh_01h5...", url: "https://shipment-track.io/api/notify", event: "shipment.updated", status: "Warning", delivery: "82.4%", lastSuccess: "1 hour ago" },
  { id: "wh_01j9...", url: "https://hooks.slack.com/services/...", event: "inventory.low", status: "Healthy", delivery: "100%", lastSuccess: "12 mins ago" },
];

export default function WebhooksPage() {
  const [webhooks] = useState(initialWebhooks);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Webhooks (Events)</h1>
          <p className="text-sm text-gray-500 mt-1">Configure event listeners for real-time store activity.</p>
        </div>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/25 hover:scale-105 transition-all">+ Add Endpoint</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white">Active Endpoints</h3>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {webhooks.map((w) => (
              <div key={w.id} className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2 h-2 rounded-full ${w.status === "Healthy" ? "bg-emerald-500" : "bg-amber-500"}`} />
                      <span className="text-sm font-black text-gray-900 dark:text-white truncate">{w.url}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-brand-500 bg-brand-50 dark:bg-brand-500/10 px-2 py-0.5 rounded uppercase tracking-wider">{w.event}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {w.id}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Success Rate</p>
                      <p className="text-sm font-black text-gray-900 dark:text-white">{w.delivery}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Last Sent</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{w.lastSuccess}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-brand-500 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">Delivery Logs (Last 50)</h3>
          <div className="space-y-3">
            {[
              { time: "16:04:12", event: "order.created", code: 200, latency: "142ms" },
              { time: "15:58:45", event: "order.created", code: 200, latency: "156ms" },
              { time: "15:42:01", event: "shipment.updated", code: 502, latency: "12s" },
              { time: "15:30:22", event: "inventory.low", code: 200, latency: "98ms" },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-gray-400">{log.time}</span>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{log.event}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black text-gray-400">{log.latency}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${log.code === 200 ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-rose-500 bg-rose-50 dark:bg-rose-500/10"}`}>
                    {log.code}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
