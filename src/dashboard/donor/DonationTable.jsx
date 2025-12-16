import React from "react";
import { Link } from "react-router";

const DonationTable = ({ requests, showViewAll }) => {
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
                </td>

                <td className="space-x-2">
                  <Link
                    to={`/dashboard/donation/${req._id}`}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </Link>
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
