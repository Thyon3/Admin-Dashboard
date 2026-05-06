"use client";
import React, { useState } from "react";

const tiers = [
  { id: "platinum", name: "Platinum", threshold: "$10,000+", members: 284, icon: "💎", color: "from-purple-500 to-indigo-600", textColor: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20", perks: ["Priority Support","Free Shipping Always","15% Cashback","Early Access"] },
  { id: "gold",     name: "Gold",     threshold: "$5,000–$9,999", members: 891, icon: "🥇", color: "from-amber-400 to-orange-500", textColor: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", perks: ["Priority Email Support","Free Shipping ($75+)","10% Cashback","Early Access"] },
  { id: "silver",   name: "Silver",   threshold: "$1,000–$4,999", members: 2840, icon: "🥈", color: "from-gray-400 to-gray-500", textColor: "text-gray-600", bg: "bg-gray-100 dark:bg-gray-800", perks: ["Standard Support","Free Shipping ($150+)","5% Cashback"] },
  { id: "bronze",   name: "Bronze",   threshold: "$0–$999", members: 8420, icon: "🥉", color: "from-orange-400 to-amber-600", textColor: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20", perks: ["Standard Support","2% Cashback"] },
];

const upgrades = [
  { name: "Alexandra W.", from: "Gold", to: "Platinum", ltv: "$12,480", date: "Today" },
  { name: "Marcus C.", from: "Silver", to: "Gold", ltv: "$8,920", date: "Yesterday" },
  { name: "Priya S.", from: "Bronze", to: "Silver", ltv: "$1,240", date: "May 3" },
];

export default function LoyaltyPage() {
  const [selected, setSelected] = useState("platinum");
  const tier = tiers.find(t => t.id === selected)!;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Relationships</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Loyalty Tiers</h1>
          <p className="text-gray-500 mt-1 text-sm hidden sm:block">12,435 enrolled members · 89% engagement</p>
        </div>
        <button className="self-start sm:self-auto px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all">Configure Rules</button>
      </div>

      {/* Tier Cards — 2-col on mobile, 4-col on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {tiers.map(t => (
          <div key={t.id} onClick={() => setSelected(t.id)}
            className={`relative cursor-pointer rounded-2xl p-4 sm:p-6 transition-all duration-300 border-2 hover:-translate-y-1 ${selected === t.id ? "border-brand-500 shadow-xl shadow-brand-500/10" : "border-transparent bg-white dark:bg-gray-900"}`}>
            {selected === t.id && <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${t.color} opacity-10`} />}
            <div className="relative">
              <span className="text-2xl sm:text-3xl">{t.icon}</span>
              <h3 className="text-base sm:text-xl font-bold mt-2 sm:mt-3 text-gray-900 dark:text-white">{t.name}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">{t.threshold}</p>
              <div className={`mt-3 sm:mt-4 inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold ${t.bg} ${t.textColor}`}>
                <span>{t.members.toLocaleString()}</span>
                <span className="opacity-60 hidden sm:inline">members</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Perks */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">{tier.name} Perks</h3>
          <p className="text-xs text-gray-400 mb-4">{tier.threshold} lifetime spend</p>
          <div className="space-y-3">
            {tier.perks.map(perk => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{perk}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-5 py-2.5 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-400 hover:border-brand-300 hover:text-brand-500 transition-all">+ Add Perk</button>
        </div>

        {/* Program Stats */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Program Health</h3>
          <div className="space-y-5">
            {[
              { label: "Points Issued", value: "2.4M pts", pct: 80, color: "bg-brand-500" },
              { label: "Points Redeemed", value: "1.8M pts", pct: 60, color: "bg-emerald-500" },
              { label: "Expiry Rate", value: "12%", pct: 12, color: "bg-amber-500" },
            ].map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-500">{s.label}</span>
                  <span className="text-gray-900 dark:text-white">{s.value}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Upgrades */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 md:col-span-2 lg:col-span-1">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Recent Tier Upgrades</h3>
          <div className="space-y-3">
            {upgrades.map(u => (
              <div key={u.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{u.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{u.from} → <span className="text-brand-500 font-bold">{u.to}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-500">{u.ltv}</p>
                  <p className="text-[10px] text-gray-400">{u.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 text-xs font-bold text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl transition-all">View All Activity →</button>
        </div>
      </div>
    </div>
  );
}
