'use client'

import { SvgIconProps } from "@/types";
import * as React from "react";
const MissionArrowUp = (props: SvgIconProps) => {
  return(
  <svg xmlns="http://www.w3.org/2000/svg" width={168} height={292} fill="none" {...props} >
    <path fill={`${ props.hover ? 'url(#a1)': '#E0E0E0' }`} d="m84 292 84-96.29h-50.4V20H50.4v175.71H0L84 292Z" />
    <circle cx={84} cy={21} r={20} fill={`${ props.hover ? 'url(#b1)': '#E0E0E0' }`} stroke="#fff" strokeWidth={2} />
    <path
      fill={`${ props.hover ? '#fff': '#2A2A2A' }`}
      d="m92.567 23.058-1.875-1.875a.625.625 0 0 0-.884 0L84 26.991v2.759h2.759l5.808-5.808a.625.625 0 0 0 0-.884ZM86.24 28.5h-.991v-.991l3.125-3.125.991.991-3.125 3.125Zm4.009-4.009-.991-.991.991-.991.991.991-.991.991Zm2.5-10.991h-4.375v1.25h2.241l-4.741 4.741-2.683-2.683a.625.625 0 0 0-.884 0l-4.558 4.558.884.884 4.116-4.116 2.683 2.683a.625.625 0 0 0 .884 0l5.183-5.183v2.241h1.25V13.5Z"
    />
    <path fill={`${ props.hover ? '#fff': '#2A2A2A' }`} d="M76.5 12.25h-1.25V28.5a1.25 1.25 0 0 0 1.25 1.25h5V28.5h-5V12.25Z" />
    { props.hover &&
      <defs>
        <linearGradient id="a1" x1={168} x2={0} y1={156} y2={156} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FC0" />
          <stop offset={0.495} stopColor="#F18007" />
          <stop offset={1} stopColor="#E3350D" />
        </linearGradient>
        <linearGradient id="b1" x1={63} x2={105} y1={21} y2={21} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FC0" />
          <stop offset={0.495} stopColor="#F18007" />
          <stop offset={1} stopColor="#E3350D" />
        </linearGradient>
      </defs>
    }
  </svg>
  )
};
export default MissionArrowUp;
