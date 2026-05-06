"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsSidebarCollapsed(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sidebarItems = [
    {
      id: "intelligence-group", label: "Business Insights",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      children: [
        { id: "dashboard",           label: "Pulse Overview",       href: "/admin",                        badge: "Live" },
        { id: "analytics-revenue",   label: "Revenue Attribution",  href: "/admin/analytics/revenue" },
        { id: "analytics-ltv",       label: "Customer LTV",         href: "/admin/analytics/ltv" },
        { id: "analytics-conversion",label: "Conversion Funnels",   href: "/admin/analytics/conversion" },
      ],
    },
    {
      id: "operations-group", label: "Operations",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      children: [
        { id: "products-overview", label: "Overview",            href: "/admin/products" },
        { id: "products-all",      label: "All Products",        href: "/admin/products/all" },
        { id: "collections",       label: "Collections",         href: "/admin/collections" },
        { id: "inventory",         label: "Inventory Matrix",    href: "/admin/inventory" },
        { id: "orders",            label: "Order Management",    href: "/admin/orders",  badge: "12" },
        { id: "rma",               label: "Returns (RMA)",       href: "/admin/returns" },
      ],
    },
    {
      id: "relationships-group", label: "Relationships",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      children: [
        { id: "customers", label: "Customer Profiles", href: "/admin/customers" },
        { id: "loyalty",   label: "Loyalty Tiers",     href: "/admin/loyalty" },
        { id: "tickets",   label: "Support Tickets",   href: "/admin/tickets", badge: "New" },
        { id: "marketing", label: "Campaign Builder",  href: "/admin/marketing" },
      ],
    },
    {
      id: "system-group", label: "System",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      children: [
        { id: "rbac",     label: "Staff Roles (RBAC)", href: "/admin/rbac" },
        { id: "settings", label: "Global Settings",    href: "/admin/settings" },
      ],
    },
  ];

  const handleMenuToggle = () => {
    if (isMobile) {
      setIsSidebarOpen(prev => !prev);
    } else {
      setIsSidebarCollapsed(prev => !prev);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Mobile backdrop */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar — drawer on mobile, persistent on desktop */}
      <div className={`
        ${isMobile
          ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
          : "relative flex-shrink-0"
        }
      `}>
        <Sidebar
          items={sidebarItems}
          isCollapsed={!isMobile && isSidebarCollapsed}
          onToggle={handleMenuToggle}
        />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuToggle={handleMenuToggle} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 focus:outline-none">
          <div className="max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
