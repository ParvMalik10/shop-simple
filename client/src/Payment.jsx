import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// 🔴 REPLACE THIS WITH YOUR STRIPE PUBLISHABLE KEY (pk_test_...)
const stripePromise = loadStripe("pk_test_ACTUAL_KEY_HERE");

function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Simulating an item in the cart
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    theme: 'stripe',
  };

  return (
    <div style={{fontFamily: "Arial, sans-serif"}}>
      <h1 style={{textAlign: "center"}}>ShopSimple Checkout</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
