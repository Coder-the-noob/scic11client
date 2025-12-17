import React from "react";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => updateRole(u._id, "volunteer")}
                  className="btn btn-xs"
                >
                  Make Volunteer
                </button>
                <button
                  onClick={() => updateRole(u._id, "admin")}
                  className="btn btn-xs btn-error"
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
