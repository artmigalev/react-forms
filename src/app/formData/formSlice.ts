import { createSlice } from "@reduxjs/toolkit/react";
import type { RootState } from "../store";
import type { FormData } from "@/types/form";
export type FormState = FormData;

const initialState: FormState = {
  name: "",
  age: 0,
  email: "",
  password: "",
  passwordSecond: "",
  selectCountry: "Австралия",
  gender: "male",
  accept: false,
};
export const formSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setState: (state) => {
      return { ...state };
    },
  },
});
export const { setState } = formSlice.actions;
export const selectFormData = (state: RootState) => state.form;
export default formSlice.reducer;
