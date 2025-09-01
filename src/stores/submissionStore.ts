import { ConditionBreakdown } from "@/app/(admin)/dashboard/types";
import { Service, User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

export interface CardData {
  id: number;
  cardName: string;
  category: string;
  cardType?: string | null;
  yearOfRelease: number | null | string;
  frontImage?: string | null | File;
  backImage?: string | null | File;
  cardValue?: number | null;
  trackingNumber?: string;
  cardId?: string;
  gradeData?: GradingData | null | undefined;
  grade?: GradingData | null;
  status?: string;
  serviceId?: number | null;
  service?: Service | null;
  estimatedCompletion?: string
  submissionId?: number | null;
  createdAt?: string;
  overallProgress?: number;
}

export interface SubmissionData {
  id: number | null;
  submissionSource: string;
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
  numberOfCards?: number,
  bulkCardValue?: number,
  bulkDescription?: string,
  trackingNumber?: string;
  selectedDeliveryOption?: string;
  deliveryCost?: number;
  cards: CardData[];
  services?: Service[]
  user?: User
}

interface SubmissionStore {
  submission: SubmissionData;
  _hasHydrated: boolean;
  setSubmission: (data: Partial<SubmissionData>) => void;
  resetSubmission: () => void;
  setHasHydrated: (state: boolean) => void;
}

const createEmptyCard = (): CardData => ({
  id: 0,
  cardName: "",
  category: "",
  cardType: "",
  yearOfRelease: null,
  frontImage: null,
  backImage: null,
  cardValue: null,
  trackingNumber: "",
  grade: null,
  cardId: "",
  gradeData: null,
  serviceId: null,
});

const initialSubmission: SubmissionData = {
  id: null,
  submissionSource: '',
  overallProgress: 0,
  estimatedCompletion: '',
  submissionStatus: '',
  step: 1,
  fullName: '',
  shippingAddress: '',
  phoneNumber: '',
  submissionDate: '',
  email: '',
  editing: false,
  cards: [createEmptyCard()],
  services: [],
  numberOfCards: 0,
  bulkCardValue: undefined,
  bulkDescription: '',
  trackingNumber: ''
};

export const useSubmissionStore = create<SubmissionStore>()(
  persist(
    (set) => ({
      submission: initialSubmission,
      _hasHydrated: false,

      setSubmission: (data) =>
        set((state) => ({
          submission: { ...state.submission, ...data },
        })),

      resetSubmission: () => {
        sessionStorage.removeItem('submission-storage');
        set({
          submission: initialSubmission,
        });
      },

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        });
      }
    }),
    {
      name: 'submission-storage',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);