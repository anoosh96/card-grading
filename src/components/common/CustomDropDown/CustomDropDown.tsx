"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
}

interface CustomDropdownProps {
  items: DropdownItem[];
  children: ReactNode;
  dropdownClassName?: string;
}

export default function CustomDropdown({
  items,
  children,
  dropdownClassName = "",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger (accept children as trigger) */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {children}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`absolute text-description font-medium w-auto bg-white rounded-sm shadow-lg border border-gray-200 z-50 ${dropdownClassName}`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className={`flex items-center whitespace-nowrap gap-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 ${item.className}`}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
