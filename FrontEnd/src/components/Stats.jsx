import React from "react";

export default function Stats({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      <div className="p-3 bg-gray-50 rounded">
        <div className="text-sm text-gray-500">Total</div>
        <div className="text-xl font-semibold">{stats.total}</div>
      </div>
      <div className="p-3 bg-yellow-50 rounded">
        <div className="text-sm text-gray-500">Pending</div>
        <div className="text-xl font-semibold">{stats.pending}</div>
      </div>
      <div className="p-3 bg-blue-50 rounded">
        <div className="text-sm text-gray-500">Underprocess</div>
        <div className="text-xl font-semibold">{stats.underprocess}</div>
      </div>
      <div className="p-3 bg-green-50 rounded">
        <div className="text-sm text-gray-500">Completed</div>
        <div className="text-xl font-semibold">
          {stats.completed} ({stats.percentage}%)
        </div>
      </div>
    </div>
  );
}
