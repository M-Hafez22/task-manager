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
