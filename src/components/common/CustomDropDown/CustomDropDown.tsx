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
  position = "left"
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState({
    position: 'fixed',
    visibility: 'hidden',
    opacity: 0,
    transform: 'translateY(-10px)',
    transition: 'opacity 150ms ease-in-out, transform 150ms ease-in-out'
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      let top = triggerRect.bottom;
      let left = triggerRect.left;

      // Check if dropdown would go below viewport
      if (triggerRect.bottom + dropdownRect.height > window.innerHeight) {
        top = triggerRect.top - dropdownRect.height;
      }

      // Handle horizontal positioning
      if (position === "right") {
        left = triggerRect.right - dropdownRect.width;
      } else if (position === "center") {
        left = triggerRect.left + (triggerRect.width - dropdownRect.width) / 2;
      }

      // Prevent dropdown from going outside viewport
      if (left + dropdownRect.width > window.innerWidth) {
        left = window.innerWidth - dropdownRect.width - 10;
      }
      if (left < 0) {
        left = 10;
      }

      setDropdownStyles(prev => ({
        ...prev,
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        visibility: 'visible',
        opacity: 1,
        transform: 'translateY(0)',
      }));
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();

      window.addEventListener('scroll', updatePosition, { passive: true });
      window.addEventListener('resize', updatePosition, { passive: true });
    } else {
      setDropdownStyles(prev => ({
        ...prev,
        opacity: 0,
        transform: 'translateY(-10px)',
        visibility: 'hidden',
      }));
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

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

  return (
    <>
      <div className="relative inline-block" ref={triggerRef}>
        <div 
          onClick={() => setIsOpen(!isOpen)} 
          className="cursor-pointer"
        >
          {children}
        </div>
      </div>

      <div
        ref={dropdownRef}
        style={dropdownStyles as React.CSSProperties}
        className={`text-description font-medium w-[200px] bg-white rounded-md shadow-lg border border-gray-200 z-[9999] ${dropdownClassName}`}
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
    </>
  );
}