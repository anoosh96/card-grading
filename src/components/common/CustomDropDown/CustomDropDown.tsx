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
  position?: "left" | "right" | "center";
}

export default function CustomDropdown({
  items,
  children,
  dropdownClassName = "",
  position = "left",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Calculate dropdown position to avoid being cut off
  // useEffect(() => {
  //   if (isOpen && triggerRef.current && dropdownRef.current) {
  //     const triggerRect = triggerRef.current.getBoundingClientRect();
  //     const dropdownRect = dropdownRef.current.getBoundingClientRect();
  //     const viewportWidth = window.innerWidth;
  //     const viewportHeight = window.innerHeight;
      
  //     // Check if dropdown would be cut off at the bottom
  //     let top = "100%";
  //     let transformOrigin = "top";
      
  //     if (triggerRect.bottom + dropdownRect.height > viewportHeight) {
  //       top = "auto";
  //       transformOrigin = "bottom";
  //     }
      
  //     // Handle horizontal positioning
  //     let left = "0";
  //     let right = "auto";
      
  //     if (position === "right") {
  //       left = "auto";
  //       right = "0";
  //     } else if (position === "center") {
  //       left = "50%";
  //       right = "auto";
  //     }
      
  //     setDropdownPosition({
  //       top,
  //       bottom: top === "auto" ? "100%" : "auto",
  //       left,
  //       right,
  //       transformOrigin,
  //       transform: position === "center" ? "translateX(-50%)" : "none",
  //     });
  //   }
  // }, [isOpen, position]);

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

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Handle window resize
  useEffect(() => {
    function handleResize() {
      if (isOpen) {
        // Recalculate position on resize
        setIsOpen(false);
      }
    }
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger (accept children as trigger) */}
      <div 
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)} 
        className="cursor-pointer"
      >
        {children}
      </div>

      {/* Dropdown menu - Portal to body to avoid being cut off by overflow:hidden containers */}
      {isOpen && (
        <div
          style={dropdownPosition}
          className={`fixed text-description font-medium min-w-[150px] bg-white rounded-md shadow-lg border border-gray-200 z-[9999] ${dropdownClassName}`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                className={`flex items-center whitespace-nowrap gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 ${item.className || ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                  setIsOpen(false);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}