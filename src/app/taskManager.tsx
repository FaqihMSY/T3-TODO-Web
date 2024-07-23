"use client";

import React, { useState } from "react";
import CompletedTasks from "./_components/completedTasks";
import TaskList from "./_components/taskList";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCheckSquare, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Task } from "./_components/types";

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [nextId, setNextId] = useState<number>(1);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("low"); // Default priority

  const completeTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setTasks(tasks.filter(t => t.id !== taskId));
      setCompletedTasks([...completedTasks, { ...task, completed: true }]);
    }
  };

  const uncompleteTask = (taskId: number) => {
    const task = completedTasks.find(t => t.id === taskId);
    if (task) {
      setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
      setTasks([...tasks, { ...task, completed: false }]);
    }
  };

  const removeTask = (taskId: number) => {
    setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
  };

  const addTask = () => {
    if (newTask) {
      const task: Task = { id: nextId, name: newTask, completed: false, priority };
      setTasks([...tasks, task]);
      setNewTask("");
      setNextId(nextId + 1);
      setPriority("low"); // Reset priority
    }
  };

  const startEditTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId) || completedTasks.find(t => t.id === taskId);
    if (task) {
      setEditTaskId(taskId);
      setEditTaskName(task.name);
      setNewTask(task.name);
      setPriority(task.priority);
    }
  };

  const saveEditTask = () => {
    if (editTaskId !== null && editTaskName) {
      const updatedTasks = tasks.map(task =>
        task.id === editTaskId ? { ...task, name: editTaskName, priority } : task
      );
      const updatedCompletedTasks = completedTasks.map(task =>
        task.id === editTaskId ? { ...task, name: editTaskName, priority } : task
      );

      setTasks(updatedTasks);
      setCompletedTasks(updatedCompletedTasks);

      setEditTaskId(null);
      setEditTaskName("");
      setNewTask("");
      setPriority("low");
    } else {
      console.error("No task ID or task name to save.");
    }
  };

  // Function to sort tasks by priority
  const sortTasksByPriority = (tasks: Task[]) => {
    const priorityOrder: { [key: string]: number } = { high: 1, medium: 2, low: 3 };
    return tasks.sort((a, b) => {
      const priorityA = priorityOrder[a.priority || "low"] ?? 3; // Default to "low"
      const priorityB = priorityOrder[b.priority || "low"] ?? 3; // Default to "low"
      return priorityA - priorityB;
    });
  };

  return (
    <div className="bg-secondary p-4">
      <div className="mb-4">
        <h1 className="text-lg font-bold mb-2 border rounded p-2 w-full text-center">TO DO List</h1>
      </div>
      <div className="mb-4">
        <div className="border rounded-lg p-4 max-w-6xl mx-auto">
          <p className="text-lg font-bold mb-2 text-center">Task List <FontAwesomeIcon icon={faBox} /></p>
          <TaskList
            tasks={sortTasksByPriority(tasks)}
            onTaskComplete={completeTask}
            onEditTask={startEditTask}
          />
          <div className="flex items-center mb-4">
            <Input
              type="text"
              value={editTaskId === null ? newTask : editTaskName}
              onChange={(e) => {
                if (editTaskId === null) {
                  setNewTask(e.target.value);
                } else {
                  setEditTaskName(e.target.value);
                }
              }}
              className="border p-2 mr-2 flex-grow"
              placeholder={editTaskId === null ? "Add new task..." : "Edit task..."}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
              className="border p-2 mr-2"
            >
              <option value="high">Urgent (Red)</option>
              <option value="medium">Medium (Yellow)</option>
              <option value="low">Not Urgent (White)</option>
            </select>
            {editTaskId === null ? (
              <Button onClick={addTask} className="bg-red-300 text-white rounded-full p-2">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            ) : (
              <Button onClick={saveEditTask} className="bg-green-300 text-white rounded-full p-2">
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="border rounded-lg p-4 max-w-6xl mx-auto">
          <p className="text-lg font-bold mb-2 text-center">Completed Tasks <FontAwesomeIcon icon={faCheckSquare} /></p>
          <CompletedTasks
            completedTasks={sortTasksByPriority(completedTasks)}
            onTaskRemove={removeTask}
            onTaskUncomplete={uncompleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
