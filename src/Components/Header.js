import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SettingsIcon from '@mui/icons-material/Settings'

const Header = ({ variant = 'home', hasTimetable = false }) => {
  const navigate = useNavigate()

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!openDropdown) return;

    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [openDropdown]);

  const timetableButtonIcon = hasTimetable
    ? <VisibilityIcon sx={{ fontSize: 32 }} />
    : <AddIcon sx={{ fontSize: 32 }} />

  const timetableButtonLabel = hasTimetable
    ? 'View Timetable'
    : 'Add Timetable'

  return (
    <header className="bg-blue-500 shadow-lg">
      <div className="flex items-center justify-between py-4 px-5">
        {/* LEFT: Logo + App Name */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-14 h-14" />
          <span className="text-3xl font-bold text-white leading-none">
            WhatsNext
          </span>
        </div>

        {/* RIGHT: Home-only actions */}
        {variant === 'home' && (
          <div className="flex items-center space-x-4">
            {/* Timetable Button */}
            <button
              onClick={() => navigate('/timetable')}
              className="flex items-center justify-center w-[230px] h-[46px] bg-white text-blue-500 rounded hover:bg-gray-100 transition"
            >
              {timetableButtonIcon}
              <span className="ml-3 font-medium">{timetableButtonLabel}</span>
            </button>

            <div className="relative" ref={dropdownRef}>
            {/* Settings Button */}
            <button
                onClick={() => setOpenDropdown((prev) => !prev)}
              disabled={!hasTimetable}
              className={`w-[48px] h-[48px] flex items-center justify-center text-white ${!hasTimetable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <SettingsIcon sx={{ fontSize: 32 }} />
            </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded shadow-lg border z-10">
                  <div className="p-4 text-black">Settings Content</div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
