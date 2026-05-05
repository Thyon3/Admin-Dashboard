"use client";
import React, { useState } from "react";
import Card from "@/components/ui/card/Card";
import DataTable from "@/components/ui/table/DataTable";
import { useUserPreferences } from "@/context/UserPreferencesContext";

interface ApiIntegration {
  id: string;
  name: string;
  type: "Payment" | "Shipping" | "Analytics" | "Email" | "Social" | "Custom";
  status: "Active" | "Inactive" | "Error" | "Pending";
  apiKey: string;
  lastUsed: string;
  requests: number;
  successRate: string;
  errorCount: number;
  createdBy: string;
  createdDate: string;
  description: string;
}

const ApiIntegrationsPage = () => {
  const { preferences } = useUserPreferences();
  const isCompact = preferences.appearance.compactMode;
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showApiKeys, setShowApiKeys] = useState(false);

  const integrations: ApiIntegration[] = [
    { 
      id: "API-001", 
      name: "Stripe Payments", 
      type: "Payment",
      status: "Active", 
      apiKey: "sk_live_51H2...8f2d",
      lastUsed: "2 minutes ago",
      requests: 15420,
      successRate: "99.8%",
      errorCount: 12,
      createdBy: "Admin",
      createdDate: "2023-01-15",
      description: "Payment processing and subscription management"
    },
    { 
      id: "API-002", 
      name: "ShipStation", 
      type: "Shipping",
      status: "Active", 
      apiKey: "shpk_stag_2a4b...9c8d",
      lastUsed: "15 minutes ago",
      requests: 8920,
      successRate: "98.5%",
      errorCount: 45,
      createdBy: "Admin",
      createdDate: "2023-02-20",
      description: "Shipping and fulfillment management"
    },
    { 
      id: "API-003", 
      name: "Google Analytics", 
      type: "Analytics",
      status: "Active", 
      apiKey: "GA4-MEASUREMENT-ID",
      lastUsed: "1 hour ago",
      requests: 12450,
      successRate: "100%",
      errorCount: 0,
      createdBy: "Sarah Johnson",
      createdDate: "2023-03-10",
      description: "Website analytics and conversion tracking"
    },
    { 
      id: "API-004", 
      name: "SendGrid Email", 
      type: "Email",
      status: "Error", 
      apiKey: "SG.API_KEY...xyz123",
      lastUsed: "3 hours ago",
      requests: 6780,
      successRate: "94.2%",
      errorCount: 234,
      createdBy: "Mike Chen",
      createdDate: "2023-04-05",
      description: "Transactional email delivery"
    },
    { 
      id: "API-005", 
      name: "Facebook Marketing", 
      type: "Social",
      status: "Inactive", 
      apiKey: "facebook_app_id_123...",
      lastUsed: "2 days ago",
      requests: 3240,
      successRate: "97.1%",
      errorCount: 18,
      createdBy: "Emily Davis",
      createdDate: "2023-05-12",
      description: "Social media marketing automation"
    },
    { 
      id: "API-006", 
      name: "Custom ERP Connector", 
      type: "Custom",
      status: "Pending", 
      apiKey: "erp_custom_token_abc...",
      lastUsed: "Never",
      requests: 0,
      successRate: "N/A",
      errorCount: 0,
      createdBy: "Alex Turner",
      createdDate: "2024-05-01",
      description: "Custom ERP system integration"
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesFilter = filter === "All" || integration.type === filter || integration.status === filter;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const columns = [
    { 
      key: "name", 
      label: "Integration Details", 
      sortable: true,
      render: (value: string, row: ApiIntegration) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 dark:text-white">{value}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">{row.id}</span>
          <span className="text-xs text-gray-400 mt-1">{row.description}</span>
        </div>
      )
    },
    { 
      key: "type", 
      label: "Type", 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
          value === "Payment" ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" :
          value === "Shipping" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" :
          value === "Analytics" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" :
          value === "Email" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" :
          value === "Social" ? "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400" :
          "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: "apiKey", 
      label: "API Key", 
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <code className={`text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-mono ${
            showApiKeys ? "text-gray-900 dark:text-white" : "text-gray-400"
          }`}>
            {showApiKeys ? value : "••••••••••••••••"}
          </code>
          <button
            onClick={() => setShowApiKeys(!showApiKeys)}
            className="text-xs text-brand-500 hover:text-brand-600"
          >
            {showApiKeys ? "Hide" : "Show"}
          </button>
        </div>
      )
    },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tight ${
          value === "Active" ? "bg-success-50 text-success-500" :
          value === "Inactive" ? "bg-gray-100 text-gray-500" :
          value === "Error" ? "bg-error-50 text-error-500" :
          "bg-warning-50 text-warning-500"
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: "requests", 
      label: "Usage", 
      sortable: true,
      render: (value: number, row: ApiIntegration) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</span>
          <span className="text-xs text-gray-500">{row.successRate} success</span>
        </div>
      )
    },
    { 
      key: "lastUsed", 
      label: "Activity", 
      sortable: true,
      render: (value: string, row: ApiIntegration) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900 dark:text-white">{value}</span>
          <span className="text-xs text-gray-500">Created: {row.createdDate}</span>
        </div>
      )
    },
    { 
      key: "errorCount", 
      label: "Errors", 
      sortable: true,
      render: (value: number) => (
        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
          value === 0 ? "bg-success-50 text-success-500" :
          value < 10 ? "bg-warning-50 text-warning-500" :
          "bg-error-50 text-error-500"
        }`}>
          {value}
        </span>
      )
    },
  ];

  const statusCounts = {
    Active: integrations.filter(i => i.status === "Active").length,
    Inactive: integrations.filter(i => i.status === "Inactive").length,
    Error: integrations.filter(i => i.status === "Error").length,
    Pending: integrations.filter(i => i.status === "Pending").length,
  };

  return (
    <div className={`space-y-6 animate-in fade-in zoom-in-95 duration-500 ${isCompact ? "max-w-7xl mx-auto" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${isCompact ? "text-xl" : "text-3xl"} font-bold text-gray-900 dark:text-white tracking-tight`}>
            System <span className="text-gray-400 font-normal">/ API Integrations</span>
          </h1>
          {!isCompact && <p className="text-gray-500 mt-1">Manage third-party API integrations and monitor usage.</p>}
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              className="pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Payment">Payment</option>
            <option value="Shipping">Shipping</option>
            <option value="Analytics">Analytics</option>
            <option value="Email">Email</option>
            <option value="Social">Social</option>
            <option value="Custom">Custom</option>
          </select>
          <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-bold hover:bg-brand-600 transition-all">
            Add Integration
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
        <Card className={isCompact ? "p-3" : "p-6"}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Integrations</p>
              <p className={`${isCompact ? "text-2xl" : "text-3xl"} font-bold text-gray-900 dark:text-white mt-1`}>{integrations.length}</p>
              <p className="text-xs text-success-500 font-bold mt-1">+2 this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </Card>
        
        <Card className={isCompact ? "p-3" : "p-6"}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Active APIs</p>
              <p className={`${isCompact ? "text-2xl" : "text-3xl"} font-bold text-gray-900 dark:text-white mt-1`}>{statusCounts.Active}</p>
              <p className="text-xs text-success-500 font-bold mt-1">All systems operational</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className={isCompact ? "p-3" : "p-6"}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">API Requests</p>
              <p className={`${isCompact ? "text-2xl" : "text-3xl"} font-bold text-gray-900 dark:text-white mt-1`}>
                {integrations.reduce((sum, i) => sum + i.requests, 0).toLocaleString()}
              </p>
              <p className="text-xs text-success-500 font-bold mt-1">Last 24 hours</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className={isCompact ? "p-3" : "p-6"}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Error Rate</p>
              <p className={`${isCompact ? "text-2xl" : "text-3xl"} font-bold text-gray-900 dark:text-white mt-1`}>1.2%</p>
              <p className="text-xs text-warning-500 font-bold mt-1">Needs attention</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card key={status} className={isCompact ? "p-3" : "p-4"}>
            <div className="text-center">
              <p className={`${isCompact ? "text-2xl" : "text-3xl"} font-bold text-gray-900 dark:text-white`}>{count}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{status}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* API Keys Table */}
      <Card title="API Integrations" className={isCompact ? "p-4" : "p-6"}>
        <DataTable data={filteredIntegrations} columns={columns as any} />
      </Card>

      {/* API Health and Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="API Health Monitor" className={isCompact ? "p-4" : "p-6"}>
          <div className="space-y-4">
            {integrations.filter(i => i.status === "Active").slice(0, 4).map((integration) => (
              <div key={integration.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{integration.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">{integration.successRate}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Usage Statistics" className={isCompact ? "p-4" : "p-6"}>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Requests Today</span>
              <span className="font-bold text-gray-900 dark:text-white">2,847</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Avg Response Time</span>
              <span className="font-bold text-gray-900 dark:text-white">124ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Success Rate</span>
              <span className="font-bold text-gray-900 dark:text-white">98.8%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Rate Limit Usage</span>
              <span className="font-bold text-gray-900 dark:text-white">67%</span>
            </div>
          </div>
        </Card>

        <Card title="Quick Actions" className={isCompact ? "p-4" : "p-6"}>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              Regenerate API Keys
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              Test API Endpoints
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              View API Logs
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              Export Documentation
            </button>
          </div>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className={isCompact ? "p-4" : "p-6"} title="Security Notice">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-warning-100 dark:bg-warning-900/20 rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-warning-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">API Key Security</p>
            <p className="text-xs text-gray-500 mt-1">
              API keys are sensitive credentials. Never share them publicly or commit them to version control. 
              Rotate keys regularly and monitor usage for unauthorized access.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApiIntegrationsPage;
