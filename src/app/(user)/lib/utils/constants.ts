import DashboardSidebarIcon from "@/components/svgs/DashboardSidebarIcon";
import DashboardSubtrackingIcon from "@/components/svgs/DashboardSubTrackingIcon";
import DashboardProfileIcon from "@/components/svgs/DashboardProfileIcon";
import DashboardLogoutIcon from "@/components/svgs/DashboardLogoutIcon";
import { SidebarItemProps } from "../../types/sidebar.type";
import DashboardSubscriptionIcon from "@/components/svgs/DashboardSubscriptionIcon";
import DashboardSubmissionStatusIcon from "@/components/svgs/DashboardSubmissionStatusIcon";
import { FlexibleRecord } from "@/types";

export const dashboardSidebarItems: SidebarItemProps[] = [
  { href: "/user-dashboard", label: "Dashboard", Icon: DashboardSidebarIcon },
  { href: "/user-dashboard/my-submissions", label: "My Submissions", Icon: DashboardSubmissionStatusIcon },
  { href: "/user-dashboard/submission-status", label: "Submission Status", Icon: DashboardSubtrackingIcon },
  { href: "/user-dashboard/subscription", label: "Subscription", Icon: DashboardSubscriptionIcon },
  { href: "/user-dashboard/profile", label: "Profile", Icon: DashboardProfileIcon },
  { href: "", label: "Logout", Icon: DashboardLogoutIcon, isBtn: true },
];


export const submissionStatus = {
  SUBMISSION_PENDING: 'SUBMISSION_PENDING',
  SUBMISSION_RECEIVED: 'SUBMISSION_RECEIVED',
  GRADING_IN_PROGRESS: 'GRADING_IN_PROGRESS',
  GRADING_COMPLETE: 'GRADING_COMPLETE',
  SUBMISSION_REJECTED: 'SUBMISSION_REJECTED'
}

export const submissionSources = {
  BY_POST: 'BY_POST',
  BY_FORM: 'BY_FORM'
}

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER'
}

export const paymentMethodMap: FlexibleRecord = {
  PAYPAL: 'Paypal',
  CARD: 'Card',
  Paypal: 'Paypal',
  Card: 'Card'
}


export const submissionSourceMap: FlexibleRecord = {
  'BY_POST': 'By Post',
  'BY_FORM': 'By Form'
}