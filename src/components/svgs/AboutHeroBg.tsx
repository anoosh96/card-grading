import { SvgIconProps } from "@/types";
import * as React from "react";
const AboutHeroBg = (props: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={1280} height={782} fill="none" {...props}>
    <path fill="#F7F7F7" d="M-48 0h558c222.018 0 402 179.982 402 402v380H-48V0Z" />
    <path stroke="url(#a)" d="M62.5 0v761" opacity={0.32} />
    <path stroke="url(#b)" d="m352.5-.004 5.902 782.001" opacity={0.22} />
    <path stroke="#E3350D" d="M12 80v114" />
    <path stroke="url(#c)" d="M82 781.5h1199" opacity={0.32} />
    <defs>
      <linearGradient id="a" x1={61.5} x2={61.5} y1={0} y2={761} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FC0" />
        <stop offset={0.495} stopColor="#F18007" />
        <stop offset={1} stopColor="#E3350D" />
      </linearGradient>
      <linearGradient id="b" x1={351.5} x2={357.402} y1={0.004} y2={782.005} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FC0" />
        <stop offset={0.495} stopColor="#F18007" />
        <stop offset={1} stopColor="#E3350D" />
      </linearGradient>
      <linearGradient id="c" x1={82} x2={1281} y1={782.5} y2={782.5} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FC0" />
        <stop offset={0.495} stopColor="#F18007" />
        <stop offset={1} stopColor="#E3350D" />
      </linearGradient>
    </defs>
  </svg>
);
export default AboutHeroBg;
