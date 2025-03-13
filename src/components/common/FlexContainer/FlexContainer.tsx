import { FC, PropsWithChildren } from "react";

interface FlexContainerProps extends PropsWithChildren {
  className?: string;
  gap?: string;
  alignItems?: string;
}

const FlexContainer: FC<FlexContainerProps> = ({
  children,
  className,
  gap = "2",
  alignItems = "center",
}) => {
  return (
    <div className={`flex items-${alignItems} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};
export default FlexContainer;
