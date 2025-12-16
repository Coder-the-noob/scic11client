import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { districts } from "../../utils/districts";
import { upazilas } from "../../utils/upazilas";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState("");
  const [request, setRequest] = useState(null);

  //Fetch existing request
  useEffect(() => {
    axiosSecure.get(`/donation-requests/${id}`).then((res) => {
      setRequest(res.data);
      setDistrict(res.data.recipientDistrict);
      setLoading(false);
    });
  }, [id, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedRequest = {
      recipientName: form.recipientName.value,
      recipientDistrict: form.district.value,
      recipientUpazila: form.upazila.value,
      hospital: form.hospital.value,
      address: form.address.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.date.value,
      donationTime: form.time.value,
      message: form.message.value,
    };

    const res = await axiosSecure.patch(
      `/donation-requests/${id}`,
      updatedRequest
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "Donation request updated successfully", "success");
      navigate("/dashboard/my-donation-requests");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Donation Request</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          name="recipientName"
          defaultValue={request.recipientName}
          className="input input-bordered"
          required
        />

        <select
          name="district"
          defaultValue={request.recipientDistrict}
          className="select select-bordered"
          onChange={(e) => setDistrict(e.target.value)}
          required
        >
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          defaultValue={request.recipientUpazila}
          className="select select-bordered"
          required
        >
          {(upazilas[district] || []).map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <input
          name="hospital"
          defaultValue={request.hospital}
          className="input input-bordered"
          required
        />

        <input
          name="address"
          defaultValue={request.address}
          className="input input-bordered"
          required
        />

        <select
          name="bloodGroup"
          defaultValue={request.bloodGroup}
          className="select select-bordered"
          required
        >
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          defaultValue={request.donationDate}
          className="input input-bordered"
          required
        />

        <input
          type="time"
          name="time"
          defaultValue={request.donationTime}
          className="input input-bordered"
          required
        />

        <textarea
          name="message"
          defaultValue={request.message}
          className="textarea textarea-bordered"
          required
        ></textarea>

        <button className="btn bg-red-600 hover:bg-red-700 text-white">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
