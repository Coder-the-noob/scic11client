import { useState } from "react";
import axios from "axios";
import DonorCard from "../components/DonorCard";
import { districts } from "../utils/districts";
import { upazilas } from "../utils/upazilas";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function SearchDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const filteredUpazilas = district ? upazilas[district] || [] : [];

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
    setShowToast(false);

    try {
      setLoading(true);

      const params = {};
      if (bloodGroup) params.bloodGroup = bloodGroup;
      if (district) params.district = district;
      if (upazila) params.upazila = upazila;

      const res = await axios.get("http://localhost:5000/donors", {
        params,
      });

      setDonors(res.data);

      if (res.data.length === 0) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Failed to load donors", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-base-200 min-h-screen relative">
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Search Blood Donors
        </h2>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
        >
          {/* Blood Group */}
          <select
            className="select select-bordered w-full"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Blood Group</option>
            {bloodGroups.map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          {/* District */}
          <select
            className="select select-bordered w-full"
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setUpazila("");
            }}
          >
            <option value="">District</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Upazila */}
          <select
            className="select select-bordered w-full"
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            disabled={!district}
          >
            <option value="">Upazila</option>
            {filteredUpazilas.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          {/* Search Button */}
          <button type="submit" className="btn btn-primary w-full">
            Search
          </button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg  text-error"></span>
          </div>
        )}

        {/* Empty State */}
        {!searched && !loading && (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-lg">
                Find Blood Donors
              </h3>
              <p className="text-gray-500">
                Choose blood group, district and upazila,
                then click <span className="font-semibold">Search</span>.
              </p>
            </div>
          </div>
        )}

        {/* Donor Cards */}
        {searched && !loading && donors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donors.map(donor => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>
        )}

      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-warning shadow-lg">
            <span>No donors found matching your search.</span>
          </div>
        </div>
      )}
    </section>
  );
}
