"use client";
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarItems = [
    // --- SECTION: INTELLIGENCE ---
    {
      id: "intelligence-group",
      label: "Intelligence",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      children: [
        { id: "dashboard", label: "Pulse Overview", href: "/admin", badge: "Live" },
        { id: "analytics-revenue", label: "Revenue Attribution", href: "/admin/analytics/revenue" },
        { id: "analytics-ltv", label: "Customer LTV", href: "/admin/analytics/ltv" },
        { id: "analytics-conversion", label: "Conversion Funnels", href: "/admin/analytics/conversion" },
      ]
    },
    // --- SECTION: OPERATIONS ---
    {
      id: "operations-group",
      label: "Operations",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      children: [
        { id: "products", label: "Products", href: "/admin/products" },
        { id: "collections", label: "Dynamic Collections", href: "/admin/collections" },
        { id: "inventory", label: "Inventory Matrix", href: "/admin/inventory" },
        { id: "orders", label: "Order Management", href: "/admin/orders", badge: "12" },
        { id: "rma", label: "Returns (RMA)", href: "/admin/returns" },
      ]
    },
    // --- SECTION: RELATIONSHIPS ---
    {
      id: "relationships-group",
      label: "Relationships",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      children: [
        { id: "customers", label: "Customer Profiles", href: "/admin/customers" },
        { id: "loyalty", label: "Loyalty Tiers", href: "/admin/loyalty" },
        { id: "tickets", label: "Support Tickets", href: "/admin/tickets", badge: "New" },
        { id: "marketing", label: "Campaign Builder", href: "/admin/marketing" },
      ]
    },
    // --- SECTION: SYSTEM ---
    {
      id: "system-group",
      label: "System",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /></svg>,
      children: [
        { id: "rbac", label: "Staff Roles (RBAC)", href: "/admin/rbac" },
        { id: "settings", label: "Global Settings", href: "/admin/settings" },
        { id: "api-keys", label: "API Integrations", href: "/admin/api-keys" },
      ]
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Sidebar
        items={sidebarItems}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header 
          onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
