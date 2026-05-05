"use client";
import React from "react";
import Card from "@/components/ui/card/Card";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ConversionFunnelsPage = () => {
  const { preferences } = useUserPreferences();
  const isCompact = preferences.appearance.compactMode;
  const funnelOptions: any = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: true,
        barHeight: "70%",
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: string, opt: any) => opt.w.globals.labels[opt.dataPointIndex] + ": " + val,
      dropShadow: { enabled: true },
    },
    colors: ["#465fff"],
    xaxis: {
      categories: ["Visitors", "Add to Cart", "Checkout Start", "Payment Info", "Purchased"],
    },
    legend: { show: false },
  };

  const funnelSeries = [
    {
      name: "Users",
      data: [12500, 8400, 5200, 4100, 3200],
    },
  ];

  const trendOptions: any = {
    chart: {
      type: "line",
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    stroke: { curve: "smooth", width: 4 },
    colors: ["#10b981"],
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      labels: { style: { colors: "#9ca3af" } },
    },
    yaxis: { labels: { style: { colors: "#9ca3af" } } },
    grid: { borderColor: "rgba(156, 163, 175, 0.1)" },
  };

  const trendSeries = [
    {
      name: "Conversion Rate",
      data: [2.1, 2.5, 2.3, 2.8],
    },
  ];

  return (
    <div className={`space-y-6 animate-in fade-in zoom-in-95 duration-500 ${isCompact ? "max-w-7xl mx-auto" : ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${isCompact ? "text-xl" : "text-3xl"} font-bold text-gray-900 dark:text-white tracking-tight`}>
            Intelligence <span className="text-gray-400 font-normal">/ Conversion Funnels</span>
          </h1>
          {!isCompact && <p className="text-gray-500 mt-1">Analyzing customer drop-off points across the sales journey.</p>}
        </div>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <option>All Funnels</option>
            <option>E-commerce</option>
            <option>Lead Generation</option>
            <option>Free Trial</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Sales Funnel Performance" className="lg:col-span-2">
          <div className="h-96">
            <Chart options={funnelOptions} series={funnelSeries} type="bar" height="100%" />
          </div>
        </Card>

        <Card title="Key Funnel Metrics">
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-500/10">
              <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Overall Conversion</p>
              <h3 className="text-2xl font-bold">2.56%</h3>
              <p className="text-[10px] text-success-500 font-bold mt-1">↑ 0.4% from last month</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Cart Abandonment</p>
              <h3 className="text-2xl font-bold">38.2%</h3>
              <p className="text-[10px] text-error-500 font-bold mt-1">↓ 2.1% improvement</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Checkout Success</p>
              <h3 className="text-2xl font-bold">78.0%</h3>
              <p className="text-[10px] text-gray-400 font-bold mt-1">Stable</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Weekly Conversion Trend">
          <div className="h-64">
            <Chart options={trendOptions} series={trendSeries} type="line" height="100%" />
          </div>
        </Card>

        <Card title="Optimization Insights">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-success-50 text-success-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Checkout flow optimized</p>
                <p className="text-xs text-gray-500">The recent change to single-page checkout improved completion by 12%.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-warning-50 text-warning-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Cart drop-off alert</p>
                <p className="text-xs text-gray-500">High drop-off on mobile devices during 'Add to Cart' stage. Check CSS layout.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConversionFunnelsPage;
