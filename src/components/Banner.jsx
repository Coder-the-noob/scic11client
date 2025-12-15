import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

import React from "react";

const Banner = () => {
  return (
    <div
      className="hero min-h-[75vh]"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/B2MKTShK/Blood-banner.jpg)",
      }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div
          className="max-w-xl bg-black/50 backdrop-blur-md p-6 rounded-xl"
          data-aos="fade-up"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
            <Typewriter
              words={[
                "Donate Blood, Save Lives",
                "Blood Donation is Humanity",
                "Be Someone’s Lifeline Today",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h1>

          <p
            className="py-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            A single drop of blood can make a huge difference. Join our
            community and help save lives.
          </p>

          <div
            className="flex justify-center gap-4"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <Link
              to="/register"
              className="btn bg-red-600 hover:bg-red-700 text-white border-none"
            >
              Join as a Donor
            </Link>

            <Link
              to="/search-donors"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-red-600"
            >
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
