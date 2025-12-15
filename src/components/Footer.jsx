import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Blood<span className="text-red-500">Donation</span>
          </h3>
          <p className="text-sm leading-relaxed">
            Saving lives through voluntary blood donation.  
            Together, we can make a difference.
          </p>

          <div className="flex gap-4 mt-5">
            <a className="p-2 border border-gray-600 rounded-full
                         hover:bg-red-600 hover:border-red-600
                         hover:text-white transition">
              <FaFacebookF />
            </a>
            <a className="p-2 border border-gray-600 rounded-full
                         hover:bg-red-600 hover:border-red-600
                         hover:text-white transition">
              <FaTwitter />
            </a>
            <a className="p-2 border border-gray-600 rounded-full
                         hover:bg-red-600 hover:border-red-600
                         hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-red-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/donation-requests"
                className="hover:text-red-500 transition"
              >
                Donation Requests
              </Link>
            </li>
            <li>
              <Link
                to="/search-donors"
                className="hover:text-red-500 transition"
              >
                Search Donors
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Support
          </h4>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-red-500 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-500 transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Be a Lifesaver
          </h4>
          <p className="text-sm mb-4">
            Your blood donation can save lives.  
            Join our mission today.
          </p>

          <Link
            to="/register"
            className="inline-block bg-red-600 hover:bg-red-700
                       text-white px-6 py-2 rounded transition"
          >
            Become a Donor
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Blood Donation.  
        Made with <FaHeart className="inline text-red-500 mx-1 animate-pulse" /> for humanity.
      </div>
    </footer>
  );
}
