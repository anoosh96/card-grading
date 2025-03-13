import { useState } from "react";
import Image from "next/image";
import { PrimaryImageProps } from "./PrimaryImage.types";

const PrimaryImage: React.FC<PrimaryImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  quality = 100,
  // loading = "lazy",
  style = {},
  blur = "empty",
  blurDataURL = "",
  priority = false,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const defaultImage = "/experience_placeholder.svg";
  const DEFAULT_URL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAC4jAAAuIwF4pT92AAABA0lEQVR4nAH4AAf/AJ+jo4+Ukevs/Ozu/O7v//L1//L1/+7u/P/+/5+ipABBR0AyOSWVmpLw7//p6fjc3Ojb3uru7v2GiogoMCMAAAcABBEAPUYtkZSRRlBJOUM6O0c9kJaaJy0aDBYAADM7Hyw3F0JLPFJYQjRBNio7RyM0RTdGOUhQMjpDKgBiZkJ4dFlvbFN8eF9wcWNjZVpwbVxyclhtbU1fYkIAT1YrU1owVV4zVV81VGE0VWIyUV0sTVonSFUgQlAZAEFLGkZQH0lTJEpVJ0lVJUpWJ0hUJEhSIkdRHUNNGQBKTCNNUiVSVipSVitVWDFRVipPUyRNUilLTydHSyHt/F3bse0M1QAAAABJRU5ErkJggg==";

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onClick={onClick}
      // loading={loading}
      fill={fill}
      priority={priority}
      quality={quality}
      style={{ ...style }}
      placeholder={blur === "blur" ? "blur" : "empty"}
      className={`h-[${height}px] w-[${width}px] object-cover ${className}`}
      blurDataURL={blur === "blur" ? blurDataURL || DEFAULT_URL : undefined}
      onError={() => setImgSrc(defaultImage)}
    />
  );
};

export default PrimaryImage;
