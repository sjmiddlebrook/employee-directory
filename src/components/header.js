import { Link } from "gatsby";
import React from "react";
import additiv from "../images/additiv.png"

function Header() {

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
        <Link to="/">
          <div>
            <img className="h-8 w-auto" alt="additiv" src={additiv} />
          </div>
        </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
