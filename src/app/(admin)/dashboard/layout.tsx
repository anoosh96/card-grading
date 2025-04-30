'use client'

import React from "react";
import { DashboardSidebar } from "./components/sidebar/DashboardSidebar";
import { DashboardHeader } from "./components/header/DashboardHeader";
import { useSidebar } from "@/hooks/useSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex flex-col w-full ">
        <DashboardHeader />
        <main className={`p-5 bg-light-grey ml-0 md:ml-20 ${isCollapsed ? 'md:ml-20' : 'md:ml-72'} h-full transition-all duration-300`}>{children}</main>
      </div>
    </div>
  );
}
