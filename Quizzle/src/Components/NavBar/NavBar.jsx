import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-violet-400 to-indigo-400">
      <div className=" mx-auto px-1 sm:px-2 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              className="flex rounded border transform skew-y-12 shadow-md shadow-slate-700 w-10 h-10 ml-1 mr-20"
              src={Logo}
              alt="logo"
            />
            <div className="hidden md:block">
              <div className="flex lg:block m-2 items-baseline space-x-4">
                <Link
                  to="#"
                  className="text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
                >
                  Dashboard
                </Link>
                <Link
                  to="#"
                  className="text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
                >
                  Team
                </Link>
                <Link
                  to="#"
                  className="text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
                >
                  Projects
                </Link>
                <Link
                  to="#"
                  className="text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
                >
                  Calendar
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center ">
                      <input
                            type="text"
                          className="rounded p-1.5 placeholder-white focus:outline-none hover:shadow-inner hover:shadow-indigo-500 bg-gradient-to-br from-white to-indigo-500"
                          placeholder="Search..."
            />
          </div>
          <div className="flex items-center justify-between w-full md:w-auto">
            <img
              className="h-8 w-8 hover:shadow-lg rounded-full"
              src=""
              alt="User avatar"
            />

            <div className="mr-1 ml-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="#"
                className="text-gray-300 hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium font-montserrat"
              >
                Dashboard
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium font-montserrat"
              >
                Team
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium font-montserrat"
              >
                Projects
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium font-montserrat"
              >
                Calendar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
