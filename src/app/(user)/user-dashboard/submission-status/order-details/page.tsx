'use client'

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useSubmissionById } from "@/hooks/useSubmissionById"; // Your updated hook
import { useUserStore } from "@/stores/userStore";
import { SubmissionCardsListSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { getTurnaroundTime } from "@/app/(user)/lib/utils/helpers";
import CardItem from "./components/CardItem"; // Ensure this path is correct
import { serviceType, cardStatus } from "@/app/(user)/lib/utils/constants"; // Import cardStatus constant
import { CardData } from "@/stores/submissionStore";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { Loader2 } from "lucide-react"; // Import Loader2 for loading indicator
import { Card } from "@/types";


function SubmissionCardsList() {
  const router = useRouter();
  const params = useSearchParams();
  const submissionId = params.get('id') as string;
  const { user } = useUserStore();

  // State for pagination and search filters
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Holds the immediate input value
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Holds the debounced value
  const [selectedStatus, setSelectedStatus] = useState<string | ''>(''); // State for status filter

  // Debounce logic for searchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    // Cleanup function: This will be called if `searchTerm` changes before the timeout finishes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]); // Only re-run effect if searchTerm changes

  // Reset current page when filters change (except for actual page number change)
  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [debouncedSearchTerm, selectedStatus]);

  // Use the updated hook with pagination and filters
  const { data: submissionData, isLoading, isError } = useSubmissionById(
    submissionId,
    currentPage,
    10, // Limit per page (can be stateful if desired, e.g., const [limit, setLimit] = useState(10);)
    debouncedSearchTerm || undefined,
    selectedStatus || undefined // Pass undefined if empty string
  );

  const allCardStatuses = useMemo(() => {
    return Object.keys(cardStatus) as string[];
  }, []);

  if (!submissionId) {
    return <div className="p-5 text-red-500">Missing submission ID.</div>;
  }

  // Show skeleton only if no data is available yet, and it's truly loading (not just a background refetch)
  if (isLoading && !submissionData) {
    return <SubmissionCardsListSkeleton />;
  }

  if (isError || !submissionData) {
    return <div className="p-5 text-red-500">Failed to load submission details.</div>;
  }

  const submission = submissionData.submission;
  const cards = submissionData.cards || [];
  const cardPagination = submissionData.cardPagination;

  const handleCardClick = (cardId: string | number) => {
    router.push(`/user-dashboard/submission-status/card-details?id=${submissionId}&cardId=${cardId}`);
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="bg-white p-7 mb-6">
        <h1 className="heading-primary font-bold mb-6">Total Cards ({submission.numberOfCards || 0})</h1>

        {/* Submission Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div>
            <span className="text-gray-600 text-sm">Name</span>
            <p className="text-gray-900 font-medium">{user?.fullName}</p>
          </div>

          <div>
            <span className="text-gray-600 text-sm">Email</span>
            <p className="text-gray-900 font-medium">{user?.email}</p>
          </div>

          <div>
            <span className="text-gray-600 text-sm">Submission Type</span>
            <p className="text-gray-900 font-medium">
              {(submission.numberOfCards as number) > 10 ? serviceType.BULK_SUBMISSION : serviceType.STANDARD}
            </p>
          </div>

          <div>
            <span className="text-gray-600 text-sm">Turnaround Time</span>
            <p className="text-gray-900 font-medium">{getTurnaroundTime(submission.cards as Card[])}</p>
          </div>
        </div>
      </div>

      {/* Cards Content */}
      <div className="px-7 pb-7">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg p-6 mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-1/2">
            <CustomInput
              id="card-search"
              name="card-search"
              placeholder="Search by card name..."
              className="w-full p-7"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <CustomSelect
              options={['', ...allCardStatuses]} // Include empty option for "All Statuses"
              selectedOption={selectedStatus || "Filter by Status"}
              setSelectedOption={(value) => setSelectedStatus(value as string || '')}
              className="w-full"
            />
          </div>
          {(searchTerm || selectedStatus) && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('');
                setCurrentPage(1); // Reset page on clear
              }}
              className="w-full sm:w-auto"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Existing Paginated Cards */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cards</h2>
          {isLoading && !cards.length ? ( // Show a smaller spinner for background re-fetches
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            </div>
          ) : cards.length === 0 && !isLoading ? ( // Show message only if no cards and not loading
            <div className="p-6 text-gray-500 text-center">
              No cards found for this submission matching the filters.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {cards.map((card: CardData) => (
                  <CardItem
                    key={card.id}
                    card={card}
                    status={card.status || submission.submissionStatus}
                    onClick={() => handleCardClick(card.id)}
                  />
                ))}
              </div>

              {/* Pagination Controls for Cards */}
              {cardPagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || isLoading}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: cardPagination.totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <Button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      disabled={isLoading}
                    >
                      {pageNumber}
                    </Button>
                  ))}
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(cardPagination.totalPages, prev + 1))}
                    disabled={currentPage === cardPagination.totalPages || isLoading}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 mt-6">
          <Button
            size={"lg"}
            className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function SubmissionCardsListPage() {
  return (
    <Suspense fallback={<SubmissionCardsListSkeleton />}>
      <SubmissionCardsList />
    </Suspense>
  );
}