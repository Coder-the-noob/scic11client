import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    axiosSecure.get("/donation-requests").then((res) => {
      setRequests(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-error">
          Blood Donation Requests
        </h1>
        <p className="text-gray-500 mt-2">
          Find people who need blood urgently
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Blood</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>
                  <p className="font-semibold">{req.recipientName}</p>
                  <p className="text-xs text-gray-500">{req.hospital}</p>
                </td>

                <td>
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>

                <td>{req.donationDate}</td>

                <td>
                  <span className="badge badge-error badge-outline font-bold">
                    {req.bloodGroup}
                  </span>
                </td>

                <td>
                  <span className="badge badge-warning">{req.status}</span>
                </td>

                <td>
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => setSelectedRequest(req)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedRequest && (
        <dialog id="details_modal" className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-2xl text-error mb-4">
              Donation Request Details
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <b>Recipient:</b> {selectedRequest.recipientName}
              </p>
              <p>
                <b>Blood Group:</b> {selectedRequest.bloodGroup}
              </p>
              <p>
                <b>Hospital:</b> {selectedRequest.hospital}
              </p>
              <p>
                <b>Location:</b> {selectedRequest.recipientDistrict},{" "}
                {selectedRequest.recipientUpazila}
              </p>
              <p>
                <b>Date & Time:</b> {selectedRequest.donationDate} at{" "}
                {selectedRequest.donationTime}
              </p>
              <p>
                <b>Status:</b> {selectedRequest.status}
              </p>
              <p className="mt-3">
                <b>Message:</b> {selectedRequest.message}
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DonationRequests;
