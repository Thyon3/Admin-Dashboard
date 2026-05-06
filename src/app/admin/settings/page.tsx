"use client";
import React, { useState } from "react";

const apiKeys = [
  { id: "k1", name: "Production Storefront", key: "sk_live_••••••••4a92", type: "Live", lastUsed: "2 mins ago", status: "Active" },
  { id: "k2", name: "Mobile App Integration", key: "sk_live_••••••••b7f1", type: "Live", lastUsed: "1 hr ago", status: "Active" },
  { id: "k3", name: "Dev Environment", key: "sk_test_••••••••3c84", type: "Test", lastUsed: "3 days ago", status: "Active" },
  { id: "k4", name: "Webhook Listener v2", key: "sk_test_••••••••9d21", type: "Test", lastUsed: "Never", status: "Inactive" },
];

const tabs = [
  { id: "general", label: "General" },
  { id: "currencies", label: "Multi-Currency" },
  { id: "taxes", label: "Tax Zones" },
  { id: "api", label: "API Keys" },
  { id: "notifications", label: "Notifications" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">System</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Global Settings</h1>
        <p className="text-gray-500 mt-1 text-sm hidden sm:block">Configure currencies, taxes, and API integrations</p>
      </div>

      {/* Tabs — horizontal scroll on mobile */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${activeTab === t.id ? "bg-white dark:bg-gray-900 shadow-sm text-brand-500" : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
        {activeTab === "general" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Store Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[["Store Name","Apex Commerce"],["Store URL","https://apexcommerce.io"],["Support Email","support@apexcommerce.io"],["Phone","+1 (555) 842-0291"]].map(([l,v]) => (
                  <div key={l}>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{l}</label>
                    <input defaultValue={v} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" />
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Localization</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Timezone</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all">
                    {["UTC","UTC-5 (EST)","UTC-8 (PST)","UTC+1 (CET)"].map(tz => <option key={tz}>{tz}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Date Format</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all">
                    <option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={save} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${saved ? "bg-emerald-500 text-white" : "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20"}`}>
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "currencies" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Multi-Currency Configuration</h2>
              <button className="self-start sm:self-auto px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all">Add Currency</button>
            </div>
            <div className="space-y-3">
              {[
                { code:"USD", name:"US Dollar", rate:"1.000 (base)", enabled:true, symbol:"$", isBase:true },
                { code:"EUR", name:"Euro", rate:"0.924", enabled:true, symbol:"€", isBase:false },
                { code:"GBP", name:"British Pound", rate:"0.789", enabled:true, symbol:"£", isBase:false },
                { code:"JPY", name:"Japanese Yen", rate:"148.20", enabled:true, symbol:"¥", isBase:false },
                { code:"CAD", name:"Canadian Dollar", rate:"1.362", enabled:false, symbol:"$", isBase:false },
              ].map(c => (
                <div key={c.code} className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 flex items-center justify-center font-bold text-gray-600 flex-shrink-0">{c.symbol}</div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{c.name} <span className="font-mono text-xs text-gray-400 ml-1">{c.code}</span></p>
                      <p className="text-xs text-gray-400">Rate: {c.rate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {c.isBase && <span className="hidden sm:inline px-2 py-0.5 bg-brand-100 text-brand-600 text-[10px] font-bold rounded">BASE</span>}
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer ${c.enabled ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${c.enabled ? "right-0.5" : "left-0.5"}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "taxes" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Tax Zone Configuration</h2>
              <button className="self-start sm:self-auto px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all">+ Add Zone</button>
            </div>
            <div className="space-y-3">
              {[
                { zone:"United States", rate:"0–11% (varies)", rules:"Per-state", status:"Configured" },
                { zone:"European Union", rate:"20% VAT", rules:"OSS Scheme", status:"Configured" },
                { zone:"United Kingdom", rate:"20% VAT", rules:"UK Import Rules", status:"Configured" },
                { zone:"Canada", rate:"5–15% GST/HST", rules:"Per-province", status:"Pending" },
              ].map(t => (
                <div key={t.zone} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{t.zone}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.rules} · {t.rate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${t.status === "Configured" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>{t.status}</span>
                    <button className="text-xs font-bold text-brand-500 hover:underline">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "api" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">API Integration Keys</h2>
              <button className="self-start sm:self-auto px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all">+ Generate Key</button>
            </div>
            <div className="space-y-3">
              {apiKeys.map(k => (
                <div key={k.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{k.name}</p>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${k.type === "Live" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>{k.type}</span>
                        {k.status === "Inactive" && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-400">Inactive</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg truncate">{k.key}</code>
                        <button className="text-[10px] font-bold text-brand-500 hover:underline flex-shrink-0">Copy</button>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">Last used: {k.lastUsed}</p>
                    </div>
                    <button className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors flex-shrink-0">Revoke</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400">⚠ Never share live API keys. Rotate compromised keys immediately.</p>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Notification Preferences</h2>
            <div className="space-y-3">
              {[
                { label:"New high-value order (>$500)", on:true },
                { label:"Low stock alert (<20 units)", on:true },
                { label:"Customer tier upgrade", on:true },
                { label:"RMA submitted", on:true },
                { label:"Daily revenue digest", on:false },
                { label:"Weekly performance report", on:true },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20 gap-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">{n.label}</p>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer flex-shrink-0 ${n.on ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${n.on ? "right-0.5" : "left-0.5"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
