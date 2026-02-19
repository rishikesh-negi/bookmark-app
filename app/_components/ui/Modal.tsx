"use client";

import React, {
  createContext,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  modalContent: React.ReactElement;
  children: React.ReactNode;
};

export type ModalContextValue = {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined,
);

export default function ModalProvider({
  children,
  modalContent,
  ...props
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (modalIsOpen) modalRef.current?.showModal();
  }, [modalIsOpen]);

  const handleOutsideClick: MouseEventHandler<HTMLDialogElement> = (e) => {
    if (e.target === modalRef.current) {
      modalRef.current?.close();
      setModalIsOpen(false);
    }
  };

  return (
    <ModalContext.Provider value={{ modalRef, setModalIsOpen }}>
      {modalIsOpen
        ? createPortal(
            <dialog
              className="fixed inset-0 m-auto rounded-lg backdrop:bg-slate-900/75 backdrop:backdrop-blur-[2px]"
              onClick={handleOutsideClick}
              ref={modalRef}
              {...props}>
              <div className="block p-3">{modalContent}</div>
            </dialog>,
            document.getElementById("modal-root")!,
          )
        : null}
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) throw new Error("Modal context was used outside its provider");

  return context;
}
