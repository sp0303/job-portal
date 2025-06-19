import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ✅ Whitelist of allowed admin emails
const allowedAdmins = [
  "vidyavantuedu@gmail.com",
  "jacobinclu@gmail.com"
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("adminUser"))
  );
  const [loading, setLoading] = useState(true);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!allowedAdmins.includes(user.email)) {
      alert("Access Denied: You are not an authorized admin.");
      await signOut(auth);
      return;
    }

    localStorage.setItem("adminUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("adminUser");
    setCurrentUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && allowedAdmins.includes(user.email)) {
        localStorage.setItem("adminUser", JSON.stringify(user));
        setCurrentUser(user);
      } else {
        localStorage.removeItem("adminUser");
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
