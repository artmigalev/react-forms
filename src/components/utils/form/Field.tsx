import { getChildId } from "@/functions";
import type { FieldProps } from "@/types/form";

export const Field = ({ children, label, error, htmlFor, required }: FieldProps) => {
  const id = htmlFor || (getChildId(children) as string);
  return (
    <div className=" field mb-3 flex flex-col gap-1 items-start p-0.5 ">
      {label && (
        <label htmlFor={id} className="text-2xl">
          {label}
          {required && "*"}
        </label>
      )}
      {children}
      {error && <small className="stroke-pink-700 ">{error.message}</small>}
    </div>
  );
};
