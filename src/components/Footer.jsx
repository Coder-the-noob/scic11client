import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <h3 className="text-lg font-bold">Blood Donation</h3>
        <p>Saving lives through blood donation</p>
      </div>

      <div>
        <span className="footer-title">Quick Links</span>
        <Link to="/" className="link link-hover">Home</Link>
        <Link to="/donation-requests" className="link link-hover">
          Donation Requests
        </Link>
        <Link to="/search-donors" className="link link-hover">
          Search Donors
        </Link>
      </div>

      <div>
        <span className="footer-title">Support</span>
        <Link className="link link-hover">Contact</Link>
        <Link className="link link-hover">About Us</Link>
      </div>
    </footer>
  );
}
