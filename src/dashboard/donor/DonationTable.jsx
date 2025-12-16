import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const DonationTable = ({ requests, showViewAll, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/donation-requests/status/${id}`, {
        status,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `Status updated to ${status}`, "success");
        if (refetch) {
          refetch();
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update status",
        "error"
      );
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/donation-requests/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Request deleted successfully", "success");
        if (refetch) refetch();
      }
    }
  };

  if (!requests.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Recent Donation Requests</h3>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.recipientName}</td>
                <td>
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>

                <td className="font-bold text-red-600">{req.bloodGroup}</td>

                <td>
                  <span className="badge badge-outline">{req.status}</span>
                  {req.status === "inprogress" && req.donor?.email && (
                    <div className="mt-2 text-xs text-gray-600">
                      <p>
                        <b>Donor:</b> {req.donor.name}
                      </p>
                      <p>{req.donor.email}</p>
                    </div>
                  )}
                </td>

                <td className="flex flex-wrap gap-2">
                  <Link
                    to={`/dashboard/donation/${req._id}`}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </Link>

                  <Link
                    to={`/dashboard/edit-donation/${req._id}`}
                    className="btn btn-xs btn-outline"
                  >
                    Edit
                  </Link>

                  {/* ✅ Done / Cancel only when inprogress */}
                  {req.status === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(req._id, "done")}
                        className="btn btn-xs bg-green-600 hover:bg-green-700 text-white"
                      >
                        Done
                      </button>

                      <button
                        onClick={() => handleStatusUpdate(req._id, "canceled")}
                        className="btn btn-xs bg-red-600 hover:bg-red-700 text-white"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-xs bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showViewAll && (
        <div className="mt-6 text-right">
          <Link
            to="/dashboard/my-donation-requests"
            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
          >
            View My All Requests
          </Link>
        </div>
      )}
    </div>
  );
};

export default DonationTable;
