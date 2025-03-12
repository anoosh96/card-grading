'use client'

import Image from "next/image";
import { dateFormat } from "../../lib/utils/helpers";
import { useState } from "react";
import CustomModal from "@/components/common/CustomModal";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import CustomDropdown from "@/components/common/CustomDropDown/CustomDropDown";
import Link from "next/link";
import TrackIcon from "@/components/svgs/dashboard/TrackIcon";
import { useRouter } from "next/navigation";

const submissions = [
  {
    id: "876363",
    date: "2025-03-06T14:30:00.000Z",
    name: "Sports Card",
    source: "By Post",
    image: "/assets/images/graded-section-card-2.svg",
    status: "completed",
  },
  {
    id: "876364",
    date: "2025-03-06T14:30:00.000Z",
    name: "Comics",
    source: "By Post",
    image: "/assets/images/graded-section-card-2.svg",
    status: "pending",
  },
  {
    id: "876621",
    name: "EAU DE",
    date: "2025-03-06T14:30:00.000Z",
    source: "By Form",
    image: "/assets/images/graded-section-card-2.svg",
    status: "grading",
  },
  {
    id: "876369",
    name: "Comics",
    date: "2025-03-06T14:30:00.000Z",
    source: "By Form",
    image: "/assets/images/graded-section-card-2.svg",
    status: "pending",
  },
  {
    id: "876601",
    name: "EAU DE",
    date: "2025-03-06T14:30:00.000Z",
    source: "By Form",
    image: "/assets/images/graded-section-card-2.svg",
    status: "grading",
  },
  {
    id: "876368",
    name: "Sports Card",
    date: "2025-03-06T14:30:00.000Z",
    source: "By Form",
    image: "/assets/images/graded-section-card-2.svg",
    status: "completed",
  },
];

interface SubmissionTrackingProps {
  showViewAll?: boolean
}

export function DashboardSubmissionTracking({ showViewAll = false}: SubmissionTrackingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const dropdownItems = [
    {
      label: "View Detail",
      icon: <Eye className="h-4 w-4" />,
      onClick: () => router.push('/user-dashboard/order-details'),
    },
    {
      label: "View Tracking",
      icon: <TrackIcon className="h-4 w-4" />,
      onClick: () => router.push('/user-dashboard/order-tracking')
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => setIsModalOpen(true),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm bg-white">
      <div className="flex items-center p-5 justify-between mb-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-[2rem] text-charcol">Order Status</h3>
          <p className="text-sm text-pure-grey">Real-time updates on grading status</p>
        </div>
        { showViewAll && <Link href={"/user-dashboard/submission-status"} className="text-primary underline font-medium text-sm">View all &gt;</Link> }
      </div>

      {/* Add max-w-full to ensure it works inside flex containers */}
      <div className="w-full overflow-x-auto md:max-w-full">
        <table className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-full">
          <thead>
            <tr className="border-b px-16">
              <th className="text-left py-3 pl-16 pr-4">
                <div className="flex text-dark-purple text-sm items-center gap-1">
                  Track No
                  <Image src={"/icons/arrow_down.svg"} alt="Arrow Down Icon" width={6} height={5} />
                </div>
              </th>
              <th className="text-left py-3 pl-16 pr-4">
                <div className="flex text-dark-purple text-sm items-center gap-1">
                  Date and Time
                </div>
              </th>
              <th className="text-left py-3 px-4">
                <div className="flex text-dark-purple text-sm items-center gap-1">
                  Card Name
                  <Image src={"/icons/arrow_down.svg"} alt="Arrow Down Icon" width={6} height={5} />
                </div>
              </th>
              <th className="text-left py-3 px-4">
                <div className="flex text-dark-purple text-sm items-center gap-1">
                  Submission Source
                  <Image src={"/icons/arrow_down.svg"} alt="Arrow Down Icon" width={6} height={5} />
                </div>
              </th>
              <th className="text-left py-3 pl-4 pr-16">
                <div className="flex text-dark-purple text-sm items-center gap-1">
                  Card Status
                  <Image src={"/icons/arrow_down.svg"} alt="Arrow Down Icon" width={6} height={5} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b last:border-0">
                <td className="py-3 pl-16 pr-4">#{submission.id}</td>
                <td className="py-3 pl-16 pr-4">
                  <div className="flex gap-2">
                    <Image src={"/icons/calendar.svg"} alt="Calendar Icon" width={15} height={15} />
                    <div>
                      {dateFormat(submission.date)}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Image src={submission.image} alt={submission.name} width={35} height={40} className="object-fill" />
                    <span className="text-sm text-dark-purple">{submission.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{submission.source}</td>
                <td className="py-3  px-4">
                  <span
                    className={`inline-block w-full text-center capitalize px-10 py-3 rounded-full text-base font-semibold ${
                      submission.status === "completed"
                        ? "bg-muted-green/20 text-muted-green"
                        : submission.status === "pending"
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary/20 text-secondary"
                    }`}
                  >
                    {submission.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <CustomDropdown
                      items={dropdownItems}
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
      <CustomModal
        isOpen={isModalOpen}
        title="Are you sure you want to delete this order?"
        message="This action cannot be undone."
        onConfirm={() => {
          console.log("Order Deleted!");
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        cn="!p-20 !rounded-2xl"
      />
    </div>
  );
}
