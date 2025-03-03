export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
  hover?: boolean;
  setHover?: React.Dispatch<React.SetStateAction<boolean>>
}
