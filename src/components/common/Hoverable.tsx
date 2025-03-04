'use client'

import { useState } from "react";

const Hoverable = ({ children, className }: { children: (isHovered: boolean, setHovered: React.Dispatch<React.SetStateAction<boolean>>) => JSX.Element, className: string }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     {children(isHovered, setIsHovered)}
    </div>
  );
};

export default Hoverable
