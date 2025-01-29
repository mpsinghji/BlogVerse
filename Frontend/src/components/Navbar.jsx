import React from "react";
import { NavLink } from "react-router-dom";

const navLists = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Contact Us", link: "/contact-us" },
];

const Navbar = () => {
  return (
    <header className="bg-white py-6 border">
      <nav className="container mx-auto flex justify-between px-5">
        <a href="/">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </a>
        <ul className="sm:flex hidden items-center gap-8">
          {navLists.map((list, index) => (
            <li>
              <NavLink to={list.link} className={({ isActive}) => isActive ? "active" : ""}>

              {list.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
