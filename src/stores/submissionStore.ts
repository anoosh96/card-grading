import { ConditionBreakdown } from "@/app/(admin)/dashboard/types";
import { create } from "zustand";


interface GradingData {
  cardNumber: string;
  grade: string;
  finalScore: number;
  conditionBreakdown: ConditionBreakdown;
  overallJustification: string;
  conditionTier: string;
  aiSummary: string;
  reportPdfUrl?: string;
  cardId?: string;
  createdAt?: string;
  gradeDate?: string;
}
export interface SubmissionData {
  id: string;
  cardName: string;
  category: string;
  cardType: string | null;
  yearOfRelease: number | null | string;
  conditionEstimate: string;
  serviceType: string;
  frontImage: string | null | File;
  backImage: string | null | File;
  submissionSource: string;
  trackingNumber: string;
  overallProgress: number;
  estimatedCompletion: string;
  submissionStatus: string;
  step: number;
  fullName?: string;
  shippingAddress?: string;
  phoneNumber?: string;
  submissionDate?: string;
  email?: string;
  editing?: boolean;
  grade?: number | null;
  aiRemarks?: string;
  cardId?: string
  gradeData?: GradingData | null | undefined
}

interface SubmissionStore {
  submission: SubmissionData;
  setSubmission: (data: Partial<SubmissionData>) => void;
  resetSubmission: () => void;
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  submission: {
    id: "",
    cardName: "",
    category: "",
    cardType: "",
    yearOfRelease: null,
    conditionEstimate: "",
    serviceType: "",
    frontImage: null,
    backImage: null,
    submissionSource: '',
    overallProgress: 0,
    estimatedCompletion: '',
    trackingNumber: '',
    submissionStatus: '',
    step: 1,
    fullName: '',
    shippingAddress: '',
    phoneNumber: '',
    submissionDate: '',
    email: '',
    editing: false,
    grade: null,
    aiRemarks: '',
    cardId: '',
    gradeData: null
  },
  setSubmission: (data) =>
    set((state) => ({
      submission: { ...state.submission, ...data },
    })),
  resetSubmission: () =>
    set({
      submission: {
        cardName: "",
        category: "",
        cardType: "",
        yearOfRelease: null,
        conditionEstimate: "",
        serviceType: "",
        frontImage: null,
        backImage: null,
        submissionSource: '',
        overallProgress: 0,
        estimatedCompletion: '',
        trackingNumber: '',
        submissionStatus: '',
        step: 1,
        fullName: '',
        shippingAddress: '',
        phoneNumber: '',
        id: "",
        submissionDate: '',
        email: '',
        editing: false,
        grade: null,
        aiRemarks: '',
        cardId: '',
        gradeData: null
      },
    }),
}));
