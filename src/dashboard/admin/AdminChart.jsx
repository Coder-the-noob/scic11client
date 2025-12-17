import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const COLORS = ["#2563eb", "#dc2626", "#facc15", "#16a34a"];

const AdminChart = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/chart-stats").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-3">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Platform Overview
      </h2>

      <div className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminChart;
