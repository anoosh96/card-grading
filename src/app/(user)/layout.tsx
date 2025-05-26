'use client'

import React, { Suspense } from "react";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSkeleton, SkeletonHeader, SkeletonSidebar } from "../../components/skeletons/DashboardSkeleton";
import { useSidebar } from "@/hooks/useSidebar";
import { useUser } from "@/hooks/useUser";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  const { refetch: refetchUser } = useUser();
  refetchUser()

  return (
    <div className="min-h-screen flex">
      <Suspense fallback={<SkeletonSidebar />}>
        <DashboardSidebar />
      </Suspense>
      <div className="flex flex-col w-full">
        <Suspense fallback={<SkeletonHeader />}>
          <DashboardHeader />
        </Suspense>
        <main className={`p-5 bg-light-grey ml-0 md:ml-20 ${isCollapsed ? 'md:ml-20' : 'md:ml-72'} h-full transition-all duration-300`}>
          <Suspense fallback={<DashboardSkeleton />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}