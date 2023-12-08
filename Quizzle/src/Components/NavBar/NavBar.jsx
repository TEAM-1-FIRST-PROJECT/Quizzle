import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import { BellIcon } from "@heroicons/react/outline";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { user, userData } = useContext(AuthContext);
  const notificationRef = useRef();

  let notifications = false;
  if (userData?.assignedQuizzes) {
    notifications = true;
  }

  const handleNotification = () => {
    if (!isClicked) {
      setShowNotification(!showNotification);
      setIsClicked(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="top-0 bg-gradient-to-b from-violet-400 dark:bg-gradient-to-b dark:from-zinc-500">
      <div className="mx-auto px-1 sm:px-2 lg:px-8 ">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="flex w-16 h-16 mr-20 mix-blend-multiply "
                src={Logo}
                alt="logo"
              />
            </Link>
            <div className="hidden md:block">
              <div className="flex lg:block m-2 ml-20 space-x-6 text-lg font-medium font-montserrat">
                <Link
                  to="/home"
                  className="hover:bg-gradient-to-b hover:from-indigo-400 text-zinc-700 px-3 py-2 rounded-md dark:text-zinc-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/categories"
                  className="hover:bg-gradient-to-b hover:from-indigo-400 text-zinc-700 px-3 py-2 rounded-md dark:text-zinc-100"
                >
                  Categories
                </Link>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="mr-10 sm:hidden lg:flex md:flex">
              <SearchBar />
            </div>

            {!user && (
              <Link
                to="/login"
                className="text-zinc-700 hover:bg-gradient-to-b hover:from-indigo-400 px-3 py-2 rounded-md dark:text-zinc-100"
              >
                Login
              </Link>
            )}
            {!user && (
              <Link
                to="/register"
                className="text-zinc-700 hover:bg-gradient-to-b hover:from-indigo-400 px-3 py-2 rounded-md dark:text-zinc-100"
              >
                Register
              </Link>
            )}
          </div>
            <div className="flex">
            {notifications ? (
              <button onClick={handleNotification} className="p-1 relative">
                <BellIcon
                  className={
                    isClicked
                      ? "h-9 w-9 text-gray-500"
                      : "h-9 w-9 text-blue-500"
                  }
                />
                {notifications && !isClicked ? (
                  <span className="absolute top-0 mt-2 inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                ) : null}
                {showNotification && (
                  <div
                    ref={notificationRef}
                    className="absolute top-0 mt-10 w-64 p-2 bg-white rounded shadow right-0"
                  >
                    <p>You have a new assignment! Please check your profile.</p>
                    <Link className="hover:text-yellow-300" to="/profile">
                      View
                    </Link>
                  </div>
                )}
              </button>
            ) : (
              <button onClick={handleNotification} className="p-1 ">
                <BellIcon className="h-9 w-9 text-gray-500 dark:text-zinc-100" />
              </button>
            )}
            <img
              className="ml-4 rounded-full bg-black w-10 h-10"
              src={userData?.profileImgUrl || Logo}
              alt={Logo}
              />
              </div>
          <div className="ml-10">
            <ThemeSwitcher />
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
              to="/home"
              className="text-zinc-700 hover:bg-gradient-to-b hover:from-indigo-400 block px-3 py-2 rounded-md text-base font-medium font-montserrat dark:text-zinc-100"
            >
              Dashboard
            </Link>
            <Link
              to="/categories"
              className="text-zinc-700 hover:bg-gradient-to-b hover:from-indigo-400 block px-3 py-2 rounded-md text-base font-medium font-montserrat dark:text-zinc-100"
            >
              Categories
            </Link>
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
