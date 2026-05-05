"use client";
import React from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/card/Card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface KPICardProps {
  title: string;
  value: string;
  trend: number;
  data: number[];
  color: string;
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, data, color, icon }) => {
  const isPositive = trend >= 0;

  const chartOptions: any = {
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: true },
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100],
      },
    },
    colors: [color],
    tooltip: { enabled: false },
  };

  const series = [{ name: title, data }];

  return (
    <Card className="relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <div className={`flex items-center space-x-1 text-sm font-bold ${isPositive ? "text-success-500" : "text-error-500"}`}>
          <span>{isPositive ? "↑" : "↓"}</span>
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-50 group-hover:opacity-100 transition-opacity">
        <Chart options={chartOptions} series={series} type="area" height="100%" width="100%" />
      </div>
    </Card>
  );
};

export default KPICard;
