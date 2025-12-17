import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/donation-requests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-error">
          Blood Donation Requests
        </h1>
        <p className="text-gray-500 mt-2">
          Find people who need blood urgently
        </p>
      </div>

      {/* EMPTY STATE */}
      {requests.length === 0 && (
        <div className="text-center text-gray-500">
          No donation requests found.
        </div>
      )}

      {/* TABLE */}
      {requests.length > 0 && (
        <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>Blood</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="hover">
                  <td>
                    <p className="font-semibold">{req.recipientName}</p>
                    <p className="text-xs text-gray-500">
                      Hospital: {req.hospital}
                    </p>
                  </td>

                  <td>
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>

                  <td>
                    <p>{req.donationDate}</p>
                    <p className="text-sm text-gray-500">
                      {req.donationTime}
                    </p>
                  </td>

                  <td>
                    <span className="badge badge-error badge-outline font-bold">
                      {req.bloodGroup}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        req.status === "pending"
                          ? "badge-warning"
                          : req.status === "inprogress"
                          ? "badge-info"
                          : req.status === "done"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
