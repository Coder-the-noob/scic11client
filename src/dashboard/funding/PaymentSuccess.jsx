import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();
  const { amount, transactionId } = location.state || {};

  if (!amount || !transactionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="bg-white p-8 rounded-xl text-center shadow">
          <h2 className="text-xl font-bold mb-4">No payment data found</h2>
          <Link to="/dashboard/funding" className="btn btn-primary">
            Go to Funding
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />

        <h2 className="text-3xl font-bold mb-2">Payment Successful 🎉</h2>

        <p className="text-gray-600 mb-6">
          Thank you for supporting our blood donation mission.
        </p>

        <div className="text-left bg-base-100 p-4 rounded mb-6 text-sm">
          <p>
            <span className="font-semibold">Amount:</span> ৳{amount}
          </p>
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            {transactionId}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link to="/dashboard/funding" className="btn btn-outline">
            Funding History
          </Link>

          <Link
            to="/dashboard"
            className="btn bg-red-600 hover:bg-red-700 text-white"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
