import React from "react";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardHeader } from "./components/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {  
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex flex-col w-full ">
        <DashboardHeader />
        <main className="p-5 bg-light-grey ml-0 md:ml-20 lg:ml-72 h-full">{children}</main>
      </div>
    </div>
  );
}
