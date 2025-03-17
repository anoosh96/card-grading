import { cn } from "@/lib/utils";

type GenerateCertificateSummaryProps = {
  title?: string;
  className?: string;
  // Flattened props structure for direct value passing
  name: string;
  email: string;
  orderId: string;
  cardName: string;
  category: string;
  yearOfRelease: string;
  condition: string;
  submissionType: string;
  aiAnalysisSummary: string;
  finalGrade: string;
};

export function GenerateCertificateSummary({
  title = "Submission Summary",
  className,
  name,
  email,
  orderId,
  cardName,
  category,
  yearOfRelease,
  condition,
  submissionType,
  aiAnalysisSummary,
  finalGrade,
}: GenerateCertificateSummaryProps) {
  return (
    <div className={cn("bg-light-grey text-black rounded-lg p-6", className)}>
      <h2 className="text-2xl font-semibold mb-4 p-0">{title}</h2>

      <div className="space-y-3 mx-3 heading-tertiary text-charcol">
        {/* Personal Information */}
        <div className="flex items-center py-1">
          <span className="flex-1">Name</span>
          <span className="flex-1 text-pure-grey">{name}</span>
        </div>

        <div className="flex items-center py-1">
          <span className="flex-1">Email</span>
          <span className="flex-1 text-pure-grey">{email}</span>
        </div>

        <div className="flex items-center py-1">
          <span className="flex-1">Order Id</span>
          <span className="flex-1 text-pure-grey">{orderId}</span>
        </div>

        {/* Card Information */}
        <div className="flex items-center py-1">
          <span className="flex-1">Card Name</span>
          <span className="flex-1 text-pure-grey">{cardName}</span>
        </div>

        <div className="flex items-center py-1">
          <span className="flex-1">Category</span>
          <span className="flex-1 text-pure-grey">{category}</span>
        </div>

        <div className="flex items-center py-1">
          <span className="flex-1">Year of Release</span>
          <span className="flex-1 text-pure-grey">{yearOfRelease}</span>
        </div>

        <div className="flex items-center py-1">
          <span className="flex-1">Condition</span>
          <span className="flex-1 text-pure-grey">{condition}</span>
        </div>

        <hr />
        {/* Submission Details */}

        <div className="text-lg font-medium">
          <div className="flex items-center py-1 mt-2">
            <span className="flex-1 font-medium">Submission Type</span>
            <span className="flex-1">{submissionType}</span>
          </div>

          <div className="flex items-center py-1">
            <span className="flex-1 font-medium">AI Analysis Summary</span>
            <span className="flex-1">{aiAnalysisSummary}</span>
          </div>

          <div className="flex items-center py-1">
            <span className="flex-1 font-medium">Final Grade</span>
            <span className="flex-1 text-light-red">
              {finalGrade}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
