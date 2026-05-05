"use client";
import React, { useState } from "react";

const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];
const timezones = ["UTC", "UTC-5 (EST)", "UTC-8 (PST)", "UTC+1 (CET)", "UTC+9 (JST)"];

const apiKeys = [
  { id: "key_live_1", name: "Production Storefront", key: "sk_live_••••••••••••4a92", type: "Live", created: "Jan 12, 2026", lastUsed: "2 mins ago", status: "Active" },
  { id: "key_live_2", name: "Mobile App Integration", key: "sk_live_••••••••••••b7f1", type: "Live", created: "Feb 8, 2026", lastUsed: "1 hr ago", status: "Active" },
  { id: "key_test_1", name: "Development Environment", key: "sk_test_••••••••••••3c84", type: "Test", created: "Mar 22, 2026", lastUsed: "3 days ago", status: "Active" },
  { id: "key_test_2", name: "Webhook Listener v2", key: "sk_test_••••••••••••9d21", type: "Test", created: "Apr 15, 2026", lastUsed: "Never", status: "Inactive" },
];

const taxZones = [
  { zone: "United States", rate: "varies (0–11%)", rules: "Per-state calculation", status: "Configured" },
  { zone: "European Union", rate: "20% VAT (avg.)", rules: "OSS Scheme", status: "Configured" },
  { zone: "United Kingdom", rate: "20% VAT", rules: "UK Import Rules", status: "Configured" },
  { zone: "Canada", rate: "5–15% GST/HST", rules: "Per-province", status: "Pending" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("UTC");
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "currencies", label: "Multi-Currency", icon: "💱" },
    { id: "taxes", label: "Tax Zones", icon: "🧾" },
    { id: "api", label: "API Keys", icon: "🔑" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">System</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Global Settings</h1>
        <p className="text-gray-500 mt-1 text-sm">Configure your store, currencies, taxes, and API integrations</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-2 space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === t.id ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Panel */}
        <div className="flex-1 space-y-4">
          {activeTab === "general" && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Store Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[["Store Name", "Apex Commerce"], ["Store URL", "https://apexcommerce.io"], ["Support Email", "support@apexcommerce.io"], ["Business Phone", "+1 (555) 842-0291"]].map(([l, v]) => (
                    <div key={l}>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{l}</label>
                      <input defaultValue={v} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Localization</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Default Timezone</label>
                    <select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all">
                      {timezones.map(tz => <option key={tz}>{tz}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date Format</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all">
                      <option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${saved ? "bg-emerald-500 text-white" : "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20"}`}>
                  {saved ? "✓ Saved!" : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "currencies" && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Multi-Currency Configuration</h2>
                  <p className="text-xs text-gray-400 mt-1">Enable currencies for international storefronts</p>
                </div>
                <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all">Add Currency</button>
              </div>
              <div className="space-y-3">
                {[
                  { code: "USD", name: "US Dollar", rate: "1.000 (base)", enabled: true, symbol: "$" },
                  { code: "EUR", name: "Euro", rate: "0.924", enabled: true, symbol: "€" },
                  { code: "GBP", name: "British Pound", rate: "0.789", enabled: true, symbol: "£" },
                  { code: "JPY", name: "Japanese Yen", rate: "148.20", enabled: true, symbol: "¥" },
                  { code: "CAD", name: "Canadian Dollar", rate: "1.362", enabled: false, symbol: "$" },
                ].map(c => (
                  <div key={c.code} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300">{c.symbol}</div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{c.name} <span className="font-mono text-xs text-gray-400 ml-1">{c.code}</span></p>
                        <p className="text-xs text-gray-400">Rate: {c.rate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {c.code === "USD" && <span className="px-2 py-1 bg-brand-100 text-brand-600 text-[10px] font-bold rounded-md">BASE</span>}
                      <div className={`w-11 h-6 rounded-full transition-all cursor-pointer relative ${c.enabled ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${c.enabled ? "right-1" : "left-1"}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "taxes" && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tax Zone Configuration</h2>
                  <p className="text-xs text-gray-400 mt-1">Manage tax rules per jurisdiction</p>
                </div>
                <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all">+ Add Zone</button>
              </div>
              <div className="space-y-3">
                {taxZones.map(t => (
                  <div key={t.zone} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{t.zone}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{t.rules} · <span className="font-semibold">{t.rate}</span></p>
                    </div>
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${t.status === "Configured" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20" : "bg-amber-100 text-amber-600 dark:bg-amber-900/20"}`}>{t.status}</span>
                      <button className="text-xs font-bold text-brand-500 hover:underline">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">API Integration Keys</h2>
                  <p className="text-xs text-gray-400 mt-1">Manage access tokens for third-party integrations</p>
                </div>
                <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all">+ Generate Key</button>
              </div>
              <div className="space-y-3">
                {apiKeys.map(k => (
                  <div key={k.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{k.name}</p>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${k.type === "Live" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>{k.type}</span>
                          {k.status === "Inactive" && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-400">Inactive</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <code className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg">{k.key}</code>
                          <button className="text-[10px] font-bold text-brand-500 hover:underline">Copy</button>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2">Created {k.created} · Last used: {k.lastUsed}</p>
                      </div>
                      <button className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors">Revoke</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20">
                <p className="text-xs font-bold text-amber-700 dark:text-amber-400">⚠ Never share your live API keys publicly. Rotate compromised keys immediately.</p>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "New high-value order (>$500)", channels: ["Email", "Push"], enabled: true },
                  { label: "Low stock alert (<20 units)", channels: ["Email", "Push"], enabled: true },
                  { label: "Customer tier upgrade", channels: ["Email"], enabled: true },
                  { label: "RMA submitted", channels: ["Email", "Push"], enabled: true },
                  { label: "Daily revenue digest", channels: ["Email"], enabled: false },
                  { label: "Weekly performance report", channels: ["Email"], enabled: true },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20">
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{n.label}</p>
                      <div className="flex gap-1.5 mt-1.5">
                        {n.channels.map(ch => <span key={ch} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px] font-bold rounded">{ch}</span>)}
                      </div>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-all cursor-pointer relative ${n.enabled ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${n.enabled ? "right-1" : "left-1"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
