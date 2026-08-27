import { Bell, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-200 z-50 shadow-sm">
      <div className="flex flex-row justify-between items-center px-4 py-4 md:px-8">
        <div className="cursor-pointer hover:opacity-80 transition-opacity">
          <Menu size={24} onClick={() => setMenuOpen(!isMenuOpen)} />
        </div>

        <div>
            <h1 className="text-xl md:text-3xl font-sans font-bold italic text-gray-800">
              Adaptive Learning System
            </h1>
        </div>

        <div className="flex flex-row gap-5 items-center">
          <Link
            to="/profile"
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="Profile"
          >
            <User size={28} />
          </Link>
          <Link
            to="/notification"
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="Notifications"
          >
            <Bell size={28} />
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div>
          <Link to={"/"}>Home</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
