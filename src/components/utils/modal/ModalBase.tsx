import { useEffect } from "react";
import "./index.css";
type ModalProps = {
  children: React.ReactNode;
  isShow: boolean;
  fnClose: () => void;
};

export const Modal = ({ children, isShow, fnClose }: ModalProps): React.JSX.Element => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === "Escape" ? fnClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [fnClose]);
  return (
    <dialog
      role="dialog"
      open={isShow}
      className="modal w-[55%]  absolute top-[25%] left-[25%]  text-center bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300  p-4 gap-4 rounded-lg shadow-md flex justify-center text-3xl items-center "
    >
      <button onClick={() => fnClose()} className="modal-close  duration-300 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path>
        </svg>
      </button>
      {children}
    </dialog>
  );
};
