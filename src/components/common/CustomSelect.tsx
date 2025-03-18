import Image from "next/image";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { createPortal } from "react-dom";
import { debounce } from "lodash"; // Install lodash: npm install lodash

interface CustomDropdownProps {
  options: string[];
  optionIcons?: string[];
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  selectedOption: string;
  className?: string;
  borderColor?: string;
  bg?: string;
}

const CustomSelect: React.FC<CustomDropdownProps> = ({
  options,
  setSelectedOption,
  selectedOption,
  className,
  borderColor = "border-red-500",
  bg = "bg-white",
  optionIcons = [],
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [shouldFlip, setShouldFlip] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Function to check and set dropdown position
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current?.scrollHeight || 0;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      const flip = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;

      // setShouldFlip(flip);
      setDropdownPosition({
        top: flip ? rect.top - dropdownHeight - 5 : rect.bottom + 5,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current !== event.target
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check dropdown position BEFORE rendering
  useLayoutEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
    }
  }, [isOpen]);

  // Attach event listeners for scrolling & resizing
  useEffect(() => {
    if (isOpen) {
      const debouncedUpdate = debounce(updateDropdownPosition, 100);
      window.addEventListener("resize", debouncedUpdate);
      window.addEventListener("scroll", debouncedUpdate);

      return () => {
        window.removeEventListener("resize", debouncedUpdate);
        window.removeEventListener("scroll", debouncedUpdate);
        debouncedUpdate.cancel();
      };
    }
  }, [isOpen]);

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Dropdown Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className={`w-full flex justify-between items-center border-2 ${borderColor} rounded-lg p-4 ${bg} text-left focus:ring focus:ring-red-300`}
        >
          {selectedOption}
          <FaChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Render dropdown using Portal to avoid overflow issues */}
      {isOpen &&
        dropdownPosition &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`fixed ${bg} border border-gray-300 rounded-lg shadow-lg z-[9999] transition-all`}
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
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
          document.body // Render outside the parent element
        )}
    </>
  );
};

export default CustomSelect;
