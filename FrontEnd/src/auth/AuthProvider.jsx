import React, { createContext, useContext, useEffect, useState } from "react";
import { signin as apiSignin } from "../api";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const signin = async (email, password) => {
    const res = await apiSignin({ email, password });
    // store token and expiry (5 hours)
    const token = res.token;
    const expiry = Date.now() + 5 * 60 * 60 * 1000;
    localStorage.setItem("token", token);
    localStorage.setItem("token_exp", expiry.toString());
    setUser(res.user);
    return res;
  };

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
