import { SvgIconProps } from "@/types";
import * as React from "react";
const MissionArrowRight = (props: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={294} height={169} fill="none" {...props}>
    <path fill={`${ props.hover ? 'url(#a2)': '#E0E0E0' }`} d="M.66 84.001 96.511 168.5l.262-50.399 175.707.913.349-67.2-175.707-.912.262-50.4-96.726 83.5Z" />
    <circle cx={273} cy={85} r={20} fill={`${ props.hover ? 'url(#b2)': '#E0E0E0' }`} stroke="#fff" strokeWidth={2} />
    <path
      stroke={`${ props.hover ? '#fff': '#2A2A2A' }`}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M268.688 93.125h8.624c.774 0 1.389-.636 1.306-1.37-.537-4.724-3.743-4.646-3.743-6.755 0-2.11 3.247-1.992 3.742-6.755.078-.734-.531-1.37-1.305-1.37h-8.624c-.773 0-1.382.636-1.305 1.37.496 4.763 3.742 4.607 3.742 6.755 0 2.148-3.205 2.031-3.742 6.755-.084.734.532 1.37 1.305 1.37Z"
    />
    <path
      fill={`${ props.hover ? '#fff': '#2A2A2A' }`}
      d="M276.41 91.875h-6.803c-.61 0-.781-.703-.354-1.14 1.034-1.047 3.122-1.798 3.122-3V83.75c0-.775-1.484-1.367-2.403-2.625-.151-.207-.136-.5.249-.5h5.576c.328 0 .399.29.25.498-.905 1.26-2.422 1.848-2.422 2.627v3.984c0 1.193 2.176 1.836 3.141 3.003.388.47.252 1.138-.356 1.138Z"
    />

    { props.hover &&
      <defs>
        <linearGradient id="a2" x1="136.221" y1="168.707" x2="137.094" y2="0.708895" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFCC00"/>
          <stop offset="0.495" stop-color="#F18007"/>
          <stop offset="1" stop-color="#E3350D"/>
        </linearGradient>
        <linearGradient id="b2" x1="252" y1="85" x2="294" y2="85" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFCC00"/>
          <stop offset="0.495" stop-color="#F18007"/>
          <stop offset="1" stop-color="#E3350D"/>
        </linearGradient>
      </defs>
    }
  </svg>
);
export default MissionArrowRight;
