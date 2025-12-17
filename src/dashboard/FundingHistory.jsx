import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const FundingHistory = () => {
  const { user, dbUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [fundings, setFundings] = useState([]);

  useEffect(() => {
    const params =
      dbUser?.role === "admin" || dbUser?.role === "volunteer"
        ? {}
        : { email: user.email };

    axiosSecure.get("/fundings", { params }).then((res) => {
      setFundings(res.data);
    });
  }, [user, dbUser]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Funding History</h2>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transaction</th>
            </tr>
          </thead>

          <tbody>
            {fundings.map((f) => (
              <tr key={f._id}>
                <td>{f.name}</td>
                <td>{f.email}</td>
                <td className="font-bold text-green-600">৳ {f.amount}</td>
                <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                <td className="text-xs">{f.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {fundings.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No funding records found
          </p>
        )}
      </div>
    </div>
  );
};

export default FundingHistory;
