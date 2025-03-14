import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

interface CustomDropdownProps {
  options: string[];
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
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shouldFlip, setShouldFlip] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to check if dropdown should flip
  const checkDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = dropdownRef.current.scrollHeight;
      setShouldFlip(spaceBelow < dropdownHeight);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Attach event listeners and calculate position
  useEffect(() => {
    if (isOpen) {
      checkDropdownPosition();
      window.addEventListener("resize", checkDropdownPosition);
      window.addEventListener("scroll", checkDropdownPosition);
    } else {
      setShouldFlip(false);
    }

    return () => {
      window.removeEventListener("resize", checkDropdownPosition);
      window.removeEventListener("scroll", checkDropdownPosition);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setTimeout(checkDropdownPosition, 0); // Ensure correct position on first try
        }}
        className={`w-full flex justify-between items-center border-2 ${borderColor} rounded-lg p-4 ${bg} text-left focus:ring focus:ring-red-300`}
      >
        {selectedOption}
        <FaChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute w-full ${bg} border border-gray-300 rounded-lg shadow-lg z-50 transition-all ${shouldFlip ? "bottom-full mb-2" : "top-full mt-2"
            }`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100"
            >
              {selectedOption === option && <FaCheck className="mr-2 text-red-500" />}
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
