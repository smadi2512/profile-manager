import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Button from "./Button";

type ModalPropsType = {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  open?: boolean; //For controlled mode
  onClose?: () => void; //For controlled mode
  className?: string;
};

export type ModalRefType = {
  openModal: () => void;
  closeModal: () => void;
};

const Modal = forwardRef<ModalRefType, ModalPropsType>(
  ({ title, children, actions, open, onClose, className }, ref) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const isControlled = open !== undefined;

    useImperativeHandle(ref, () => ({
      openModal: () => {
        if (dialogRef.current && !dialogRef.current.open) {
          dialogRef.current?.showModal();
        }
      },
      closeModal: () => dialogRef.current?.close(),
    }));

    //Sync open prop in controlled mode
    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog || !isControlled) return;
      if (open && !dialog.open) {
        dialog.showModal();
      } else if (!open && dialog.open) {
        dialog.close();
      }
    }, [isControlled, open]);

    function handleClose() {
      //Call parent onClose if in controlled mode
      if (isControlled) {
        onClose?.();
      } else dialogRef.current?.close();
    }

    return createPortal(
      <dialog
        ref={dialogRef}
        onClose={handleClose}
        className={clsx("modal modal-backdrop modal-content", className)}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-pm-border">
          <h3 className="text-lg font-bold text-pm-foreground text-center">
            {title}
          </h3>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-pm-card transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-5 w-5 text-pm-muted" />
          </button>
        </div>
        {/* Content */}
        <div className="mb-6 text-pm-foreground">{children}</div>
        {/* Actions */}
        {(actions || !isControlled) && (
          <div className="flex gap-3 justify-end pt-4 border-t border-pm-border">
            {actions || (
              <Button variant="primary" size="lg" onClick={handleClose}>
                Close
              </Button>
            )}
          </div>
        )}
      </dialog>,
      document.getElementById("modal")!
    );
  }
);

export default Modal;
