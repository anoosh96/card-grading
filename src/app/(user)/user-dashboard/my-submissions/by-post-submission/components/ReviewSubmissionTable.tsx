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
      {/* Table Header */}
      {
        !isBulkSubmission ?
          <>
            <div className="grid grid-cols-7 gap-4 p-6 bg-gray-50 border-b border-gray-200">
              <div className="font-semibold text-gray-700">Card Name</div>
              <div className="font-semibold text-gray-700">Category</div>
              <div className="font-semibold text-gray-700">Year</div>
              <div className="font-semibold text-gray-700">Value</div>
              <div className="font-semibold text-gray-700">Price</div>
              <div className="font-semibold text-gray-700">Service Level</div>
            </div>
            {submission.cards?.map((card) => {
              const cardValue = Number(card.cardValue) || 0;
              const { name, pricePerCard } = getService(card.serviceId as number) as Service;

              return (
                <div key={card.id} className="grid grid-cols-7 gap-4 p-6 border-b border-gray-100 bg-white">
                  <div className="text-gray-800">{card.cardName || 'e.g: Charizard Holo'}</div>
                  <div className="text-gray-800">{card.category || 'Category'}</div>
                  <div className="text-gray-800">{card.yearOfRelease || '2000'}</div>
                  <div className="text-gray-800">£{cardValue}</div>
                  <div className="text-gray-800">£{pricePerCard}</div>
                  <div className="text-gray-800">{name}</div>
                </div>
              );
            })}
          </>
          :
          <>
            <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
              <div className="font-semibold text-gray-700">Number of Cards</div>
              <div className="font-semibold text-gray-700">Combined Value</div>
              <div className="font-semibold text-gray-700">Price per Card</div>
              <div className="font-semibold text-gray-700">Service Level</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-100 bg-white">
              <div className="text-gray-800">{submission.numberOfCards}</div>
              <div className="text-gray-800">£{submission.bulkCardValue}</div>
              <div className="text-gray-800">£{getPricePerCard(submission.numberOfCards as number)}</div>
              <div className="text-gray-800">Bulk Submission</div>
            </div>
          </>
      }



      {/* Table Footer - Total */}
      <div className="grid grid-cols-7 gap-4 p-6 bg-gray-50 border-t border-gray-200 font-semibold text-gray-900">
        <div className="col-span-6 text-left">Total Cost</div>
        <div>£{totalCost}</div>
        <div className="col-span-6 text-left">Total Cards</div>
        <div>{submission.cards.length || submission.numberOfCards}</div>
      </div>
    </div>
  );
};

export default ReviewSubmissionTable;
