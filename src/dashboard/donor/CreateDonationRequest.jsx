import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
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
      const res = await axiosSecure.post("/donation-requests", donationRequest);
      if (res.data.insertedId) {
        Swal.fire("Success", "Donation request created", "success");
        form.reset();
        setDistrict("");
      }
    } catch {
      Swal.fire("Error", "You are blocked or unauthorized", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-red-600">
          Create Donation Request
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* READ ONLY */}
          <input
            readOnly
            value={user?.displayName}
            className="input input-bordered bg-gray-100"
          />
          <input
            readOnly
            value={user?.email}
            className="input input-bordered bg-gray-100"
          />

          <input
            name="recipientName"
            placeholder="Recipient Name"
            className="input input-bordered"
            required
          />

          <select name="bloodGroup" className="select select-bordered" required>
            <option value="">Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg}>{bg}</option>
            ))}
          </select>

          <select
            name="district"
            className="select select-bordered"
            onChange={(e) => setDistrict(e.target.value)}
            required
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            name="upazila"
            className="select select-bordered"
            disabled={!district}
            required
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u}>{u}</option>
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
            className="textarea textarea-bordered md:col-span-2"
            required
          />

          <button className="btn bg-red-600 hover:bg-red-700 text-white md:col-span-2">
            Request Blood
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
