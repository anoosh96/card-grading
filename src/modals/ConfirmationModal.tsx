import React, { FC } from "react";
import Modal from "@/components/common/Modal";
import { DialogProps } from "@/types";
import { FiX } from "react-icons/fi";
import PrimaryImage from "@/components/common/PrimaryImage/PrimaryImage";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps extends DialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  cn?: string;
  trackNo?: number;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
  cn,
  trackNo,
}) => {
  const modalStyles = {
    modal: {
      maxHeight: "500px",
      borderRadius: "1rem",
      maxWidth: "30rem",
    },
    closeIcon: {
      fill: "#fff",
    },
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      styles={modalStyles}
      showCloseIcon={false}
    >
      <div>
        <div className={`relative bg-white p-4 rounded-lg ${cn}`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full`}>
              <PrimaryImage
                src={"/icons/success.svg"}
                width={60}
                height={60}
                alt="icon"
              />
            </div>
          </div>

          {/* Title & Message */}
          <h2 className="text-lg font-medium text-center">{title}</h2>
          {message && (
            <div className="text-sm flex items-center justify-center mt-4">
              <p>{message}</p>
              {trackNo && <p className="text-light-red">{`#${trackNo}`}</p>}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="secondary"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-semibold max-w-[8rem] w-full"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={onConfirm}
              className="bg-custom-gradient font-semibold max-w-[8rem] w-full"
            >
              Track
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
