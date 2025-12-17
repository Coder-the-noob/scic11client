import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUsers, FaTint, FaDonate } from "react-icons/fa";

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get("/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) {
    return <p className="text-gray-500">Loading statistics...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
        <FaUsers className="text-4xl text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
        <FaTint className="text-4xl text-red-600" />
        <div>
          <p className="text-sm text-gray-500">Donation Requests</p>
          <h2 className="text-2xl font-bold">{stats.totalRequests}</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
        <FaDonate className="text-4xl text-green-600" />
        <div>
          <p className="text-sm text-gray-500">Total Funding</p>
          <h2 className="text-2xl font-bold">${stats.totalFunding}</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
