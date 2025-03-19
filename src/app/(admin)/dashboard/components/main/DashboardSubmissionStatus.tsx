"use client";

import { FC, useState } from "react";
import { ChevronRight, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { CustomCheckbox } from "@/components/ui/checkbox";
import CalendarIcon from "@/components/svgs/dashboard/CalendarIcon";
import CustomDropdown from "@/components/common/CustomDropDown/CustomDropDown";
import Link from "@/components/common/CustomLink/CustomLink";
import { useRouter } from "next/navigation";
// import DeleteModal from "@/modals/DeleteModal";
import CustomModal from "@/components/common/CustomModal";

// Define the submission data type
type Submission = {
  id: number;
  date: string;
  action: string;
  source: string;
  status: "Completed" | "Pending" | "Grading";
  selected?: boolean;
};

interface DashboardSubmissionStatusProps {
  isMoreItem?: boolean;
}

const DashboardSubmissionStatus: FC<DashboardSubmissionStatusProps> = ({
  isMoreItem = false,
}) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const router = useRouter();

  // Sample data based on the image
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      date: "05 Mar 10:30 AM",
      action: "Card Received",
      source: "By Post",
      status: "Completed",
      selected: true,
    },
    {
      id: 2,
      date: "05 Mar 10:30 AM",
      action: "Grade Confirmed",
      source: "By Form",
      status: "Pending",
    },
    {
      id: 3,
      date: "05 Mar 10:30 AM",
      action: "Online Submission",
      source: "By Form",
      status: "Grading",
    },
    {
      id: 4,
      date: "05 Mar 10:30 AM",
      action: "Shipped to Customer",
      source: "By Post",
      status: "Pending",
    },
    {
      id: 5,
      date: "05 Mar 10:30 AM",
      action: "Online Submission",
      source: "By Form",
      status: "Grading",
    },
    {
      id: 6,
      date: "05 Mar 10:30 AM",
      action: "Card Received",
      source: "By Form",
      status: "Completed",
    },
  ]);

  // Toggle selection for a submission
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleSelection = (id: number) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === id
          ? { ...submission, selected: !submission.selected }
          : submission
      )
    );
  };

  // Get status badge styling based on status
  const getStatusBadge = (status: Submission["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <div className="text-center rounded-full p-1.5 bg-green-100 text-[#3A974C]">
            {status}
          </div>
        );
      case "Pending":
        return (
          <div className="text-center rounded-full p-1.5 bg-[#fcebe7] text-[#E3350D]">
            {status}
          </div>
        );
      case "Grading":
        return (
          <div className="text-center rounded-full p-1.5 bg-[#fbf6e2] text-[#FFCC00]">
            {status}
          </div>
        );
      default:
        return <div>{status}</div>;
    }
  };

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
              <th className="p-3">Order Id</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Action</th>
              <th className="p-3">Submission Source</th>
              <th className="p-3">Card Status</th>
              <th className="w-10 p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className={
                  submission.selected
                    ? "bg-light-grey"
                    : "hover:bg-light-grey-50"
                }
              >
                <td className="p-3">
                  <CustomCheckbox
                    checked={submission.selected}
                    onCheckedChange={() => toggleSelection(submission.id)}
                  />
                </td>
                <td className="p-3 font-medium">{submission.id}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <CalendarIcon />
                    <span>{submission.date}</span>
                  </div>
                </td>
                <td className="p-3">{submission.action}</td>
                <td className="p-3">{submission.source}</td>
                <td className="p-3">{getStatusBadge(submission.status)}</td>
                {/* <td className="p-3">
                  <CustomDropdown
                    items={dropdownItems}
                    dropdownClassName="right-2"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </CustomDropdown>
                </td> */}
                <td className="p-3">
                  <CustomDropdown
                    items={[
                      {
                        label: "View Detail",
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => {
                          if (submission.source === "By Post") {
                            router.push(
                              `/dashboard/submission-status/add-post`
                            );
                          } else if (submission.source === "By Form") {
                            router.push(
                              `/dashboard/submission-status/${submission.id}`
                            );
                          }
                        },
                      },
                      {
                        label: "Delete",
                        icon: <Trash2 className="h-4 w-4" />,
                        onClick: () => setIsDeleteModal(true),
                      },
                    ]}
                    dropdownClassName="right-2"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </CustomDropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <DeleteModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        message="Are you sure you want to delete this order?"
        handleDelete={() => console.log("on Delete")}
      /> */}

      <CustomModal
        isOpen={isDeleteModal}
        title="Are you sure you want to delete this order?"
        message="This action cannot be undone."
        onConfirm={() => {
          console.log("Order Deleted!");
          setIsDeleteModal(false);
        }}
        onCancel={() => setIsDeleteModal(false)}
        cn="!p-20 !rounded-2xl"
      />
    </div>
  );
};

export default DashboardSubmissionStatus;
