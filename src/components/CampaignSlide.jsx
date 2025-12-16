import React from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const CampaignSlide = ({campaign}) => {
  const { image, title, description, date, time, location, status } = campaign;

  return (
    <div
      className="bg-white shadow-lg grid grid-cols-1 md:grid-cols-2"
      data-aos="fade-right"
    >
      {/* image */}
      <img src={image} alt={title} className="w-full h-full object-cover" />

      {/* content */}
      <div className="p-6">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold mb-3 ${
            status === "upcoming"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status.toUpperCase()}
        </span>

        <h3 className="text-2xl font-bold mb-3">{title}</h3>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> {location}
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-red-500" /> {date}
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-red-500" /> {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignSlide;
