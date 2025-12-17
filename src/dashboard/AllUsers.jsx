import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEllipsisV } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axiosSecure.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    await axiosSecure.patch(`/users/role/${id}`, { role });
    Swal.fire("Success", `Role updated to ${role}`, "success");
    fetchUsers();
  };

  const updateStatus = async (id, status) => {
    await axiosSecure.patch(`/users/status/${id}`, { status });
    Swal.fire("Success", `User ${status}`, "success");
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                {/* USER */}
                <td className="flex items-center gap-3">
                  <img
                    src={u.avatar || "https://i.ibb.co/2kR5zq0/user.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold">{u.name || "N/A"}</span>
                </td>

                {/* EMAIL */}
                <td>{u.email}</td>

                {/* ROLE */}
                <td>
                  <span
                    className={`badge ${
                      u.role === "admin"
                        ? "badge-error"
                        : u.role === "volunteer"
                        ? "badge-warning"
                        : "badge-outline"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`badge ${
                      u.status === "blocked" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {u.status || "active"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="text-right">
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-sm btn-ghost">
                      <FaEllipsisV />
                    </label>

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded w-48"
                    >
                      {u.role !== "volunteer" && (
                        <li>
                          <button
                            onClick={() => updateRole(u._id, "volunteer")}
                          >
                            Make Volunteer
                          </button>
                        </li>
                      )}

                      {u.role !== "admin" && (
                        <li>
                          <button onClick={() => updateRole(u._id, "admin")}>
                            Make Admin
                          </button>
                        </li>
                      )}

                      {u.status !== "blocked" ? (
                        <li>
                          <button
                            onClick={() => updateStatus(u._id, "blocked")}
                          >
                            Block User
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button onClick={() => updateStatus(u._id, "active")}>
                            Unblock User
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
