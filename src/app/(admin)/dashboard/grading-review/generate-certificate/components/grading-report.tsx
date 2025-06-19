/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, ReactNode } from "react";
import { Pencil, Check, X, Star, AlertCircle } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from "@/components/common/CustomSelect";
import { useEnums } from "@/hooks/useEnums";
import { GradingData } from "../../../types";
import Image from "next/image";

// Define condition breakdown type
interface ConditionBreakdown {
  corners: { score: number; comments: string };
  edges: { score: number; comments: string };
  surface: { score: number; comments: string };
  centering: { score: number; comments: string };
}

interface GradingReportProps {
  data: GradingData;
  isEditable?: boolean;
  onSubmit: (updatedData: GradingData) => void;
  classNames?: string;
  setEditing?: (editing: boolean) => void;
}

// Validation constants
const MAX_TEXTAREA_LENGTH = 500;
const MAX_INPUT_LENGTH = 100;
const MAX_SCORE = 10;

// Define required fields by section
const REQUIRED_FIELDS = {
  "AI Card Grading Report": ["card_name", "grading_date", "card_number", "graded_by"],
  "Final Grade": ["grade", "final_score", "condition_tier"],
  "AI Grading Summary": ["ai_summary"],
  "Detailed Condition Breakdown": [
    "corners.score", "corners.comments",
    "edges.score", "edges.comments",
    "surface.score", "surface.comments",
    "centering.score", "centering.comments"
  ],
  "Final Grade Justification": ["overall_justification"]
};

// Validation functions
const validateScore = (value: number): boolean => {
  return value >= 0 && value <= MAX_SCORE;
};

const validateTextLength = (text: string, maxLength: number): boolean => {
  return text.length <= maxLength;
};

const validateRequired = (value: string | number | null | undefined): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !isNaN(value);
  return false;
};

const normalizeDate = (date: Date) => {
  // Normalize to local midnight (removes time effect)
  const localDate = new Date(date);
  localDate.setHours(0, 0, 0, 0);

  return localDate
};

// Star Rating Component
const StarRating = ({
  rating,
  onRatingChange,
  isEditable = false,
}: {
  rating: string | number;
  onRatingChange: (rating: string) => void;
  isEditable: boolean;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getStarRating = (grade: string) => {
    if (grade.includes("★★★★★")) return 5;
    if (grade.includes("★★★★☆")) return 4;
    if (grade.includes("★★★☆☆")) return 3;
    if (grade.includes("★★☆☆☆")) return 2;
    return 1;
  };

  const getGradeFromStars = (stars: number) => {
    switch (stars) {
      case 5:
        return "★★★★★ Pristine";
      case 4:
        return "★★★★☆ Near Mint (NM)";
      case 3:
        return "★★★☆☆ Excellent";
      case 2:
        return "★★☆☆☆ Good";
      default:
        return "★☆☆☆☆ Poor";
    }
  };

  const currentRating =
    typeof rating === "string" ? getStarRating(rating) : rating;

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!isEditable}
          onClick={() => isEditable && onRatingChange(getGradeFromStars(star))}
          onMouseEnter={() => isEditable && setHoverRating(star)}
          onMouseLeave={() => isEditable && setHoverRating(0)}
          className={`${isEditable ? "cursor-pointer hover:scale-110" : "cursor-default"
            } transition-all duration-200`}
        >
          <Star
            size={24}
            className={`${star <= (hoverRating || currentRating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
              } transition-colors duration-200`}
          />
        </button>
      ))}
      {isEditable && (
        <span className="ml-2 text-sm text-gray-600">({currentRating}/5 stars)</span>
      )}
    </div>
  );
};

const GradingReport = ({
  data,
  isEditable = false,
  onSubmit,
  classNames,
  setEditing
}: GradingReportProps) => {
  const [formData, setFormData] = useState<GradingData>(data);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    setFormData(data);
    // When data changes, ensure editing state is reset and errors are cleared
    setIsEditing({});
    setValidationErrors({});
  }, [data]);

  const validateField = (
    key: string,
    value: string | number,
    type?: string,
    sectionTitle?: string
  ): string => {
    // Determine the relevant section for required field check
    let effectiveSectionTitle = sectionTitle;
    if (sectionTitle === "conditionBreakdown") {
      effectiveSectionTitle = "Detailed Condition Breakdown";
    }

    // Check if field is required
    const sectionRequiredFields = REQUIRED_FIELDS[effectiveSectionTitle as keyof typeof REQUIRED_FIELDS] || [];
    const isRequired = sectionRequiredFields.includes(key) ||
      sectionRequiredFields.some(field => field.includes(key));

    if (isRequired && !validateRequired(value)) {
      return "This field is required";
    }

    if (type === "number" || key.includes("score")) {
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      if (isRequired && isNaN(numValue)) {
        return "Please enter a valid number";
      }
      if (!isNaN(numValue) && !validateScore(numValue)) {
        return `Score must be between 0 and ${MAX_SCORE}`;
      }
    } else if (type === "textarea") {
      const textValue = String(value);
      if (!validateTextLength(textValue, MAX_TEXTAREA_LENGTH)) {
        return `Text must be less than ${MAX_TEXTAREA_LENGTH} characters (current: ${textValue.length})`;
      }
    } else if (type !== "date" && type !== "star-rating") {
      const textValue = String(value);
      if (!validateTextLength(textValue, MAX_INPUT_LENGTH)) {
        return `Text must be less than ${MAX_INPUT_LENGTH} characters (current: ${textValue.length})`;
      }
    }
    return "";
  };

  const handleChange = (
    section: string,
    key: string,
    value: string | number | Date,
    type?: string
  ) => {
    const validationKeyPrefix = section === "conditionBreakdown" ? section : section;
    const validationKey = `${validationKeyPrefix}.${key}`;
    let finalValue: string | number;

    if (type === "date" && value instanceof Date) {
      // Convert date to ISO-MM-DD format without time
      finalValue = value.toISOString().split("T")[0]; // e.g., "2025-05-12"
    } else {
      finalValue = value as string | number;
    }

    // Perform validation immediately
    const error = validateField(key, finalValue, type, section);

    setValidationErrors((prev) => ({
      ...prev,
      [validationKey]: error,
    }));

    if (section === "conditionBreakdown") {
      const [category, subKey] = key.split(".");
      setFormData((prev) => ({
        ...prev,
        condition_breakdown: {
          ...prev.condition_breakdown,
          [category]: {
            ...prev.condition_breakdown[
            category as keyof ConditionBreakdown
            ],
            [subKey]:
              subKey === "score"
                ? typeof value === "string"
                  ? parseFloat(value) || 0
                  : value
                : value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: finalValue,
      }));
    }
  };

  const handleStarRatingChange = (newGrade: string) => {
    setFormData((prev) => ({
      ...prev,
      grade: newGrade,
    }));
    // Clear any validation error for grade field
    setValidationErrors((prev) => ({
      ...prev,
      "Final Grade.grade": "",
    }));
  };

  const hasValidationErrors = (sectionTitle?: string): boolean => {
    if (sectionTitle) {
      // For Detailed Condition Breakdown, check specifically for its keys
      if (sectionTitle === "Detailed Condition Breakdown") {
        return Object.keys(validationErrors)
          .filter(key => key.startsWith("conditionBreakdown"))
          .some(key => validationErrors[key] !== "");
      }
      return Object.keys(validationErrors)
        .filter(key => key.startsWith(sectionTitle))
        .some(key => validationErrors[key] !== "");
    }
    return Object.values(validationErrors).some((error) => error !== "");
  };

  const validateSection = (sectionTitle: string): void => {
    let effectiveSectionTitle = sectionTitle;
    if (sectionTitle === "conditionBreakdown") {
      effectiveSectionTitle = "Detailed Condition Breakdown";
    }

    const sectionRequiredFields = REQUIRED_FIELDS[effectiveSectionTitle as keyof typeof REQUIRED_FIELDS] || [];
    const newErrors: { [key: string]: string } = {};

    sectionRequiredFields.forEach(field => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any;
      let validationKey: string;
      let type: string;

      if (field.includes('.')) {
        // Handle nested fields like "corners.score" for conditionBreakdown
        const [category, subKey] = field.split('.');
        value = formData.condition_breakdown?.[category as keyof ConditionBreakdown]?.[subKey as 'score' | 'comments'];
        validationKey = `conditionBreakdown.${field}`;
        type = subKey === 'score' ? 'number' : 'textarea';
      } else {
        value = formData[field as keyof GradingData];
        validationKey = `${sectionTitle}.${field}`;
        type = field.includes('score') ? 'number' :
          field.includes('summary') || field.includes('justification') ? 'textarea' :
            field === 'grading_date' ? 'date' :
              field === 'grade' ? 'star-rating' : 'text';
      }

      const error = validateField(field, value, type, effectiveSectionTitle);
      if (error) {
        newErrors[validationKey] = error;
      }
    });

    setValidationErrors(prev => ({
      ...prev,
      ...newErrors
    }));
  };

  const handleSave = (section: string) => {
    // First validate all required fields in the section
    validateSection(section === "Detailed Condition Breakdown" ? "conditionBreakdown" : section); // Pass the internal key for validation

    // Check if there are any validation errors after validation
    setTimeout(() => {
      if (!hasValidationErrors(section)) {
        onSubmit(formData);
        setIsEditing((prev) => ({ ...prev, [section]: false }));
        setEditing?.(false);
        // Clear validation errors for this section
        const updatedErrors = { ...validationErrors };
        Object.keys(updatedErrors).forEach((key) => {
          if (key.startsWith(section) || (section === "Detailed Condition Breakdown" && key.startsWith('conditionBreakdown'))) {
            delete updatedErrors[key];
          }
        });
        setValidationErrors(updatedErrors);
      }
    }, 0);
  };

  const handleCancel = (section: string) => {
    setFormData(data);
    setIsEditing((prev) => ({ ...prev, [section]: false }));
    setEditing?.(false)
    // Clear validation errors for this section
    const updatedErrors = { ...validationErrors };
    Object.keys(updatedErrors).forEach((key) => {
      if (key.startsWith(section) || (section === "Detailed Condition Breakdown" && key.startsWith('conditionBreakdown'))) {
        delete updatedErrors[key];
      }
    });
    setValidationErrors(updatedErrors);
  };

  // Helper component for displaying error messages
  const ErrorMessage = ({ message, className = "" }: { message: string; className?: string }) => {
    if (!message) return null;
    return (
      <div className={`absolute -top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down ${className}`}>
        <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap w-full">
          {message}
        </p>
        <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
      </div>
    );
  };

  // Define sections for the report
  const sections = [
    {
      title: "AI Card Grading Report",
      icon: "/assets/images/report.svg",
      fields: [
        { label: "Card Name", key: "card_name", required: true },
        { label: "Grading Date", key: "grading_date", type: "date", required: true },
        { label: "Card Number", key: "card_number", required: true },
        { label: "Graded by", key: "graded_by", required: true },
      ],
    },
    {
      title: "Final Grade",
      icon: "/assets/images/grade.svg",
      fields: [
        { label: "Grade", key: "grade", type: "star-rating", required: true },
        { label: "AI Score", key: "final_score", type: "number", required: true },
        { label: "Condition Tier", key: "condition_tier", required: true },
      ],
    },
    {
      title: "AI Grading Summary",
      icon: "/assets/images/brain.svg",
      fields: [{ label: "", key: "ai_summary", type: "textarea", required: true }],
    },
    {
      title: "Detailed Condition Breakdown",
      type: "table",
      icon: "/assets/images/breakdown.svg",
      tableHeaders: ["Category", "AI Score (out of 10)", "Comments"],
      tableData: [
        {
          category: "Corners",
          key: "corners",
          score: formData.condition_breakdown.corners.score,
          comments: formData.condition_breakdown.corners.comments,
          required: true,
        },
        {
          category: "Edges",
          key: "edges",
          score: formData.condition_breakdown.edges.score,
          comments: formData.condition_breakdown.edges.comments,
          required: true,
        },
        {
          category: "Surface",
          key: "surface",
          score: formData.condition_breakdown.surface.score,
          comments: formData.condition_breakdown.surface.comments,
          required: true,
        },
        {
          category: "Centering",
          key: "centering",
          score: formData.condition_breakdown.centering.score,
          comments: formData.condition_breakdown.centering.comments,
          required: true,
        },
      ],
    },
    {
      title: "Final Grade Justification",
      icon: "/assets/images/report.svg",
      fields: [{ label: "", key: "overall_justification", type: "textarea", required: true }],
    },
  ];

  // Format date for display
  const formatDate = (date: string | null) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className={`w-full bg-light-grey rounded-md shadow-sm overflow-hidden ${classNames}`}
    >
      {sections.map((section, index) => (
        <div
          key={index}
          className="px-4 py-6 sm:px-6 md:px-10 border-b border-gray-200 last:border-b-0"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center">
              <Image
                src={section.icon}
                width={24}
                height={24}
                alt={`${section.title} icon`}
                className="mr-4"
              />
              <h2>{section.title}</h2>
            </div>

            {isEditable && (
              <div className="flex space-x-2">
                {isEditing[section.title] ? (
                  <>
                    <button
                      onClick={() => handleSave(section.title)}
                      disabled={hasValidationErrors(section.title)}
                      className={`${hasValidationErrors(section.title)
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-green-500 hover:text-green-700"
                        } transition-colors`}
                      title={
                        hasValidationErrors(section.title)
                          ? "Please fix validation errors before saving"
                          : "Save changes"
                      }
                    >
                      <Check size={30} />
                    </button>
                    <button
                      onClick={() => handleCancel(section.title)}
                      className="text-light-red hover:text-red-700"
                    >
                      <X size={30} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditing((prev) => ({ ...prev, [section.title]: true }))
                      setEditing?.(true)
                    }
                    }
                    className="text-light-red hover:text-orange-700"
                  >
                    <Pencil size={24} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Section Content */}
          {section.type === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto sm:table-fixed"> {/* Added table-auto and sm:table-fixed */}
                <thead>
                  <tr className="border-b border-gray-200">
                    {section.tableHeaders.map((header, i) => (
                      <th
                        key={i}
                        className="py-2 font-medium text-gray-900 px-2 sm:px-4"
                      >
                        {header}
                        {i > 0 && <span className="text-red-500 ml-1">*</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.tableData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <td className="py-2 px-2 sm:px-4 whitespace-nowrap"> {/* Added whitespace-nowrap */}
                        {row.category}
                      </td>
                      <td className="py-2 px-2 sm:px-4">
                        {isEditing[section.title] ? (
                          <div className="space-y-1 relative">
                            {" "}
                            {/* Added relative positioning */}
                            <input
                              type="number"
                              min="0"
                              max={MAX_SCORE}
                              step="0.1"
                              value={row.score}
                              onChange={(e) =>
                                handleChange(
                                  "conditionBreakdown", // Use internal section key
                                  `${row.key}.score`,
                                  e.target.value,
                                  "number"
                                )
                              }
                              onBlur={(e) => {
                                // Added onBlur for validation on defocus
                                const error = validateField(
                                  `${row.key}.score`,
                                  parseFloat(e.target.value),
                                  "number",
                                  "conditionBreakdown" // Use internal section key
                                );
                                setValidationErrors((prev) => ({
                                  ...prev,
                                  [`conditionBreakdown.${row.key}.score`]: error,
                                }));
                              }}
                              className={`border rounded-lg p-2 w-full sm:w-20 ${validationErrors[`conditionBreakdown.${row.key}.score`]
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-300 bg-white"
                                }`}
                              required
                            />
                            {/* <ErrorMessage
                              className="!-top-0 !-right-0 md:!-right-[70%] lg:!right-full lg:mr-2 !transform-none lg:!-translate-y-1/2" // Adjusted positioning for responsiveness
                              message={
                                validationErrors[`conditionBreakdown.${row.key}.score`]
                              }
                            /> */}
                          </div>
                        ) : (
                          <span className="font-medium">{row.score}</span>
                        )}
                      </td>
                      <td className="py-2 px-2 sm:px-4">
                        {isEditing[section.title] ? (
                          <div className="space-y-1 relative">
                            {" "}
                            {/* Added relative positioning */}
                            <textarea
                              value={row.comments}
                              onChange={(e) =>
                                handleChange(
                                  "conditionBreakdown", // Use internal section key
                                  `${row.key}.comments`,
                                  e.target.value,
                                  "textarea"
                                )
                              }
                              onBlur={(e) => {
                                // Added onBlur for validation on defocus
                                const error = validateField(
                                  `${row.key}.comments`,
                                  e.target.value,
                                  "textarea",
                                  "conditionBreakdown" // Use internal section key
                                );
                                setValidationErrors((prev) => ({
                                  ...prev,
                                  [`conditionBreakdown.${row.key}.comments`]: error,
                                }));
                              }}
                              className={`border rounded-lg p-2 w-full min-h-[80px] resize-y ${validationErrors[`conditionBreakdown.${row.key}.comments`]
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-300 bg-white"
                                }`}
                              rows={3}
                              maxLength={MAX_TEXTAREA_LENGTH}
                              required
                            />
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>
                                {row.comments.length}/{MAX_TEXTAREA_LENGTH} characters
                              </span>
                            </div>
                            <ErrorMessage
                              message={
                                validationErrors[`conditionBreakdown.${row.key}.comments`]
                              }
                            />
                          </div>
                        ) : (
                          <span className="text-gray-600 whitespace-pre-wrap">
                            {row.comments}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(section.title);
              }}
              className="space-y-4"
            >
              {section.fields?.map(({ label, key, type, required }, fieldIndex) => (
                <div key={fieldIndex}>
                  <div
                    className={`${label ? "grid sm:grid-cols-2 grid-cols-1" : ""
                      } py-1 gap-2 relative`}
                  >
                    {label && (
                      <span className="font-medium text-gray-900 flex items-center">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                      </span>
                    )}
                    {type === "star-rating" ? (
                      <div className="flex flex-col space-y-2">
                        <StarRating
                          rating={formData[key as keyof GradingData] as string}
                          onRatingChange={handleStarRatingChange}
                          isEditable={isEditing[section.title]}
                        />
                        {!isEditing[section.title] && (
                          <span className="text-gray-600 text-sm">
                            {formData[key as keyof GradingData] as ReactNode}
                          </span>
                        )}
                        <ErrorMessage
                          message={validationErrors[`${section.title}.${key}`]}
                          className="!top-full !-translate-y-0 !right-auto !left-0 mt-1" // Adjust position for star rating
                        />
                      </div>
                    ) : type === "number" ? (
                      isEditing[section.title] ? (
                        <div className="space-y-1 w-full">
                          <input
                            type="number"
                            min="0"
                            max={MAX_SCORE}
                            step="0.1"
                            value={formData[key as keyof GradingData] as string}
                            onChange={(e) =>
                              handleChange(
                                section.title,
                                key,
                                Number(e.target.value),
                                type
                              )
                            }
                            onBlur={(e) => { // Added onBlur for validation on defocus
                              const error = validateField(
                                key,
                                Number(e.target.value),
                                type,
                                section.title
                              );
                              setValidationErrors((prev) => ({
                                ...prev,
                                [`${section.title}.${key}`]: error,
                              }));
                            }}
                            className={`border rounded-lg p-4 w-full ${validationErrors[`${section.title}.${key}`]
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-white"
                              }`}
                            required={required}
                          />
                          <ErrorMessage
                            message={validationErrors[`${section.title}.${key}`]}
                          />
                        </div>
                      ) : (
                        <span className="text-gray-600 font-medium">
                          {formData[key as keyof GradingData] as ReactNode}
                        </span>
                      )
                    ) : type === "date" ? (
                      isEditing[section.title] ? (
                        <div className="space-y-1 w-full">
                          <DatePicker
                            selected={
                              formData[key as keyof GradingData]
                                ? new Date(formData[key as keyof GradingData] as string)
                                : null
                            }
                            onChange={(date: Date | null) => {
                              handleChange(section.title, key, normalizeDate(date as Date), type)
                              // No onBlur needed for date picker as onChange handles the full value change
                            }}
                            dateFormat="dd MMMM yyyy"
                            className={`border rounded-lg p-4 w-full ${validationErrors[`${section.title}.${key}`]
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-white"
                              }`}
                            placeholderText="Select grading date"
                            required={required}
                          />
                          <ErrorMessage
                            message={validationErrors[`${section.title}.${key}`]}
                          />
                        </div>
                      ) : (
                        <span className="text-gray-600">
                          {formatDate(
                            formData[key as keyof GradingData] as string
                          )}
                        </span>
                      )
                    ) : type === "textarea" ? (
                      isEditing[section.title] ? (
                        <div className="space-y-1 w-full">
                          <textarea
                            value={formData[key as keyof GradingData] as string}
                            onChange={(e) =>
                              handleChange(
                                section.title,
                                key,
                                e.target.value,
                                type
                              )
                            }
                            onBlur={(e) => { // Added onBlur for validation on defocus
                              const error = validateField(
                                key,
                                e.target.value,
                                type,
                                section.title
                              );
                              setValidationErrors((prev) => ({
                                ...prev,
                                [`${section.title}.${key}`]: error,
                              }));
                            }}
                            className={`border rounded-lg p-4 w-full min-h-[100px] resize-y ${validationErrors[`${section.title}.${key}`]
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-white"
                              }`}
                            rows={4}
                            maxLength={MAX_TEXTAREA_LENGTH}
                            required={required}
                          />
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>
                              {String(
                                formData[key as keyof GradingData] || ""
                              ).length}/{MAX_TEXTAREA_LENGTH} characters
                            </span>
                          </div>
                          <ErrorMessage
                            message={validationErrors[`${section.title}.${key}`]}
                          />
                        </div>
                      ) : (
                        <div className="text-gray-600 whitespace-pre-wrap">
                          {formData[key as keyof GradingData] as ReactNode}
                        </div>
                      )
                    ) : isEditing[section.title] ? (
                      <div className="space-y-1 w-full">
                        <input
                          type="text"
                          value={formData[key as keyof GradingData] as string}
                          onChange={(e) =>
                            handleChange(section.title, key, e.target.value)
                          }
                          onBlur={(e) => { // Added onBlur for validation on defocus
                            const error = validateField(
                              key,
                              e.target.value,
                              "text",
                              section.title
                            );
                            setValidationErrors((prev) => ({
                              ...prev,
                              [`${section.title}.${key}`]: error,
                            }));
                          }}
                          className={`border rounded-lg p-4 w-full ${validationErrors[`${section.title}.${key}`]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 bg-white"
                            }`}
                          maxLength={MAX_INPUT_LENGTH}
                          required={required}
                        />
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>
                            {String(
                              formData[key as keyof GradingData] || ""
                            ).length}/{MAX_INPUT_LENGTH} characters
                          </span>
                        </div>
                        <ErrorMessage
                          message={validationErrors[`${section.title}.${key}`]}
                        />
                      </div>
                    ) : (
                      <span className="text-gray-600">
                        {formData[key as keyof GradingData] as ReactNode}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default GradingReport;