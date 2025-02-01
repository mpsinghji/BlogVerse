import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenuSharp, IoClose } from "react-icons/io5";

const navLists = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Contact Us", link: "/contact-us" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-b from-slate-900/80 to-slate-800/20 backdrop-blur-xl border-b border-slate-700/30 fixed w-full z-50">
      <nav className="container mx-auto flex justify-between items-center px-5 py-4">
        {/* Logo */}
        <NavLink to="/" className="group">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              BlogVerse
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          {navLists.map((list, index) => (
            <li key={index}>
              <NavLink
                to={list.link}
                className={({ isActive }) => 
                  `relative px-4 py-2 text-slate-300 hover:text-white transition-all
                  duration-300 text-sm font-medium before:absolute before:-bottom-1 
                  before:h-0.5 before:bg-gradient-to-r before:from-purple-500 before:to-cyan-400 
                  before:transition-all before:duration-300 before:w-0 hover:before:w-full
                  ${isActive ? "before:w-full text-white" : ""}`
                }
              >
                {list.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink 
              to="/login" 
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full
              text-white font-semibold text-sm hover:from-purple-500 hover:to-cyan-400 
              transition-all duration-300 shadow-lg hover:shadow-purple-500/30 flex items-center space-x-2"
            >
              <span>Login</span>
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-lg bg-slate-800/40 backdrop-blur-sm border
          border-slate-700/30 hover:border-purple-500/50 transition-all duration-300"
        >
          {isMenuOpen ? (
            <IoClose className="w-6 h-6 text-purple-400" />
          ) : (
            <IoMenuSharp className="w-6 h-6 text-slate-300" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-slate-900/95
          backdrop-blur-2xl transition-all duration-300">
            <ul className="container mx-auto px-5 py-8 space-y-6">
              {navLists.map((list, index) => (
                <li key={index}>
                  <NavLink
                    onClick={toggleMenu}
                    to={list.link}
                    className={({ isActive }) => 
                      `block text-xl text-slate-300 hover:text-white px-4 py-3 rounded-xl
                      transition-all duration-300 ${isActive ? "bg-slate-800/50 text-white" : ""}`
                    }
                  >
                    {list.name}
                  </NavLink>
                </li>
              ))}
              <li className="mt-8">
                <NavLink
                  to="/login"
                  onClick={toggleMenu}
                  className="block w-full px-6 py-3.5 text-center bg-gradient-to-r
                  from-purple-600 to-cyan-500 rounded-full text-white font-semibold text-lg
                  hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Login</span>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;