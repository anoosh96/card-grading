import { SvgIconProps } from "@/types";
import * as React from "react";
const DashboardSubtrackingIcon = (props: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.714 6.857 12 11.143m0 0 4.285-4.286M12 11.143V.857m11.143 12.857h-6a1.714 1.714 0 0 0-1.715 1.715 3.429 3.429 0 0 1-6.857 0 1.714 1.714 0 0 0-1.714-1.715h-6v7.715a1.714 1.714 0 0 0 1.714 1.714h18.857a1.714 1.714 0 0 0 1.715-1.714v-7.715Z"
    />
  </svg>
);
export default DashboardSubtrackingIcon;
