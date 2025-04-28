'use client';

import { FC, useState } from 'react';
import { ChevronRight, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { CustomCheckbox } from '@/components/ui/checkbox';
import CalendarIcon from '@/components/svgs/dashboard/CalendarIcon';
import CustomDropdown from '@/components/common/CustomDropDown/CustomDropDown';
import Link from '@/components/common/CustomLink/CustomLink';
import { useRouter } from 'next/navigation';
import CustomModal from '@/components/common/CustomModal';
import { dateFormat, formatSubmissionStatus } from '@/app/(user)/lib/utils/helpers';
import { submissionSourceMap, submissionStatus } from '@/app/(user)/lib/utils/constants';
import { useAdminSubmissions } from '@/hooks/useAdminSubmissions';
import { Submission, SubmissionInfo } from '@/types';
import { useAdminDeleteSubmission } from '@/hooks/useAdminDeleteSubmission';

interface DashboardSubmissionStatusProps {
  isMoreItem?: boolean;
}

const DashboardSubmissionStatus: FC<DashboardSubmissionStatusProps> = ({
  isMoreItem = false,
}) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const router = useRouter();
  const { data, isLoading, isError } = useAdminSubmissions(limit, page);
  const deleteMutation = useAdminDeleteSubmission();

  const handleDeleteClick = (submissionId: string) => {
    setSelectedSubmissionId(submissionId);
    setIsDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedSubmissionId) {
      await deleteMutation.mutateAsync(selectedSubmissionId);
      setIsDeleteModal(false);
      setSelectedSubmissionId(null);
    }
  };

  const handleViewDetailClick = (submission: SubmissionInfo) => {
    const route = `/dashboard/submission-status/${submission.id}`
    router.push(route)
  }

  const submissions = data?.data?.submissions || [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages || 1;
  const currentPage = meta?.currentPage || 1;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case submissionStatus.GRADING_COMPLETE:
        return (
          <div className="text-center rounded-full p-2 w-[70%] bg-green-100 text-[#3A974C]">
            {formatSubmissionStatus(status)}
          </div>
        );
      case submissionStatus.SUBMISSION_PENDING:
        return (
          <div className="text-center rounded-full p-2 w-[70%] bg-[#fcebe7] text-[#E3350D]">
            {formatSubmissionStatus(status)}
          </div>
        );
      case submissionStatus.SUBMISSION_RECEIVED:
        return (
          <div className="text-center rounded-full p-2 w-[70%] bg-[#fbf6e2] text-[#FFCC00]">
            {formatSubmissionStatus(status)}
          </div>
        );
      case submissionStatus.SUBMISSION_REJECTED:
        return (
          <div className="text-center rounded-full p-2 w-[70%] bg-[#fcebe7] text-[#E3350D]">
            {formatSubmissionStatus(status)}
          </div>
        );
      default:
        return <div>{formatSubmissionStatus(status)}</div>;
    }
  };

  if (isLoading) return <div className="p-5">Loading submissions…</div>;
  if (isError) return <div className="p-5 text-red-500">Failed to load submissions.</div>;

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-sm border">
      <div className="p-4 flex justify-between items-center border-b">
        <div>
          <h2 className="heading-primary font-bold">Submission Status</h2>
          <p className="heading-tertiary text-muted-foreground">
            Latest actions across the grading workflow
          </p>
        </div>
        {isMoreItem && (
          <Link
            href="/dashboard/submission-status"
            className="flex-between hover:underline text-[#E3350D]"
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-sm font-medium text-left">
            <tr>
              <th className="w-10 p-3">
                <CustomCheckbox />
              </th>
              <th className="p-3">Track No</th>
              <th className="p-3">Date & Time</th>
              {/* <th className="p-3">Action</th> */}
              <th className="p-3">Submission Source</th>
              <th className="p-3">Card Status</th>
              <th className="w-10 p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {submissions.map((submission: Submission) => (
              <tr key={submission.id} className="hover:bg-light-grey-50">
                <td className="p-3">
                  <CustomCheckbox />
                </td>
                <td className="p-3 font-medium">#{submission.trackingNumber}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <CalendarIcon />
                    <span>{dateFormat(submission.dateTime)}</span>
                  </div>
                </td>
                {/* <td className="p-3">{}</td> */}
                <td className="p-3">{ submissionSourceMap[submission.submissionSource] }</td>
                <td className="p-3">{getStatusBadge(submission.submissionStatus)}</td>
                <td className="p-4">
                  <CustomDropdown
                    items={[
                      {
                        label: 'View Detail',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => handleViewDetailClick(submission)
                      },
                      {
                        label: 'Delete',
                        icon: <Trash2 className="h-4 w-4" />,
                        onClick: () => handleDeleteClick(submission.id),
                      },
                    ]}
                    dropdownClassName="right-2"
                    position='left'
                  >
                    <MoreHorizontal className="h-6 w-6" />
                  </CustomDropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && !isMoreItem && (
        <div className="flex justify-center items-center gap-4 mt-6 mb-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded border text-sm ${currentPage === 1
                ? 'text-gray-400 border-gray-300'
                : 'text-primary border-primary'
              }`}
          >
            Previous
          </button>

          <span className="text-base font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded border text-sm ${currentPage === totalPages
                ? 'text-gray-400 border-gray-300'
                : 'text-primary border-primary'
              }`}
          >
            Next
          </button>
        </div>
      )}

      <CustomModal
        isOpen={isDeleteModal}
        title="Are you sure you want to delete this order?"
        message="This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModal(false);
          setSelectedSubmissionId(null);
        }}
        cn="!p-20 !rounded-2xl"
      />
    </div>
  );
};

export default DashboardSubmissionStatus;
