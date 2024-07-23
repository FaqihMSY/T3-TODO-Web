export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}