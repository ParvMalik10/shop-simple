import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure this URL matches your local frontend URL
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      setMessage(error.message);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: "400px", margin: "20px auto", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: "8px"}}>
      <h2 style={{marginBottom: "20px"}}>Pay with Stripe</h2>
      <PaymentElement />
      <button 
        disabled={isProcessing || !stripe || !elements} 
        id="submit"
        style={{
          marginTop: "20px", 
          width: "100%", 
          padding: "12px", 
          background: "#635bff", 
          color: "white", 
          border: "none", 
          borderRadius: "4px", 
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {message && <div style={{color: "red", marginTop: "12px"}}>{message}</div>}
    </form>
  );
}
