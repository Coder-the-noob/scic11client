import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../auth/AuthProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [amount, setAmount] = useState(500);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
      });

      const clientSecret = res.data.clientSecret;

      // confirm payment
      const { paymentIntent, error } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.displayName || "Anonymous",
              email: user?.email,
            },
          },
        });

      if (error) {
        Swal.fire("Error", error.message, "error");
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // save funding to DB
        await axiosSecure.post("/fundings", {
          name: user.displayName,
          email: user.email,
          amount,
          transactionId: paymentIntent.id,
        });

        // redirect to success page
        navigate("/dashboard/payment-success", {
          state: {
            amount,
            transactionId: paymentIntent.id,
          },
        });
      }
    } catch {
      Swal.fire("Error", "Payment failed", "error");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full"
      />

      <CardElement className="p-4 border rounded" />

      <button
        disabled={!stripe || loading}
        className="btn bg-red-600 text-white w-full"
      >
        {loading ? "Processing..." : `Donate ৳${amount}`}
      </button>

      {/* Test card note */}
      <p className="text-xs text-center text-gray-400">
        Test Card: 4242 4242 4242 4242 | Any future date | CVC 123
      </p>
    </form>
  );
};

export default CheckoutForm;
