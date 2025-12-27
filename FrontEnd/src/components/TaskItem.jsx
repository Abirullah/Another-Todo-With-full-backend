import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TaskItem({ todo, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const save = () => {
    onUpdate(todo._id, { title });
    setEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="p-3 border rounded-md flex items-center justify-between"
    >
      <div>
        {editing ? (
          <input
            className="p-1 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <div className="font-medium">{todo.title}</div>
        )}
        <div className="text-sm text-gray-500">
          Priority: {todo.priority} • Status: {todo.status}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {editing ? (
          <>
            <button
              className="px-2 py-1 bg-green-600 text-white rounded"
              onClick={save}
            >
              Save
            </button>
            <button
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="px-2 py-1 bg-yellow-400 rounded"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => onDelete(todo._id)}
            >
              Delete
            </button>
            {todo.status === "pending" ? (
              <button
                className="px-2 py-1 bg-indigo-600 text-white rounded"
                onClick={() => onUpdate(todo._id, { status: "underprocess" })}
              >
                Start Work
              </button>
            ) : todo.status === "underprocess" ? (
              <button
                className="px-2 py-1 bg-blue-600 text-white rounded"
                onClick={() => onUpdate(todo._id, { status: "completed" })}
              >
                Complete
              </button>
            ) : (
              <button
                className="px-2 py-1 bg-blue-600 text-white rounded"
                onClick={() => onUpdate(todo._id, { status: "pending" })}
              >
                Undo
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
