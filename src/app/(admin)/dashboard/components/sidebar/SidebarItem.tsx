// import Link from "next/link";
// import Image from "next/image";
// import { SidebarItemProps } from "../../types/sidebar.type";

// const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, Icon, isActive }) => {
//   return (
//     <Link
//       href={href}
//       className={`relative flex items-center gap-3 px-10 py-8 text-primary group hover:bg-light-grey ${isActive ? "bg-light-grey" : ""}`}
//     >
//       <Icon className={`w-6 h-6 ${isActive ? (label === "Graded Cards" ? "fill-primary" : "stroke-primary") : "group-hover:stroke-primary"}`} />
//       <span className={`text-lg whitespace-nowrap font-medium ${isActive ? "text-primary" : "text-pure-grey group-hover:text-primary"}`}>
//         {label}
//       </span>
//       {isActive && (
//         <Image
//           src="/assets/images/dashboard-active-sidebar-rounded-bar.svg"
//           alt="Active Indicator"
//           className="absolute right-0 block"
//           width={6}
//           height={84}
//         />
//       )}
//     </Link>
//   );
// };

// export default SidebarItem;

import Link from "next/link";
import Image from "next/image";
import { SidebarItemProps } from "../../types/sidebar.type";

const SidebarItem: React.FC<SidebarItemProps & { isCollapsed?: boolean }> = ({ href, label, Icon, isActive, isCollapsed }) => {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-3 px-6 py-4 text-primary group hover:bg-light-grey ${isActive ? "bg-light-grey" : ""}`}
    >
      <Icon className={`w-6 h-6 ${isActive ? (label === "Graded Cards" ? "fill-primary" : "stroke-primary") : "group-hover:stroke-primary"}`} />

      {!isCollapsed && (
        <span className={`text-lg whitespace-nowrap font-medium ${isActive ? "text-primary" : "text-pure-grey group-hover:text-primary"}`}>
          {label}
        </span>
      )}

      {isActive && !isCollapsed && (
        <Image
          src="/assets/images/dashboard-active-sidebar-rounded-bar.svg"
          alt="Active Indicator"
          className="absolute right-0 block"
          width={6}
          height={84}
        />
      )}
    </Link>
  );
};

export default SidebarItem;
