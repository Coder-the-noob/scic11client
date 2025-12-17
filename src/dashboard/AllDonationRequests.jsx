import React from "react";

import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DonationTable from "./donor/DonationTable";

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllRequests = () => {
    setLoading(true);
    axiosSecure
      .get("/donation-requests", {
        params: { status: status || undefined },
      })
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllRequests();
  }, [status]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Blood Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          className="select select-bordered"
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

      <DonationTable
        requests={requests}
        showViewAll={false}
        refetch={fetchAllRequests}
      />
    </div>
  );
};

export default AllDonationRequests;
