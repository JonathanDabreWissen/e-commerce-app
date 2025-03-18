import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaBagShopping } from "react-icons/fa6";


const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Cart", path: "/cart" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-[#e8eaec] text-[#303649] ">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Brand Name */}
        <Link to="/" className="text-2xl flex space-x-3 font-bold ">
            <div className="text-[#dd4b28] pt-1"><FaBagShopping /></div>
            <div>
                Flipazon
            </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                location.pathname === link.path ? "bg-white text-[#dd4b28]" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 border-b border-blue-500 text-center hover:bg-blue-500"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
