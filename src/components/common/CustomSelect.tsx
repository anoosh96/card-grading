import Image from "next/image";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { createPortal } from "react-dom";

interface CustomDropdownProps {
  options: string[];
  optionIcons?: string[];
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  selectedOption: string;
  className?: string;
  borderColor?: string;
  bg?: string;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomDropdownProps> = ({
  options,
  setSelectedOption,
  selectedOption,
  className,
  borderColor = "border-red-500",
  bg = "bg-white",
  optionIcons = [],
  disabled = false
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
    flip: boolean;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current?.scrollHeight || 250; // Increased default height
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      const flip = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;

      setDropdownPosition({
        top: window.scrollY + (flip ? rect.top - dropdownHeight - 5 : rect.bottom + 5),
        left: window.scrollX + rect.left,
        width: rect.width,
        flip,
      });
    }
  };

  // Initial position calculation with delay to ensure rendering
  useLayoutEffect(() => {
    if (isOpen) {
      // First immediate update
      updateDropdownPosition();
      
      // Second update after a slight delay to ensure rendering is complete
      const timer = setTimeout(() => {
        updateDropdownPosition();
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle window scroll and resize events
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => requestAnimationFrame(updateDropdownPosition);

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", updateDropdownPosition);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", updateDropdownPosition);
      };
    }
  }, [isOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current !== event.target &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Dropdown Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            if(!disabled) setIsOpen((prev) => !prev);
          }}
          className={`w-full flex justify-between items-center border-2 ${borderColor} rounded-lg p-4 ${bg} text-left focus:ring focus:ring-red-300`}
        >
          {selectedOption}
          <FaChevronDown
            className={`transition-transform ${isOpen && dropdownPosition?.flip ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Render dropdown using Portal */}
      {isOpen &&
        dropdownPosition &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`absolute ${bg} border border-gray-300 rounded-lg shadow-lg z-[9999] transition-all`}
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: dropdownPosition.width,
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 flex gap-2 items-center hover:bg-gray-100 ${
                  index === options.length - 1
                    ? "rounded-b-lg"
                    : index === 0
                    ? "rounded-t-lg"
                    : ""
                }`}
              >
                {selectedOption === option && (
                  <FaCheck className="text-red-500" />
                )}
                {optionIcons[index] && (
                  <Image
                    src={optionIcons[index]}
                    width={30}
                    height={30}
                    alt="icon"
                  />
                )}
                {option}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default CustomSelect;