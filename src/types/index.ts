export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
  hover?: boolean;
  setHover?: React.Dispatch<React.SetStateAction<boolean>>
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
  faqs: Faq[]
}

export interface ServiceCardProps {
  name: string;
  price: string;
  features: string[]
}

export interface AddonProps {
  icon: string;
  title: string;
  desc: string
}

export interface Card {
  cardName: string;
  year: string;
  category: string;
  condition: string;
  serviceType: string;
  frontImage?: string;
  backImage?: string;
  fullName?: string;
  shippingAddress?: string;
  phoneNumber?: string;
}

export interface FormStepProps {
  handleNext: () => void
  handlePrevious?: () => void
}

export interface Subscription {
  status: string
  type: string
  renewalDate: string,
  totalCards: number,
  cardsUsed: number
}

export interface UserProfile {
  name: string;
  email: string;
  shippingAddress: string;
  phoneNumber: string;
  password?: string;
  confirmPassword?: string;
  paymentMethod?: string;
}