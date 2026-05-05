"use client";
import React from "react";
import DataTable from "@/components/ui/table/DataTable";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: string;
  status: "Shipped" | "Processing" | "Pending" | "Cancelled";
}

const OrdersPage = () => {
  const orders: Order[] = [
    { id: "#ORD-001", customer: "John Doe", date: "2024-05-01", total: "$49.00", status: "Shipped" },
    { id: "#ORD-002", customer: "Jane Smith", date: "2024-04-28", total: "$29.00", status: "Pending" },
    { id: "#ORD-003", customer: "Bob Johnson", date: "2024-04-25", total: "$99.00", status: "Processing" },
    { id: "#ORD-004", customer: "Alice Brown", date: "2024-04-20", total: "$59.00", status: "Shipped" },
  ];

  const columns = [
    { key: "id", label: "Order ID", sortable: true },
    { key: "customer", label: "Customer", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "total", label: "Total", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Shipped" ? "bg-green-100 text-green-600" :
          value === "Processing" ? "bg-blue-100 text-blue-600" :
          value === "Pending" ? "bg-yellow-100 text-yellow-600" :
          "bg-red-100 text-red-600"
        }`}>
          {value}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order History</h1>
          <p className="text-gray-500 dark:text-gray-400">Track and manage customer orders.</p>
        </div>
      </div>

      <DataTable data={orders} columns={columns as any} />
    </div>
  );
};

export default OrdersPage;
