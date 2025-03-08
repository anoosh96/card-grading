import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

interface CustomDropdownProps {
  options: string[],
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>,
  selectedOption: string,
  className?: string
}

const CustomSelect: React.FC<CustomDropdownProps> = ({options, setSelectedOption, selectedOption, className} : CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" className={className} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center border-2 border-red-500 rounded-lg p-4 bg-white text-left focus:ring focus:ring-red-300"
      >
        {selectedOption}
        <FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-[100]">
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
