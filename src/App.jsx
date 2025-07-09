import "@/App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainDeliveryPage } from "@/pages/MainDeliveryPage";
import { CheckoutMethodOfSendingPage } from "@/pages/CheckoutMethodOfSendingPage";
import { CheckoutSenderPage } from "@/pages/CheckoutSenderPage";
import { CheckoutRecipientPage } from "@/pages/CheckoutRecipientPage";
import { CheckoutReceptionPlacePage } from "@/pages/CheckoutReceptionPlacePage";
import { CheckoutDeliveryPlacePage } from "@/pages/CheckoutDeliveryPlacePage";
import { CheckoutPaymentPage } from "@/pages/CheckoutPaymentPage";
import { CheckoutDataVerificationPage } from "@/pages/CheckoutDataVerificationPage";
import { CheckoutSendingApplicationPage } from "@/pages/CheckoutSendingApplicationPage";
import PATHS from "@/constants/paths.js";
import { ToastContainer } from "react-toastify";
import { useTheme } from "@/context/ThemeContext.jsx";

const App = () => {
  const { theme } = useTheme();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme={theme} />
      <Routes>
        <Route path="/" element={<Navigate to={PATHS.MAIN} replace />} />
        <Route path={PATHS.MAIN} element={<MainDeliveryPage />} />
        <Route
          path={PATHS.CHECKOUT_METHOD}
          element={<CheckoutMethodOfSendingPage />}
        />
        <Route
          path={PATHS.CHECKOUT_RECIPIENT}
          element={<CheckoutRecipientPage />}
        />
        <Route path={PATHS.CHECKOUT_SENDER} element={<CheckoutSenderPage />} />
        <Route
          path={PATHS.CHECKOUT_RECEPTION}
          element={<CheckoutReceptionPlacePage />}
        />
        <Route
          path={PATHS.CHECKOUT_DELIVERY}
          element={<CheckoutDeliveryPlacePage />}
        />
        <Route
          path={PATHS.CHECKOUT_PAYMENT}
          element={<CheckoutPaymentPage />}
        />
        <Route
          path={PATHS.CHECKOUT_VERIFICATION}
          element={<CheckoutDataVerificationPage />}
        />
        <Route
          path={PATHS.CHECKOUT_SENDING}
          element={<CheckoutSendingApplicationPage />}
        />
        <Route path="*" element={<Navigate to={PATHS.MAIN} replace />} />
      </Routes>
    </>
  );
};

export default App;
