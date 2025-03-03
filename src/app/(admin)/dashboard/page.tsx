import DashboardSubmissionCard from "./components/main/DashboardSubmissionCard";
import { DashboardSubmissionTracking } from "./components/main/DashboardSubmissiontracking";

function DashboardPage() {
  return (
    <div className="space-y-10">
      <DashboardSubmissionCard />
      <DashboardSubmissionTracking />
    </div>
  );
}

export default DashboardPage;
