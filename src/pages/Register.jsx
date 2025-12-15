import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Swal from "sweetalert2";
import LoadingOverLay from "../components/LoadingOverLay";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";


export default function Register() {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      return setError("All fields are required");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      await createUser(email, password);
      await updateUserProfile(name);
      Swal.fire("Success", "Account created successfully", "success");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await googleLogin();
      Swal.fire("Success", "Registered with Google", "success");
      navigate("/");
    } catch {
      setError("Google signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      {loading && <LoadingOverLay/>}

      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary">
            Register
          </h2>
          <p className="text-center text-sm text-gray-500">
            Create your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* NAME */}
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Your name"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Your email"
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
                  placeholder="Create password"
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

            <button className="btn btn-primary w-full">Register</button>
          </form>

          {/* GOOGLE REGISTER */}
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleRegister}
            className="btn btn-outline w-full flex gap-2"
          >
            <FaGoogle /> Sign up with Google
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
