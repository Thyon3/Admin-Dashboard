"use client";
import React from "react";

const taxData = [
  { period: "Q2 2026", sales: "$142,890.00", taxable: "$120,500.00", tax: "$10,242.50", status: "Open", color: "text-brand-500 bg-brand-50 dark:bg-brand-500/10" },
  { period: "Q1 2026", sales: "$320,400.00", taxable: "$285,000.00", tax: "$24,225.00", status: "Filed", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
  { period: "Q4 2025", sales: "$450,200.00", taxable: "$390,000.00", tax: "$33,150.00", status: "Filed", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
  { period: "Q3 2025", sales: "$280,150.00", taxable: "$240,000.00", tax: "$20,400.00", status: "Filed", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
];

export default function TaxTaxesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Tax Liability</h1>
          <p className="text-sm text-gray-500 mt-1">Review tax estimates and filing history.</p>
        </div>
        <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Export Tax Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-brand-500 to-brand-600 p-6 rounded-3xl text-white shadow-xl shadow-brand-500/20">
          <p className="text-sm font-bold uppercase tracking-widest opacity-80">Estimated Q2 Tax</p>
          <p className="text-4xl font-black mt-2">$10,242.50</p>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs font-bold opacity-80">Due in 45 days</div>
            <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-[10px] font-black uppercase transition-all">Review Details</button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Tax Exempt Sales</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold">Reseller Exempt</span>
              <span className="text-xs text-gray-900 dark:text-white font-black">$12,450.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold">Out of State</span>
              <span className="text-xs text-gray-900 dark:text-white font-black">$45,200.00</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-brand-500 rounded-full w-[35%]" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white">Filing History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800">
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Gross Sales</th>
                <th className="px-6 py-4">Taxable Amount</th>
                <th className="px-6 py-4">Total Tax</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {taxData.map((t) => (
                <tr key={t.period} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{t.period}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{t.sales}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{t.taxable}</td>
                  <td className="px-6 py-4 text-sm font-black text-gray-900 dark:text-white">{t.tax}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${t.color}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black text-brand-500 hover:underline uppercase">View Form</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
