/**
 * Renders a task card component with the provided task data.
 *
 * @param task - The task object containing the data to display in the card.
 * @returns A React component that displays the task information.
 */
import React from "react"
import { Task } from "../types/taskTypes"

interface TaskCardProps {
  task: Task
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => (
  <div className="p-4">
    {task.image && (
      <img
        src={task.image}
        alt={task.title}
        className="w-full h-32 object-cover mb-4"
      />
    )}
    <h3 className="font-semibold">{task.title}</h3>
    <p>{task.description}</p>
    <p>Priority: {task.priority}</p>
    <p>Status: {task.state}</p>
  </div>
)

export default TaskCard
