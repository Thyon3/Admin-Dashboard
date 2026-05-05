import React from "react";
import Card from "@/components/ui/card/Card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <Card className="flex items-center space-x-4">
      <div className="p-3 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-500">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        <p className={`text-sm mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? "↑" : "↓"} {change}
          <span className="text-gray-400 dark:text-gray-500 ml-1">vs last month</span>
        </p>
      </div>
    </Card>
  );
};

export default StatCard;
