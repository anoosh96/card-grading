export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
  hover?: boolean;
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
  price: string;
  features: string[];
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
  id: string;
  name: string;
  pricePerCard: number;
  renewalPeriod: string;
  features: string[];
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
  id: string;
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
  conditionEstimate: string;
  serviceType: string;
  frontImage: string | undefined;
  backImage: string | undefined;
}

export interface Submission {
  id: string;
  submissionSource: string;
  trackingNumber: string;
  overallProgress: number;
  estimatedCompletion: string;
  submissionStatus: string;
  card: Card
  dateTime: string;
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
