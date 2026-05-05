"use client";
import React from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/card/Card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardChart = () => {
  const options: any = {
    chart: {
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    grid: { show: false },
    colors: ["#465fff"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    tooltip: { x: { show: false } },
  };

  const series = [
    {
      name: "Sales",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  return (
    <Card className="col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Analytics</h3>
        <select className="bg-gray-50 dark:bg-gray-800 border-none text-sm text-gray-500 rounded-lg focus:ring-0">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="h-64">
        <Chart options={options} series={series} type="area" height="100%" />
      </div>
    </Card>
  );
};

export default DashboardChart;
