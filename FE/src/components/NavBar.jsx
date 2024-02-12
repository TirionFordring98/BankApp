import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { playClickSound } from "../../sfx.js";

const NavBar = ({ budget }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    playClickSound();
  };

  return (
    <div className="text-white border border-gray-400 bg-[#b07c3b] rounded-b-xl relative h-[8%]">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <img
            className="h-8 w-auto"
            src="../public/favicon.ico"
            alt="Your Company"
          />
          <h1 className="text-lg font-bold text-cyan ml-2">
            <Link
              to="/"
              onClick={playClickSound}
              className="hover:underline text-gray-700"
            >
              BIG-MAN
            </Link>
          </h1>
        </div>
        <div className="flex items-center">
          <button className="contact-us-button  text-gray-700 ml-4 cursor-pointer font-bold focus:outline-none p-2">
            Contact Us
          </button>
          <button
            className="flex items-center text-gray-700 font-bold text-cyan cursor-pointer focus:outline-none transition duration-300 ease-in-out hover:text-cyan-light"
            onClick={handleNav}
          >
            <span className="mr-1">Open Menu</span>
            {nav ? (
              <AiOutlineMenuFold size={24} />
            ) : (
              <AiOutlineMenuUnfold size={24} />
            )}
          </button>
        </div>
      </div>
      <div
        className={`fixed left-0 top-[55px] w-[22%] h-full border-r border-gray-900 bg-black ${
          !nav ? "ease-in-out duration-700" : ""
        } ${nav ? "left-[-100%]" : ""}`}
      >
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600">
            <Link onClick={playClickSound} to="/">
              Home
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link onClick={playClickSound} to="/transactions">
              Transactions
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link onClick={playClickSound} to="/operations">
              Operations
            </Link>
          </li>
          <li className="p-4">
            <Link onClick={playClickSound} to="/breakdown">
              Breakdown
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center">
        <span className="border border-gray-400 rounded-md">
          <span className="text-gray-600 mr-2">Budget:</span>
          <span
            className={`font-bold ${
              budget >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            ${budget}
          </span>
        </span>
      </div>
      <div className="flex items-center mt-[-32px]"></div>
    </div>
  );
};

export default NavBar;
