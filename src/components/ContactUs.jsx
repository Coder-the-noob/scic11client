import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUS = () => {
  return (
    <section className="py-20 bg-linear-to-br from-red-50 to-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          data-aos="fade-up"
        >
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT INFO */}
          <div data-aos="fade-right">
            <h3 className="text-xl font-semibold mb-4">
              We’d love to hear from you
            </h3>
            <p className="text-gray-600 mb-6">
              Have questions about blood donation or need urgent help? Reach out
              to us anytime.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-red-500 text-xl" />
                <span className="font-medium">+880 1234 567890</span>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-red-500 text-xl" />
                <span className="font-medium">support@blooddonation.com</span>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
                <span className="font-medium">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div
            className="bg-white shadow-lg rounded-lg p-6"
            data-aos="fade-left"
          >
            <form className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered rounded-lg bg-gray-50
                    focus:outline-none focus:ring-2 focus:ring-red-400
                focus:border-red-400 transition"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered rounded-lg bg-gray-50
                        focus:outline-none focus:ring-2 focus:ring-red-400
                    focus:border-red-400 transition"
              />

              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered focus:border-red-500"
              ></textarea>

              <button
                className="btn bg-red-600 hover:bg-red-700 text-white w-full
           transition transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUS;
