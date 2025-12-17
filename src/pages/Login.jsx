import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import LoadingOverLay from "../components/LoadingOverLay";
import axios from "axios";

export default function Login() {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      return setError("All fields are required");
    }

    setLoading(true);
    try {
      await loginUser(email, password);
      const res = await axios.post(
        "https://backend-11-murex.vercel.app/auth/jwt",
        {
          email,
        }
      );
      localStorage.setItem("access-token", res.data.token);

      Swal.fire("Success", "Logged in successfully", "success");
      navigate(from, { replace: true });
    } catch {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      const res = await axios.post(
        "https://backend-11-murex.vercel.app/auth/jwt",
        {
          email: user.email,
        }
      );

      localStorage.setItem("access-token", res.data.token);

      Swal.fire("Success", "Logged in with Google", "success");

      navigate(from, { replace: true });
    } catch {
      setError("Google login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      {loading && <LoadingOverLay />}

      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary">Login</h2>
          <p className="text-center text-sm text-gray-500">
            Access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* EMAIL */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pr-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button className="btn btn-primary w-full">Login</button>
          </form>

          {/* GOOGLE LOGIN */}
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex gap-2"
          >
            <FaGoogle /> Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            New here?{" "}
            <Link to="/register" className="link link-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
