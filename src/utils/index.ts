import { SelectTheme } from "@/components/common/DashboardCustomSelect/DashboardCustomSelect.type";

export const defaultSelectTheme: SelectTheme = {
  trigger: {
    bg: "bg-light-grey",
    text: "text-gray-800",
    border: "border-black",
    hover: "hover:bg-gray-200",
    focus: "focus:border-black",
  },
  content: {
    bg: "bg-white",
    border: "border-gray-200",
  },
  item: {
    hover: "hover:bg-black",
    focus: "focus:bg-gray-100",
    text: "!text-black",
  },
  addButton: {
    bg: "bg-white",
    text: "text-black text-xs",
    border: "border-stroke-grey",
    hover: "hover:bg-transparent",
  },
};
