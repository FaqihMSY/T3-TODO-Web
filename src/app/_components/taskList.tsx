"use client";

import React from "react";
import { Task } from "./types";
import { Checkbox } from "~/components/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "~/components/ui/button";

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: number) => void;
  onEditTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskComplete, onEditTask }) => {
  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "text-red-500"; // Merah
      case "medium":
        return "text-yellow-500"; // Kuning
      case "low":
        return "text-white"; // Putih
      default:
        return "text-white";
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center mb-2 border-b py-2">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => {
              if (checked) {
                onTaskComplete(task.id);
              }
            }}
          />
          <FontAwesomeIcon icon={faFlag} className={`ml-2 ${getPriorityColor(task.priority)}`} />
          <span className="ml-2 flex-grow">{task.name}</span>
          <Button variant="outline" onClick={() => onEditTask(task.id)}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
