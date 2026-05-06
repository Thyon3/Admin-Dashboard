"use client";
import React from "react";
import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/ui/ChartSkeleton";
import Card from "@/components/ui/card/Card";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton height={350} />
});

const funnelData = {
  categories: ["Product View", "Add to Cart", "Reached Checkout", "Purchase"],
  series: [
    {
      name: "Users",
      data: [12400, 4800, 2100, 1500],
    },
  ],
};

const options: any = {
  chart: {
    type: "bar",
    height: 350,
    toolbar: { show: false },
    fontFamily: "Outfit, sans-serif",
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      horizontal: true,
      barHeight: "70%",
      distributed: true,
      dataLabels: {
        position: "bottom",
      },
    },
  },
  colors: ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef"],
  dataLabels: {
    enabled: true,
    textAnchor: "start",
    style: {
      colors: ["#fff"],
      fontSize: "14px",
      fontWeight: 700,
    },
    formatter: function (val: number, opt: any) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val.toLocaleString();
    },
    offsetX: 0,
  },
  xaxis: {
    categories: funnelData.categories,
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { show: false },
  },
  grid: {
    show: false,
  },
  tooltip: {
    theme: "dark",
    y: {
      formatter: function (val: number) {
        return val.toLocaleString() + " Users";
      },
    },
  },
  legend: { show: false },
};

export default function ConversionFunnelsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">Intelligence / Analytics</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Conversion Funnels</h1>
        <p className="text-gray-500 mt-1 text-sm">Track customer journey and identify drop-off points.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Acquisition Funnel (30 Days)" className="h-full">
            <div className="mt-4">
              <Chart options={options} series={funnelData.series} type="bar" height={350} />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Funnel Efficiency">
            <div className="space-y-6 mt-4">
              {[
                { label: "View to Cart", rate: "38.7%", status: "up", delta: "+2.4%" },
                { label: "Cart to Checkout", rate: "43.8%", status: "down", delta: "-1.1%" },
                { label: "Checkout to Purchase", rate: "71.4%", status: "up", delta: "+5.2%" },
              ].map((step, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-500">{step.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{step.rate}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold ${step.status === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                    {step.delta}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Drop-off Analysis">
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-500">Most users drop off at the <span className="font-bold text-gray-900 dark:text-white">Checkout</span> stage.</p>
              <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-900/30">
                <p className="text-xs font-bold text-brand-600 mb-1">Recommendation</p>
                <p className="text-xs text-brand-700 dark:text-brand-300">Implement one-click checkout or guest checkout to reduce friction.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
