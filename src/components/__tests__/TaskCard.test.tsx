// src/components/TaskCard.test.tsx
import { render, screen } from "@testing-library/react"
import TaskCard from "../TaskCard"
import { Task } from "../../types/taskTypes"

describe("TaskCard Component", () => {
  const sampleTask: Task = {
    id: "1",
    title: "Test Task",
    description: "This is a test task",
    priority: "High",
    state: "todo",
    image: "test-image-url.jpg",
  }

  it("renders task details correctly", () => {
    render(<TaskCard task={sampleTask} />)

    // Check if the title, description, priority, and state are displayed
    expect(screen.getByText("Test Task")).toBeInTheDocument()
    expect(screen.getByText("This is a test task")).toBeInTheDocument()
    expect(screen.getByText("Priority: High")).toBeInTheDocument()
    expect(screen.getByText("Status: todo")).toBeInTheDocument()
  })

  it("renders the task image if provided", () => {
    render(<TaskCard task={sampleTask} />)

    // Check if the image is displayed
    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("src", "test-image-url.jpg")
    expect(image).toHaveAttribute("alt", "Test Task")
  })

  it("does not render an image if task.image is not provided", () => {
    const taskWithoutImage = { ...sampleTask, image: undefined }
    render(<TaskCard task={taskWithoutImage} />)

    // Verify no image is rendered
    expect(screen.queryByRole("img")).toBeNull()
  })
})
