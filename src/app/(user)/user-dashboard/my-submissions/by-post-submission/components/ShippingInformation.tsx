"use client";

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import { Card, FormStepProps, Service } from "@/types";
import { useEnums } from "@/hooks/useEnums";
import { useFormState } from "@/hooks/useFormState";
import { CardData, useSubmissionStore } from "@/stores/submissionStore";
import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { getTurnaroundTime } from "@/app/(user)/lib/utils/helpers";

export default function ShippingInformation({ handleNext, handlePrevious }: FormStepProps) {
  // Fetch enums using useEnums
  const { data: enumsData, isLoading, isError, error } = useEnums();

  // Access zustand store to set submission data
  const { submission, setSubmission } = useSubmissionStore((state) => state);

  // Destructure enums from the fetched data
  const { cardTypes } = enumsData || {};
  const { data: services } = useServices();

  // State for number of cards input
  const [numberOfCards, setNumberOfCards] = useState<number>(submission.numberOfCards || 0);
  const [numberOfCardsError, setNumberOfCardsError] = useState('');

  // State for managing multiple cards (for <= 10 cards)
  const [cards, setCards] = useState<CardData[]>(submission.cards || []);

  // State for bulk card submission (for > 10 cards)
  const [bulkCardValue, setBulkCardValue] = useState<number | undefined>(submission.bulkCardValue);
  const [bulkDescription, setBulkDescription] = useState<string>(submission.bulkDescription || '');
  const [bulkCardValueError, setBulkCardValueError] = useState('');

  // State for animations
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [previousNumberOfCards, setPreviousNumberOfCards] = useState(0);

  // Initialize form state with useFormState for shipping info only
  const { values, errors, handleChange, setValue, setError, clearError } = useFormState({
    fullName: submission.fullName,
    shippingAddress: submission.shippingAddress,
    phoneNumber: submission.phoneNumber,
    email: submission.email
  });

  // State for card-specific errors
  const [cardErrors, setCardErrors] = useState<{[key: string]: {[field: string]: string}}>({});

  const errorRef = useRef<HTMLDivElement>(null);
  const cardDetailsRef = useRef<HTMLDivElement>(null);

  // const getNewId = () => {
  //   return cards && cards.length > 0 ? ((cards[cards.length - 1].id as number) + 1) : 1
  // }

  // Add a new card
  const addCard = () => {
    handleNumberOfCardsChange((numberOfCards + 1).toString())
  };

  // Remove a card
  const removeCard = (cardId: number) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== cardId));
      // Clear errors for removed card
      const newCardErrors = { ...cardErrors };
      delete newCardErrors[cardId];
      setCardErrors(newCardErrors);
      setNumberOfCards(cards.length - 1);
    }
  };

  // Update card data
  const updateCard = (cardId: number, field: keyof CardData, value: string) => {
    if(field == 'serviceId'){
      value = services.find((service: Service) => service.name == value)?.id
    }

    setCards(cards.map(card => 
      card.id === cardId ? { ...card, [field]: value } : card
    ));
    // Clear error for this field
    clearCardError(cardId, field);
  };

  // Set card error
  const setCardError = (cardId: string, field: string, message: string) => {
    setCardErrors(prev => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        [field]: message
      }
    }));
  };

  // Clear card error
  const clearCardError = (cardId: number, field: string) => {
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

  // Handle number of cards change with animation
  const handleNumberOfCardsChange = (value: string) => {
    if(value == ''){
      setNumberOfCards(0);
      setShowCardDetails(false);
      return;
    }

    const num = parseInt(value);
    if (!isNaN(num)) {
      setPreviousNumberOfCards(numberOfCards);
      setNumberOfCards(num);
      setNumberOfCardsError('');
      
      // Show card details section with animation
      if (num > 0) {
        setShowCardDetails(true);
        
        // Focus on card details section after a short delay for animation
        setTimeout(() => {
          if (cardDetailsRef.current) {
            cardDetailsRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'end',
              inline: 'nearest' 
            });
          }
        }, 200);
      } else {
        setShowCardDetails(false);
      }
      
      // Adjust cards array based on number, preserving existing values
      if (num <= 10 && num > 0) {
        const newCards: CardData[] = [];
        // Preserve existing cards up to the new number
        for (let i = 0; i < num; i++) {
          if (cards[i]) {
            newCards.push(cards[i]);
          } else {
            // Add new empty card if needed
            newCards.push({
              id: i + 1,
              cardName: '',
              category: '',
              yearOfRelease: '',
              serviceId: null,
              cardValue: null
            });
          }
        }
        setCards(newCards);
      } else if (num > 10) {
        // Clear individual cards for bulk submission
        setCards([]);
      }
    } else {
      setNumberOfCardsError('Please enter a valid number greater than 0');
      setShowCardDetails(false);
    }
  };

  // Validation for shipping information
  const validateShippingInfo = (): boolean => {
    let ok = true;
    
    if (!values.fullName) {
      setError('fullName', 'Full name is required.');
      ok = false;
    } else {
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!nameRegex.test(values.fullName)) {
        setError('fullName', 'Full name should only contain letters and spaces.');
        ok = false;
      }
    }
    
    if (!values.shippingAddress) {
      setError('shippingAddress', 'Shipping address is required.');
      ok = false;
    }
    
    if (!values.phoneNumber) {
      setError('phoneNumber', 'Phone number is required.');
      ok = false;
    }

    return ok;
  };

  // Validation for number of cards
  const validateNumberOfCards = (): boolean => {
    if (!numberOfCards || numberOfCards <= 0) {
      setNumberOfCardsError('Number of cards is required and must be greater than 0.');
      return false;
    }
    setNumberOfCardsError('');
    return true;
  };

  // Validation for bulk card submission (> 10 cards)
  const validateBulkCards = (): boolean => {
    if (!bulkCardValue) {
      setBulkCardValueError('Total card value is required.');
      return false;
    }
    const value = bulkCardValue;
    if (isNaN(value) || value <= 0) {
      setBulkCardValueError('Please enter a valid positive number.');
      return false;
    }
    setBulkCardValueError('');
    return true;
  };

  // Validation for individual cards (<= 10 cards)
  const validateCards = (): boolean => {
    let ok = true;
    const newCardErrors: {[key: string]: {[field: string]: string}} = {};

    cards.forEach(card => {
      const cardErrorsForCard: {[field: string]: string} = {};

      if (!card.cardName) {
        cardErrorsForCard.cardName = 'Card name is required.';
        ok = false;
      }

      if (!card.category) {
        cardErrorsForCard.category = 'Category is required.';
        ok = false;
      }

      if (!card.yearOfRelease) {
        cardErrorsForCard.yearOfRelease = 'Year of release is required.';
        ok = false;
      } else {
        const year = parseInt(card.yearOfRelease as string);
        const currentYear = new Date().getFullYear();
        
        if (isNaN(year)) {
          cardErrorsForCard.yearOfRelease = 'Please enter a valid number for year.';
          ok = false;
        } else if (year < 1800 || year > currentYear + 1) {
          cardErrorsForCard.yearOfRelease = `Year must be between 1800 and ${currentYear + 1}.`;
          ok = false;
        }
      }

      if (!card.serviceId) {
        cardErrorsForCard.serviceId = 'Service level is required.';
        ok = false;
      }

      if (Object.keys(cardErrorsForCard).length > 0) {
        newCardErrors[card.id as number] = cardErrorsForCard;
      }
    });

    setCardErrors(newCardErrors);
    return ok;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isShippingValid = validateShippingInfo();
    const isNumberOfCardsValid = validateNumberOfCards();

    let areCardsValid = true;
    if (numberOfCards <= 10) {
      areCardsValid = validateCards();
    } else {
      areCardsValid = validateBulkCards();
    }

    if (!isShippingValid || !isNumberOfCardsValid || !areCardsValid) {
      if (errorRef.current) {
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Update zustand store with form data
    if (numberOfCards <= 10) {
      // Individual card submission
      setSubmission({
        fullName: values.fullName,
        shippingAddress: values.shippingAddress,
        phoneNumber: values.phoneNumber,
        email: values.email,
        numberOfCards: numberOfCards,
        estimatedCompletion: getTurnaroundTime(submission.cards as Card[]),
        cards: cards.map(card => ({
          id: card.id,
          cardName: card.cardName,
          category: card.category,
          yearOfRelease: Number(card.yearOfRelease),
          serviceId: card.serviceId,
          cardValue: Number(card.cardValue),
          estimatedCompletion: services.find((service: Service) => service.id == card.serviceId)?.turnAroundTime
        })),
        step: 3
      });
    } else {
      // Bulk card submission
      setSubmission({
        fullName: values.fullName,
        shippingAddress: values.shippingAddress,
        phoneNumber: values.phoneNumber,
        email: values.email,
        numberOfCards: numberOfCards,
        bulkCardValue: bulkCardValue,
        bulkDescription: bulkDescription,
        estimatedCompletion: '10d',
        cards: [], // Empty for bulk submission
        step: 3
      });
    }

    handleNext();
  };

  // Initialize showCardDetails state on component mount
  useEffect(() => {
    if (numberOfCards > 0) {
      setShowCardDetails(true);
    }
  }, []);

  useEffect(() => {
    if(services){
      setSubmission({ services })
    }
  }, [services])

  // Conditional rendering while data is loading or if there's an error
  if (isLoading) {
    return <div>Loading enums...</div>;
  }

  if (isError) {
    return <div>Error loading enums: {error?.message}</div>;
  }

  return (
    <div>
      <h1 className="heading-primary font-bold">Shipping Information</h1>
      <p className="text-neutral-grey mt-4">Enter your shipping details</p>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-8 p-2 space-y-8">
          {/* Shipping Information Section */}
          <div className="space-y-4">
            {/* Full Name */}
            <div ref={errors.fullName ? errorRef : null}>
              <label className="block font-semibold mb-2">Full Name</label>
              <CustomInput
                id="fullName"
                name="fullName"
                placeholder="Enter Full Name"
                className="w-full p-6"
                value={values.fullName}
                onChange={(e) => {
                  handleChange(e);
                  clearError('fullName');
                }}
              />
              {errors.fullName && (
                <p className="text-red-500 mt-1 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Shipping Address */}
            <div ref={errors.shippingAddress ? errorRef : null}>
              <label className="block font-semibold mb-2">Shipping Address</label>
              <CustomInput
                id="shippingAddress"
                name="shippingAddress"
                placeholder="Enter Shipping Address"
                className="w-full p-6"
                value={values.shippingAddress}
                onChange={(e) => {
                  handleChange(e);
                  clearError('shippingAddress');
                }}
              />
              {errors.shippingAddress && (
                <p className="text-red-500 mt-1 text-sm">{errors.shippingAddress}</p>
              )}
            </div>

            {/* Phone Number */}
            <div ref={errors.phoneNumber ? errorRef : null}>
              <label className="block font-semibold mb-2">Phone Number</label>
              <CustomInput
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                className="w-full p-6"
                value={values.phoneNumber}
                onChange={(e) => {
                  handleChange(e);
                  clearError('phoneNumber');
                }}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 mt-1 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            <div ref={errors.email ? errorRef : null}>
              <label className="block font-semibold mb-2">Email</label>
              <CustomInput
                id="email"
                name="email"
                placeholder="Enter Email"
                type="email"
                className="w-full p-6"
                value={values.email}
                onChange={(e) => {
                  handleChange(e);
                  clearError('email');
                }}
              />
              {errors.email && (
                <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Number of Cards Section */}
          <div>
            <label className="block font-semibold mb-2">Number of Cards</label>
            <CustomInput
              id="numberOfCards"
              name="numberOfCards"
              placeholder="Enter number of cards"
              type="text"
              className="w-full p-6"
              value={numberOfCards}
              onChange={(e) => handleNumberOfCardsChange(e.target.value)}
            />
            {numberOfCardsError && (
              <p className="text-red-500 mt-1 text-sm">{numberOfCardsError}</p>
            )}
          </div>

          {/* Animated Card Information Section */}
          <div 
            ref={cardDetailsRef}
            className={`transition-all duration-500 ease-in-out transform ${
              showCardDetails && numberOfCards > 0
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-4 overflow-hidden'
            }`}
          >
            {/* Individual Card Details (≤ 10 cards) */}
            {numberOfCards > 0 && numberOfCards <= 10 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <h2 className="text-2xl font-bold text-gray-800">Card Details</h2>
                  <p className="text-indigo-600 font-medium">
                    You need to add {numberOfCards} card{numberOfCards !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Desktop Table View - Hidden on mobile */}
                <div className="hidden lg:block bg-light-grey rounded-lg overflow-hidden shadow-sm">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <div className="font-semibold text-gray-700">Card Name</div>
                    <div className="font-semibold text-gray-700">Category</div>
                    <div className="font-semibold text-gray-700">Year</div>
                    <div className="font-semibold text-gray-700">Service Level</div>
                    <div className="font-semibold text-gray-700">Value</div>
                    <div className="font-semibold text-gray-700">Actions</div>
                  </div>

                  {/* Table Rows */}
                  {cards.map((card, index) => (
                    <div 
                      key={card.id} 
                      className={`grid grid-cols-6 gap-4 p-6 border-b border-gray-100 last:border-b-0 bg-white transition-all duration-300 ease-out transform ${
                        showCardDetails 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-4'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 100}ms`,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Card Name */}
                      <div>
                        <CustomInput
                          id={`cardName-${card.id}`}
                          name={`cardName-${card.id}`}
                          placeholder="Card Name"
                          className="w-full p-7 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          value={card.cardName}
                          onChange={(e) => updateCard(card.id, 'cardName', e.target.value)}
                        />
                        {cardErrors[card.id]?.cardName && (
                          <p className="text-red-500 mt-1 text-xs animate-pulse">{cardErrors[card.id].cardName}</p>
                        )}
                      </div>

                      {/* Category */}
                      <div>
                        <CustomSelect
                          options={cardTypes}
                          selectedOption={card.category || "Category"}
                          borderColor="border-gray-200"
                          bg="bg-white"
                          setSelectedOption={(value) => updateCard(card.id, 'category', value as string)}
                          className="relative text-sm"
                        />
                        {cardErrors[card.id]?.category && (
                          <p className="text-red-500 mt-1 text-xs animate-pulse">{cardErrors[card.id].category}</p>
                        )}
                      </div>

                      {/* Year */}
                      <div>
                        <CustomInput
                          id={`year-${card.id}`}
                          name={`year-${card.id}`}
                          placeholder="Year"
                          className="w-full p-7 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          value={card.yearOfRelease as string}
                          onChange={(e) => updateCard(card.id, 'yearOfRelease', e.target.value)}
                        />
                        {cardErrors[card.id]?.yearOfRelease && (
                          <p className="text-red-500 mt-1 text-xs animate-pulse">{cardErrors[card.id].yearOfRelease}</p>
                        )}
                      </div>

                      {/* Service Level */}
                      <div>
                        <CustomSelect
                          options={services?.filter((service: Service) => !service.maxCardValue || (service.maxCardValue > (card.cardValue || 0))).map((service: Service) => (service.name)) || []}
                          selectedOption={
                            services?.find((service: Service) => service.id === card.serviceId)?.name || "Service"
                          }
                          borderColor="border-gray-200"
                          bg={`bg-white ${card.cardValue === null || card.cardValue === undefined || card.cardValue <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={card.cardValue === null || card.cardValue === undefined || card.cardValue <= 0}
                          setSelectedOption={(value) => updateCard(card.id, 'serviceId', value as string)}
                          className="relative text-sm"
                        />
                        {cardErrors[card.id]?.serviceId && (
                          <p className="text-red-500 mt-1 text-xs animate-pulse">{cardErrors[card.id].serviceId}</p>
                        )}
                      </div>

                      {/* Value */}
                      <div>
                        <CustomInput
                          id={`value-${card.id}`}
                          name={`value-${card.id}`}
                          placeholder="£ Value"
                          type="number"
                          className="w-full p-7 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          value={card.cardValue as number}
                          onChange={(e) => updateCard(card.id, 'cardValue', e.target.value)}
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex justify-center">
                        {cards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCard(card.id)}
                            className="text-red-500 hover:text-red-700 p-1 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-200 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center py-4">
                    <button type="button" className={`bg-transparent border-none shadow-none text-red-500 text-center hover:text-red-700 ${ numberOfCards == 10 ? 'hidden' : ''}`} onClick={addCard}>
                      + Add Another Card 
                    </button>
                  </div>
                </div>

                {/* Mobile Card View - Visible on mobile and tablet */}
                <div className="lg:hidden space-y-4">
                  {cards.map((card, index) => (
                    <div 
                      key={card.id} 
                      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-300 ease-out transform ${
                        showCardDetails 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 100}ms`,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Card Header */}
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Card #{index + 1}</h3>
                        {cards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCard(card.id)}
                            className="text-red-500 hover:text-red-700 p-1 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-200 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Card Fields */}
                      <div className="space-y-4">
                        {/* Card Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Name</label>
                          <CustomInput
                            id={`cardName-${card.id}`}
                            name={`cardName-${card.id}`}
                            placeholder="Card Name"
                            className="w-full p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                            value={card.cardName}
                            onChange={(e) => updateCard(card.id, 'cardName', e.target.value)}
                          />
                          {cardErrors[card.id]?.cardName && (
                            <p className="text-red-500 mt-1 text-xs animate-pulse">{cardErrors[card.id].cardName}</p>
                          )}
                        </div>

                        {/* Two column layout for category and year on mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Category */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <CustomSelect
                              options={cardTypes}
                              selectedOption={card.category || "Category"}
                              borderColor="border-gray-200"
                              bg="bg-white"
                              setSelectedOption={(value) => updateCard(card.id, 'category', value as string)}
                              className="relative text-sm w-full"
                            />
                            {cardErrors[card.id]?.category && (
                              <p className="text-red-500 mt-1 text-xs animate-pulse">{cardErrors[card.id].category}</p>
                            )}
                          </div>

                          {/* Year */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <CustomInput
                              id={`year-${card.id}`}
                              name={`year-${card.id}`}
                              placeholder="Year"
                              className="w-full p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                              value={card.yearOfRelease as string}
                              onChange={(e) => updateCard(card.id, 'yearOfRelease', e.target.value)}
                            />
                            {cardErrors[card.id]?.yearOfRelease && (
                              <p className="text-red-500 mt-1 text-xs animate-pulse">{cardErrors[card.id].yearOfRelease}</p>
                            )}
                          </div>
                        </div>

                        {/* Two column layout for service and value */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Service Level */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Level</label>
                            <CustomSelect
                              options={services?.map((service: Service) => (service.name)) || []}
                              selectedOption={
                                services?.find((service: Service) => service.id === card.serviceId)?.name || "Service"
                              }
                              borderColor="border-gray-200"
                              bg="bg-white"
                              setSelectedOption={(value) => updateCard(card.id, 'serviceId', value as string)}
                              className="relative text-sm w-full"
                            />
                            {cardErrors[card.id]?.serviceId && (
                              <p className="text-red-500 mt-1 text-xs animate-pulse">{cardErrors[card.id].serviceId}</p>
                            )}
                          </div>

                          {/* Value */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Value (£)</label>
                            <CustomInput
                              id={`value-${card.id}`}
                              name={`value-${card.id}`}
                              placeholder="£ Value"
                              type="number"
                              className="w-full p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                              value={card.cardValue as number}
                              onChange={(e) => updateCard(card.id, 'cardValue', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bulk Card Submission (> 10 cards) */}
            {numberOfCards > 10 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-light-gray rounded-lg border border-purple-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Bulk Card Submission</h2>
                  <p className="text-charcol">Since you have more than 10 cards, please provide the total value and description.</p>
                </div>
                
                {/* Total Card Value */}
                <div>
                  <label className="block font-semibold mb-2">Total Card Value (£)</label>
                  <CustomInput
                    id="bulkCardValue"
                    name="bulkCardValue"
                    placeholder="Enter total value of all cards"
                    type="number"
                    className="w-full p-6 transition-all duration-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    value={bulkCardValue}
                    onChange={(e) => {
                      setBulkCardValue(Number(e.target.value));
                      setBulkCardValueError('');
                    }}
                  />
                  {bulkCardValueError && (
                    <p className="text-red-500 mt-1 text-sm animate-pulse">{bulkCardValueError}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block font-semibold mb-2">Description (Optional)</label>
                  <textarea
                    id="bulkDescription"
                    name="bulkDescription"
                    placeholder="Provide any additional details about your cards..."
                    className="w-full p-6 border border-gray-200 rounded-lg resize-none bg-white transition-all duration-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    rows={4}
                    value={bulkDescription}
                    onChange={(e) => setBulkDescription(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
            <Button
              size={"lg"}
              type="button"
              className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey transition-all duration-200 w-full sm:w-auto"
              onClick={handlePrevious}
            >
              Back
            </Button>
            <ButtonGradient size={"lg"} className="py-3 px-14 h-auto transition-all duration-200 hover:shadow-lg w-full sm:w-auto" type="submit">
              Next
            </ButtonGradient>
          </div>
        </div>
      </form>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}