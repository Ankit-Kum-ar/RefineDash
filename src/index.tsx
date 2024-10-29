import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ColorModeContextProvider } from "./contexts/color-mode";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ColorModeContextProvider>
      <App />
    </ColorModeContextProvider>
  </React.StrictMode>
);
