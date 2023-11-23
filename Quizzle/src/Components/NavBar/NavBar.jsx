import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import SearchBar from '../../components/SearchBar/SearchBar';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userData } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-violet-400 to-indigo-400">
      <div className="mx-auto px-1 sm:px-2 lg:px-8 border-b-2">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <img
              className="flex rounded border transform skew-y-12 shadow-md shadow-slate-700 w-10 h-10 ml-1 mr-20"
              src={Logo}
              alt="logo"
            />
            <div className="hidden md:block">
              <div className="flex lg:block m-2 items-baseline space-x-4 text-lg font-medium font-montserrat   ">
                <Link
                  to="/home"
                  className="hover:bg-gradient-to-br hover:from-violet-500 hover:to-fuchsia-400 text-white px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to="#"
                  className="hover:bg-gradient-to-br hover:from-violet-500 hover:to-fuchsia-400 text-white px-3 py-2 rounded-md"
                >
                  Team
                </Link>
                <Link
                  to="#"
                  className=" hover:bg-gradient-to-br hover:from-violet-500 hover:to-fuchsia-400 text-white px-3 py-2 rounded-md"
                >
                  Projects
                </Link>
                <Link
                  to="#"
                  className=" hover:bg-gradient-to-br hover:from-violet-500 hover:to-fuchsia-400 text-white px-3 py-2 rounded-md"
                >
                  Calendar
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
          <SearchBar />
            {!user && <Link
              to="/login"
              className=" hover:bg-gradient-to-br hover:from-violet-500 hover:to-fuchsia-400 text-white px-3 py-2 rounded-md"
            >
              Login
            </Link>}
            {!user && <Link
              to="/register"
              className=" hover:bg-gradient-to-br hover:from-violet-500 hover:to-fuchsia-400 text-white px-3 py-2 rounded-md"
            >
              Register
            </Link>}
            <img
              className="ml-4 rounded-full bg-black w-10 h-10"
              src={userData?.profileImgUrl || Logo}
              alt={Logo}
            />
          </div>

          <div className="mr-1 ml-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                className={`${isOpen ? "block" : "hidden"} h-6 w-6 `}
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
              className="text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400  block px-3 py-2 rounded-md text-base font-medium font-montserrat"
            >
              Dashboard
            </Link>
            <Link
              to="#"
              className="text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400  block px-3 py-2 rounded-md text-base font-medium font-montserrat"
            >
              Team
            </Link>
            <Link
              to="#"
              className="text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 block px-3 py-2 rounded-md text-base font-medium font-montserrat"
            >
              Projects
            </Link>
            <Link
              to="#"
              className="text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 block px-3 py-2 rounded-md text-base font-medium font-montserrat"
            >
              Calendar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
