import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
// import { AuthContext } from "../auth/AuthProvider";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../auth/AuthProvider';

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, dbUser } = useContext(AuthContext);

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/donation-requests/${id}`).then((res) => {
      setRequest(res.data);
      setLoading(false);
    });
  }, [id, axiosSecure]);

  const handleConfirmDonate = async () => {
    const result = await Swal.fire({
      title: "Confirm Donation?",
      text: "You are confirming to donate blood for this request",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    const res = await axiosSecure.patch(
      `/donation-requests/status/${id}`,
      {
        status: "inprogress",
        donor: {
          name: user.displayName,
          email: user.email,
        },
      }
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire("Confirmed!", "Donation is now in progress", "success");
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!request) return null;

  const canConfirm =
    (dbUser?.role === "admin" || dbUser?.role === "volunteer") &&
    request.status === "pending";

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p><b>Recipient:</b> {request.recipientName}</p>
        <p><b>Blood Group:</b> {request.bloodGroup}</p>

        <p>
          <b>Location:</b>{" "}
          {request.recipientDistrict}, {request.recipientUpazila}
        </p>

        <p><b>Hospital:</b> {request.hospital}</p>
        <p><b>Address:</b> {request.address}</p>

        <p><b>Date:</b> {request.donationDate}</p>
        <p><b>Time:</b> {request.donationTime}</p>

        <p className="md:col-span-2">
          <b>Message:</b> {request.message}
        </p>

        <p>
          <b>Status:</b>{" "}
          <span className="badge badge-outline">{request.status}</span>
        </p>

        {request.status === "inprogress" && request.donor?.email && (
          <div className="md:col-span-2 text-sm text-gray-600">
            <p><b>Donor:</b> {request.donor.name}</p>
            <p>{request.donor.email}</p>
          </div>
        )}
      </div>

      {/* Confirm Donate */}
      {canConfirm && (
        <div className="mt-6">
          <button
            onClick={handleConfirmDonate}
            className="btn bg-green-600 hover:bg-green-700 text-white"
          >
            Confirm Donate
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;
