"use client";
import React from "react";
import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={300} />
});

export default function FinanceOverviewPage() {
  const chartOptions: any = {
    chart: { type: "area", toolbar: { show: false }, fontFamily: "Outfit, sans-serif", sparkline: { enabled: false } },
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100] } },
    colors: ["#465fff", "#10b981"],
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], labels: { style: { colors: "#9ca3af", fontSize: "12px" } } },
    yaxis: { labels: { style: { colors: "#9ca3af", fontSize: "12px" } } },
    grid: { borderColor: "rgba(156,163,175,0.08)", strokeDashArray: 4 },
    tooltip: { theme: "dark" },
    dataLabels: { enabled: false },
    legend: { show: true, position: "top", horizontalAlign: "right", labels: { colors: "#9ca3af" } }
  };

  const series = [
    { name: "Gross Revenue", data: [45000, 52000, 48000, 61000, 55000, 67000] },
    { name: "Payouts", data: [38000, 42000, 40000, 51000, 48000, 59000] }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Finance Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time financial performance and cash flow analysis.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Export Year-to-Date</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white">Revenue vs Payouts</h3>
            <select className="bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-xs font-bold text-gray-500 outline-none px-3 py-1.5">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <Chart options={chartOptions} series={series} type="area" height={300} />
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-500 p-6 rounded-3xl text-white shadow-xl shadow-emerald-500/20">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Net Profit Margin</p>
            <p className="text-3xl font-black mt-2">24.8%</p>
            <p className="text-[10px] font-bold mt-4 bg-white/20 inline-block px-2 py-1 rounded-md">+2.4% from last month</p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Upcoming Liabilities</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Sales Tax Q2</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Due Jun 15</p>
                </div>
                <span className="text-sm font-black text-gray-900 dark:text-white">$12,450</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Vendor Payouts</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Due in 3 days</p>
                </div>
                <span className="text-sm font-black text-gray-900 dark:text-white">$8,120</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl hover:bg-brand-500 hover:text-white transition-all">View All Liabilities</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Invoices", value: "42", desc: "$18,400 Pending", icon: "📄" },
          { label: "Avg. Payout Time", value: "2.4 Days", desc: "Instant for VIP", icon: "⚡" },
          { label: "Store Credit", value: "$1,240", desc: "12 Customers", icon: "💳" },
          { label: "Tax Compliance", value: "100%", desc: "All Jurisdictions", icon: "⚖️" },
        ].map(i => (
          <div key={i.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl">
            <div className="text-2xl mb-3">{i.icon}</div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{i.value}</p>
            <p className="text-xs font-bold text-gray-500 mt-1">{i.label}</p>
            <p className="text-[10px] text-brand-500 font-bold uppercase mt-2">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
