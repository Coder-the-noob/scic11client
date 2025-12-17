import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../auth/AuthProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [amount, setAmount] = useState(500);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
      });

      const clientSecret = res.data.clientSecret;
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
      } else if (paymentIntent.status === "succeeded") {
        Swal.fire("Success 🎉", "Thank you for your funding!", "success");
        setAmount(500);
      }
    } catch {
      Swal.fire("Error", "Payment failed", "error");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Donation Amount (৳)
        </label>
        <input
          type="number"
          min="100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Card */}
      <div className="p-4 border rounded-md bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
              },
            },
          }}
        />
      </div>

      {/* Button */}
      <button
        disabled={!stripe || loading}
        className="btn bg-red-600 hover:bg-red-700 text-white w-full"
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
