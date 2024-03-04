import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./context/CurrentUserCntxt.jsx";
import { ProfileDataProvider } from "./context/ProfileDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <CurrentUserProvider>
      <ProfileDataProvider>
        <App />
      </ProfileDataProvider>
    </CurrentUserProvider>
  </Router>
);
