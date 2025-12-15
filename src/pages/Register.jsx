import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Swal from "sweetalert2";
import LoadingOverLay from "../components/LoadingOverLay";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { uploadImage } from "../utils/imageUpload";
import { districts } from "../utils/districts";
import { upazilas } from "../utils/upazilas";
import { axiosPublic } from "../api/axiosPublic";

const BLOOD_GROUPS = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

export default function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const avatar = form.avatar.files[0];
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;

    if (!name || !email || !avatar || !bloodGroup || !district || !upazila) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      // 1️⃣ Upload avatar to ImageBB
      const avatarUrl = await uploadImage(avatar);

      // 2️⃣ Firebase user create
      await createUser(email, password);

      // 3️⃣ Firebase profile update
      await updateUserProfile(name, avatarUrl);

      // 4️⃣ Save user to DB (role + status default)
      await axiosPublic.post("/users", {
        name,
        email,
        avatar: avatarUrl,
        bloodGroup,
        district,
        upazila,
        role: "donor",
        status: "active"
      });

      Swal.fire("Success", "Registration successful", "success");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      {loading && <LoadingOverLay />}

      <div className="card w-full max-w-xl shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <input name="name" placeholder="Full Name" className="input input-bordered" />

            <input name="email" type="email" placeholder="Email" className="input input-bordered" />

            <input name="avatar" type="file" accept="image/*" className="file-input file-input-bordered" />

            <select name="bloodGroup" className="select select-bordered">
              <option value="">Blood Group</option>
              {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
            </select>

            <select name="district" className="select select-bordered" onChange={(e) => setSelectedDistrict(e.target.value)}>
              <option value="">District</option>
              {districts.map(d => <option key={d}>{d}</option>)}
            </select>

            <select name="upazila" className="select select-bordered">
              <option value="">Upazila</option>
              {upazilas[selectedDistrict]?.map(u => <option key={u}>{u}</option>)}
            </select>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full pr-10"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirm_password"
                placeholder="Confirm Password"
                className="input input-bordered w-full pr-10"
              />
              <span
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && (
              <p className="text-error col-span-full text-sm">{error}</p>
            )}

            <button className="btn btn-primary col-span-full">
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
