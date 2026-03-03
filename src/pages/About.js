import React from "react";
import Header from "../Components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white">
      <Header showViewTimetableButton={false} />

      {/* Top bar with back button */}
      <div className="px-5 py-4 flex items-center relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600 py-2"
        >
          <ArrowBackIcon fontSize="medium" />
          <span className="text-lg">Back</span>
        </button>

        {/* Centered About heading for desktop */}
        <div className="hidden sm:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl font-semibold underline">About</h1>
        </div>
      </div>

      {/* About heading for mobile */}
      <div className="sm:hidden w-full bg-gray-100">
        <div className="max-w-screen-md mx-auto py-3 text-center">
          <h1 className="text-xl font-semibold underline">About</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto w-full px-6 py-10 space-y-6">

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-gray-800">What is TimetablePulse?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>TimetablePulse</strong> is a real-time class schedule tracker. It shows your current and upcoming class, lists all classes for the day and includes a live countdown so you always know what's next.
          </p>
        </section>

        <hr className="border-gray-200" />

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-gray-800">Who is it for?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            This version is designed for university students and faculty. Currently, the app supports only Integral University, Lucknow, following its timetable structure.
          </p>
        </section>

        <hr className="border-gray-200" />

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-gray-800">Future Plans</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            In the future, <strong>TimetablePulse</strong> will let users configure their own schedules, making the app adaptable to any university.
          </p>
        </section>

        <hr className="border-gray-200" />

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-gray-800">Built by</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Abdullah Ansari. Connect on{" "}
            <a
              href="https://www.linkedin.com/in/abdullahlko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;