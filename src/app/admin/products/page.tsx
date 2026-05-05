"use client";
import React from "react";
import DataTable from "@/components/ui/table/DataTable";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const ProductsPage = () => {
  const products: Product[] = [
    { id: 1, name: "Premium Admin Template", category: "Software", price: "$49.00", stock: 150, status: "In Stock" },
    { id: 2, name: "UI Components Kit", category: "Design", price: "$29.00", stock: 12, status: "Low Stock" },
    { id: 3, name: "React Dashboard Base", category: "Software", price: "$99.00", stock: 0, status: "Out of Stock" },
    { id: 4, name: "Tailwind CSS Pack", category: "Software", price: "$19.00", stock: 500, status: "In Stock" },
  ];

  const columns = [
    { key: "name", label: "Product Name", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "In Stock" ? "bg-green-100 text-green-600" :
          value === "Low Stock" ? "bg-yellow-100 text-yellow-600" :
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Inventory</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage your digital products.</p>
        </div>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
          Add Product
        </button>
      </div>

      <DataTable data={products} columns={columns as any} />
    </div>
  );
};

export default ProductsPage;
