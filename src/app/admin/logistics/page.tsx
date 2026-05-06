"use client";
import React from "react";
import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/ui/ChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={280} />
});

export default function LogisticsOverviewPage() {
  const chartOptions: any = {
    chart: { type: "donut", fontFamily: "Outfit, sans-serif" },
    labels: ["Delivered", "In Transit", "Pending", "Exceptions"],
    colors: ["#10b981", "#465fff", "#f59e0b", "#ef4444"],
    plotOptions: { pie: { donut: { size: "75%", labels: { show: true, total: { show: true, label: "Total Ships", formatter: () => "1,327" } } } } },
    legend: { position: "bottom", labels: { colors: "#9ca3af" } },
    stroke: { show: false },
    dataLabels: { enabled: false },
    tooltip: { theme: "dark" }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Logistics Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Manage global fulfillment and carrier performance.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/25 hover:scale-105 transition-all">New Fulfillment</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl flex flex-col items-center justify-center">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6 w-full">Delivery Distribution</h3>
          <Chart options={chartOptions} series={[1120, 150, 45, 12]} type="donut" width="100%" height={280} />
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">Regional Performance</h3>
          <div className="space-y-5">
            {[
              { region: "North America", performance: 98, time: "2.1 Days", color: "bg-emerald-500" },
              { region: "Europe", performance: 94, time: "3.5 Days", color: "bg-brand-500" },
              { region: "Asia Pacific", performance: 88, time: "5.2 Days", color: "bg-amber-500" },
              { region: "Latin America", performance: 72, time: "8.4 Days", color: "bg-rose-500" },
            ].map(r => (
              <div key={r.region} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-900 dark:text-white">{r.region}</span>
                  <span className="text-gray-400 uppercase tracking-widest">{r.time} avg.</span>
                </div>
                <div className="w-full h-2 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.performance}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Carriers", value: "8", change: "+1 New", icon: "🚛" },
          { label: "Avg. Shipping Cost", value: "$12.40", change: "-4% vs LW", icon: "💰" },
          { label: "Return Rate", value: "2.1%", change: "Healthy", icon: "🔄" },
          { label: "Warehouse Capacity", value: "84%", change: "Near Peak", icon: "🏭" },
        ].map(i => (
          <div key={i.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl">
            <div className="text-2xl mb-3">{i.icon}</div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{i.value}</p>
            <p className="text-xs font-bold text-gray-500 mt-1">{i.label}</p>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="text-[10px] font-black text-brand-500 uppercase">{i.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
