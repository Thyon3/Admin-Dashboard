"use client";
import React, { useState } from "react";
import Toggle from "@/components/ui/toggle/Toggle";

interface Permission { id: string; label: string; desc: string; }
interface Role { id: string; name: string; desc: string; color: string; members: number; permissions: string[]; }

const allPerms: Permission[] = [
  { id: "view_dashboard",   label: "View Dashboard",   desc: "Access analytics and KPI overview" },
  { id: "manage_orders",    label: "Manage Orders",     desc: "Create, edit, and fulfil orders" },
  { id: "manage_products",  label: "Manage Products",   desc: "Add, update, and remove products" },
  { id: "manage_inventory", label: "Manage Inventory",  desc: "Edit stock levels and warehouse data" },
  { id: "manage_customers", label: "Manage Customers",  desc: "View and edit customer profiles" },
  { id: "manage_marketing", label: "Run Campaigns",     desc: "Create discounts and campaigns" },
  { id: "manage_staff",     label: "Manage Staff",      desc: "Invite, edit, and remove staff members" },
  { id: "manage_settings",  label: "System Settings",   desc: "Access global configuration and API keys" },
];

const rolesData: Role[] = [
  { id: "owner",   name: "Owner",           desc: "Full unrestricted access",         color: "bg-purple-500", members: 1,  permissions: allPerms.map(p => p.id) },
  { id: "admin",   name: "Administrator",   desc: "All access except billing",        color: "bg-brand-500",  members: 3,  permissions: allPerms.map(p => p.id).filter(p => p !== "manage_settings") },
  { id: "manager", name: "Ops Manager",     desc: "Orders, products, and inventory",  color: "bg-emerald-500",members: 8,  permissions: ["view_dashboard","manage_orders","manage_products","manage_inventory"] },
  { id: "support", name: "Support Agent",   desc: "Read-only customer & order access",color: "bg-amber-500",  members: 14, permissions: ["view_dashboard","manage_customers"] },
  { id: "analyst", name: "Data Analyst",    desc: "Analytics and reporting only",     color: "bg-cyan-500",   members: 4,  permissions: ["view_dashboard"] },
];

const staffMembers = [
  { name: "John Doe",     email: "john.d@co.io",   role: "owner",   avatar: "JD", color: "bg-purple-500" },
  { name: "Sarah Connor", email: "s.connor@co.io",  role: "admin",   avatar: "SC", color: "bg-brand-500" },
  { name: "Marcus Chen",  email: "m.chen@co.io",    role: "manager", avatar: "MC", color: "bg-emerald-500" },
  { name: "Priya Sharma", email: "p.sharma@co.io",  role: "support", avatar: "PS", color: "bg-amber-500" },
];

export default function RBACPage() {
  const [selectedRole, setSelectedRole] = useState("manager");
  const [perms, setPerms] = useState<Record<string, string[]>>(
    Object.fromEntries(rolesData.map(r => [r.id, [...r.permissions]]))
  );
  const [saved, setSaved] = useState(false);

  const currentPerms = perms[selectedRole] || [];
  const selectedRoleData = rolesData.find(r => r.id === selectedRole)!;

  const toggle = (permId: string) => {
    if (selectedRole === "owner") return;
    setPerms(prev => ({
      ...prev,
      [selectedRole]: prev[selectedRole].includes(permId)
        ? prev[selectedRole].filter(p => p !== permId)
        : [...prev[selectedRole], permId],
    }));
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">System</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Staff Roles & Permissions</h1>
          <p className="text-gray-500 mt-1 text-sm hidden sm:block">Role-Based Access Control · {staffMembers.length} members</p>
        </div>
        <button className="self-start sm:self-auto px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all">+ Invite Member</button>
      </div>

      {/* Role Selector — 3 cols on mobile, 5 on lg */}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {rolesData.map(r => (
          <div key={r.id} onClick={() => setSelectedRole(r.id)}
            className={`p-3 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all hover:-translate-y-0.5 ${selectedRole === r.id ? "border-brand-500 shadow-lg shadow-brand-500/10" : "border-transparent bg-white dark:bg-gray-900"}`}>
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${r.color} mb-2 sm:mb-3`} />
            <p className={`text-xs sm:text-sm font-bold leading-tight ${selectedRole === r.id ? "text-brand-500" : "text-gray-900 dark:text-white"}`}>{r.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 hidden sm:block">{r.members} members</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Permission Matrix */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{selectedRoleData.name}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{selectedRoleData.desc}</p>
            </div>
            {selectedRole !== "owner" && (
              <button onClick={handleSave}
                className={`self-start sm:self-auto px-4 py-2 rounded-xl text-sm font-bold transition-all ${saved ? "bg-emerald-500 text-white" : "bg-brand-500 text-white hover:bg-brand-600"}`}>
                {saved ? "✓ Saved" : "Save Changes"}
              </button>
            )}
          </div>
          <div className="space-y-2 sm:space-y-3">
            {allPerms.map(perm => (
              <div key={perm.id}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all ${currentPerms.includes(perm.id) ? "border-brand-200 bg-brand-50/50 dark:border-brand-900/30 dark:bg-brand-900/10" : "border-gray-100 dark:border-gray-800"}`}>
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{perm.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{perm.desc}</p>
                </div>
                <Toggle checked={currentPerms.includes(perm.id)} onChange={() => toggle(perm.id)} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Staff List + Coverage */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-4">Team Members</h2>
            <div className="space-y-2 sm:space-y-3">
              {staffMembers.map(s => {
                const roleInfo = rolesData.find(r => r.id === s.role)!;
                return (
                  <div key={s.email} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${s.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{s.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{s.name}</p>
                      <p className="text-[10px] text-gray-400 truncate hidden sm:block">{s.email}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white flex-shrink-0 ${roleInfo.color}`}>{roleInfo.name.split(" ")[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Permission Coverage</h3>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-500">Selected Role</span>
                <span className="text-brand-500">{currentPerms.length}/{allPerms.length} permissions</span>
              </div>
              <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${(currentPerms.length / allPerms.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
