import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
};

export function Modal({ children }: ModalProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const modalRoot = document.body.querySelector("#modal") as HTMLElement;

    const el = elRef.current ?? document.createElement("div");
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return createPortal(children, elRef.current);
}
