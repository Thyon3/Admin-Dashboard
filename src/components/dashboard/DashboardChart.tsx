"use client";
import React from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/card/Card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardChart = () => {
  const options: any = {
    chart: {
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3, lineCap: "round" },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#9ca3af", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9ca3af", fontSize: "12px" },
        formatter: (val: number) => `$${val}k`,
      },
    },
    grid: {
      borderColor: "rgba(156, 163, 175, 0.1)",
      strokeDashArray: 4,
    },
    colors: ["#465fff", "#10b981"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -20,
      itemMargin: { horizontal: 10 },
      markers: { radius: 12 },
    },
    tooltip: {
      theme: "dark",
      x: { show: false },
    },
  };

  const series = [
    {
      name: "Revenue",
      data: [45, 52, 38, 65, 48, 82, 75],
    },
    {
      name: "Expenses",
      data: [35, 41, 32, 45, 38, 52, 48],
    },
  ];

  return (
    <Card title="Revenue vs Expenses" className="col-span-1 lg:col-span-2">
      <div className="h-80">
        <Chart options={options} series={series} type="area" height="100%" />
      </div>
    </Card>
  );
};

export default DashboardChart;
