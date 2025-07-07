import "@/App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import MainDeliveryPage from "./pages/MainDeliveryPage/MainDeliveryPage.jsx";
import CheckoutMethodOfSending from "./pages/Checkout/CheckoutMethodOfSending.jsx";
import CheckoutSender from "./pages/Checkout/CheckoutSender.jsx";
import CheckoutRecipient from "./pages/Checkout/CheckoutRecipient.jsx";
import CheckoutReceptionPlace from "./pages/Checkout/CheckoutReceptionPlace.jsx";
import CheckoutDeliveryPlace from "./pages/Checkout/CheckoutDeliveryPlace.jsx";
import CheckoutPayment from "./pages/Checkout/CheckoutPayment.jsx";
import CheckoutDataVerification from "./pages/Checkout/CheckoutDataVerification.jsx";
import CheckoutSendingApplication from "./pages/Checkout/CheckoutSendingApplication.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/maindeliverypage" replace />} />
      <Route path="/maindeliverypage" element={<MainDeliveryPage />} />
      <Route
        path="/checkout/methodsending"
        element={<CheckoutMethodOfSending />}
      />
      <Route path="/checkout/recipient" element={<CheckoutRecipient />} />
      <Route path="/checkout/sender" element={<CheckoutSender />} />
      <Route
        path="/checkout/receptionplace"
        element={<CheckoutReceptionPlace />}
      />
      <Route
        path="/checkout/deliveryplace"
        element={<CheckoutDeliveryPlace />}
      />
      <Route path="/checkout/payment" element={<CheckoutPayment />} />
      <Route
        path="/checkout/dataverification"
        element={<CheckoutDataVerification />}
      />
      <Route
        path="/checkout/sendingapplication"
        element={<CheckoutSendingApplication />}
      />
      <Route path="*" element={<Navigate to="/maindeliverypage" replace />} />
    </Routes>
  );
}

export default App;
