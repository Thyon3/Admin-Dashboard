"use client";
import React, { useState } from "react";
import Card from "@/components/ui/card/Card";
import Toggle from "@/components/ui/toggle/Toggle";
import DataTable from "@/components/ui/table/DataTable";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member" | "Guest";
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
  avatar: string;
}

const UserManagementPage = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    { id: 1, name: "Alexander Pierce", email: "alex@company.com", role: "Owner", permissions: { read: true, write: true, delete: true }, avatar: "AP" },
    { id: 2, name: "Sarah Jenkins", email: "sarah.j@company.com", role: "Admin", permissions: { read: true, write: true, delete: false }, avatar: "SJ" },
    { id: 3, name: "Michael Vance", email: "m.vance@company.com", role: "Member", permissions: { read: true, write: false, delete: false }, avatar: "MV" },
    { id: 4, name: "Janet Smith", email: "janet.s@company.com", role: "Member", permissions: { read: true, write: true, delete: false }, avatar: "JS" },
  ]);

  const togglePermission = (id: number, permission: keyof TeamMember["permissions"]) => {
    setMembers(prev => prev.map(m => 
      m.id === id ? { ...m, permissions: { ...m.permissions, [permission]: !m.permissions[permission] } } : m
    ));
  };

  const columns = [
    { 
      key: "name", 
      label: "Team Member", 
      sortable: true,
      render: (value: string, row: TeamMember) => (
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-500 font-bold text-xs">
            {row.avatar}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
            <span className="text-xs text-gray-500">{row.email}</span>
          </div>
        </div>
      )
    },
    { 
      key: "role", 
      label: "Role", 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
          value === "Owner" ? "bg-purple-100 text-purple-600" :
          value === "Admin" ? "bg-brand-100 text-brand-600" :
          "bg-gray-100 text-gray-600"
        }`}>
          {value}
        </span>
      )
    },
    {
      key: "permissions",
      label: "Permissions",
      render: (_: any, row: TeamMember) => (
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">Read</span>
            <Toggle 
              checked={row.permissions.read} 
              onChange={() => togglePermission(row.id, "read")}
              size="sm"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">Write</span>
            <Toggle 
              checked={row.permissions.write} 
              onChange={() => togglePermission(row.id, "write")}
              size="sm"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">Delete</span>
            <Toggle 
              checked={row.permissions.delete} 
              onChange={() => togglePermission(row.id, "delete")}
              size="sm"
            />
          </div>
        </div>
      )
    },
    {
      key: "id",
      label: "Actions",
      render: () => (
        <button className="p-2 text-gray-400 hover:text-brand-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Team Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage roles and granular permissions for your organization.</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-xl shadow-brand-500/20 transition-all flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DataTable data={members} columns={columns as any} />
      </div>
    </div>
  );
};

export default UserManagementPage;
