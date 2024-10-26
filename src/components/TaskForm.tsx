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
import { addTask } from "../redux/tasksSlice"
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

const TaskForm: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<Task>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Low",
      state: "todo",
    },
  })
  const dispatch = useAppDispatch()

  const onSubmit = (data: Task) => {
    dispatch(addTask({ ...data, id: Date.now().toString() }))
    reset()
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
            <Select {...field} label="Priority">
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
        <Button type="submit">Create Task</Button>
      </form>
    </div>
  )
}

export default TaskForm
