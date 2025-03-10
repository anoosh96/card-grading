import { SvgIconProps } from "@/types";
import * as React from "react";
const DashboardSidebarIcon = (props: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    color="currentColor"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M12 20H6.75a6 6 0 0 1-6-6V7.5a6 6 0 0 1 6-6h6.5a6 6 0 0 1 6 6v5.25"
      className={`${props.className}`}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m5.5 13.7 2.205-2.934a.9.9 0 0 1 1.197-.225l2.151 1.359a.9.9 0 0 0 1.233-.261L14.5 8.3m2.433 10.38 1.083.569a.276.276 0 0 0 .4-.293l-.207-1.205a.28.28 0 0 1 .08-.245l.876-.854a.276.276 0 0 0-.152-.473l-1.21-.174a.28.28 0 0 1-.207-.152l-.553-1.105a.277.277 0 0 0-.497 0l-.553 1.105a.28.28 0 0 1-.207.152l-1.194.174a.275.275 0 0 0-.23.34.27.27 0 0 0 .076.133l.876.854a.28.28 0 0 1 .08.245l-.207 1.205a.276.276 0 0 0 .4.293l1.083-.57a.28.28 0 0 1 .263.001Z"
      //   className="group-hover:stroke-primary"
    />
  </svg>
);
export default DashboardSidebarIcon;
