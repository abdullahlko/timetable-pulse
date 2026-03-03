import React from "react";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import logo from "../assets/logo.png";

const Header = ({ showViewTimetableButton = false }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-blue-500 shadow-md">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo + App Name */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 transition-transform duration-300 hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              TimetablePulse
            </span>
            <span className="text-xs sm:text-sm text-white/70 leading-tight">
              Always know what's next.
            </span>
          </div>
        </div>

        {/* "Open Timetable" button is shown only if the prop is true */}
        {showViewTimetableButton && (
          <button
            onClick={() => navigate("/timetable")}
            className="flex items-center gap-2 h-11 bg-white text-blue-500 rounded-full px-5 hover:bg-blue-50 transition duration-200 hover:scale-105 flex-shrink-0 shadow-md"
            title="Open Weekly Timetable"
            aria-label="Open Weekly Timetable"
          >
            <CalendarMonthIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
            <span className="text-sm font-semibold">View</span>
          </button>
        )}

      </div>
    </header>
  );
};

export default Header;