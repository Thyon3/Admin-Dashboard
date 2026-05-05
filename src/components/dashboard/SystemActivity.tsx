import React from "react";
import Card from "@/components/ui/card/Card";

const activities = [
  { id: 1, type: "user", user: "Sarah Connor", action: "joined the team", time: "2 mins ago", color: "bg-blue-500" },
  { id: 2, type: "order", user: "Order #942", action: "was marked as shipped", time: "15 mins ago", color: "bg-green-500" },
  { id: 3, type: "security", user: "Suspicious login", action: "blocked from IP 192.168.1.1", time: "45 mins ago", color: "bg-red-500" },
  { id: 4, type: "system", user: "Server Backup", action: "completed successfully", time: "1 hour ago", color: "bg-purple-500" },
  { id: 5, type: "marketing", user: "New Campaign", action: "Summer Sale' launched", time: "3 hours ago", color: "bg-yellow-500" },
];

const SystemActivity = () => {
  return (
    <Card title="System Activity" className="h-full">
      <div className="relative space-y-6 after:absolute after:inset-y-0 after:left-[11px] after:w-px after:bg-gray-100 dark:after:bg-gray-800">
        {activities.map((item) => (
          <div key={item.id} className="relative pl-8 group">
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${item.color} ring-4 ring-white dark:ring-gray-900 z-10 flex items-center justify-center`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors">
                {item.user} <span className="font-normal text-gray-500">{item.action}</span>
              </span>
              <span className="text-xs text-gray-400 mt-1">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 text-sm font-medium text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl transition-all">
        View All Logs
      </button>
    </Card>
  );
};

export default SystemActivity;
