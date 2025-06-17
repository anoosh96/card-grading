import { GradingData } from "@/app/(admin)/dashboard/types";

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
  hover?: boolean;
  fill?: string;
  setHover?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StepCardProps {
  image: string;
  title: string;
  desc: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface FaqProps {
  faqs: Faq[];
}

export interface ServiceCardProps {
  name: string;
  price: number;
  features: string[];
  onSubscribe: (type: string) => void;
}

export interface AddonProps {
  icon: string;
  title: string;
  desc: string;
}

export interface FormStepProps {
  handleNext: () => void;
  handlePrevious?: () => void;
}

export interface Service {
  id: number;
  name: string;
  turnAroundTime: string;
  pricePerCard: number;
  renewalPeriod?: string;
  features?: string[];
  cardLimit?: number;
  maxCardValue?: number;
  colorClass?: string;
}

export interface Subscription {
  status: string;
  type: string;
  renewalDate: string;
  totalCards: number;
  cardLimit: number;
  cardsUsed: number;
  serviceId?: string;
  service?: Service;
  cancelAtPeriodEnd: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  shippingAddress: string;
  phoneNumber: string;
  password?: string;
  confirmPassword?: string;
  paymentMethod?: string;
  profileImage?: string
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}


export interface User {
  id: number;
  email: string;
  emailVerified: boolean;
  fullName: string | null;
  shippingAddress: string | null;
  phoneNumber: string | null;
  paymentMethod: string | null;
  createdAt: string; // Date string (ISO 8601 format)
  updatedAt: string; // Date string (ISO 8601 format)
  subscription?: Subscription
  profileImageUrl?: string
  role: string
}


export interface Card {
  cardName: string;
  category: string;
  cardType: string;
  yearOfRelease: number | null;
  frontImage: string | undefined;
  backImage: string | undefined;
  status: string;
  cardValue: number | null;
  serviceId: number | null;
  service?: Service | null;
  id: number;
  grade?: GradingData | null;
  submissionId?: number | null;
}

export interface Submission {
  id: string;
  submissionSource: string;
  trackingNumber: string;
  overallProgress: number;
  estimatedCompletion: string;
  submissionStatus: string;
  cards: Card[]
  dateTime: string;
  numberOfCards: number;
}

export interface SubmissionInfo {
  id: string;
  submissionSource: string;
  trackingNumber: string;
  overallProgress: number;
  estimatedCompletion: string;
  submissionStatus: string;
}

export interface AiGrade {
  grade: number;
  aiRemarks: string;
}

export type FlexibleRecord = Record<string, string | object | number | null | undefined>
export type SignupField = 'name' | 'email' | 'password' | 'confirmPassword'

export interface SignUpResponse {
  user: User
  token: string
}

export interface APIError {
  path: string[];
  message: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface VerifyCodeResponse {
  message: string;
}
