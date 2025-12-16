import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DonationTable from "./DonationTable";

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axiosSecure
      .get("/donation-requests", {
        params: {
          email: user.email,
          status: status || undefined,
        },
      })
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      });
  }, [user?.email, status,axiosSecure]);

  if (!user) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6">My Donation Requests</h2>

      {/* Filter */}
      <div className="mb-6">
        <select
          className="select select-bordered max-w-xs"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Content */}
      {loading && <p className="text-gray-500">Loading requests...</p>}

      {!loading && requests.length === 0 && (
        <p className="text-gray-500">You have no donation requests.</p>
      )}

      {!loading && requests.length > 0 && (
        <DonationTable requests={requests} showViewAll={false} />
      )}
    </div>
  );
};

export default MyDonationRequests;
