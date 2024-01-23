import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/App.css";
import App from "./App.tsx"

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <App />
);
  