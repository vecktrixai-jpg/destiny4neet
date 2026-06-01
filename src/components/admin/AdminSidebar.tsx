"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoutButton } from "@/components/admin/LogoutButton";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { href: "/admin/resources", icon: "description", label: "Resource Manager" },
    { href: "/admin/leads", icon: "group", label: "Leads" },
  ];

  return (
    <>
      {/* SideNavBar Shell */}
      <aside className={`relative sticky top-0 hidden h-screen flex-col border-r border-slate-200 bg-slate-50 font-inter text-sm font-medium transition-all duration-300 ease-in-out md:flex dark:border-slate-800 dark:bg-slate-950 ${isCollapsed ? "w-20" : "w-64"}`}>
        
        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:text-blue-400"
        >
          <span className="material-symbols-outlined text-[14px]">
            {isCollapsed ? "chevron_right" : "chevron_left"}
          </span>
        </button>

        <div className={`flex flex-col px-6 py-8 ${isCollapsed ? "items-center px-0" : "items-start"}`}>
          <div className={`mb-6 flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-primary-container text-on-primary-container">
              <span className="material-symbols-outlined">school</span>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden transition-all duration-300">
                <h1 className="whitespace-nowrap text-lg font-black leading-none text-slate-900 dark:text-white">Admin Portal</h1>
                <p className="mt-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-slate-500">Management</p>
              </div>
            )}
          </div>
        </div>
        
        <nav className="flex-grow space-y-1 px-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                title={isCollapsed ? link.label : undefined}
                className={`flex items-center rounded-lg py-2.5 transition-colors ${
                  isCollapsed ? "justify-center px-0" : "gap-3 px-4"
                } ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-blue-400"
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                {!isCollapsed && <span className="whitespace-nowrap">{link.label}</span>}
              </Link>
            );
          })}
        </nav>
        
        <div className={`space-y-1 border-t border-slate-200 pb-6 pt-4 dark:border-slate-800 ${isCollapsed ? "px-2" : "px-3"}`}>
          <Link 
            href="/" 
            title={isCollapsed ? "Public Site" : undefined}
            className={`flex items-center rounded-lg py-2.5 text-slate-600 transition-colors hover:bg-slate-200/50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-blue-400 ${
              isCollapsed ? "justify-center px-0" : "gap-3 px-4"
            }`}
          >
            <span className="material-symbols-outlined">public</span>
            {!isCollapsed && <span className="whitespace-nowrap">Public Site</span>}
          </Link>
          <div className={isCollapsed ? "flex justify-center" : ""}>
            <LogoutButton isCollapsed={isCollapsed} />
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-900">
        {navLinks.filter(link => link.href !== "#").map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 ${
                isActive ? "text-blue-600" : "text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="text-[10px] font-bold">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
