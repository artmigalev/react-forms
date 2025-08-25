import type { countries } from "@/data/variables";
export interface FormProps {
  provider: FormData;
}
export type Gender = "male" | "female";
export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordSecond: string;
  selectCountry: (typeof countries)[number];
  gender: Gender;
  accept: boolean;
  image?: string;
};

export type FieldData = {
  label: string;
  type: string;
  validation?: {
    required?: boolean;
    message?: string;
  };
  allowCustomValue?: boolean;
  options?: string[];
  placeholder?: string;
};

export interface FieldProps {
  children: React.ReactElement;
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: {
    message?: string;
  };
}
