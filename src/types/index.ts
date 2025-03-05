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
