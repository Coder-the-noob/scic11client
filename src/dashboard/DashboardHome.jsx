import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DonationTable from "./donor/DonationTable";
import { FaTint, FaClock, FaCheckCircle, FaDonate } from "react-icons/fa";
import AdminStats from "./admin/AdminStats";
import AdminChart from "./admin/AdminChart";

/* ---------- Small reusable card ---------- */
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
    <div className={`p-4 rounded-full ${color} bg-opacity-10`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  </div>
);

const DashboardHome = () => {
  const { user, dbUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- Fetch dashboard stats ---------- */
  const fetchStats = async () => {
    const res = await axiosSecure.get("/dashboard/stats");
    setStats(res.data);
  };

  /* ---------- Fetch recent requests (donor only) ---------- */
  const fetchRecentRequests = async () => {
    if (!user?.email) return;
    const res = await axiosSecure.get("/donation-requests", {
      params: { email: user.email, limit: 3 },
    });
    setRecentRequests(res.data);
  };

  /* ---------- Initial load ---------- */
  useEffect(() => {
    if (!dbUser) return;

    setLoading(true);
    Promise.all([
      fetchStats(),
      dbUser.role === "donor" ? fetchRecentRequests() : Promise.resolve(),
    ]).finally(() => setLoading(false));
  }, [dbUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* ================= Header ================= */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName}</h1>
        <p className="mt-1 text-sm opacity-90">
          Role: <span className="capitalize font-semibold">{dbUser?.role}</span>
        </p>
      </div>

      {/* ================= Stats ================= */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<FaTint className="text-2xl text-red-600" />}
            label="Total Requests"
            value={stats.totalRequests}
            color="bg-red-600"
          />

          <StatCard
            icon={<FaClock className="text-2xl text-yellow-500" />}
            label="Pending Requests"
            value={stats.pending}
            color="bg-yellow-500"
          />

          <StatCard
            icon={<FaCheckCircle className="text-2xl text-green-600" />}
            label="Completed"
            value={stats.completed}
            color="bg-green-600"
          />

          {(dbUser?.role === "admin" || dbUser?.role === "volunteer") && (
            <StatCard
              icon={<FaDonate className="text-2xl text-emerald-600" />}
              label="Total Funds"
              value={`৳ ${stats.totalFunds}`}
              color="bg-emerald-600"
            />
          )}
        </div>
      )}

      {/* ================= Admin extras ================= */}
      {dbUser?.role === "admin" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-8">
          <AdminStats />
          <AdminChart />
        </div>
      )}

      {/* ================= Donor recent requests ================= */}
      {dbUser?.role === "donor" && (
        <div>
          {recentRequests.length > 0 ? (
            <DonationTable
              requests={recentRequests}
              showViewAll={true}
              refetch={async () => {
                setLoading(true);
                await fetchRecentRequests();
                await fetchStats();
                setLoading(false);
              }}
            />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
              <p className="text-gray-500">
                You have not created any donation request yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
