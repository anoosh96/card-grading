'use client'

import React, { useState, useEffect, useMemo, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEnums } from "@/hooks/useEnums";
import { useServices } from "@/hooks/useServices";
import { SubmissionCardsListSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { Card, Service } from "@/types";
import { getTurnaroundTime } from "@/app/(user)/lib/utils/helpers";
import { Trash2, Plus, Loader2 } from "lucide-react";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { CardData } from "@/stores/submissionStore";
import CardItem from "@/app/(user)/user-dashboard/submission-status/order-details/components/CardItem";
import { useAdminSubmissionDetails } from "@/hooks/useAdminSubmissionDetails";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useBulkCardSubmission } from "@/hooks/useBulkCardSubmission";
import { showToast } from "@/lib/toast";
import { useDeleteCard } from "@/hooks/useDeleteCard";
import { cardStatus, serviceType } from "@/app/(user)/lib/utils/constants";
import { Button } from "@/components/ui/button";
import { padId } from "@/lib/utils";
import CustomModal from "@/components/common/CustomModal";

function AdminSubmissionDetailsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const submissionId = params.get('id') as string;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | ''>('');

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const selectedCard = useRef<Card | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const {
    data: submissionDetails,
    isLoading,
    isError
  } = useAdminSubmissionDetails(
    submissionId,
    currentPage,
    10,
    selectedStatus || undefined,
    debouncedSearchTerm || undefined
  );

  const { data: enumsData } = useEnums();
  const { data: services } = useServices();

  const { mutateAsync: addBulkCards, isPending: isAddingCards } = useBulkCardSubmission();

  const { mutate: deleteCardMutation, isPending: isDeletingCard } = useDeleteCard();

  const [bulkCards, setBulkCards] = useState<CardData[]>([]);
  const [cardErrors, setCardErrors] = useState<{ [key: string]: { [field: string]: string } }>({});

  const { cardTypes } = enumsData || {};
  const allCardStatuses = useMemo(() => {
    return Object.keys(cardStatus) as string[];
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedStatus]);


  if (!submissionId) {
    return <div className="p-5 text-red-500">Missing submission ID.</div>;
  }

  if (isLoading && !submissionDetails) {
    return <SubmissionCardsListSkeleton />;
  }

  if (isError || !submissionDetails?.submission) {
    return <div className="p-5 text-red-500">Failed to load submission details.</div>;
  }

  const submission = submissionDetails.submission;
  const cards = submissionDetails.cards || [];
  const cardPagination = submissionDetails.cardPagination;

  const isStandardSubmission = (submission.numberOfCards as number) <= 10;

  const getNextTemporaryId = () => {
    const maxExistingTempId = Math.max(0, ...bulkCards.map(card => typeof card.id === 'number' ? card.id : 0));
    return maxExistingTempId + 1;
  };

  const addBulkCard = () => {
    if ((cardPagination.totalCards + bulkCards.length) < (submission.numberOfCards as number)) {
      setBulkCards(prevCards => [
        ...prevCards,
        {
          id: getNextTemporaryId(),
          cardName: '',
          category: '',
          yearOfRelease: null,
          serviceId: null,
          cardValue: null,
          submissionId: undefined,
        }
      ]);
    } else {
      showToast(`You cannot add more cards than the declared ${submission.numberOfCards} for this submission.`, { variant: 'error' });
    }
  };

  const removeBulkCard = () => {
    const card = selectedCard.current as Card

    if (!card?.submissionId) {
      setBulkCards(bulkCards.filter(c => c.id !== card.id)); // Corrected filter condition
      const newCardErrors = { ...cardErrors };
      delete newCardErrors[card.id];
      setCardErrors(newCardErrors);
      showToast('New card removed from list.', { variant: 'info' });
    } else {
      deleteCardMutation({ submissionId: parseInt(submissionId), cardId: card.id as number });
    }

    setIsDeleteModal(false)
  };

  const handleDeleteClick = (card: CardData) => {
    selectedCard.current = card as Card
    setIsDeleteModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateBulkCard = (cardId: string | number, field: keyof CardData, value: any) => {
    if (field === 'serviceId' && services) {
      const service = services.find((s: Service) => s.name === value);
      value = service?.id?.toString() || '';
    }

    setBulkCards(cards =>
      cards.map(card =>
        card.id === cardId ? { ...card, [field]: value } : card
      )
    );
    clearCardError(cardId, field);
  };

  const clearCardError = (cardId: string | number, field: string) => {
    setCardErrors(prev => {
      const newErrors = { ...prev };
      if (newErrors[cardId]) {
        delete newErrors[cardId][field];
        if (Object.keys(newErrors[cardId]).length === 0) {
          delete newErrors[cardId];
        }
      }
      return newErrors;
    });
  };

  const validateBulkCards = (): boolean => {
    let isValid = true;
    const newCardErrors: { [key: string]: { [field: string]: string } } = {};

    bulkCards.forEach(card => {
      if (!card.submissionId) {
        const cardErrorsForCard: { [field: string]: string } = {};

        if (!card.cardName) {
          cardErrorsForCard.cardName = 'Card name is required.';
          isValid = false;
        }

        if (!card.category) {
          cardErrorsForCard.category = 'Category is required.';
          isValid = false;
        }

        if (!card.yearOfRelease) {
          cardErrorsForCard.yearOfRelease = 'Year of release is required.';
          isValid = false;
        } else {
          const year = parseInt(card.yearOfRelease as string);
          const currentYear = new Date().getFullYear();

          if (isNaN(year)) {
            cardErrorsForCard.yearOfRelease = 'Please enter a valid number for year.';
            isValid = false;
          } else if (year < 1800 || year > currentYear + 1) {
            cardErrorsForCard.yearOfRelease = `Year must be between 1800 and ${currentYear + 1}.`;
            isValid = false;
          }
        }

        if (Object.keys(cardErrorsForCard).length > 0) {
          newCardErrors[card.id] = cardErrorsForCard;
        }
      }
    });

    setCardErrors(newCardErrors);
    return isValid;
  };

  const handleSaveBulkCards = async () => {
    if (!validateBulkCards()) {
      showToast('Please correct the errors in new cards before saving.', { variant: 'error' });
      return;
    }

    const newCardsToSubmit = bulkCards
      .filter(card => !card.submissionId)
      .map(({ id, ...rest }) => ({
        ...rest,
        yearOfRelease: rest.yearOfRelease ? Number(rest.yearOfRelease) : null
      }));

    if (newCardsToSubmit.length === 0) {
      showToast('No new cards to add to the submission.', { variant: 'info' });
      return;
    }

    try {
      await addBulkCards({
        submissionId: parseInt(submissionId),
        cards: newCardsToSubmit,
      });

      setBulkCards([])
    }
    catch (err) {
      console.error(err)
      //
    }
  };

  const handleCardClick = (cardId: string | number) => {
    router.push(`/dashboard/submission-status/${submissionId}?cardId=${cardId}`);
  };

  const isActionPending = isAddingCards || isDeletingCard;

  const totalAddedCards = cardPagination.totalCards + bulkCards.length;
  const totalAllowedCards = submission.numberOfCards as number;
  const cardsRemaining = totalAllowedCards - totalAddedCards;


  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="bg-white p-7 mb-6">
        <h1 className="heading-primary font-bold mb-6">
          Submission ID: {padId(submission.id as number)} - Total Cards ({submission.numberOfCards || 0})
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div>
            <span className="text-gray-600 text-sm">Customer Name</span>
            <p className="text-gray-900 font-medium">{submission.user?.fullName}</p>
          </div>

          <div>
            <span className="text-gray-600 text-sm">Email</span>
            <p className="text-gray-900 font-medium">{submission.user?.email}</p>
          </div>

          <div>
            <span className="text-gray-600 text-sm">Submission Type</span>
            <p className="text-gray-900 font-medium">
              {(submission.numberOfCards as number) > 10 ? serviceType.BULK_SUBMISSION : serviceType.STANDARD}
            </p>
          </div>

          <div>
            <span className="text-gray-600 text-sm">Turnaround Time</span>
            <p className="text-gray-900 font-medium">{submission.estimatedCompletion || getTurnaroundTime(submission.cards as Card[])}</p>
          </div>
        </div>

        {!isStandardSubmission && (
          <div className="bg-light-grey-50 border border-golden-amber rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-charcol mb-2">Bulk Submission Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-charcol text-sm">Total Value</span>
                <p className="text-purple-900 font-medium">£{submission.bulkCardValue}</p>
              </div>
              {submission.bulkDescription && (
                <div>
                  <span className="text-purple-600 text-sm">Description</span>
                  <p className="text-purple-900 font-medium">{submission.bulkDescription}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="px-7 pb-7">
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
              options={['', ...allCardStatuses]}
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
                setCurrentPage(1);
              }}
              className="w-full sm:w-auto"
            >
              Clear Filters
            </Button>
          )}
        </div>


        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Existing Cards</h2>
          {isLoading && !cards.length ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            </div>
          ) : cards.length === 0 && !isLoading ? (
            <div className="p-6 text-gray-500 text-center">
              No existing cards found for this submission matching the filters.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {cards.map((card: CardData) => (
                  <div key={card.id} className="relative group">
                    <CardItem
                      card={card}
                      status={card.status || submission.submissionStatus}
                      onClick={() => handleCardClick(card.id)}
                    />
                    {!isStandardSubmission &&
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(card)
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Delete Card"
                        disabled={isDeletingCard}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    }
                  </div>
                ))}
              </div>

              {cardPagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || isActionPending || isLoading}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: cardPagination.totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <Button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      disabled={isActionPending || isLoading}
                    >
                      {pageNumber}
                    </Button>
                  ))}
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(cardPagination.totalPages, prev + 1))}
                    disabled={currentPage === cardPagination.totalPages || isActionPending || isLoading}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {!isStandardSubmission && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Cards</h2>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="text-gray-600 text-sm font-medium">
                  Currently added (new): <span className="font-bold">{bulkCards.length}</span>
                  <span className="ml-2"> | Total allowed: {totalAllowedCards}</span>
                  {cardsRemaining > 0 && (
                    <span className="ml-2 text-green-600">({cardsRemaining} remaining)</span>
                  )}
                  {cardsRemaining <= 0 && totalAllowedCards > 0 && (
                    <span className="ml-2 text-red-600">(Limit reached)</span>
                  )}
                </p>
                <Button
                  type="button"
                  onClick={addBulkCard}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={isActionPending || totalAddedCards >= (submission.numberOfCards as number)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Card Slot
                </Button>
              </div>
            </div>

            <div className="hidden lg:block bg-light-grey rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr] gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="font-semibold text-gray-700">Card Name</div>
                <div className="font-semibold text-gray-700">Category</div>
                <div className="font-semibold text-gray-700">Year</div>
                <div className="font-semibold text-gray-700 text-center">Actions</div>
              </div>

              {bulkCards.length === 0 ? (
                <div className="p-6 text-gray-500 text-center bg-white">
                  No new cards added yet. Click "Add New Card Slot" to begin.
                </div>
              ) : (
                bulkCards.map((card) => (
                  <div
                    key={card.id}
                    className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr] items-start gap-4 p-4 border-b border-gray-100 last:border-b-0 bg-white"
                  >
                    <div className="flex flex-col relative"> {/* Added relative for positioning */}
                      <CustomInput
                        id={`new-cardName-${card.id}`}
                        name={`new-cardName-${card.id}`}
                        placeholder="Card Name"
                        className={`w-full p-7 text-sm border-gray-300 ${cardErrors[card.id]?.cardName && 'error-class'}`}
                        value={card.cardName}
                        onChange={(e) => updateBulkCard(card.id, 'cardName', e.target.value)}
                      />
                      {cardErrors[card.id]?.cardName && (
                        <div className="absolute -top-5 right-0 ml-2 transform -translate-y-1/2 z-10 animate-fade-in-slide-down">
                          <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                            {cardErrors[card.id].cardName}
                          </p>
                          <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col relative"> {/* Added relative for positioning */}
                      <CustomSelect
                        options={cardTypes || []}
                        selectedOption={card.category || "Select Category"}
                        borderColor={`border-gray-300 ${cardErrors[card.id]?.category && 'error-class'}`}
                        bg="bg-white"
                        setSelectedOption={(value) => updateBulkCard(card.id, 'category', value as string)}
                        className="text-sm w-full"
                      />
                      {cardErrors[card.id]?.category && (
                        <div className="absolute -top-5 right-0 ml-2 transform -translate-y-1/2 z-10 animate-fade-in-slide-down">
                          <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                            {cardErrors[card.id].category}
                          </p>
                          <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col relative"> {/* Added relative for positioning */}
                      <CustomInput
                        id={`new-year-${card.id}`}
                        name={`new-year-${card.id}`}
                        placeholder="Year"
                        className={`w-full p-7 text-sm border-gray-300 ${cardErrors[card.id]?.yearOfRelease && 'error-class'}`}
                        value={card.yearOfRelease?.toString() || ''}
                        onChange={(e) => updateBulkCard(card.id, 'yearOfRelease', e.target.value)}
                        type="number"
                      />
                      {cardErrors[card.id]?.yearOfRelease && (
                        <div className="absolute -top-5 right-0 ml-2 transform -translate-y-1/2 z-10 animate-fade-in-slide-down">
                          <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                            {cardErrors[card.id].yearOfRelease}
                          </p>
                          <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center items-center h-full">
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(card)}
                        className="text-red-500 hover:text-red-700 p-1 transition-all duration-200 hover:scale-110"
                        title="Remove Card Slot"
                        disabled={isActionPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
                ))}
            </div>

            <div className="lg:hidden space-y-4">
              {bulkCards.length === 0 ? (
                <div className="p-4 text-gray-500 text-center bg-white rounded-lg shadow-sm border border-gray-200">
                  No new cards added yet. Click "Add New Card Slot" to begin.
                </div>
              ) : (
                bulkCards.map((card, index) => (
                  <div key={card.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">New Card #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(card)}
                        className="text-red-500 hover:text-red-700 p-1"
                        disabled={isActionPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="relative"> {/* Added relative */}
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Name</label>
                        <CustomInput
                          id={`new-cardName-mobile-${card.id}`}
                          name={`new-cardName-mobile-${card.id}`}
                          placeholder="Card Name"
                          className={`w-full p-6 text-sm border-gray-300 ${cardErrors[card.id]?.cardName && 'error-class'}`}
                          value={card.cardName}
                          onChange={(e) => updateBulkCard(card.id, 'cardName', e.target.value)}
                        />
                        {cardErrors[card.id]?.cardName && (
                          <div className="absolute -top-2 right-0 ml-2 transform -translate-y-1/2 z-10 animate-fade-in-slide-down">
                            <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                              {cardErrors[card.id].cardName}
                            </p>
                            <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative"> {/* Added relative */}
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <CustomSelect
                            options={cardTypes || []}
                            selectedOption={card.category || "Select Category"}
                            borderColor={`border-gray-300 ${cardErrors[card.id]?.category && 'error-class'}`}
                            bg="bg-white"
                            setSelectedOption={(value) => updateBulkCard(card.id, 'category', value as string)}
                            className="text-sm w-full"
                          />
                          {cardErrors[card.id]?.category && (
                            <div className="absolute -top-2 right-0 ml-2 transform -translate-y-1/2 z-10 animate-fade-in-slide-down">
                              <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                                {cardErrors[card.id].category}
                              </p>
                              <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                            </div>
                          )}
                        </div>

                        <div className="relative"> {/* Added relative */}
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                          <CustomInput
                            id={`new-year-mobile-${card.id}`}
                            name={`new-year-mobile-${card.id}`}
                            placeholder="Year"
                            className={`w-full p-6 text-sm border-gray-300 ${cardErrors[card.id]?.yearOfRelease && 'error-class'}`}
                            value={card.yearOfRelease?.toString() || ''}
                            onChange={(e) => updateBulkCard(card.id, 'yearOfRelease', e.target.value)}
                            type="number"
                          />
                          {cardErrors[card.id]?.yearOfRelease && (
                            <div className="absolute -top-2 right-0 ml-2 transform -translate-y-1/2 z-10 animate-fade-in-slide-down">
                              <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                                {cardErrors[card.id].yearOfRelease}
                              </p>
                              <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
                ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <Button
            size={"lg"}
            className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
            onClick={() => router.back()}
          >
            Back
          </Button>
          {!isStandardSubmission && bulkCards.length > 0 && (
            <ButtonGradient
              size={"lg"}
              className="py-3 px-14 h-auto transition-all duration-200 hover:shadow-lg w-full sm:w-auto"
              type="submit"
              onClick={handleSaveBulkCards}
              disabled={isAddingCards || Object.keys(cardErrors).length > 0}
            >
              {isAddingCards ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Adding Cards...
                </>
              ) : 'Save New Cards'}
            </ButtonGradient>
          )}
        </div>
      </div>

      <CustomModal
        isOpen={isDeleteModal}
        title="Are you sure you want to delete this Card?"
        message="This action cannot be undone."
        onConfirm={removeBulkCard}
        onCancel={() => {
          setIsDeleteModal(false);
          selectedCard.current = null;
        }}
        cn="!p-20 !rounded-2xl"
      />
    </section>
  );
}

export default function AdminSubmissionDetailsPage() {
  return (
    <Suspense fallback={<SubmissionCardsListSkeleton />}>
      <AdminSubmissionDetailsContent />
    </Suspense>
  );
}