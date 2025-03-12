import DashboardSidebarIcon from "@/components/svgs/DashboardSidebarIcon";
import DashboardSubtrackingIcon from "@/components/svgs/DashboardSubTrackingIcon";
import DashboardProfileIcon from "@/components/svgs/DashboardProfileIcon";
import DashboardLogoutIcon from "@/components/svgs/DashboardLogoutIcon";
import { SidebarItemProps } from "../../types/sidebar.type";
import DashboardSubscriptionIcon from "@/components/svgs/DashboardSubscriptionIcon";
import DashboardSubmissionStatusIcon from "@/components/svgs/DashboardSubmissionStatusIcon";

export const dashboardSidebarItems: SidebarItemProps[] = [
  { href: "/user-dashboard", label: "Dashboard", Icon: DashboardSidebarIcon },
  { href: "/user-dashboard/my-submissions", label: "My Submissions", Icon: DashboardSubmissionStatusIcon },
  { href: "/user-dashboard/submission-status", label: "Submission Status", Icon: DashboardSubtrackingIcon },
  { href: "/user-dashboard/subscription", label: "Subscription", Icon: DashboardSubscriptionIcon },
  { href: "/user-dashboard/profile", label: "Profile", Icon: DashboardProfileIcon },
  { href: "/#logout", label: "Logout", Icon: DashboardLogoutIcon },
];
