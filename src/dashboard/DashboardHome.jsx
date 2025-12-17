import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DonationTable from "./donor/DonationTable";
import { FaTint, FaClock, FaCheckCircle } from "react-icons/fa";
import AdminStats from "./admin/AdminStats";

const DashboardHome = () => {
  const { user, dbUser } = useContext(AuthContext);
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-red-600 to-red-500 text-white rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold">Welcome, {user?.displayName}</h1>
        <p className="mt-1 text-sm opacity-90">
          Role: <span className="capitalize font-semibold">{dbUser?.role}</span>
        </p>
      </div>

      {/*Statistics Cards*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <FaTint className="text-4xl text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Total Requests</p>
            <h2 className="text-2xl font-bold">{recentRequests.length}</h2>
          </div>
        </div>

        {/* Admin statistics */}
        {dbUser?.role === "admin" && <AdminStats />}

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <FaClock className="text-4xl text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Pending Requests</p>
            <h2 className="text-2xl font-bold">
              {recentRequests.filter((r) => r.status === "pending").length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <FaCheckCircle className="text-4xl text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="text-2xl font-bold">
              {recentRequests.filter((r) => r.status === "done").length}
            </h2>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div>
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
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500">
              You have not created any donation request yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
