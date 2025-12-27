import React, { useState } from "react";
import { verify } from "../api";
import { Link } from "react-router-dom";

export default function Verify() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await verify({ email, otp });
      setMessage(res.message || "Verified");
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Verify Email</h2>
        {message && <div className="mb-3 text-sm text-gray-700">{message}</div>}
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
            className="w-full p-2 border rounded"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="w-full p-2 bg-green-600 text-white rounded">
            Verify
          </button>
        </form>
        <div className="text-center text-sm mt-4">
          Back to{" "}
          <Link to="/signin" className="text-blue-600">
            Sign in
          </Link>{" "}
          or{" "}
          <Link to="/signup" className="text-blue-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
