import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));
