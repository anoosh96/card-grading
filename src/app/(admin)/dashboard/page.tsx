"use client";

import DashboardSubmissionCard from "./components/main/DashboardSubmissionCard";
import SubmissionStatusSection from "./components/main/SubmissionStatus";
// import { DashboardSubmissionTracking } from "./components/main/DashboardSubmissiontracking";

function DashboardPage() {
  return (
    <div className="space-y-10">
      <DashboardSubmissionCard />
      {/* <DashboardSubmissionTracking /> */}
      <SubmissionStatusSection isMoreItem={true} />
    </div>
  );
}

export default DashboardPage;
