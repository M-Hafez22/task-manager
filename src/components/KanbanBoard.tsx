import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useDrop, useDrag, DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import TaskCard from "./TaskCard"
import { Card } from "./ui/card"
import { updateTaskState, deleteTask } from "../redux/tasksSlice"
import { Task } from "../types/taskTypes"
import { Button } from "./ui/button"
import EditTaskForm from "./EditTaskForm"

// Types
type KanbanColumnProps = {
  state: Task["state"]
  tasks: Task[]
  onDrop: (taskId: string, newState: Task["state"]) => void
}

// Column for tasks
const KanbanColumn: React.FC<KanbanColumnProps> = ({
  state,
  tasks,
  onDrop,
}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: Task) => onDrop(item.id, state),
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div
      ref={dropRef}
      className={`p-4 w-full rounded-lg shadow-md ${
        isOver ? "bg-gray-400" : "bg-gray-200"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">{state.toUpperCase()}</h2>
      {tasks.map(task => (
        <DraggableTask key={task.id} task={task} />
      ))}
    </div>
  )
}

// Draggable task component with Delete and Edit buttons
const DraggableTask: React.FC<{ task: Task }> = ({ task }) => {
  const [editedTask, setEditedTask] = useState<string>("")
  const dispatch = useAppDispatch()
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: task,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  const handleEdit = (id: string) => {
    setEditedTask(id)
  }

  return editedTask === task.id ? (
    <EditTaskForm key={task.id} task={task} setEditedTask={setEditedTask} />
  ) : (
    <Card
      ref={dragRef}
      className={`p-4 mb-4 ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <TaskCard task={task} />
      <div className="flex space-x-2 mt-2">
        <Button variant="destructive" onClick={handleDelete}>
          Delete Task
        </Button>
        <Button onClick={() => handleEdit(task.id)}>Edit Task</Button>
      </div>
    </Card>
  )
}

// Kanban Board with columns for each state
const KanbanBoard: React.FC = () => {
  const tasks = useAppSelector(state => state.tasks.tasks)
  const dispatch = useAppDispatch()

  // Handle task drop
  const handleDrop = (taskId: string, newState: Task["state"]) => {
    dispatch(updateTaskState({ id: taskId, newState }))
  }

  // Filter tasks by state
  const todoTasks = tasks.filter(task => task.state === "todo")
  const doingTasks = tasks.filter(task => task.state === "doing")
  const doneTasks = tasks.filter(task => task.state === "done")

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-y-4 space-x-0 flex-col sm:flex-row sm:space-y-0  sm:space-x-4 justify-center align-top">
        <KanbanColumn state="todo" tasks={todoTasks} onDrop={handleDrop} />
        <KanbanColumn state="doing" tasks={doingTasks} onDrop={handleDrop} />
        <KanbanColumn state="done" tasks={doneTasks} onDrop={handleDrop} />
      </div>
    </DndProvider>
  )
}

export default KanbanBoard
