
import { Bell, Menu, User, X, Home, BookOpen, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-200 z-50 shadow-sm">

      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-4 md:px-8">

        {/* Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-300 transition"
          aria-label="Open menu"
        >
          {isMenuOpen ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>

        {/* Title */}
        <div className="flex-1 text-center px-2">
          <h1 className="text-base sm:text-xl md:text-3xl font-sans font-bold italic text-gray-800 truncate">
            Adaptive Learning System
          </h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Profile */}
          <Link
            to="/profile"
            onClick={closeMenu}
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="Profile"
          >
            <User size={26} />
          </Link>

          {/* Notifications */}
          <Link
            to="/notification"
            onClick={closeMenu}
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="Notifications"
          >
            <Bell size={26} />
          </Link>

        </div>
      </div>

      {/* Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-300">

          <div className="flex flex-col py-2">

            {/* Home */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:bg-gray-100 transition"
            >
              <Home size={22} />
              <span>Home</span>
            </Link>

            {/* Courses */}
            <Link
              to="/courses"
              onClick={closeMenu}
              className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:bg-gray-100 transition"
            >
              <BookOpen size={22} />
              <span>Courses</span>
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:bg-gray-100 transition"
            >
              <User size={22} />
              <span>Profile</span>
            </Link>

            {/* Settings */}
            <Link
              to="/settings"
              onClick={closeMenu}
              className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:bg-gray-100 transition"
            >
              <Settings size={22} />
              <span>Settings</span>
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;

