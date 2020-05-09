import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <Router>
    <SnackbarProvider autoHideDuration={2000}>
      <App />
    </SnackbarProvider>
  </Router>,
  document.getElementById("root")
);
