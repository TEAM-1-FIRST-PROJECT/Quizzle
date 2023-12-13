import { Link } from "react-router-dom";
import logout from "../../assets/logout.gif";
import profile from "../../assets/profile.gif";
import settings from "../../assets/settings.gif";
import ManageQuiz from "../../assets/quiz-management.gif";
import { logoutUser } from "../../services/auth.services";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ROLE_CHECK } from "../../common/constants";
import { MdDashboard } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { TiGroup } from "react-icons/ti";
import { IoCreate } from "react-icons/io5";
import { PiUserListBold } from "react-icons/pi";
import { RiListSettingsFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { RiHomeHeartLine } from "react-icons/ri";

const Sidebar = () => {
  const { user, setUser, userData } = useContext(AuthContext);

  const onLogout = () => {
    logoutUser().then(() => {
      setUser({
        user: null,
      });
    });
  };

  return (
    <>
      {user && (
        <div className="abosulute lg:w-[270px] w-[67px]">
          <div className=" bg-gradient-to-t from-violet-400 overflow-y-auto transition-all duration-1000 ease-in-out dark:bg-gradient-to-t dark:from-zinc-500">
            <div className="flex flex-1 h-screen flex-col justify-between pt-2 pb-6">
                <ul className="mt-6 space-y-1 tracking-wide">
                  {userData && userData.role === ROLE_CHECK.admin && (
                    <li className="min-w-max">
                      <Link
                        to="/admin"
                        aria-label="admin dashboard"
                        className="flex items-center font-bold space-x-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
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
                          Admin Dashboard
                        </span>
                      </Link>
                    </li>
                  )}

                  {userData && userData.role === ROLE_CHECK.student && (
                    <>
                      <li className="min-w-max">
                        <Link
                          to="/home"
                          className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                        >
                          <RiHomeHeartLine />
                          <span className="-mr-1 font-bold font-montserrat">
                            Dashboard
                          </span>
                        </Link>
                      </li>
                      <li className="min-w-max">
                        <Link
                          to="/categories"
                          className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                        >
                          <BiCategoryAlt />
                          <span className="group-hover:text-gray-700 font-bold">
                            Categories
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
            
                  {userData && userData.role === ROLE_CHECK.admin && (
                    <li className="min-w-max">
                      <Link
                        to="quiz-management"
                        className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                      >
                        <RiListSettingsFill />
                        <span className="group-hover:text-gray-700 font-bold">
                          Quiz Management
                        </span>
                      </Link>
                    </li>
                  )}
                  {userData && userData.role === ROLE_CHECK.educator && (
                    <>
                      <li className="min-w-max">
                        <Link
                          to="/educator"
                          aria-label="educator dashboard"
                          className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                        >
                          <MdDashboard />
                          <span className="-mr-1 font-montserrat font-bold">
                            Educator Dashboard
                          </span>
                        </Link>
                      </li>
                      <li className="min-w-max">
                        <Link
                          to="/students"
                          className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                        >
                       <PiStudentBold />
                          <span className="group-hover:text-gray-700 font-bold">
                            Students
                          </span>
                        </Link>
                      </li>
                      <li className="min-w-max">
                        <Link
                          to="/groups"
                          className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                        >
                        <TiGroup />
                          <span className="group-hover:text-gray-700 font-bold">
                            Form a group
                          </span>
                        </Link>
                      </li>
                      <li className="min-w-max">
                        <Link
                          nk
                          to="/create"
                          className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                        >
                         <IoCreate />
                          <span className="group-hover:text-gray-700 font-bold">
                            Create Quiz
                          </span>
                        </Link>
                      </li>
                      <li className="min-w-max">
                        <Link
                          to="/groups-list"
                          className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                        >
                    <PiUserListBold />
                          <span className="group-hover:text-gray-70 font-bold">
                            Groups List
                          </span>
                        </Link>
                      </li>

                      <li className="min-w-max">
                        <Link
                          to="/quiz-manage"
                          className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                        >
                <RiListSettingsFill />
                          <span className="group-hover:text-gray-700 font-bold">
                            Quiz Manage
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              <div className=" mb-5">
                <Link
                  to="/profile"
                  className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                >
                  <img
                    className="h-7 w-7 mix-blend-multiply font-bold"
                    src={profile}
                    alt="profile"
                  />
                  <span className="">Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                >
                  <img
                    className="h-7 w-7 mix-blend-multiply font-bold"
                    src={settings}
                    alt="settings"
                  />
                  <span className="">Settings</span>
                </Link>

                {user && (
                  <Link
                    to="/"
                    onClick={onLogout}
                    className="flex items-center space-x-4 mt-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-400 px-2 py-2 text-zinc-700 dark:text-zinc-100"
                  >
                    <img
                      className="h-7 w-7 mix-blend-multiply font-bold"
                      src={logout}
                      alt="logout"
                    />
                    <span className="">Logout</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Sidebar;
