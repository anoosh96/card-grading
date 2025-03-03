import DashboardTotalCardsIcon from "@/components/svgs/DashboardTotalCardsIcons";
import React from "react";
import { SubmissionSources } from "./SubmissionSources";

function DashboardSubmissionCard() {
  return (
    <div className="flex items-stretch flex-col lg:flex-row gap-5">
      <div className="bg-white w-full lg:w-2/5 rounded-[1.25rem] p-7 shadow-sm">
        <div className="flex flex-col items-start  gap-6 mb-4">
          <div className="bg-primary p-3 rounded-lg">
            <DashboardTotalCardsIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-end">
              <h2 className="text-[2rem] text-charcol font-bold">1,250</h2>
              <p className="text-base text-charcol px-2 mb-1">Cards</p>
            </div>
          </div>
        </div>
        <h3 className="font-medium text-xl text-charcol">Total Submissions</h3>
      </div>

      <SubmissionSources />
    </div>
  );
}

export default DashboardSubmissionCard;
