import "./App.css"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Management App</h1>
      <TaskList />
      <TaskForm />
    </div>
  )
}

export default App
