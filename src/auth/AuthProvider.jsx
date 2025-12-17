import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import axios from "axios";
import { auth } from "../Firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL;

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("API URL:", API);

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const logoutUser = () => signOut(auth);

  const updateUserProfile = (name, photoURL) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      try {
        if (currentUser?.email) {
          const res = await axios.post(`${API}/auth/jwt`, {
            email: currentUser.email,
          });

          const token = res.data?.token;
          localStorage.setItem("access-token", token);

          const dbRes = await axios.get(`${API}/users/me`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          setDbUser(dbRes.data);
        } else {
          localStorage.removeItem("access-token");
          setDbUser(null);
        }
      } catch (error) {
        console.error("AUTH PROVIDER ERROR:", error);
        setDbUser(null);
      } finally {
        setLoading(false); // 🔥 always stop loading
      }
    });

    return () => unsub();
  }, []);

  const authInfo = {
    user,
    dbUser,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
