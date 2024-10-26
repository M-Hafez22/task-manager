/**
 * The `TaskForm` component is a React functional component that renders a form for creating a new task. It uses the `react-hook-form` library for form management and validation, and the `yup` library for defining the validation schema.
 *
 * The form includes the following fields:
 * - Title (required)
 * - Description (required)
 * - Priority (required, with options: Low, Medium, High)
 * - State (required, with options: To Do, Doing, Done)
 * - Image (optional)
 *
 * When the form is submitted, the `onSubmit` function is called, which dispatches an `addTask` action to the Redux store, passing in the form data and a generated `id` value. The form is then reset, and the `image` state is set to `null`.
 *
 * The component also includes a `handleImageChange` function that converts the selected image file to a base64-encoded string and updates the `image` state accordingly.
 */
import React, { useState } from "react"
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
import { Textarea } from "./ui/textarea"
import { Card } from "./ui/card"

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
  image: yup.mixed().notRequired(), // Optional image
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
  const [image, setImage] = useState<string | null>(null)

  // Convert image file to base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data: Task) => {
    dispatch(addTask({ ...data, id: Date.now().toString(), image }))
    reset()
    setImage(null)
  }

  return (
    <Card className="p-4 m-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
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
            <Textarea
              {...field}
              label="Description"
              placeholder="Task Description"
            />
          )}
        />
        <div className="flex justify-between md:justify-around">
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={value => field.onChange(value)}
              >
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
              <Select
                value={field.value}
                onValueChange={value => field.onChange(value)}
              >
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
        </div>
        {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        <Button type="submit">Create Task</Button>
      </form>
    </Card>
  )
}

export default TaskForm
