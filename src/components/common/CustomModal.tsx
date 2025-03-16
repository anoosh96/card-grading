import Image from "next/image";
import { FiX, FiTrash2 } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  cn?: string;
  icon_url?: string
  yes_btn_text?: string
  no_btn_text?: string
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, title, message, onConfirm, onCancel, cn, icon_url, yes_btn_text = 'Delete', no_btn_text = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white p-6 rounded-lg shadow-lg relative ${cn}`}>
        {/* Close Button */}
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <FiX size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            { icon_url ? (<Image src={icon_url} width={30} height={30} alt="icon" />) : <FiTrash2 size={30} className="text-red-500" />}
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
            { no_btn_text }
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            { yes_btn_text }
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
