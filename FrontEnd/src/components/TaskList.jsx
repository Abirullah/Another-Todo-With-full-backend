import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ todos, onUpdate, onDelete }) {
  if (!todos || todos.length === 0)
    return <div className="text-center py-8">No tasks</div>;

  return (
    <div className="space-y-3">
      {todos.map((t) => (
        <TaskItem
          key={t._id}
          todo={t}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
