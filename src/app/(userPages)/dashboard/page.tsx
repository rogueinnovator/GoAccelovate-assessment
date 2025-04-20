"use client";
import { useRouter } from "next/navigation"; // <-- Add this
import type React from "react";
import { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  createdAt?: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  //FETCH ALL TASKS
  const fetchTasks = async () => {
    setError(null);
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Error getting tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  //ADD NEW TASK
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    setLoading(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });
      if (!res.ok) throw new Error("Failed to add task");

      const newTaskItem = await res.json();
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };
  //DELETE TASK
  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditNavigation = (taskId: string) => {
    router.push(`/edit/${taskId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTask} className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading || newTask.length === 0}
              className="cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Task
                </>
              )}
            </Button>
          </form>

          <div className="space-y-4">
            {error ? (
              <p className="text-center text-red-500 py-4">{error}</p>
            ) : tasks?.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No tasks yet. Add your first task above!
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <span className="block font-medium">{task.title}</span>
                    {task.createdAt && (
                      <span className="text-xs text-muted-foreground">
                        Added on:{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEditNavigation(task.id)}
                      className="cursor-pointer"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteTask(task.id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span> 
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
