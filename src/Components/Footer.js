import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-10">
      <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo & app name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-lg md:text-xl">TimetablePulse</span>
        </div>

        {/* copyright note*/}
        <div className="text-xs md:text-sm text-white/80 text-center">
          © {new Date().getFullYear()} TimetablePulse. All rights reserved.
        </div>

        {/* LinkedIn / About Developer */}
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <LinkedInIcon className="hover:text-white transition duration-200" fontSize="small" />
          <a
            href="https://www.linkedin.com/in/abdullahlko"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base underline hover:text-white transition duration-200"
          >
            About the Developer
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;