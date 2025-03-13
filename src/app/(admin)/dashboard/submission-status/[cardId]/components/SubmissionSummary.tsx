"use client";

type SubmissionSummaryProps = {
  title: string;
  fields: {
    name: string;
    email: string;
    orderId: string;
    cardName: string;
    category: string;
    yearOfRelease: string;
    condition: string;
    submissionDate: string;
    status: string;
  };
};

const SubmissionSummary = ({ fields, title }: SubmissionSummaryProps) => {
  const personalAndOrderInfo = [
    { label: "Name", value: fields.name },
    { label: "Email", value: fields.email },
    { label: "Order Id", value: fields.orderId },
    { label: "Card Name", value: fields.cardName },
    { label: "Category", value: fields.category },
    { label: "Year of Release", value: fields.yearOfRelease },
    { label: "Condition", value: fields.condition },
  ];

  const statusInfo = [
    { label: "Submission Date", value: fields.submissionDate },
    { label: "Status", value: fields.status },
  ];

  return (
    <div className="w-full bg-light-grey mt-4 rounded-md shadow-sm overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>

        <div className="space-y-4 px-4">
          {/* Personal and Order Information */}
          <div className="space-y-1">
            {personalAndOrderInfo.map((item) => (
              <div key={item.label} className="grid grid-cols-2 py-2">
                <span className="heading-tertiary font-medium text-gray-900">
                  {item.label}
                </span>
                <span className="heading-tertiary text-gray-600">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>

          {/* Status Information */}
          <div className="space-y-1 text-[18px] font-medium">
            {statusInfo.map((item) => (
              <div key={item.label} className="grid grid-cols-2 py-1">
                <span className="text-gray-900">
                  {item.label}
                </span>
                {item.label === "Status" ? (
                  <span className="text-orange-500">
                    {item.value}
                  </span>
                ) : (
                  <span className="text-gray-600">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSummary;
