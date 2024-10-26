import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import TaskCard from "./TaskCard"
import { Button } from "./ui/button"
import { deleteTask } from "../redux/tasksSlice"
import EditTaskForm from "./EditTaskForm"

const TaskList: React.FC = () => {
  const tasks = useAppSelector(state => state.tasks.tasks)
  const [editedTask, setEditedTask] = useState("")
  const dispatch = useAppDispatch()

  const deleteCurrentTask = (id: string) => {
    dispatch(deleteTask(id))
  }
  const editCurrentTask = (id: string) => {
    setEditedTask(id)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tasks.map(task =>
        editedTask === task.id ? (
          <EditTaskForm
            key={task.id}
            task={task}
            setEditedTask={setEditedTask}
          />
        ) : (
          <div key={task.id}>
            <TaskCard task={task} />
            <>
              <Button onClick={() => deleteCurrentTask(task.id)}>
                Delete Task
              </Button>
              <Button onClick={() => editCurrentTask(task.id)}>
                Edit Task
              </Button>
            </>
          </div>
        )
      )}
    </div>
  )
}

export default TaskList
