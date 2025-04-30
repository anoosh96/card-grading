import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  clickHandler?: (e: React.MouseEvent<HTMLElement>) => void;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon,
  clickHandler,
  isActive,
  isCollapsed
}) => {

  return (
    <Link
      href={href}
      onClick={clickHandler}
      className={cn(
        "relative group flex overflow-hidden items-center gap-3 px-6 py-4 text-primary group hover:bg-light-grey",
        isActive
          ? "bg-light-grey text-primary"
          : "!text-[#565656] group-hover:text-primary"
      )}
    >
      <span>
        {icon}
      </span>

      <span
        className={cn(
          "text-lg whitespace-nowrap font-medium transition-opacity duration-200",
          isActive
            ? "text-primary"
            : "text-pure-grey group-hover:text-primary",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}
      >
        {label}
      </span>

      {isActive && !isCollapsed && (
        <Image
          src="/assets/images/dashboard-active-sidebar-rounded-bar.svg"
          alt="Active Indicator"
          className="absolute right-0 top-0 bottom-0 block"
          width={6}
          height={84}
        />
      )}
    </Link>
  );
};

export default SidebarItem;
