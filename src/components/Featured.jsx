import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const Featured = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="mt-10 mb-10 md:mt-20 md:mb-20">
      <div>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p
            className="uppercase tracking-widest text-xl
             text-red-400 mb-3"
            data-aos="fade-down"
          >
            Our Volunteers
          </p>

          {/* main heading */}
          <h2
            className="text-2xl md:text-4xl font-bold mb-14 leading-snug"
            data-aos="fade-up"
          >
            The volunteers who give their time and <br />
            talents help to fulfill our mission.
          </h2>

          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* card 1 */}
            <div
              className="bg-white text-black shadow-md transition-all duration-300
                         hover:-translate-y-2 hover:shadow-2xl
                         mx-auto w-full max-w-sm"
            >
              <img
                src="https://i.ibb.co.com/sJsJCDz9/vicky.jpg"
                className="w-full h-72 object-cover"
                alt="Alexander Gary"
              />
              <div className="p-6 text-center">
                <h3 className="font-bold uppercase">Alexander Gary</h3>
                <p className="text-sm text-gray-500">Co-Founder</p>

                <div className="flex justify-center gap-4 mt-5">
                  <a className="border p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaFacebookF />
                  </a>
                  <a className="border p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaTwitter />
                  </a>
                  <a className="border p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>

            {/* card 2 */}
            <div
              className="bg-white text-black shadow-md transition-all duration-300
                         hover:-translate-y-2 hover:shadow-2xl
                         mx-auto w-full max-w-sm"
            >
              <img
                src="https://i.ibb.co.com/0yYBhxXQ/christina-wocintechchat-com-0-Zx1b-Dv5-BNY-unsplash.jpg"
                className="w-full h-72 object-cover"
                alt="Melissa Munoz"
              />
              <div className="p-6 text-center">
                <h3 className="font-bold uppercase">Melissa Munoz</h3>
                <p className="text-sm text-gray-500">Founder</p>

                <div className="flex justify-center gap-4 mt-5">
                  <a className="border p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaFacebookF />
                  </a>
                  <a className="border p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaTwitter />
                  </a>
                  <a className="border p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
            {/* card 3 */}
            <div
              className="bg-white text-black shadow-md transition-all duration-300
                         hover:-translate-y-2 hover:shadow-2xl
                         mx-auto w-full max-w-sm"
            >
              <img
                src="https://i.ibb.co.com/mV27PGWq/darshan-patel-QJEVpydul-Gs-unsplash.jpg"
                className="w-full h-72 object-cover"
                alt="John Abraham"
              />
              <div className="p-6 text-center">
                <h3 className="font-bold uppercase">John Abraham</h3>
                <p className="text-sm text-gray-500">Manager</p>

                <div className="flex justify-center gap-4 mt-5">
                  <a className="border p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaFacebookF />
                  </a>
                  <a className="border p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaTwitter />
                  </a>
                  <a className="border p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16" data-aos="fade-up">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold">
              BECOME A VOLUNTEER
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
