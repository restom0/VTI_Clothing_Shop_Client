import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";

import { ThemeProvider as MaterialThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./apps/App";
import { Provider } from "react-redux";
import { store } from "./apps/store";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { CurrencyProvider } from "./currency";
import { I18nProvider } from "./i18n";
import ReactMetricsMonitor from "./components/shared/ReactMetricsMonitor";
import { AppThemeProvider } from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="143019284065-v5uqaccrl7k485e1doeadn6b3nhhkmab.apps.googleusercontent.com">
    <React.StrictMode>
      <MaterialThemeProvider>
        <Provider store={store}>
          <I18nProvider>
            <CurrencyProvider>
              <AppThemeProvider>
                <ReactMetricsMonitor>
                  <SpeedInsights />
                  <App />
                </ReactMetricsMonitor>
              </AppThemeProvider>
            </CurrencyProvider>
          </I18nProvider>
        </Provider>
      </MaterialThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
