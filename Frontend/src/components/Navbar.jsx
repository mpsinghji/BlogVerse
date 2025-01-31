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
    <header className="bg-white py-6">
      <nav className="container mx-auto flex justify-between px-5">
        <a href="/">
          <img src="https://i.postimg.cc/ncsCpN7D/logo.png" alt="Logo" className="h-12" />
        </a>
        <ul className="sm:flex hidden items-center gap-8">
          {navLists.map((list, index) => (
            <li key={index}>
              <NavLink
                to={list.link}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {list.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/login" className="btn btn-primary">
              login
            </NavLink>
          </li>
        </ul>

        {/* toggle Menu */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <IoClose className="size-6" />
            ) : (
              <IoMenuSharp className="size-6" />
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      {isMenuOpen && (
        <ul className="fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50">
          {navLists.map((list, index) => (
            <li className="mt-5 px-4" key={index}>
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to={list.link}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {list.name}
              </NavLink>
            </li>
          ))}
          <li className="mt-5 px-4">
            <NavLink to="/login" className="btn btn-primary">
              login
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
