import React, { Suspense } from "react";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSkeleton, SkeletonHeader, SkeletonSidebar } from "../../components/skeletons/DashboardSkeleton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {  
  return (
    <div className="min-h-screen flex">
      <Suspense fallback={<SkeletonSidebar />}>
        <DashboardSidebar />
      </Suspense>
      <div className="flex flex-col w-full">
        <Suspense fallback={<SkeletonHeader />}>
          <DashboardHeader />
        </Suspense>
        <main className="p-5 bg-light-grey ml-0 md:ml-20 lg:ml-72 h-full">
          <Suspense fallback={<DashboardSkeleton />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}