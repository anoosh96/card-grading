import { Separator } from "@radix-ui/react-separator";

export function SubmissionSources() {
  return (
    <div className="bg-white w-full rounded-[1.25rem] p-6 shadow-sm">
      <div className="flex flex-col items-start justify-between mb-3">
        <h3 className="font-medium text-xl">Submission Sources</h3>
        <Separator className="w-full h-[1px] bg-soft-grey mt-3" />
      </div>

      <div className="bg-light-grey w-fit px-5 py-2 rounded-2xl flex items-center">
        <div className="flex items-center gap-8 h-8">
          <span className="text-sm text-pure-grey">By Post</span>
          <Separator className="w-[1px] bg-soft-grey h-full" />
          <span className="text-sm text-pure-grey">By Form</span>
        </div>
      </div>
    </div>
  );
}
