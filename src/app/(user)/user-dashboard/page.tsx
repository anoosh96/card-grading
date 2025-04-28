import { Suspense } from "react";
import DashboardSubmissionCard from "../components/main/DashboardSubmissionCard";
import { DashboardSubmissionTracking } from "../components/main/DashboardSubmissiontracking";
import { SkeletonCard, SkeletonTracking } from "../../../components/skeletons/DashboardSkeleton";

function DashboardPage() {
  return (
    <div className="space-y-10">
      <Suspense fallback={<SkeletonCard />}>
        <DashboardSubmissionCard />
      </Suspense>
      
      <Suspense fallback={<SkeletonTracking />}>
        <DashboardSubmissionTracking showViewAll={true} />
      </Suspense>
    </div>
  );
}

export default DashboardPage