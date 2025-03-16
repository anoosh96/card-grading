interface SubmissionSummaryProps {
  fields: { [key: string]: string | number | null };
  className?: string;
}


export default function SubmissionSummary({fields, className} : SubmissionSummaryProps) {

  const keyMap: {[key: string]: string} = {
    'cardName': 'Card Name',
    'category': 'Category',
    'year': 'Year of Release',
    'condition': 'Condition',
    'submissionType': 'Submission Type',
    'shippingStatus': 'Shipping Status'
  }

  return(
    <div className={`bg-light-grey rounded-lg p-7 ${className}`}>
      <h2 className="text-2xl font-semiBold">Submission Summary</h2>
      <div className="grid grid-cols-2 gap-4 mt-4 p-2">
        {Object.keys(fields).map((key, index) => (
            <>
              <div key={index}>
                 <span className="text-charcol">{keyMap[key]}</span>
              </div>
              <div>
                <span className="text-neutral-grey">{fields[key]}</span>
              </div>
            </>
        ))}
      </div>
    </div>
  )
}