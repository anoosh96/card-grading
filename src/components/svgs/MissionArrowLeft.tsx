import { SvgIconProps } from "@/types";
import * as React from "react";
const MissionArrowLeft = (props: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={293} height={169} fill="none" {...props}>
    <path fill={`${ props.hover ? 'url(#a4)': '#E0E0E0' }`} d="M292.111 85 195.933.872l-.067 50.4-175.71-.234-.089 67.2 175.71.234-.067 50.4L292.111 85Z" />
    <circle cx={21} cy={85} r={20} fill={`${ props.hover ? 'url(#b4)': '#E0E0E0' }`} stroke="#fff" strokeWidth={2} />
    <path fill={`${ props.hover ? '#fff': '#2A2A2A' }`} d="m19.75 85.369-1.619-1.62-.881.882 2.5 2.5 5-5-.881-.881-4.119 4.119Z" />
    <path
      fill={`${ props.hover ? '#fff': '#2A2A2A' }`}
      d="m21 93.75-3.86-2.058a6.864 6.864 0 0 1-3.64-6.067V77.5a1.25 1.25 0 0 1 1.25-1.25h12.5a1.25 1.25 0 0 1 1.25 1.25v8.125a6.862 6.862 0 0 1-3.64 6.067L21 93.75ZM14.75 77.5v8.125a5.619 5.619 0 0 0 2.979 4.964L21 92.333l3.271-1.744a5.62 5.62 0 0 0 2.979-4.964V77.5h-12.5Z"
    />

    { props.hover &&
      <defs>
        <linearGradient id="a4" x1="156.223" y1="0.819042" x2="156" y2="168.819" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFCC00"/>
          <stop offset="0.495" stop-color="#F18007"/>
          <stop offset="1" stop-color="#E3350D"/>
        </linearGradient>
        <linearGradient id="b4" x1="0" y1="84.9999" x2="42" y2="84.9999" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFCC00"/>
          <stop offset="0.495" stop-color="#F18007"/>
          <stop offset="1" stop-color="#E3350D"/>
        </linearGradient>
      </defs>
    }
  </svg>
);
export default MissionArrowLeft;
