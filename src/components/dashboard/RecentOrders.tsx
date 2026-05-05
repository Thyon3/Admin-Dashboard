import React from "react";
import Card from "@/components/ui/card/Card";

const RecentOrders = () => {
  const orders = [
    { id: "#ORD-001", customer: "John Doe", product: "Admin Template", amount: "$49.00", status: "Completed" },
    { id: "#ORD-002", customer: "Jane Smith", product: "UI Kit", amount: "$29.00", status: "Pending" },
    { id: "#ORD-003", customer: "Bob Johnson", product: "React App", amount: "$99.00", status: "Processing" },
    { id: "#ORD-004", customer: "Alice Brown", product: "Next.js Dashboard", amount: "$59.00", status: "Completed" },
    { id: "#ORD-005", customer: "Charlie Davis", product: "Tailwind CSS Components", amount: "$19.00", status: "Cancelled" },
  ];

  return (
    <Card className="col-span-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        <button className="text-sm text-brand-500 hover:text-brand-600 font-medium">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100 dark:border-gray-700">
              <th className="pb-3 font-medium">ORDER ID</th>
              <th className="pb-3 font-medium">CUSTOMER</th>
              <th className="pb-3 font-medium">AMOUNT</th>
              <th className="pb-3 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="text-sm">
                <td className="py-4 text-gray-900 dark:text-white font-medium">{order.id}</td>
                <td className="py-4 text-gray-600 dark:text-gray-400">{order.customer}</td>
                <td className="py-4 text-gray-900 dark:text-white">{order.amount}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "Completed" ? "bg-green-100 text-green-600" :
                    order.status === "Pending" ? "bg-yellow-100 text-yellow-600" :
                    order.status === "Processing" ? "bg-blue-100 text-blue-600" :
                    "bg-red-100 text-red-600"
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentOrders;
