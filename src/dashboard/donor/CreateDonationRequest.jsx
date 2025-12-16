import React, { useContext, useState } from 'react';
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { districts } from "../../utils/districts";
import { upazilas } from "../../utils/upazilas";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
 const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [district, setDistrict] = useState("");

  const filteredUpazilas = district ? upazilas[district] || [] : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const donationRequest = {
      requesterName: user.displayName,
      requesterEmail: user.email,
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

    try {
      const res = await axiosSecure.post(
        "/donation-requests",
        donationRequest
      );

      if (res.data.insertedId) {
        Swal.fire("Success", "Donation request created", "success");
        form.reset();
      }
    } catch (error) {
      if (error.response?.status === 403) {
        Swal.fire(
          "Blocked",
          "You are blocked and cannot create a request",
          "error"
        );
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Create Donation Request
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

        {/* requester info */}
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered bg-gray-100"
        />

        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered bg-gray-100"
        />

        {/* recipient */}
        <input
          name="recipientName"
          placeholder="Recipient Name"
          className="input input-bordered"
          required
        />

        <select
          name="district"
          className="select select-bordered"
          onChange={(e) => setDistrict(e.target.value)}
          required
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          className="select select-bordered"
          required
          disabled={!district}
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <input
          name="hospital"
          placeholder="Hospital Name"
          className="input input-bordered"
          required
        />

        <input
          name="address"
          placeholder="Full Address"
          className="input input-bordered"
          required
        />

        <select
          name="bloodGroup"
          className="select select-bordered"
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          className="input input-bordered"
          required
        />

        <input
          type="time"
          name="time"
          className="input input-bordered"
          required
        />

        <textarea
          name="message"
          placeholder="Why do you need blood?"
          className="textarea textarea-bordered"
          required
        ></textarea>

        <button className="btn bg-red-600 hover:bg-red-700 text-white">
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;