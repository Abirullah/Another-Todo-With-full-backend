import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../api";
import { useAuth } from "../auth/AuthProvider";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.signin(email, password);
      setMessage(null);
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
        {message && <div className="mb-3 text-sm text-red-600">{message}</div>}
        <form onSubmit={handle} className="space-y-3">
          <input
            required
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full p-2 bg-blue-600 text-white rounded">
            Sign in
          </button>
        </form>
        <div className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
