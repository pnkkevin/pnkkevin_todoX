import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newtaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newtaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newtaskTitle,
        });
        toast.success(`'${newtaskTitle}' has been added to your list!`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("fail to adding task.", error);
        toast.error("Something went wrong while adding the task.");
      }
      setNewTaskTitle("");
    } else {
      toast.error("Please enter the task content.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="What needs to be done?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newtaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newtaskTitle.trim()}
        >
          <Plus className="size-5" />
          Add Task
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
