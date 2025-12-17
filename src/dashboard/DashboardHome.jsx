import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DonationTable from "./donor/DonationTable";
import { FaTint, FaClock, FaCheckCircle, FaDonate } from "react-icons/fa";
import AdminStats from "./admin/AdminStats";

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
    <div className={`p-4 rounded-full ${color} bg-opacity-10`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  </div>
);

const DashboardHome = () => {
  const { user, dbUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalFunds, setTotalFunds] = useState(0);

  useEffect(() => {
    if (dbUser?.role === "admin" || dbUser?.role === "volunteer") {
      axiosSecure.get("/fundings/total").then((res) => {
        setTotalFunds(res.data.total);
      });
    }
  }, [dbUser]);

  const fetchRecentRequests = () => {
    if (!user?.email) return;
    return axiosSecure.get("/donation-requests", {
      params: { email: user.email, limit: 3 },
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
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-linear-to-r from-red-600 to-red-500 text-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName}</h1>
        <p className="mt-1 text-sm opacity-90">
          Role: <span className="capitalize font-semibold">{dbUser?.role}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaTint className="text-2xl text-red-600" />}
          label="Total Requests"
          value={recentRequests.length}
          color="bg-red-600"
        />

        <StatCard
          icon={<FaClock className="text-2xl text-yellow-500" />}
          label="Pending Requests"
          value={recentRequests.filter((r) => r.status === "pending").length}
          color="bg-yellow-500"
        />

        <StatCard
          icon={<FaCheckCircle className="text-2xl text-green-600" />}
          label="Completed"
          value={recentRequests.filter((r) => r.status === "done").length}
          color="bg-green-600"
        />

        {(dbUser?.role === "admin" || dbUser?.role === "volunteer") && (
          <StatCard
            icon={<FaDonate className="text-2xl text-emerald-600" />}
            label="Total Funds"
            value={`৳ ${totalFunds}`}
            color="bg-emerald-600"
          />
        )}
      </div>

      {/* Admin extended stats */}
      {dbUser?.role === "admin" && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <AdminStats />
        </div>
      )}

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
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
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
