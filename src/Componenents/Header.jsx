import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoTvOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { FaFireAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";

const Header = () => {
  const [toggle, settoggle] = useState(false);
  const [Menu, setMenu] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div
        onClick={() => {
          settoggle(false);
        }}
        style={{
          opacity: toggle ? 1 : 0,
          visibility: toggle ? "visible" : "hidden",
        }}
        className="w-full h-full fixed black-overlay z-99999 "
      >
        {/* SideMenu */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ right: toggle ? "0" : "-100%" }}
          className="bg-black text-gray-200 ease-in-out duration-500 mt-7 absolute w-[300px] h-[40%]"
        >
          <div className="list-none">
            <li
              onClick={() => {
                navigate("/"), settoggle(false);
              }}
              className="p-3 m-2 w-full cursor-pointer font-semibold text-center hover:border-1 hover:border-gray-300"
            >
              Trending
            </li>
            <li
              onClick={() => {
                navigate("/movies"), settoggle(false);
              }}
              className="p-3 m-2 w-full cursor-pointer font-semibold text-center hover:border-1 hover:border-gray-300"
            >
              Movies
            </li>
            <li
              onClick={() => {
                navigate("/tvseries"), settoggle(false);
              }}
              className="p-3 m-2 w-full cursor-pointer font-semibold text-center hover:border-1 hover:border-gray-300"
            >
              Tv Series
            </li>
            <li
              onClick={() => {
                navigate("/search"), settoggle(false);
              }}
              className="p-3 m-2 w-full cursor-pointer font-semibold text-center hover:border-1 hover:border-gray-300"
            >
              Search
            </li>
          </div>
        </div>
      </div>
      <div className="w-full fixed lg:text-xl  flex bg-black pb-6 z-100 text-gray-200">
        <nav className="flex w-full py-3 justify-between px-5 mx-auto">
          <p
            onClick={() => window.scroll(0, 0)}
            className="cursor-pointer text-2xl"
          >
            <RiMovie2Line className="w-8 h-8 " />
          </p>
          <div>
            <button
              onClick={() => {
                settoggle(true);
              }}
              id="menuBtn"
              className="md:hidden p-2 font-bold duration-200 text-lg hover:scale-105 ease-in-out cursor-pointer rounded"
            >
              ☰ Menu
            </button>
          </div>
          <div className="list-none gap-6 pr-10 hidden md:flex">
            <li
              onClick={() => navigate("/")}
              className={`gap-5 transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer ${
                location.pathname === "/" ? "text-amber-500" : ""
              }`}
            >
              <FaFireAlt className="inline h-5 mx-1 w-5" />
              Trending
            </li>
            <li
              onClick={() => navigate("/movies")}
              className={`transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer ${
                location.pathname === "/movies" ? "text-amber-500" : ""
              }`}
            >
              <BiMoviePlay className="inline h-5 mx-1 w-5" />
              Movies
            </li>
            <li
              onClick={() => navigate("/tvseries")}
              className={`transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer ${
                location.pathname === "/tvseries" ? "text-amber-500" : ""
              }`}
            >
              <IoTvOutline className="inline mx-1 h-6 w-6" />
              TV Series
            </li>
            <li
              onClick={() => navigate("/search")}
              className={`transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer ${
                location.pathname === "/search" ? "text-amber-500" : ""
              }`}
            >
              <IoIosSearch className="inline mx-1 h-6 w-6" />
              Search
            </li>
          </div>
        </nav>
      </div>
      )
    </>
  );
};

export default Header;
