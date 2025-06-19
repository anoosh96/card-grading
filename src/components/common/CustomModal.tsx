import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  cn?: string;
  icon_url?: string;
  yes_btn_text?: string;
  no_btn_text?: string;
  icon_bg?: string;
  icon_w?: number;
  icon_h?: number;
}

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  cn,
  icon_url,
  yes_btn_text = "Delete",
  no_btn_text = "Cancel",
  icon_bg = "bg-red-100",
  icon_h = 30,
  icon_w = 30,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  // Handle modal visibility with fade effect
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 200); // Delay for fade-out
    }
  }, [isOpen]);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"
        }`}
    >
      <div
        ref={modalRef}
        className={`bg-white p-6 w-full sm:w-auto rounded-lg shadow-lg relative transition-transform duration-200 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          } ${cn}`}
      >
        {/* Close Button */}
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <FiX size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`${icon_bg} p-3 rounded-full`}>
            {icon_url ? (
              <Image src={icon_url} width={icon_w} height={icon_h} alt="icon" />
            ) : (
              <FiTrash2 size={30} className="text-red-500" />
            )}
          </div>
        </div>

        {/* Title & Message */}
        <h2 className="text-lg font-semibold text-center">{title}</h2>
        <p className="text-gray-600 text-center mt-2">{message}</p>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            {no_btn_text}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            {yes_btn_text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
