import React from "react"
import { Card } from "./ui/card"
import { Task } from "../types/taskTypes"

interface TaskCardProps {
  task: Task
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => (
  <Card className="p-4">
    <h3 className="font-semibold">{task.title}</h3>
    <p>{task.description}</p>
    <p>Priority: {task.priority}</p>
    <p>Status: {task.state}</p>
  </Card>
)

export default TaskCard
