import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import { formSlice } from "./formData/formSlice";

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
