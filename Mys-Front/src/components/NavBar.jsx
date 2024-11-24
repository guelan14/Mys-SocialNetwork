import React, { useEffect, useRef } from "react";
import { useState } from "react";
import userService from "../services/user";
import ProfileBar from "./ProfileBar";

const NavBar = (props) => {
  const userProfile = props.user;
  const expandedRef = useRef(null);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const fetchData = async () => {
    const users = await userService.searchList();
    setUsers(users);
  };

  const handleSearchChange = async (event) => {
    setSearch(event.target.value);
  };

  let results = [];

  if (!search) {
    results = [];
  } else {
    results = users.filter((data) => {
      // Retornar el resultado de includes para determinar si se debe incluir el usuario
      return data.fullname.toLowerCase().includes(search.toLocaleLowerCase());
    });
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expanded && !expandedRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [expanded]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <nav className="relative bg-gray-200 flex items-center justify-between sm:h-10 md:justify-center py-8 ">
        <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/" aria-label="Home" className="font-extrabold mx-4">
              MYS
            </a>
            <input
              type="text"
              placeholder="Encuentra Amigos"
              value={search}
              onChange={handleSearchChange}
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="absolute bottom-0 translate-y-[100%] bg-slate-400 flex flex-col justify-center items-center">
              {results.map((user) => (
                <a
                  key={user._id}
                  href={`http://localhost:5173/profile/${user._id}`}
                  className="w-full mb-4"
                >
                  <ProfileBar user={user} className="" />
                </a>
              ))}
            </div>

            <div className="-mr-2 bg-white flex items-center md:hidden">
              <button
                type="button"
                id="main-menu"
                aria-label="Main menu"
                aria-haspopup="true"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:space-x-10">
          <a
            href="/"
            className="font-medium text-gray-500 hover:text-gray-900 hover:-translate-y-0.5 transition duration-150 ease-in-out"
          >
            HOME
          </a>
        </div>
        <div className="relative hidden pr-4 md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
          <p className="pr-2">{userProfile.name}</p>
          <button
            ref={expandedRef}
            onClick={() => {
              toggleExpanded();
            }}
            href={`/profile/${userProfile._id}`}
          >
            <img
              src={userProfile.image}
              alt=""
              className="relative inline-block h-[42px] w-[42px] !rounded-full  object-cover object-center"
            />
          </button>
          <div
            className={
              expanded
                ? "absolute bottom-0 right-0 translate-y-[100%] "
                : "hidden"
            }
          >
            <div className=" flex flex-col text-end bg-gray-100 ">
              <a
                href={`/profile/${userProfile._id}`}
                className="font-medium p-3 hover:bg-gray-400"
              >
                Profile
              </a>
              <a
                onClick={() =>
                  (window.location.href = "http://localhost:3900/logout")
                }
                className=" font-medium p-3 hover:bg-gray-400"
              >
                LogOut
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
