import { SubmissionData } from '@/stores/submissionStore';
import { Service } from '@/types';
import React from 'react';

type Props = {
  submission: SubmissionData;
  totalCost: number;
};

const ReviewSubmissionTable: React.FC<Props> = ({ submission, totalCost }) => {

  const getService = (id: number) => {
    const services = submission.services;
    return services?.find((service) => service.id == id)
  };

  const isBulkSubmission = submission.numberOfCards && submission.numberOfCards > 10;

  const getPricePerCard = (numberOfCards: number) => {
    return totalCost / numberOfCards;
  }

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden mt-4">
      {/* Table Header and Rows */}
      {
        !isBulkSubmission ?
          <div className="overflow-x-auto"> {/* Added overflow-x-auto for horizontal scrolling */}
            <div className="min-w-[600px] md:min-w-full"> {/* Min-width to ensure content doesn't shrink too much */}
              <div className="grid grid-cols-6 gap-4 p-4 md:p-6 bg-gray-50 border-b border-gray-200 text-sm md:text-base"> {/* Adjusted grid cols and padding */}
                <div className="font-semibold text-gray-700 col-span-2 md:col-span-1">Card Name</div>
                <div className="font-semibold text-gray-700">Category</div>
                <div className="font-semibold text-gray-700">Year</div>
                <div className="font-semibold text-gray-700">Value</div>
                <div className="font-semibold text-gray-700">Price</div>
                <div className="font-semibold text-gray-700 hidden md:block">Service Level</div> {/* Hidden on small screens, shown on md+ */}
              </div>
              {submission.cards?.map((card) => {
                const cardValue = Number(card.cardValue) || 0;
                const { name, pricePerCard } = getService(card.serviceId as number) as Service;

                return (
                  <div key={card.id} className="grid grid-cols-6 gap-4 p-4 md:p-6 border-b border-gray-100 bg-white text-sm md:text-base"> {/* Adjusted grid cols and padding */}
                    <div className="text-gray-800 col-span-2 md:col-span-1 truncate">{card.cardName || 'e.g: Charizard Holo'}</div> {/* Truncate long names */}
                    <div className="text-gray-800 truncate">{card.category || 'Category'}</div>
                    <div className="text-gray-800">{card.yearOfRelease || '2000'}</div>
                    <div className="text-gray-800">£{cardValue}</div>
                    <div className="text-gray-800">£{pricePerCard}</div>
                    <div className="text-gray-800 hidden md:block">{name}</div> {/* Hidden on small, shown on md+ */}
                  </div>
                );
              })}
            </div>
          </div>
          :
          <div className="overflow-x-auto"> {/* Added overflow-x-auto */}
            <div className="min-w-[400px] md:min-w-full"> {/* Min-width for bulk table */}
              <div className="grid grid-cols-4 gap-4 p-4 md:p-6 bg-gray-50 border-b border-gray-200 text-sm md:text-base"> {/* Adjusted padding */}
                <div className="font-semibold text-gray-700">Number of Cards</div>
                <div className="font-semibold text-gray-700">Combined Value</div>
                <div className="font-semibold text-gray-700">Price per Card</div>
                <div className="font-semibold text-gray-700">Service Level</div>
              </div>
              <div className="grid grid-cols-4 gap-4 p-4 md:p-6 border-b border-gray-100 bg-white text-sm md:text-base"> {/* Adjusted padding */}
                <div className="text-gray-800">{submission.numberOfCards}</div>
                <div className="text-gray-800">£{submission.bulkCardValue}</div>
                <div className="text-gray-800">£{getPricePerCard(submission.numberOfCards as number)}</div>
                <div className="text-gray-800">Bulk Submission</div>
              </div>
            </div>
          </div>
      }

      {/* Table Footer - Total */}
      {/* Ensure footer matches columns of the active table for consistent alignment */}
      <div className={`grid gap-4 p-6 bg-gray-50 border-t border-gray-200 font-semibold text-gray-900 text-sm md:text-base ${
        !isBulkSubmission ? 'grid-cols-6' : 'grid-cols-4' /* Adjust grid-cols based on table type */
      }`}>
        {/* Adjusted col-span to match individual card columns, 6 for normal, 4 for bulk */}
        <div className={!isBulkSubmission ? "col-span-5 text-left md:col-span-5" : "col-span-3 text-left"}>Total Cost</div>
        <div>£{totalCost}</div>
        <div className={!isBulkSubmission ? "col-span-5 text-left md:col-span-5" : "col-span-3 text-left"}>Total Cards</div>
        <div>{submission.cards?.length || submission.numberOfCards || 0}</div>
      </div>
    </div>
  );
};

export default ReviewSubmissionTable;