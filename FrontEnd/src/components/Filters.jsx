import React from "react";

const StatusButton = ({ label, active, onClick }) => (
  <button
    className={`px-3 py-1 mr-2 rounded-full border ${
      active ? "bg-blue-600 text-white" : "bg-white text-gray-700"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default function Filters({ filter, setFilter }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="mb-3 md:mb-0">
        <StatusButton
          label="All"
          active={!filter.status}
          onClick={() => setFilter((f) => ({ ...f, status: "" }))}
        />
        <StatusButton
          label="Pending"
          active={filter.status === "pending"}
          onClick={() => setFilter((f) => ({ ...f, status: "pending" }))}
        />
        <StatusButton
          label="Underprocess"
          active={filter.status === "underprocess"}
          onClick={() => setFilter((f) => ({ ...f, status: "underprocess" }))}
        />
        <StatusButton
          label="Completed"
          active={filter.status === "completed"}
          onClick={() => setFilter((f) => ({ ...f, status: "completed" }))}
        />
      </div>
      <div>
        <StatusButton
          label="All"
          active={filter.priority === "All"}
          onClick={() => setFilter((f) => ({ ...f, priority: "All" }))}
        />
        <StatusButton
          label="Low"
          active={filter.priority === "low"}
          onClick={() => setFilter((f) => ({ ...f, priority: "low" }))}
        />
        <StatusButton
          label="Medium"
          active={filter.priority === "medium"}
          onClick={() => setFilter((f) => ({ ...f, priority: "medium" }))}
        />
        <StatusButton
          label="High"
          active={filter.priority === "high"}
          onClick={() => setFilter((f) => ({ ...f, priority: "high" }))}
        />
      </div>
    </div>
  );
}
