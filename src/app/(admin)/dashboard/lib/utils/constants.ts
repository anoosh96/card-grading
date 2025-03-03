import DashboardSidebarIcon from "@/components/svgs/DashboardSidebarIcon";
import { SidebarItemProps } from "../../types/sidebar.type";
import DashboardGradedCardIcon from "@/components/svgs/DashboardGradedIcon";
import DashboardSubtrackingIcon from "@/components/svgs/DashboardSubTrackingIcon";
import DashboardProfileIcon from "@/components/svgs/DashboardProfileIcon";
import DashboardLogoutIcon from "@/components/svgs/DashboardLogoutIcon";

export const dashboardSidebarItems: SidebarItemProps[] = [
  { href: "/dashboard", label: "Dashboard", Icon: DashboardSidebarIcon },
  { href: "/dashboard/graded-cards", label: "Graded Cards", Icon: DashboardGradedCardIcon },
  { href: "/dashboard/submission-tracking", label: "Submission Tracking", Icon: DashboardSubtrackingIcon },
  { href: "/dashboard/profile", label: "Profile", Icon: DashboardProfileIcon },
  { href: "/#logout", label: "Logout", Icon: DashboardLogoutIcon },
];
