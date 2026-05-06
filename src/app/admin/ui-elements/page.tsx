"use client";
import React from "react";
import Link from "next/link";

const categories = [
  {
    title: "Basic Elements",
    items: [
      { name: "Buttons", path: "/admin/buttons", icon: "🖱️", desc: "Standard actions and triggers" },
      { name: "Badges", path: "/admin/badges", icon: "🏷️", desc: "Status and labels" },
      { name: "Avatars", path: "/admin/avatars", icon: "👤", desc: "User profile images" },
    ]
  },
  {
    title: "Forms & Controls",
    items: [
      { name: "Input Fields", path: "/admin/forms", icon: "⌨️", desc: "Text, email, and passwords" },
      { name: "Toggles & Switches", path: "/admin/toggle", icon: "🔘", desc: "Binary preferences" },
      { name: "Progress Indicators", path: "/admin/progress", icon: "⏳", desc: "Loading states and steps" },
    ]
  },
  {
    title: "Complex Components",
    items: [
      { name: "Dropdowns", path: "/admin/dropdowns", icon: "🔽", desc: "Menus and selections" },
      { name: "Modals", path: "/admin/modals", icon: "🔲", desc: "Overlays and dialogs" },
      { name: "Carousel", path: "/admin/carousel", icon: "🎠", desc: "Image sliders" },
      { name: "Data Tables", path: "/admin/tables", icon: "📊", desc: "List management" },
    ]
  },
  {
    title: "Feedback & Utilities",
    items: [
      { name: "Alerts", path: "/admin/alerts", icon: "⚠️", desc: "Success and error feedback" },
      { name: "Pagination", path: "/admin/pagination", icon: "🔢", desc: "List navigation" },
      { name: "Loading States", path: "/admin/loading", icon: "🌀", desc: "Async placeholders" },
    ]
  }
];

export default function DesignSystemPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-brand-600 to-indigo-700 p-12 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-brand-500/30">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-black tracking-tight mb-4">Design System Catalog</h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Welcome to the Thyon Design System. A collection of reusable components, 
            guided by clear standards, that can be assembled together to build professional ecommerce experiences.
          </p>
        </div>
        <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20px] left-[20%] w-64 h-64 bg-brand-400/20 rounded-full blur-2xl" />
      </div>

      <div className="space-y-12 py-8">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h2 className="text-lg font-black text-gray-900 dark:text-white mb-6 px-2 flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-500 rounded-full" />
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path}
                  className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl hover:shadow-2xl hover:shadow-brand-500/10 transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-brand-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    Explore Component
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
