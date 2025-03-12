import CustomInput from "@/components/common/CustomInput";
import Image from "next/image";

export function DashboardHeader() {
  return (
    <header className="bg-white ml-0 md:ml-20 lg:ml-72">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="hidden md:block w-96">
          <CustomInput isShowSearchIcon type="search" placeholder="Search" />
        </div>

        <div className="flex items-center w-full lg:w-auto justify-end lg:justify-normal gap-4">
          <button className="relative">
            {/* <Bell className="h-5 w-5 text-gray-600" /> */}
            <Image width={19} height={20} alt="Notification Bello Icon" src={"/icons/notification-icon.svg"} className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
          </button>

          <div className="flex items-center gap-3">
            <Image width={40} height={40} alt="Profile Avatar Icon" src={"/assets/images/profile-avatar.svg"} className="h-10 w-10 rounded-full" />

            <div className="items-center gap-3 hidden md:flex">
              <div>
                <p className="text-sm font-medium">Henrietta Bogisich</p>
                <p className="text-xs text-gray-500">@Henrietta_Bogisich</p>
              </div>
              <Image width={16} height={16} alt="Profile Arrow Down Icocn" src={"/icons/arrow-down.svg"} className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
