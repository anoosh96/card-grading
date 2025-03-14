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
}

export interface FormStepProps {
  handleNext: () => void
  handlePrevious?: () => void
}