import { create } from "zustand";

interface SubmissionData {
  cardName: string;
  category: string;
  cardType: string;
  yearOfRelease: number | null;
  conditionEstimate: string;
  serviceType: string;
  frontImage: File | null;
  backImage: File | null;
  submissionSource: string;
  trackingNumber: string;
  overallProgress: number;
  estimatedCompletion: string;
  submissionStatus: string;
  step: number
}

interface SubmissionStore {
  submission: SubmissionData;
  setSubmission: (data: Partial<SubmissionData>) => void;
  resetSubmission: () => void;
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
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
    step: 1
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
        step: 1
      },
    }),
}));
