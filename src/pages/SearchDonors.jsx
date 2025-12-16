import { useEffect, useState } from "react";
import axios from "axios";
import DonorCard from "../components/DonorCard";
import { districts } from "../utils/districts";
import { upazilas } from "../utils/upazilas";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function SearchDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const filteredUpazilas = district
    ? upazilas[district] || []
    : [];

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);

        const params = {};
        if (bloodGroup) params.bloodGroup = bloodGroup;
        if (district) params.district = district;
        if (upazila) params.upazila = upazila;

        const res = await axios.get(
          "http://localhost:5000/donors",
          { params }
        );

        setDonors(res.data);
      } catch (error) {
        console.error("Failed to load donors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [bloodGroup, district, upazila]);

  return (
    <section className="py-20 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">

        {/* title */}
        <h2
          className="text-3xl font-bold text-center mb-10"
          data-aos="fade-up"
        >
          Search Blood Donors
        </h2>

        {/* filters */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          data-aos="fade-up"
        >
          {/* blood group */}
          <select
            className="select select-bordered w-full"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(bg => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* district */}
          <select
            className="select select-bordered w-full"
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setUpazila(""); 
            }}
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* upazila */}
          <select
            className="select select-bordered w-full"
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            disabled={!district}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map(u => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        {/* loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading donors...
          </p>
        )}

        {/* donor cards */}
        {!loading && donors.length === 0 && (
          <p className="text-center text-gray-500">
            No donors found
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {donors.map(donor => (
            <DonorCard key={donor._id} donor={donor} />
          ))}
        </div>
      </div>
    </section>
  );
}
