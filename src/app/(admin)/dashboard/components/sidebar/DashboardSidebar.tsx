"use client";

import { useState, useEffect } from "react";
import { dashboardSidebarItems } from "../../lib/utils/constants";
import SidebarItem from "./SidebarItem";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // ShadCN Drawer
import { Menu } from "lucide-react"; // Icon for opening drawer
import CustomModal from "@/components/common/CustomModal";
import { useLogout } from "@/hooks/useLogout";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();


  const { mutateAsync: logoutMutateAsync, isPending } = useLogout(); // ✅ use mutateAsync


  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const confirmLogout = async () => {
    try {
      await logoutMutateAsync();
      setIsModalOpen(false);
      router.push('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Detect screen width to toggle sidebar states
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else if (window.innerWidth <= 1024) {
        setIsMobile(false);
        setIsCollapsed(true);
      } else {
        setIsMobile(false);
        setIsCollapsed(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Drawer for Mobile Screens */}
      {isMobile ? (
        <Sheet>
          <SheetTrigger className="absolute top-5 left-5 z-50">
            <Menu className="w-6 h-6 text-primary" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-6">
            <h1 className="text-xl font-bold mb-6">Logo</h1>
            <nav className="space-y-5">
              {dashboardSidebarItems.map((item) =>
                item.label === 'Logout' ? (
                  <SidebarItem
                    key={item.href}
                    {...item}
                    isActive={pathname === item.href}
                    clickHandler={handleLogout}
                  />
                ) : (
                  <SidebarItem
                    key={item.href}
                    {...item}
                    isActive={pathname === item.href}
                  />
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        // Sidebar for Desktop & Collapsed Mode
        <aside
          className={`bg-white fixed h-screen flex flex-col transition-all ${isCollapsed ? "w-20" : "w-72"
            }`}
        >
          <div className={`p-6 ${isCollapsed ? "px-4" : ""}`}>
            <h1
              className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"
                }`}
            >
              Logo
            </h1>
          </div>

          <nav className="flex-1 flex flex-col justify-center space-y-2">
            {dashboardSidebarItems.map((item) =>
              item.label === 'Logout' ? (
                <SidebarItem
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href}
                  clickHandler={handleLogout}
                />
              ) : (
                <SidebarItem
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href}
                />
              )
            )}
          </nav>

          {/* Toggle Button for Collapsing Sidebar
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-2 bg-light-grey rounded-full"
          >
            {isCollapsed ? "➡️" : "⬅️"}
          </button> */}
        </aside>
      )}

      <CustomModal
        isOpen={isModalOpen}
        title="Are you sure you want to Logout?"
        icon_url="/icons/logout.svg"
        message=""
        onConfirm={confirmLogout} // ✅ uses async confirm handler
        onCancel={() => setIsModalOpen(false)}
        cn="!p-20 !rounded-2xl"
        yes_btn_text={isPending ? "Logging out..." : "Logout"}
        no_btn_text="Cancel"
      />
    </>
  );
}
