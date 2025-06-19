"use client";

import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronsLeft, ChevronsRight } from "lucide-react";
import { dashboardSidebarItems } from "../../lib/utils/constants";
import CustomModal from "@/components/common/CustomModal";
import { useLogout } from "@/hooks/useLogout";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import Link from "next/link";
import Image from "next/image";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // NEW: State to control the Sheet

  const { mutateAsync: logoutMutateAsync, isPending } = useLogout();

  const matchNestedPaths = (currentpath: string) => {
    const parts = pathname.split('/');
    const currentParts = currentpath.split('/');
    if (parts.length > 3) {
      return parts[2] == currentParts[2];
    }
    return pathname == currentpath;
  };

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
    // Close the sheet when logout is clicked on mobile
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  const confirmLogout = async () => {
    try {
      await logoutMutateAsync();
      router.push('/')
      setIsModalOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Set initial value based on window width, but only on the client side
    if (typeof window !== 'undefined') {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]); // Added setIsCollapsed to dependency array

  return (
    <>
      {isMobile ? (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}> {/* Bind Sheet state here */}
          <SheetTrigger className="absolute top-5 left-5 z-50">
            <Menu className="w-6 h-6 text-primary" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-6">
            <Link href="/" className={cn("text-xl font-bold mb-4")}>
              <Image src={"/assets/images/logo.png"} alt="logo" width={80} height={80} className="w-24 h-24" />
            </Link>
            <nav className="space-y-5">
              {dashboardSidebarItems.map((item) =>
                item.label === 'Logout' ? (
                  <SidebarItem
                    key={item.href}
                    {...item}
                    isActive={matchNestedPaths(item.href)}
                    clickHandler={handleLogout} // This handles logout and also closes the sheet via isSheetOpen(false) in handleLogout
                    icon={<item.Icon className="w-5 h-5" />}
                    isCollapsed={false}
                  />
                ) : (
                  <SidebarItem
                    key={item.href}
                    {...item}
                    isActive={matchNestedPaths(item.href)}
                    clickHandler={() => setIsSheetOpen(false)} // NEW: Close sheet for non-logout items
                    icon={<item.Icon className="w-5 h-5" />}
                    isCollapsed={false}
                  />
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        <aside className={cn(
          "bg-white fixed h-screen flex flex-col transition-all",
          isCollapsed ? "w-20" : "w-72",
          "duration-300"
        )}>
          <div className={cn("p-6", isCollapsed ? "px-4" : "")}>
            <Link href="/" className={cn("text-xl font-bold", isCollapsed ? "hidden" : "block")}>
              <Image src={"/assets/images/logo.png"} alt="logo" width={80} height={80} className="w-24 h-24" />
            </Link>
          </div>

          <nav className="flex-1 mt-32 space-y-5 overflow-y-scroll">
            {dashboardSidebarItems.map((item) =>
              item.label === 'Logout' ? (
                <SidebarItem
                  key={item.href}
                  {...item}
                  isActive={matchNestedPaths(item.href)}
                  clickHandler={handleLogout}
                  isCollapsed={isCollapsed}
                  icon={<item.Icon className="w-5 h-5" />}
                />
              ) : (
                <SidebarItem
                  key={item.href}
                  {...item}
                  isActive={matchNestedPaths(item.href)}
                  isCollapsed={isCollapsed}
                  icon={<item.Icon className="w-5 h-5" />}
                />
              )
            )}
          </nav>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-2 bg-light-grey rounded-full"
          >
            {isCollapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
          </button>
        </aside>
      )}

      <CustomModal
        isOpen={isModalOpen}
        title="Are you sure you want to Logout?"
        icon_url="/icons/logout.svg"
        message=""
        onConfirm={confirmLogout}
        onCancel={() => setIsModalOpen(false)}
        cn="!p-20 !rounded-2xl"
        yes_btn_text={isPending ? "Logging out..." : "Logout"}
        no_btn_text="Cancel"
      />
    </>
  );
}