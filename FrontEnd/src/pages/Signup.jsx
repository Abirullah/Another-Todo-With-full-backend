import React, { useState } from "react";
import { signup } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ name, email, password });
      // redirect to signin so user can login immediately
      navigate("/signin");
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign up</h2>
        {message && <div className="mb-3 text-sm text-gray-700">{message}</div>}
        <form onSubmit={handle} className="space-y-3">
          <input
            required
            className="w-full p-2 border rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Create account
          </button>
        </form>
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
