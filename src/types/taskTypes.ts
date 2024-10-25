export interface Task {
  id: string
  title: string
  description: string
  priority: "Low" | "Medium" | "High"
  state: "todo" | "doing" | "done"
  image?: string
}
