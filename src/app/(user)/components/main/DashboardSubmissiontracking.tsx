'use client'

import Image from "next/image";
import { formatSubmissionStatus, getCardsSummary } from "@/app/(user)/lib/utils/helpers";
import { useState } from "react";
import CustomModal from "@/components/common/CustomModal";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import CustomDropdown from "@/components/common/CustomDropDown/CustomDropDown";
import TrackIcon from "@/components/svgs/dashboard/TrackIcon";
import { useRouter } from "next/navigation";
import { useSubmissions } from "@/hooks/useSubmissions";
import { submissionStatus } from "../../lib/utils/constants";
import { useDeleteSubmission } from "@/hooks/useDeleteSubmission";
import { Submission } from "@/types";
import { SkeletonTracking } from "@/components/skeletons/DashboardSkeleton";
import { formatToUSTimezone, padId } from "@/lib/utils";

interface SubmissionTrackingProps {
  showViewAll?: boolean;
}

export function DashboardSubmissionTracking({ showViewAll = false }: SubmissionTrackingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  const router = useRouter();
  const { data, isLoading, isError } = useSubmissions(limit, page);
  const deleteMutation = useDeleteSubmission();

  const handleViewAll = () => {
    router.push('/user-dashboard/submission-status');
  };

  const handleDeleteClick = (submissionId: string) => {
    setSelectedSubmissionId(submissionId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedSubmissionId) {
      await deleteMutation.mutateAsync(selectedSubmissionId);
      setIsModalOpen(false);
      setSelectedSubmissionId(null);
    }
  };
  

  // const getStatusBadge = (status: string) => {
  //   switch (status) {
  //     case submissionStatus.GRADING_COMPLETE:
  //       return (
  //         <div className="text-center rounded-[1.4rem] md:rounded-full py-3 px-2 bg-green-100 text-[#3A974C] text-[0.6rem] md:text-xs lg:text-base">
  //           {formatSubmissionStatus(status)}
  //         </div>
  //       );
  //     case submissionStatus.SUBMISSION_PENDING:
  //     case submissionStatus.SUBMISSION_REJECTED:
  //       return (
  //         <div className="text-center rounded-[1.4rem] md:rounded-full py-3 px-2 bg-[#fcebe7] text-[#E3350D] text-[0.6rem] md:text-xs lg:text-base">
  //           {formatSubmissionStatus(status)}
  //         </div>
  //       );
  //     case submissionStatus.SUBMISSION_RECEIVED:
  //     case submissionStatus.GRADING_IN_PROGRESS:
  //       return (
  //         <div className="text-center rounded-[1.4rem] md:rounded-full py-3 px-2 bg-[#fbf6e2] text-[#FFCC00] text-[0.6rem] md:text-xs lg:text-base">
  //           {formatSubmissionStatus(status)}
  //         </div>
  //       );
  //     default:
  //       return <div className="text-[0.6rem] md:text-xs lg:text-sm">{formatSubmissionStatus(status)}</div>;
  //   }
  // };

  const dropdownItems = (submissionId: string) => [
    {
      label: "View Detail",
      icon: <Eye className="h-4 w-4" />,
      onClick: () => router.push(`/user-dashboard/submission-status/order-details?id=${submissionId}`),
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => handleDeleteClick(submissionId),
    },
  ];

  if (isLoading) return <SkeletonTracking />;
  if (isError) return <div className="p-5 text-red-500">Failed to load submissions.</div>;

  const submissions = data?.data?.submissions || [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages || 1;
  const currentPage = meta?.currentPage || 1;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center p-5 justify-between mb-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-[2rem] text-charcol">Order Status</h3>
          <p className="text-sm text-pure-grey">Real-time updates on grading status</p>
        </div>
        {showViewAll && (
          <button onClick={handleViewAll} className="text-primary underline font-medium text-sm">
            View all &gt;
          </button>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        {submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg text-gray-500 font-medium">No submissions created yet</p>
            <p className="text-sm text-pure-grey mt-2">Your submission tracking information will appear here once you create an order</p>
          </div>
        ) : (
          <>
            <table className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 pl-4 lg:pl-16 pr-4 text-xs md:text-base">Order No</th>
                  <th className="text-left py-3 pl-4 lg:pl-16 pr-4 text-xs md:text-base">Date and Time</th>
                  <th className="text-left py-3 px-4 text-xs md:text-base">Total Cards</th>
                  {/* <th className="text-left py-3 px-4 text-xs md:text-base">Submission Source</th> */}
                  <th className="text-left py-3 pl-4 pr-4 lg:pr-16 text-xs md:text-base">Cards Summary</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission: Submission) => (
                  <tr key={submission.id} className="border-b last:border-0">
                    <td className="py-5 pl-4 lg:pl-16 pr-4 text-xs md:text-base">#{padId(submission.id)}</td>
                    <td className="py-3 pl-4 lg:pl-16 pr-4 text-xs md:text-base">
                      <div className="flex gap-2">
                        <Image src={"/icons/calendar.svg"} alt="Calendar Icon" width={15} height={15} />
                        <div>{formatToUSTimezone(submission.dateTime)}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs md:text-base">
                      { submission.numberOfCards }
                    </td>
                    {/* <td className="py-3 px-4 text-xs md:text-base">{submissionSourceMap[submission.submissionSource]}</td> */}
                    <td className="py-3 px-4 text-xs lg:text-base">
                      {getCardsSummary(submission.cards, submission.numberOfCards)}
                    </td>
                    <td className="py-3 px-4">
                      <CustomDropdown items={dropdownItems(submission.id)} dropdownClassName="right-2">
                        <MoreHorizontal className="h-4 w-4" />
                      </CustomDropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && !showViewAll && (
              <div className="flex justify-center items-center gap-4 mt-6 mb-8">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded border text-sm ${currentPage === 1 ? 'text-gray-400 border-gray-300' : 'text-primary border-primary'
                    }`}
                >
                  Previous
                </button>

                <span className="text-base font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded border text-sm ${currentPage === totalPages ? 'text-gray-400 border-gray-300' : 'text-primary border-primary'
                    }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <CustomModal
        isOpen={isModalOpen}
        title="Are you sure you want to delete this order?"
        message="This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedSubmissionId(null);
        }}
        cn="!p-20 !rounded-2xl"
      />
    </div>
  );
}