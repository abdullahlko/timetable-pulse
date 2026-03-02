import React from "react";
import Header from "../Components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white">
      <Header showViewTimetableButton={false} />

      {/* Top bar with back button */}
      <div className="px-5 py-4 flex items-center relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[#3B82F6] hover:text-[#326dcc] py-2"
        >
          <ArrowBackIcon fontSize="medium" />
          <span className="text-lg">Back</span>
        </button>

        {/* Centered Privacy Policy heading */}
        <div className="hidden sm:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl font-semibold underline">Privacy Policy</h1>
        </div>
      </div>

      {/* Privacy Policy heading for smaller screens */}
      <div className="sm:hidden w-full bg-gray-100 border-gray-300">
        <div className="max-w-screen-md mx-auto py-3 text-center">
          <h1 className="text-xl font-semibold underline">Privacy Policy</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto w-full px-6 py-10 space-y-6">
        {/* Information about data collection */}
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-gray-800">Data Collection</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            TimetablePulse does not collect or share any personal information. Your use of the app is completely anonymous.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* Information about analytics */}
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-gray-800">Analytics</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            We use Firebase Analytics to track anonymous app usage. This helps us understand how the app is used and improve features. No personal details like names, emails, or phone numbers are collected or shared.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;