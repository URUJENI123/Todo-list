"use client"

import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { Plus, Calendar, Clock, BarChart3, CalendarDays } from "lucide-react"
import "../styles/navbar.css"

function Layout({ onAddTask }) {
  const [taskName, setTaskName] = useState("")
  const [duration, setDuration] = useState("daily")
  const navigate = useNavigate()
  const location = useLocation()

  // Get current route to determine active filter
  const currentPath = location.pathname.replace("/", "") || "daily"

  // Navigate to the selected duration route when it changes
  useEffect(() => {
    navigate(`/${duration}`)
  }, [duration, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskName.trim()) {
      onAddTask(taskName.trim(), duration)
      setTaskName("")
    }
  }

  const handleFilterClick = (filterType) => {
    setDuration(filterType)
    navigate(`/${filterType}`)
  }

  const getFilterIcon = (filterType) => {
    switch (filterType) {
      case "daily":
        return <Clock className="w-4 h-4" />
      case "weekly":
        return <Calendar className="w-4 h-4" />
      case "monthly":
        return <BarChart3 className="w-4 h-4" />
      case "yearly":
        return <CalendarDays className="w-4 h-4" />
      default:
        return <Plus className="w-4 h-4" />
    }
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-title">
            Make a better plan
            <br />
            for your life
          </h1>
          <p className="navbar-subtitle">
            Whoever you are, Whatever you are looking for, we have the perfect place for you
          </p>

          <form className="navbar-form" onSubmit={handleSubmit}>
            <select className="duration-select" value={duration} onChange={(e) => setDuration(e.target.value)}>
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

      {/* Filter Buttons */}
      <div className="filter-section">
        <div className="filter-container">
          {["All","daily", "weekly", "monthly", "yearly"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => handleFilterClick(filterType)}
              className={`filter-button ${currentPath === filterType ? "active" : ""}`}
            >
              {getFilterIcon(filterType)}
              {filterType === "yearly" ? "Year" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content area - will render the current route */}
      <Outlet />
    </div>
  )
}

export default Layout
