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
import { editTask } from "../redux/tasksSlice"
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

interface EditTaskFormProps {
  task: Task
  setEditedTask: (id: string) => void
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, setEditedTask }) => {
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
  const [image, setImage] = useState<string | null>(task.image || null)

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
    dispatch(editTask({ id: task.id, updatedTask: { ...data, image } }))
    setEditedTask("")
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} label="Title" />}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Textarea {...field} label="Description" />}
        />
        <div className="flex space-x-4 justify-between md:justify-around">
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
        </div>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        <Button type="submit">Save Changes</Button>
      </form>
    </Card>
  )
}

export default EditTaskForm
