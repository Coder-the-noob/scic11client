import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import CampaignSlide from "./CampaignSlide";

const Campaigns = () => {
   const campaigns = [
    {
      id: 1,
      title: "Free Group Checking",
      description:
        "Join our free blood group checking campaign and help save lives.",
      image:
        "https://i.ibb.co.com/whFz4k0B/DOnatin-1.jpg",
      location: "Dhaka, Bangladesh",
      date: "December 18, 2025",
      time: "10:00 AM – 4:00 PM",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Free Group Checking",
      description:
        "Join our free blood group checking campaign and help save lives.",
      image:
        "https://i.ibb.co.com/VWFWWwyZ/Donation-2.jpg",
      location: "EWU, AftabNagar, Bangladesh",
      date: "December 20, 2025",
      time: "10:00 AM – 4:00 PM",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Blood Donation Camp",
      description:
        "A successful donation drive organized with local volunteers.",
      image:
        "https://i.ibb.co.com/3mjx4z3d/camp.jpg",
      location: "Chittagong, Bangladesh",
      date: "June 10, 2025",
      time: "9:00 AM – 3:00 PM",
      status: "ended",
    },
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT Side */}
        <div>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
          >
            {campaigns.map((campaign) => (
              <SwiperSlide key={campaign.id}>
                <CampaignSlide campaign={campaign} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT Side*/}
        <div data-aos="fade-left">
          <h2 className="text-4xl font-bold mb-4">
            Our Campaigns
          </h2>

          <div className="w-16 h-1 bg-red-500 mb-6"></div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            All over the country we organize blood donation and awareness
            campaigns to ensure safe blood for everyone. Join our mission
            and become part of humanity.
          </p>

          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-semibold transition">
            LOAD ALL CAMPAIGNS
          </button>
        </div>
      </div>
    </section>
  );
};

export default Campaigns;