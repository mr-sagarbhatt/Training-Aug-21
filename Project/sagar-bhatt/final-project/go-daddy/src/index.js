import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { AuthProvider } from "./contexts/AuthContext";
import "../node_modules/bootstrap/dist/js/bootstrap";
// import "./assets/scss/style.scss";

import App from "./App";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
