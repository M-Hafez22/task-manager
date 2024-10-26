import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/task-manager/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // Mock DOM for component testing
    setupFiles: "./src/setupTests.ts", // Optional: setup file
  },
})
