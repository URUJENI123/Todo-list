"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import "../styles/navbar.css"

function Navbar({ onAddTask, onDurationChange }) {
  const [taskName, setTaskName] = useState("")
  const [duration, setDuration] = useState("daily")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskName.trim()) {
      onAddTask(taskName.trim(), duration)
      setTaskName("")
    }
  }

  const handleDurationChange = (e) => {
    const newDuration = e.target.value
    setDuration(newDuration)
    onDurationChange(newDuration)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">
          Make a <div className="name">better</div> plan
          <br />
          for your life
        </h1>
        <p className="navbar-subtitle">
          Whoever you are, Whatever you are looking for, we have the perfect place for you
        </p>

        <form className="navbar-form" onSubmit={handleSubmit}>
          <select className="duration-select" value={duration} onChange={handleDurationChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>


          <input
            type="text"
            className="task-input"
            placeholder="Task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <button type="submit" className="add-button" disabled={!taskName.trim()}>
            <Plus size={16} />
            Add task
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
