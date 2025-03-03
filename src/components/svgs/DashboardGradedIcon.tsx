import { SvgIconProps } from "@/types";
import * as React from "react";
const DashboardGradedCardIcon = (props: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <path
      fill="#565656"
      d="m12.225 12.5 2.275-1.375 2.275 1.375-.6-2.6 2-1.725-2.625-.225L14.5 5.5l-1.05 2.45-2.625.225 2 1.725-.6 2.6ZM12.7 19h5.6c-.117.433-.317.783-.6 1.05s-.65.433-1.1.5L5.7 21.875a1.88 1.88 0 0 1-1.488-.387 1.917 1.917 0 0 1-.762-1.338L2.125 9.225a1.947 1.947 0 0 1 .4-1.475A1.894 1.894 0 0 1 3.85 7L5 6.85v2l-.9.125L5.45 19.9l7.25-.9ZM9 17c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 7 15V4c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 9 2h11c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v11c0 .55-.196 1.021-.587 1.413A1.921 1.921 0 0 1 20 17H9Zm0-2h11V4H9v11Z"
      className={`group-hover:fill-primary ${props.className}`}
    />
  </svg>
);
export default DashboardGradedCardIcon;
