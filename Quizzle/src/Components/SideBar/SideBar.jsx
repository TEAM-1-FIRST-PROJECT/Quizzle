import { Link } from "react-router-dom";
import logout from "../../assets/logout.gif";
import enter from "../../assets/enter.png"
import profile from "../../assets/profile.gif";
import settings from "../../assets/settings.gif";
import { logoutUser } from "../../services/auth.services";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Sidebar = () => {

  const { user, setUser } = useContext(AuthContext);

  const onLogout = () => {
    logoutUser().then(() => {
      setUser({
        user: null,
      });
    });
  };

  return (
      <div className="absolute" >
      <div className="border-r-2 border-spacing-x-2.5 w-[3.35rem] bg overflow-hidden hover:w-56 hover:bg-white bg-gradient-to-br from-violet-400 to-indigo-400 overflow-y-auto transition-all duration-1000 ease-in-out">
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <div className="w-max p-2.5">
              <img src="" className="w-32" alt="" />
            </div>
            <ul className="mt-6 space-y-2 tracking-wide">
              <li className="min-w-max">
                <Link
                  to="#"
                  aria-label="dashboard"
                  className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                >
                  <svg
                    className="-ml-1 h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                      className="fill-current"
                    ></path>
                    <path
                      d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                      className="fill-current"
                    ></path>
                    <path
                      d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                      className="fill-current"
                    ></path>
                  </svg>
                  <span className="-mr-1 font-medium font-montserrat">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li className="min-w-max">
                <Link
                  to="#"
                  className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current"
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                      clipRule="evenodd"
                    />
                    <path
                      className="fill-current"
                      d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Categories</span>
                </Link>
              </li>
              <li className="min-w-max">
                <Link
                  to="#"
                  className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current"
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clipRule="evenodd"
                    />
                    <path
                      className="fill-current"
                      d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Reports</span>
                </Link>
              </li>
              <li className="min-w-max">
                <Link
                  to="#"
                  className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current"
                      d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                    />
                    <path
                      className="fill-current"
                      d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Other data</span>
                </Link>
              </li>
              <li className="min-w-max">
                <Link
                  to="#"
                  className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current"
                      d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
                    />
                    <path
                      className="fill-current"
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Finance</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-5">
            <Link
              to="/profile"
              className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
            >
              <img className="h-7 w-7 mix-blend-multiply" src={profile} alt="profile" />
              <span className="">Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
            >
              <img className="h-7 w-7 mix-blend-multiply" src={settings} alt="settings" />
              <span className="">Settings</span>
            </Link>
            {!user && <Link
              to="/logIn"
              className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
            >
              <img className="h-7 w-7 mix-blend-multiply" src={enter} alt="logIn" />
              <span className="">LogIn</span>
            </Link>}
            {!user && <Link
              to="/register"
              className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
            >
              <span className="">Register</span>
            </Link>}
            {user && <Link
              to="/"
              onClick={onLogout}
              className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
            >
              <img className="h-7 w-7 mix-blend-multiply" src={logout} alt="logout" />
              <span className="">Logout</span>
            </Link>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
