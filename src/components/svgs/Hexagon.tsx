import { SvgIconProps } from "@/types";

export default function Hexagon({ width, height, fill }: SvgIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 62 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1659_3330)">
        <path d="M17.5666 54.25L4.1333 31L17.5666 7.75H44.4333L57.8666 31L44.4333 54.25H17.5666ZM20.5375 49.0833H41.4625L51.8604 31L41.4625 12.9167H20.5375L10.075 31L20.5375 49.0833Z" fill={fill} />
      </g>
      <defs>
        <filter id="filter0_d_1659_3330" x="-4" y="0" width="70" height="70" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1659_3330" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1659_3330" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}