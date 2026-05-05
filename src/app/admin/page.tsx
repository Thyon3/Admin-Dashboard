"use client";
import React from "react";
import Card from "@/components/ui/card/Card";
import PulseMetric from "@/components/dashboard/PulseMetric";
import DashboardChart from "@/components/dashboard/DashboardChart";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PulseDashboard() {
  const { preferences } = useUserPreferences();
  const isCompact = preferences.appearance.compactMode;

  return (
    <div className={`space-y-6 animate-in fade-in zoom-in-95 duration-500 ${isCompact ? "max-w-7xl mx-auto" : ""}`}>
      {/* Pulse Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${isCompact ? "text-xl" : "text-3xl"} font-bold text-gray-900 dark:text-white tracking-tight`}>
            Intelligence <span className="text-gray-400 font-normal">/ Pulse Overview</span>
          </h1>
          {!isCompact && <p className="text-gray-500 mt-1">Real-time system health and commercial performance.</p>}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-3 py-1.5 bg-success-50 text-success-600 rounded-full text-xs font-bold ring-1 ring-success-500/20">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
            </span>
            SYSTEM ONLINE
          </div>
        </div>
      </div>

      {/* Metric Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
        <Card className={isCompact ? "p-3" : "p-6"}>
          <PulseMetric label="Global Revenue" value="$2.4M" subValue="14.2%" status="up" />
        </Card>
        <Card className={isCompact ? "p-3" : "p-6"}>
          <PulseMetric label="Avg. Order Value" value="$184.20" subValue="2.1%" status="up" />
        </Card>
        <Card className={isCompact ? "p-3" : "p-6"}>
          <PulseMetric label="Churn Rate" value="1.24%" subValue="0.8%" status="down" />
        </Card>
        <Card className={isCompact ? "p-3" : "p-6"}>
          <PulseMetric label="Active Funnels" value="12" subValue="Stable" status="stable" />
        </Card>
      </div>

      {/* Analytics Main View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardChart />
        </div>
        
        <Card title="Traffic attribution" className="h-full">
          <div className="space-y-4">
            {[
              { label: "Direct", value: 45, color: "bg-brand-500" },
              { label: "Organic Search", value: 25, color: "bg-success-500" },
              { label: "Social Media", value: 20, color: "bg-warning-500" },
              { label: "Referral", value: 10, color: "bg-error-500" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 transition-all">
            Full Attribution Report
          </button>
        </Card>
      </div>

      {/* Bottom Section: LTV Heatmap Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Customer Segments" className="md:col-span-1">
          <div className="flex items-center justify-center h-48">
             <div className="text-center">
               <div className="text-4xl font-bold text-brand-500 mb-2">84%</div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Retention Rate</p>
             </div>
          </div>
        </Card>
        <Card title="Real-time Sales Log" className="md:col-span-2">
          <div className="space-y-3">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                   <div>
                     <p className="text-sm font-bold">Order #98{i}42</p>
                     <p className="text-[10px] text-gray-500 uppercase font-bold">2 mins ago</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-success-500">+$249.00</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Paid</p>
                 </div>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
