import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
const root = document.getElementById("root") as HTMLElement;
import { Provider } from "react-redux";
import { store } from "./app/store";
createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <div id="modal"></div>
    </Provider>
  </StrictMode>
);
