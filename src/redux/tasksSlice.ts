/**
 * Provides a Redux slice for managing tasks in the application.
 *
 * The `tasksSlice` manages the state of tasks, including adding, editing, deleting, and updating the state of tasks.
 *
 * The slice exposes the following actions:
 * - `addTask`: Adds a new task to the state.
 * - `editTask`: Updates an existing task in the state.
 * - `deleteTask`: Removes a task from the state.
 * - `updateTaskState`: Updates the state of an existing task in the state.
 *
 * The slice also exports the reducer function as the default export.
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Task } from "../types/taskTypes"

interface TasksState {
  tasks: Task[]
}

const initialState: TasksState = {
  tasks: [],
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    editTask: (
      state,
      action: PayloadAction<{ id: string; updatedTask: Partial<Task> }>
    ) => {
      const { id, updatedTask } = action.payload
      const index = state.tasks.findIndex(task => task.id === id)
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    updateTaskState: (
      state,
      action: PayloadAction<{ id: string; newState: Task["state"] }>
    ) => {
      const { id, newState } = action.payload
      const index = state.tasks.findIndex(task => task.id === id)
      if (index !== -1) {
        state.tasks[index].state = newState
      }
    },
  },
})

export const { addTask, editTask, deleteTask, updateTaskState } =
  tasksSlice.actions
export default tasksSlice.reducer
