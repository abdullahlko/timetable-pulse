import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* App name + copyright note */}
        <span className="text-xs text-white/60">
          © {new Date().getFullYear()} TimetablePulse. All rights reserved.
        </span>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">

          <a href="/about" className="text-white/80 hover:text-white hover:underline transition duration-200">
            About
          </a>

          <div className="h-4 w-px bg-white/50"></div>

          {/* Privacy Policy */}
          <a href="/privacy" className="text-white/80 hover:text-white hover:underline transition duration-200">
            Privacy Policy
          </a>

          <div className="h-4 w-px bg-white/50"></div>

          {/* Developer LinkedIn */}
          <a
            href="https://www.linkedin.com/in/abdullahlko"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/80 hover:text-white hover:underline transition duration-200"
          >
            <LinkedInIcon fontSize="small" />
            <span>Developer</span>
          </a>

        </div>

      </div>
    </footer>
  );
};

export default Footer;