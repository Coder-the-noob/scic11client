import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Funding = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
          Support Blood Donation
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Your contribution helps save lives ❤️
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Funding;
