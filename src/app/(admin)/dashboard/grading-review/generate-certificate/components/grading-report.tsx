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

// Validation functions
const validateScore = (value: number): boolean => {
  return value >= 0 && value <= MAX_SCORE;
};

const validateTextLength = (text: string, maxLength: number): boolean => {
  return text.length <= maxLength;
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
  }, [data]);

  const validateField = (
    key: string,
    value: string | number,
    type?: string
  ): string => {
    if (type === "number" || key.includes("score")) {
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      if (isNaN(numValue)) {
        return "Please enter a valid number";
      }
      if (!validateScore(numValue)) {
        return `Score must be between 0 and ${MAX_SCORE}`;
      }
    } else if (type === "textarea") {
      const textValue = String(value);
      if (!validateTextLength(textValue, MAX_TEXTAREA_LENGTH)) {
        return `Text must be less than ${MAX_TEXTAREA_LENGTH} characters (current: ${textValue.length})`;
      }
    } else if (type !== "date") {
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
    const validationKey = `${section}.${key}`;
    let finalValue: string | number;

    if (type === "date" && value instanceof Date) {
      // Convert date to YYYY-MM-DD format without time
      finalValue = value.toISOString().split("T")[0]; // e.g., "2025-05-12"
    } else {
      finalValue = value as string | number;
    }

    const error = validateField(key, finalValue, type);

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
  };

  const hasValidationErrors = (): boolean => {
    return Object.values(validationErrors).some((error) => error !== "");
  };

  const handleSave = (section: string) => {
    if (hasValidationErrors()) {
      return;
    }
    onSubmit(formData);
    setIsEditing((prev) => ({ ...prev, [section]: false }));
    setEditing?.(false)
    // Clear validation errors for this section
    const updatedErrors = { ...validationErrors };
    Object.keys(updatedErrors).forEach((key) => {
      if (key.startsWith(section)) {
        delete updatedErrors[key];
      }
    });
    setValidationErrors(updatedErrors);
  };

  const handleCancel = (section: string) => {
    setFormData(data);
    setIsEditing((prev) => ({ ...prev, [section]: false }));
    setEditing?.(false)
    // Clear validation errors for this section
    const updatedErrors = { ...validationErrors };
    Object.keys(updatedErrors).forEach((key) => {
      if (key.startsWith(section)) {
        delete updatedErrors[key];
      }
    });
    setValidationErrors(updatedErrors);
  };

  // Define sections for the report
  const sections = [
    {
      title: "AI Card Grading Report",
      icon: "/assets/images/report.svg",
      fields: [
        { label: "Card Name", key: "card_name" },
        { label: "Grading Date", key: "grading_date", type: "date" },
        { label: "Card Number", key: "card_number" },
        { label: "Graded by", key: "graded_by" },
      ],
    },
    {
      title: "Final Grade",
      icon: "/assets/images/grade.svg",
      fields: [
        { label: "Grade", key: "grade", type: "star-rating" },
        { label: "AI Score", key: "final_score", type: "number" },
        { label: "Condition Tier", key: "condition_tier" },
      ],
    },
    {
      title: "AI Grading Summary",
      icon: "/assets/images/brain.svg",
      fields: [{ label: "", key: "ai_summary", type: "textarea" }],
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
        },
        {
          category: "Edges",
          key: "edges",
          score: formData.condition_breakdown.edges.score,
          comments: formData.condition_breakdown.edges.comments,
        },
        {
          category: "Surface",
          key: "surface",
          score: formData.condition_breakdown.surface.score,
          comments: formData.condition_breakdown.surface.comments,
        },
        {
          category: "Centering",
          key: "centering",
          score: formData.condition_breakdown.centering.score,
          comments: formData.condition_breakdown.centering.comments,
        },
      ],
    },
    {
      title: "Final Grade Justification",
      icon: "/assets/images/report.svg",
      fields: [{ label: "", key: "overall_justification", type: "textarea" }],
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
                      disabled={hasValidationErrors()}
                      className={`${hasValidationErrors()
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-green-500 hover:text-green-700"
                        } transition-colors`}
                      title={
                        hasValidationErrors()
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
                    onClick={() =>{
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
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    {section.tableHeaders.map((header, i) => (
                      <th
                        key={i}
                        className="py-2 font-medium text-gray-900 px-2 sm:px-4"
                      >
                        {header}
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
                      <td className="py-2 px-2 sm:px-4">{row.category}</td>
                      <td className="py-2 px-2 sm:px-4">
                        {isEditing[section.title] ? (
                          <div className="space-y-1">
                            <input
                              type="number"
                              min="0"
                              max={MAX_SCORE}
                              step="0.1"
                              value={row.score}
                              onChange={(e) =>
                                handleChange(
                                  "conditionBreakdown",
                                  `${row.key}.score`,
                                   e.target.value,
                                  "number"
                                )
                              }
                              className={`border rounded-lg p-2 w-full sm:w-20 ${validationErrors[
                                `conditionBreakdown.${row.key}.score`
                              ]
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300 bg-white"
                                }`}
                            />
                            {validationErrors[
                              `conditionBreakdown.${row.key}.score`
                            ] && (
                                <div className="flex items-center text-red-500 text-xs">
                                  <AlertCircle size={12} className="mr-1" />
                                  {validationErrors[
                                    `conditionBreakdown.${row.key}.score`
                                  ]}
                                </div>
                              )}
                          </div>
                        ) : (
                          <span className="font-medium">{row.score}</span>
                        )}
                      </td>
                      <td className="py-2 px-2 sm:px-4">
                        {isEditing[section.title] ? (
                          <div className="space-y-1">
                            <textarea
                              value={row.comments}
                              onChange={(e) =>
                                handleChange(
                                  "conditionBreakdown",
                                  `${row.key}.comments`,
                                  e.target.value,
                                  "textarea"
                                )
                              }
                              className={`border rounded-lg p-2 w-full min-h-[80px] resize-y ${validationErrors[
                                `conditionBreakdown.${row.key}.comments`
                              ]
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300 bg-white"
                                }`}
                              rows={3}
                              maxLength={MAX_TEXTAREA_LENGTH}
                            />
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>{row.comments.length}/{MAX_TEXTAREA_LENGTH} characters</span>
                            </div>
                            {validationErrors[
                              `conditionBreakdown.${row.key}.comments`
                            ] && (
                                <div className="flex items-center text-red-500 text-xs">
                                  <AlertCircle size={12} className="mr-1" />
                                  {validationErrors[
                                    `conditionBreakdown.${row.key}.comments`
                                  ]}
                                </div>
                              )}
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
              {section.fields?.map(({ label, key, type }, fieldIndex) => (
                <div key={fieldIndex}>
                  <div
                    className={`${label ? "grid sm:grid-cols-2 grid-cols-1" : ""
                      } py-1 gap-2`}
                  >
                    {label && (
                      <span className="font-medium text-gray-900 flex items-center">
                        {label}
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
                            className={`border rounded-lg p-4 w-full ${validationErrors[`${section.title}.${key}`]
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-white"
                              }`}
                          />
                          {validationErrors[`${section.title}.${key}`] && (
                            <div className="flex items-center text-red-500 text-sm">
                              <AlertCircle size={14} className="mr-1" />
                              {validationErrors[`${section.title}.${key}`]}
                            </div>
                          )}
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
                            onChange={(date: Date | null) =>
                              handleChange(section.title, key, normalizeDate(date as Date), type)
                            }
                            dateFormat="dd MMMM yyyy"
                            className={`border rounded-lg p-4 w-full ${validationErrors[`${section.title}.${key}`]
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-white"
                              }`}
                            placeholderText="Select grading date"
                          />
                          {validationErrors[`${section.title}.${key}`] && (
                            <div className="flex items-center text-red-500 text-sm">
                              <AlertCircle size={14} className="mr-1" />
                              {validationErrors[`${section.title}.${key}`]}
                            </div>
                          )}
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
                            className={`border rounded-lg p-4 w-full min-h-[100px] resize-y ${validationErrors[`${section.title}.${key}`]
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-white"
                              }`}
                            rows={4}
                            maxLength={MAX_TEXTAREA_LENGTH}
                          />
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>
                              {String(
                                formData[key as keyof GradingData] || ""
                              ).length}/{MAX_TEXTAREA_LENGTH} characters
                            </span>
                          </div>
                          {validationErrors[`${section.title}.${key}`] && (
                            <div className="flex items-center text-red-500 text-sm">
                              <AlertCircle size={14} className="mr-1" />
                              {validationErrors[`${section.title}.${key}`]}
                            </div>
                          )}
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
                          className={`border rounded-lg p-4 w-full ${validationErrors[`${section.title}.${key}`]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 bg-white"
                            }`}
                          maxLength={MAX_INPUT_LENGTH}
                        />
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>
                            {String(
                              formData[key as keyof GradingData] || ""
                            ).length}/{MAX_INPUT_LENGTH} characters
                          </span>
                        </div>
                        {validationErrors[`${section.title}.${key}`] && (
                          <div className="flex items-center text-red-500 text-sm">
                            <AlertCircle size={14} className="mr-1" />
                            {validationErrors[`${section.title}.${key}`]}
                          </div>
                        )}
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