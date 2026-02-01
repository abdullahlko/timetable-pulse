import React, { useState } from 'react'
import logo from '../assets/logo.png'
import AddIcon from '@mui/icons-material/Add'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import SettingsIcon from '@mui/icons-material/Settings'

const Header = () => {
  const [hasTimetable, setHasTimetable] = useState(false)

  const handleAddTimetable = () => {
    setHasTimetable(!hasTimetable)
  }

  return (
    <header className="bg-blue-500 flex justify-between items-center py-4 px-5 shadow-lg">

      {/* Left side: Logo + App Name */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-16 h-16" />
        <span className="text-4xl font-bold text-white">WhatsNext</span>
      </div>

      {/* Right side: Add/Edit Timetable + Settings */}
      <div className="flex items-center space-x-4">

        {/* Add/Edit button */}
        <button
          onClick={handleAddTimetable}
          className="flex items-center px-3 py-1 bg-white text-blue-500 rounded hover:bg-gray-100 transition"
        >
          {hasTimetable ? (
            <EditCalendarIcon sx={{ fontSize: 40 }} className="mr-1" />
          ) : (
            <AddIcon sx={{ fontSize: 40 }} className="mr-1" />
          )}
          {hasTimetable ? "View Timetable" : "Add Timetable"}
        </button>

        {/* Settings button */}
        <button
          disabled={!hasTimetable}
          className={`text-white hover:text-gray-200 transition ${!hasTimetable ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          <SettingsIcon sx={{ fontSize: 45 }} />
        </button>

      </div>
    </header>
  )
}

export default Header
