import Link from "next/link";
import Image from "next/image";
import { SidebarItemProps } from "../types/sidebar.type";

const SidebarItem: React.FC<SidebarItemProps & { isCollapsed?: boolean }> = ({
  href,
  label,
  Icon,
  isActive,
  isCollapsed,
}) => {
  return (
    <Link
      href={href}
      className={`relative group flex overflow-hidden items-center gap-3 px-6 py-4 text-primary group hover:bg-light-grey ${
        isActive
          ? "bg-light-grey text-primary"
          : "!text-[#565656] group-hover:text-primary"
      }`}
    >
      <Icon className={`w-6 h-6 group-hover:text-primary`} />
      {/* ${
          isActive
            ? label === "Submission Status"
              ? "fill-primary"
              : "stroke-primary"
            : "group-hover:stroke-primary"
        } */}

      {!isCollapsed && (
        <span
          className={`text-lg whitespace-nowrap font-medium ${
            isActive
              ? "text-primary"
              : "text-pure-grey group-hover:text-primary"
          }`}
        >
          {label}
        </span>
      )}

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
