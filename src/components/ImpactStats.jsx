import React from "react";
import { FaAward, FaHeartPulse, FaUserDoctor, FaUsers } from "react-icons/fa6";

const ImpactStats = () => {
  return (
    <section
      className="bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=80)",
      }}
    >
      {/* dark overlay */}
      <div className="bg-black/70 py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* 1 */}
          <div className="bg-white p-8 shadow-lg" data-aos="fade-up">
            <FaHeartPulse className="text-4xl text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-red-500">2578</h2>
            <p className="uppercase text-sm tracking-widest mt-2">
              Success Smile
            </p>
          </div>

          {/* 2 */}
          <div
            className="bg-white p-8 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <FaUserDoctor className="text-4xl text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-red-500">3235</h2>
            <p className="uppercase text-sm tracking-widest mt-2">
              Happy Donors
            </p>
          </div>

          {/* 3 */}
          <div
            className="bg-white p-8 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FaUsers className="text-4xl text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-red-500">3568</h2>
            <p className="uppercase text-sm tracking-widest mt-2">
              Happy Recipient
            </p>
          </div>

          {/* 4 */}
          <div
            className="bg-white p-8 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <FaAward className="text-4xl text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-red-500">1364</h2>
            <p className="uppercase text-sm tracking-widest mt-2">
              Total Awards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
