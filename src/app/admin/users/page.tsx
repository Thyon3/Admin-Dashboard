"use client";
import React from "react";
import DataTable from "@/components/ui/table/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Banned";
  lastLogin: string;
}

const UsersPage = () => {
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-05-01" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", lastLogin: "2024-04-28" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", lastLogin: "2024-03-15" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active", lastLogin: "2024-04-30" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Moderator", status: "Banned", lastLogin: "2024-01-20" },
  ];

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Active" ? "bg-green-100 text-green-600" :
          value === "Inactive" ? "bg-gray-100 text-gray-600" :
          "bg-red-100 text-red-600"
        }`}>
          {value}
        </span>
      )
    },
    { key: "lastLogin", label: "Last Login", sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your system users and their roles.</p>
        </div>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
          Add New User
        </button>
      </div>

      <DataTable data={users} columns={columns as any} />
    </div>
  );
};

export default UsersPage;
