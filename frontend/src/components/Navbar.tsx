import { Bell, Menu, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="flex flex-row justify-between items-center">
        <div>
          <button>
            <Menu />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-sanserif">Adaptive Learning System</h2>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Link to={"/profile"}>
            <User />
          </Link>
          <Link to={"/notification"}>
            <Bell />
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
