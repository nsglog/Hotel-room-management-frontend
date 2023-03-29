import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center justify-center">
        <p className="text-gray-400 font-bold">
          <Link to="/">Hotel Room Manager</Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
