import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function TopBar({ onCreate }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const navigate = useNavigate();
  const auth = useAuth();

  const submit = () => {
    if (!title.trim()) return;
    if (!auth.user) return navigate("/signin");
    onCreate({ title: title.trim(), priority });
    setTitle("");
  };

  return (
    <div className="grid grid-cols-12 gap-3 items-center">
      <input
        className="col-span-7 p-2 border rounded-md"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="col-span-3 p-2 border rounded-md"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        className="col-span-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        onClick={submit}
      >
        Create
      </button>
    </div>
  );
}
