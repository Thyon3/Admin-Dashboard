import React from "react";

interface PulseMetricProps {
  label: string;
  value: string;
  subValue: string;
  status: "up" | "down" | "stable";
}

const PulseMetric: React.FC<PulseMetricProps> = ({ label, value, subValue, status }) => {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</span>
      <div className="flex items-baseline space-x-2">
        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</span>
        <span className={`text-[10px] font-bold ${
          status === "up" ? "text-success-500" : status === "down" ? "text-error-500" : "text-gray-400"
        }`}>
          {status === "up" ? "↑" : status === "down" ? "↓" : "•"} {subValue}
        </span>
      </div>
      <div className="mt-2 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            status === "up" ? "bg-success-500" : status === "down" ? "bg-error-500" : "bg-brand-500"
          }`}
          style={{ width: status === "up" ? "85%" : status === "down" ? "35%" : "60%" }}
        ></div>
      </div>
    </div>
  );
};

export default PulseMetric;
