"use client";

import DashboardSubmissionCard from "./components/main/DashboardSubmissionCard";
import DashboardSubmissionStatus from "./components/main/DashboardSubmissionStatus";

function DashboardPage() {
  return (
    <div className="space-y-5">
      <DashboardSubmissionCard />
      <DashboardSubmissionStatus isMoreItem={true} />
    </div>
  );
}

export default DashboardPage;
