import React from "react"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useAppDispatch } from "../redux/hooks"
import { editTask } from "../redux/tasksSlice"
import { Task } from "../types/taskTypes"

// Validation schema
const taskSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup
    .string()
    .oneOf(["Low", "Medium", "High"])
    .required("Priority is required"),
  state: yup
    .string()
    .oneOf(["todo", "doing", "done"])
    .required("State is required"),
})
interface EditTaskFormProps {
  task: Task
  setEditedTask: (id: string) => void
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  setEditedTask: setEditedTask,
}) => {
  const { control, handleSubmit } = useForm<Task>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      state: task.state,
    },
  })
  const dispatch = useAppDispatch()

  const onSubmit = (data: Task) => {
    dispatch(editTask({ id: task.id, updatedTask: { ...data } }))
    if (typeof setEditedTask === "function") {
      setEditedTask("")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input {...field} label="Title" placeholder="Task Title" />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Description"
              placeholder="Task Description"
            />
          )}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <Select {...field} label="State">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>State</SelectLabel>

                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="doing">Doing</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}

export default EditTaskForm
