import DashboardCardsInProgressIcon from "@/components/svgs/DashboardCardsInProgressIcon";

export function SubmissionSources() {
  return (
    <div className="bg-white w-full rounded-[1.25rem] p-7 shadow-sm">
      <div className="flex flex-col items-start  gap-6 mb-4">
        <div className="bg-[#1CC0CB] p-3 rounded-lg">
          <DashboardCardsInProgressIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="flex items-end">
            <h2 className="text-[2rem] text-charcol font-bold">87</h2>
            <p className="text-base text-charcol px-2 mb-1">Cards</p>
          </div>
        </div>
      </div>
      <h3 className="font-medium text-xl text-charcol">Cards in Process</h3>
    </div>
  );
}
