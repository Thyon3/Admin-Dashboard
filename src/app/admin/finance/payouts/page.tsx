"use client";
import React from "react";

const payouts = [
  { id: "PAY-9421", date: "May 04, 2026", amount: "$12,450.00", method: "Bank Transfer", status: "Completed", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
  { id: "PAY-9420", date: "Apr 28, 2026", amount: "$8,120.50", method: "PayPal", status: "Completed", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
  { id: "PAY-9419", date: "Apr 21, 2026", amount: "$15,600.00", method: "Bank Transfer", status: "Processing", color: "text-brand-500 bg-brand-50 dark:bg-brand-500/10" },
  { id: "PAY-9418", date: "Apr 14, 2026", amount: "$9,340.00", method: "Stripe", status: "Completed", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
];

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Store Payouts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your earnings and transfer history.</p>
        </div>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/25 hover:scale-105 transition-all">Request Payout</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Available for Payout", value: "$4,230.12", grow: "Next: May 11", color: "bg-brand-500" },
          { label: "Total Paid Out", value: "$142,890", grow: "+12.5% vs LY", color: "bg-emerald-500" },
          { label: "Pending Transfers", value: "$15,600", grow: "1 transaction", color: "bg-amber-500" },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white mt-2">{s.value}</p>
            <div className="flex items-center gap-2 mt-4">
              <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
              <p className="text-xs font-bold text-gray-500">{s.grow}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white">Payout History</h3>
          <button className="text-xs font-bold text-brand-500 hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {payouts.map((p) => (
                <tr key={p.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{p.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.date}</td>
                  <td className="px-6 py-4 text-sm font-black text-gray-900 dark:text-white">{p.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.method}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${p.color}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black text-brand-500 hover:underline uppercase">View Receipt</button>
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
