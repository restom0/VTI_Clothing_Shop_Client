import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./apps/App";
import { Provider } from "react-redux";
import { store } from "./apps/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="143019284065-v5uqaccrl7k485e1doeadn6b3nhhkmab.apps.googleusercontent.com">
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
