import { SvgIconProps } from "@/types";
import React, { FC } from "react";

const CrossIcon: FC<SvgIconProps> = ({
  width = "16",
  height = "16",
  color = "#262626",
  strokeWidth = 3,
  className = "",
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={`cursor-pointer ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M23 1L1 23"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1L23 23"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CrossIcon;
