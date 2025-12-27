import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { updateUser } from "../api";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handle = async (e) => {
    e.preventDefault();
    try {
      const data = { name };
      if (password) data.password = password;
      const res = await updateUser(user.id, data);
      setUser({
        id: res._id,
        name: res.name,
        email: res.email,
        active: res.active,
      });
      setMessage("Profile updated");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      {message && <div className="mb-3 text-sm text-gray-700">{message}</div>}
      <form onSubmit={handle} className="space-y-3">
        <div className="text-sm text-gray-600">Email: {user?.email}</div>
        <input
          required
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="New password (leave empty to keep)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full p-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </form>
    </div>
  );
}
