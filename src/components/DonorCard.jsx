import React from 'react';

const DonorCard = ({ donor }) => {
    const { name, bloodGroup, district, upazila } = donor;

  return (
    <div
      className="card bg-white shadow-md hover:shadow-xl transition"
      data-aos="zoom-in"
    >
      <div className="card-body">
        <h3 className="text-xl font-bold">{name}</h3>

        <p>
          <span className="font-semibold">Blood Group:</span>{" "}
          <span className="text-red-600 font-bold">{bloodGroup}</span>
        </p>

        <p>
          <span className="font-semibold">Location:</span>{" "}
          {district}, {upazila}
        </p>

        <button className="btn btn-sm bg-red-600 hover:bg-red-700 text-white mt-4">
          Request Donation
        </button>
      </div>
    </div>
  );
};

export default DonorCard;