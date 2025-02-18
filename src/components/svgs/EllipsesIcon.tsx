import { SvgIconProps } from "@/types";
import * as React from "react";

const EllipsesIcon = (props: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={255} height={445} viewBox="0 0 255 445" fill="none" {...props}>
    <path fill="#FEE5D6" d="M0 189.762A254.762 254.762 0 0 1 254.761-65l.001 254.762H0Z" />
    <path fill="#FEF4E9" d="M138.199 225.358a117.263 117.263 0 0 1 117.261-117.26v117.26H138.199Z" />
    <mask id="a" fill="#fff">
      <path d="M257.554 332.149a99.806 99.806 0 0 1-70.577-29.234 99.795 99.795 0 0 1-29.234-70.577 99.813 99.813 0 0 1 61.615-92.213 99.805 99.805 0 0 1 38.196-7.597v199.621Z" />
    </mask>
    <path
      stroke="#F65C5C"
      strokeWidth={6.98}
      d="M257.554 332.149a99.806 99.806 0 0 1-70.577-29.234 99.795 99.795 0 0 1-29.234-70.577 99.813 99.813 0 0 1 61.615-92.213 99.805 99.805 0 0 1 38.196-7.597v199.621Z"
      mask="url(#a)"
    />
    <mask id="c" fill="#fff">
      <path d="M257.554 401.249a168.911 168.911 0 1 1 168.91-168.911h-168.91v168.911Z" />
    </mask>
    <path stroke="url(#b)" strokeWidth={4.188} d="M257.554 401.249a168.911 168.911 0 1 1 168.91-168.911h-168.91v168.911Z" mask="url(#c)" />
    <defs>
      <linearGradient id="b" x1={88.643} x2={426.464} y1={232.338} y2={232.338} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FC0" />
        <stop offset={0.495} stopColor="#F18007" />
        <stop offset={1} stopColor="#E3350D" />
      </linearGradient>
    </defs>
  </svg>
);
export default EllipsesIcon;
