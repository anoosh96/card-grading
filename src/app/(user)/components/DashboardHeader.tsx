'use client'

import CustomInput from "@/components/common/CustomInput";
import { SkeletonHeader } from "@/components/skeletons/DashboardSkeleton";
import { useLogout } from "@/hooks/useLogout";
import { setAuthRedirectFunction } from "@/lib/axiosClient";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react"; // Import useState and useRef

export function DashboardHeader() {
  const { user } = useUserStore(); // Destructure setUser for logout
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu container
  const { mutateAsync: logoutMutateAsync } = useLogout();
  

  // Effect to set up Axios redirect for authentication
  useEffect(() => {
    setAuthRedirectFunction(() => {
      router.push('/login');
    });
  }, [router]);

  // Effect to handle email verification redirect
  useEffect(() => {
    if (user) {
      if (!user.emailVerified) {
        router.push('/verification-code');
      }
    }
  }, [user, router]);

  // Effect to handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleLogout = async () => {
    await logoutMutateAsync();
    setIsMenuOpen(false); // Close menu
  };

  const handleEditProfile = () => {
    router.push('/user-dashboard/profile'); // Redirect to profile page
    setIsMenuOpen(false); // Close menu
  };

  if (!user?.fullName) { return <SkeletonHeader />; }

  return (
    <header className="bg-white ml-0 md:ml-20 lg:ml-72">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4"> {/* Adjusted px for mobile */}
        <div className="invisible w-96">
          <CustomInput isShowSearchIcon type="search" placeholder="Search" />
        </div>

        <div className="flex items-center w-full lg:w-auto justify-end lg:justify-normal gap-4">
          {/* <button className="relative">
            <Image width={19} height={20} alt="Notification Bell Icon" src={"/icons/notification-icon.svg"} className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
          </button> */}

          {/* User Profile and Dropdown */}
          <div className="relative flex items-center gap-2 sm:gap-3" ref={menuRef}> {/* Add ref here */}
            <Image
              width={40}
              height={40}
              alt="Profile Avatar Icon"
              src={user?.profileImageUrl || "/assets/images/placeholder.png"}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover" // Adjusted size for mobile
            />

            <div
              className="flex items-center gap-1 sm:gap-3 cursor-pointer" // Adjusted gap
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu visibility
            >
              <div className="hidden md:block"> {/* Hide on smaller screens */}
                <p className="text-sm font-medium whitespace-nowrap">{user?.fullName}</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{user?.email}</p>
              </div>
              <Image width={16} height={16} alt="Profile Arrow Down Icon" src={"/icons/arrow-down.svg"} className="h-4 w-4 transform transition-transform duration-200" /> {/* Arrow icon */}
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in-down">
                <button
                  onClick={handleEditProfile}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
       {/* Add custom CSS for animations */}
       <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
}