import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import TaskCard from "./TaskCard"
import { Button } from "./ui/button"
import { deleteTask } from "../redux/tasksSlice"
import EditTaskForm from "./EditTaskForm"
import KanbanBoard from "./KanbanBoard"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectItem,
} from "./ui/select"
import { Card } from "./ui/card"

const TaskList: React.FC = () => {
  const tasks = useAppSelector(state => state.tasks.tasks)
  const dispatch = useAppDispatch()

  // State for toggling views
  const [isKanbanView, setIsKanbanView] = useState(false)
  const [stateFilter, setStateFilter] = useState<
    "todo" | "doing" | "done" | "all" | null
  >(null)
  const [priorityFilter, setPriorityFilter] = useState<
    "Low" | "Medium" | "High" | "all" | null
  >(null)
  const [editedTask, setEditedTask] = useState<string>("")

  // Delete and Edit task actions
  const deleteCurrentTask = (id: string) => {
    dispatch(deleteTask(id))
  }
  const editCurrentTask = (id: string) => {
    setEditedTask(id)
  }

  // Filtered tasks based on state and priority filters
  const filteredTasks = tasks.filter(task => {
    const matchesState =
      stateFilter === "all" ||
      stateFilter === null ||
      task.state === stateFilter
    const matchesPriority =
      priorityFilter === "all" ||
      priorityFilter === null ||
      task.priority === priorityFilter
    return matchesState && matchesPriority
  })

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          {/* Filter Section */}
          {!isKanbanView && (
            <>
              <div>
                <Select
                  value={stateFilter || "all"}
                  onValueChange={value =>
                    setStateFilter(value as "todo" | "doing" | "done" | "all")
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>State</SelectLabel>
                      <SelectItem value="all">All States</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="doing">Doing</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select
                  value={priorityFilter || "all"}
                  onValueChange={value =>
                    setPriorityFilter(
                      value as "Low" | "Medium" | "High" | "all"
                    )
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        {/* Toggle Button */}
        <Button onClick={() => setIsKanbanView(!isKanbanView)}>
          {isKanbanView ? "Switch to List View" : "Switch to Kanban View"}
        </Button>
      </div>

      {/* Conditionally Render KanbanBoard or Task List */}
      {isKanbanView ? (
        <KanbanBoard />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTasks.map(task =>
            editedTask === task.id ? (
              <EditTaskForm
                key={task.id}
                task={task}
                setEditedTask={setEditedTask}
              />
            ) : (
              <Card key={task.id} className="p-4">
                <TaskCard task={task} />
                <div className="flex space-x-2 mt-2">
                  <Button
                    variant="destructive"
                    onClick={() => deleteCurrentTask(task.id)}
                  >
                    Delete Task
                  </Button>
                  <Button onClick={() => editCurrentTask(task.id)}>
                    Edit Task
                  </Button>
                </div>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default TaskList
