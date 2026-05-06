// Shared chart skeleton shown while ApexCharts bundle loads
import React from "react";

export default function ChartSkeleton({ height = 220 }: { height?: number }) {
  return (
    <div className="animate-pulse w-full rounded-xl bg-gray-100 dark:bg-gray-800" style={{ height }} />
  );
}
