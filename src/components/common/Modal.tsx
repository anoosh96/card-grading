import React, { FC } from "react";
import ReactResponsiveModal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

interface ModalStyles {
  modal?: React.CSSProperties;
  closeIcon?: React.CSSProperties;
  modalContainer?: React.CSSProperties;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  styles: ModalStyles;
  classNames?: string;
  allowBackgroundScroll?: boolean;
}

const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  styles,
  classNames,
  showCloseIcon = true,
  allowBackgroundScroll = true,
}) => {
  return (
    <ReactResponsiveModal
      classNames={{
        modal: `m-0 p-0 ${classNames}`,
        closeButton: "outline-none",
      }}
      blockScroll={allowBackgroundScroll}
      styles={{
        modal: {
          maxWidth: "unset",
          padding: "unset",
          margin: "unset",
          background: "transparent",
          width: "100%",
          ...styles?.modal,
        },
        modalContainer: {
          ...styles?.modalContainer,
        },
        closeIcon: {
          fill: styles?.closeIcon?.fill || "#000",
          marginTop: ".5rem",
        },
      }}
      open={open}
      onClose={onClose}
      showCloseIcon={showCloseIcon}
      center
    >
      {children}
    </ReactResponsiveModal>
  );
};

export default Modal;
