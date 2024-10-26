import "./App.css"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

function App() {
  return (
    <div className="p-6 w-screen m-auto	space-y-8 text-center min-h-screen flex flex-col justify-between md:justify-around">
      {/* <h1 className="text-2xl font-bold mb-4">Task Management App</h1> */}
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default App
