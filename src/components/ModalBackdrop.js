import { createPortal } from "react-dom";

export const ModalBackdrop = ({ children, onClose }) => {
  return createPortal(
    <div className="modal-wrapper" onClick={onClose}>
      {children}
    </div>,
    document.querySelector("#modal-root")
  );
};
