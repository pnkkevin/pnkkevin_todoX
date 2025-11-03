import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradien-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="size-12 mx-auto text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "No tasks in progress."
              : filter === "completed"
              ? "No completed tasks yet."
              : "No tasks yet."}
          </h3>

          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Add your first task to get started!"
              : `Switch to 'All Tasks' to see your ${
                  filter === "active" ? "completed" : "in-progress"
                } tasks.`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
