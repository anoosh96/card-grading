import { SvgIconProps } from "@/types";
import * as React from "react";
const AboutHeroBg = (props: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={1280} height={782} fill="none" {...props}>
    <path xmlns="http://www.w3.org/2000/svg" d="M-48 0H510C732.018 0 912 179.982 912 402V782H-48V0Z" fill="#F7F7F7"/>
    <line xmlns="http://www.w3.org/2000/svg" x1="34.5" y1="-0.00377348" x2="40.4019" y2="781.997" stroke="url(#ah)"/>
    <line xmlns="http://www.w3.org/2000/svg" x1="62.5" y1="-2.18557e-08" x2="62.5" y2="761" stroke="url(#bh"/>
    
    <path stroke="#E3350D" d="M12 80v114" />
    <line xmlns="http://www.w3.org/2000/svg" x1="82" y1="781.5" x2="1281" y2="781.5" stroke="url(#ch"/>
    <defs>
      <linearGradient id="ah" x1={61.5} x2={61.5} y1={0} y2={761} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FC0" />
        <stop offset={0.495} stopColor="#F18007" />
        <stop offset={1} stopColor="#E3350D" />
      </linearGradient>
      <linearGradient id="bh" x1={351.5} x2={357.402} y1={0.004} y2={782.005} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FC0" />
        <stop offset={0.495} stopColor="#F18007" />
        <stop offset={1} stopColor="#E3350D" />
      </linearGradient>
      <linearGradient id="ch" x1={82} x2={1281} y1={782.5} y2={782.5} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FC0" />
        <stop offset={0.495} stopColor="#F18007" />
        <stop offset={1} stopColor="#E3350D" />
      </linearGradient>
    </defs>
  </svg>
);
export default AboutHeroBg;
