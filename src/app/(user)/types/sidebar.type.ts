export interface SidebarItemProps {
  href: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  isBtn?: boolean;
  clickHandler?: (e: React.MouseEvent<HTMLElement>) => void
}
