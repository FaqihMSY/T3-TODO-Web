"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Task } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faTrash } from "@fortawesome/free-solid-svg-icons";

// Fungsi untuk mendapatkan warna prioritas
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

interface CompletedTasksProps {
  completedTasks: Task[];
  onTaskRemove: (taskId: number) => void;
  onTaskUncomplete: (taskId: number) => void;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ completedTasks, onTaskRemove, onTaskUncomplete }) => {
  return (
    <div>
      {completedTasks.map((task) => (
        <div key={task.id} className="flex items-center mb-2 border-b py-2">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => {
              if (!checked) {
                onTaskUncomplete(task.id);
              }
            }}
          />
          <FontAwesomeIcon icon={faFlag} className={`ml-2 ${getPriorityColor(task.priority)}`} />
          <span className="ml-2 flex-grow">{task.name}</span>
          <Button variant="outline" onClick={() => onTaskRemove(task.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
