import React from "react";
import ReactDOM from "react-dom";
import AuthState from './contexts/AuthContext/AuthState.js';
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
   
    <ContextProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ContextProvider>
   
  </React.StrictMode>,
  document.getElementById("root")
);
