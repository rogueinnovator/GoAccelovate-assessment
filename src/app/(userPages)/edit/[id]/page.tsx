"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id as string;

  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${taskId}`);
        if (!res.ok) throw new Error("Failed to fetch task");
        const data = await res.json();
        setTaskTitle(data.title);
      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) fetchTask();
  }, [taskId]);

  const updateTask = async () => {
    if (!taskTitle.trim()) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      setUpdating(false);
    }
  };
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Task</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Task title"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={updateTask}
                  disabled={updating}
                  className="cursor-pointer"
                >
                  {updating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin " />
                      Updating...
                    </>
                  ) : (
                    "Update Task"
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
