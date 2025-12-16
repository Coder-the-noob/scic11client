import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DonationTable from "./donor/DonationTable";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentRequests = () => {
    if (!user?.email) return;

    return axiosSecure.get("/donation-requests", {
      params: {
        email: user.email,
        limit: 3,
      },
    });
  };

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    fetchRecentRequests().then((res) => {
      setRecentRequests(res.data);
      setLoading(false);
    });
  }, [user?.email]);

  return (
    <div>
      {/* Welcome */}
      <h1 className="text-2xl font-bold mb-2">Welcome, {user?.displayName}</h1>

      <p className="text-gray-600 mb-6">
        Here is a quick overview of your recent donation requests.
      </p>

      {/* Recent Requests */}
      {!loading && recentRequests.length > 0 && (
        <DonationTable
          requests={recentRequests}
          showViewAll={true}
          refetch={() => {
            setLoading(true);
            fetchRecentRequests().then((res) => {
              setRecentRequests(res.data);
              setLoading(false);
            });
          }}
        />
      )}

      {!loading && recentRequests.length === 0 && (
        <p className="text-gray-500">
          You have not created any donation request yet.
        </p>
      )}
    </div>
  );
};

export default DashboardHome;
