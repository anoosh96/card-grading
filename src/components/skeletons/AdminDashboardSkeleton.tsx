export function DashboardSubmissionCardSkeleton() {
  return (
    <div className="flex items-stretch flex-col lg:flex-row gap-5 animate-pulse">
      {/* Total Cards Skeleton */}
      <div className="bg-white w-full lg:w-2/5 rounded-[1.25rem] p-7 shadow-sm">
        <div className="flex flex-col items-start gap-6 mb-4">
          {/* Icon placeholder */}
          <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>

          <div>
            <div className="flex items-end">
              {/* Number placeholder */}
              <div className="h-10 bg-gray-200 rounded w-20"></div>
              {/* "Cards" text placeholder */}
              <div className="h-6 bg-gray-200 rounded w-16 ml-2 mb-1"></div>
            </div>
          </div>
        </div>
        {/* "Total Cards" text placeholder */}
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>

      {/* Cards in Process Skeleton */}
      <div className="bg-white w-full rounded-[1.25rem] p-7 shadow-sm">
        <div className="flex flex-col items-start gap-6 mb-4">
          {/* Icon placeholder */}
          <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>

          <div>
            <div className="flex items-end">
              {/* Number placeholder */}
              <div className="h-10 bg-gray-200 rounded w-20"></div>
              {/* "Cards" text placeholder */}
              <div className="h-6 bg-gray-200 rounded w-16 ml-2 mb-1"></div>
            </div>
          </div>
        </div>
        {/* "Cards in Process" text placeholder */}
        <div className="h-6 bg-gray-200 rounded w-40"></div>
      </div>
    </div>
  );
}

export default function CardImagesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-36 mb-2"></div>

      <div className="relative flex justify-around mt-2 pb-8 border border-gray-200">
        {/* Front Side */}
        <div className="flex flex-col gap-4 items-center justify-center z-10">
          <div className="h-10 bg-transparent w-24"></div>
          <div className="w-[300px] h-[341px] bg-gray-200 rounded-md"></div>
        </div>

        {/* Back Side */}
        <div className="flex flex-col gap-4 items-center justify-center z-10">
          <div className="h-10 bg-transparent w-24"></div>
          <div className="w-[300px] h-[341px] bg-gray-200 rounded-md"></div>
        </div>

        {/* Gradient header placeholder */}
        <div className="bg-gray-300 w-full h-[60px] absolute top-0 z-0"></div>
      </div>
    </div>
  );
}

export function OrderDetailsSkeleton() {
  return (
    <div className="bg-white border-md px-4 py-4 rounded-md animate-pulse">
      {/* Header Section */}
      <div className="mb-2">
        <div className="h-7 bg-gray-200 rounded w-48 mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Card Images Section */}
      <CardImagesSkeleton />

      {/* Submission Summary Section */}
      <div className="w-full bg-light-grey rounded-md shadow-sm overflow-hidden mt-4">
        <div className="p-4">
          {/* Summary Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
          </div>

          {/* Summary Fields */}
          <div className="space-y-4 px-4">
            {/* Generate placeholders for fields */}
            {[...Array(9)].map((_, index) => (
              <div key={index}>
                {/* Insert Divider Before Last Two Items */}
                {index === 7 && <div className="border-t border-gray-200 my-2"></div>}

                <div className={`grid grid-cols-2 py-1 ${
                  index >= 7 ? "text-[18px] font-medium" : ""
                }`}>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className={`h-4 ${index === 8 ? "bg-gray-300" : "bg-gray-200"} rounded w-40`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 ml-2 sm:ml-6 mt-4">
        <div className="h-10 bg-gray-300 rounded-full w-36"></div>
        <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full w-32"></div>
      </div>
    </div>
  );
}


export function SkeletonProfilePage() {
  return (
    <section className="p-10 animate-pulse">
      {/* Profile picture and basic info */}
      <div className="flex flex-col items-start justify-center w-44 gap-2">
        <div className="relative w-32 h-32">
          <div className="w-32 h-32 rounded-full bg-gray-200" />
          <div className="absolute bottom-2 right-1 w-9 h-9 rounded-full bg-gray-300" />
        </div>

        <div className="h-5 w-32 mt-4 bg-gray-200 rounded" />
        <div className="flex gap-2 text-sm items-center mt-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Form inputs */}
      <div className="mt-10 w-full">
        <div className="grid grid-cols-2 gap-8 mt-8 p-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-12 w-full bg-gray-200 rounded-md" />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex gap-6 mt-8 col-span-full">
            <div className="h-12 w-40 bg-gray-300 rounded-full" />
            <div className="h-12 w-40 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}