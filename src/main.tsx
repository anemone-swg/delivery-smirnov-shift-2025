import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { DeliveryProvider } from "@/context/DeliveryContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <DeliveryProvider>
                <App />
              </DeliveryProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
