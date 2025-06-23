import DashboardSidebarIcon from "@/components/svgs/DashboardSidebarIcon";
import { SidebarItemProps } from "../../types/sidebar.type";
import DashboardGradedCardIcon from "@/components/svgs/DashboardGradedIcon";
// import DashboardSubtrackingIcon from "@/components/svgs/DashboardSubTrackingIcon";
import DashboardProfileIcon from "@/components/svgs/DashboardProfileIcon";
import DashboardLogoutIcon from "@/components/svgs/DashboardLogoutIcon";
import DashboardSubmissionStatusIcon from "@/components/svgs/DashboardSubmissionStatusIcon";

export const dashboardSidebarItems: SidebarItemProps[] = [
  { href: "/dashboard", label: "Dashboard", Icon: DashboardSidebarIcon },
  {
    href: "/dashboard/submission-status",
    label: "Submission Status",
    Icon: DashboardSubmissionStatusIcon,
  },
  // {
  //   href: "/dashboard/grading-review/generate-certificate",
  //   label: "Grading Review",
  //   Icon: DashboardGradedCardIcon,
  // },
  // {
  //   href: "/dashboard/order-history",
  //   label: "Order History",
  //   Icon: DashboardSubtrackingIcon,
  // },
  { href: "/dashboard/profile", label: "Profile", Icon: DashboardProfileIcon },
  { href: "", label: "Logout", Icon: DashboardLogoutIcon, isBtn: true },
];
