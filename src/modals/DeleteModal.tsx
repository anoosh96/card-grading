import Modal from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { DialogProps } from "@/types";
import { LogOut } from "lucide-react";
import React, { FC } from "react";
import { FiX } from "react-icons/fi";

interface DeleteModalProps extends DialogProps {
  classNames?: string;
  handleDelete: () => void;
  message?: string;
}

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  handleDelete,
  classNames,
  message = "Are you sure you want to logout?",
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
        <div className={`relative bg-white p-4 rounded-lg ${classNames}`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>

          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="flex p-4 items-center justify-center rounded-full bg-[#fcebe7]">
              <LogOut className="h-6 w-6 text-red-500" />
            </div>

            <p className="text-center text-lg text-black font-medium">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="secondary"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 text-base hover:bg-gray-300 max-w-[8rem] w-full transition font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-full text-base bg-light-red max-w-[8rem] w-full hover:bg-[#E3350D]"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
