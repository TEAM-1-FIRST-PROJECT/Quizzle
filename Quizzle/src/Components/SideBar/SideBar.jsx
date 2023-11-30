import { Link } from "react-router-dom";
import logout from "../../assets/logout.gif";
import profile from "../../assets/profile.gif";
import settings from "../../assets/settings.gif";
import quiz from "../../assets/quiz.gif";
import ManageQuiz from "../../assets/quiz-management.gif";
import { logoutUser } from "../../services/auth.services";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { ROLE_CHECK } from "../../common/constants";
import students from "../../assets/students.gif";
import group from "../../assets/group.png";
const Sidebar = () => {
  //add to HELPER>FUNCS
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
        <div className="fixed z-10 top-14">
          <div className="border-r-2 border-spacing-x-2.5 w-[3.35rem] bg overflow-hidden hover:w-56 hover:bg-white bg-gradient-to-br from-violet-400 to-indigo-400 overflow-y-auto transition-all duration-1000 ease-in-out">
            <div className="flex flex-1 h-screen flex-col justify-between pt-2 pb-6">
              <div>
                <div className="w-max p-2.5">
                  <img src="" className="w-32" alt="" />
                </div>
                <ul className="mt-6 space-y-2 tracking-wide">
                  {userData && userData.role === ROLE_CHECK.admin && (
                    <li className="min-w-max">
                      <Link
                        to="/admin"
                        aria-label="admin dashboard"
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
                          Admin Dashboard
                        </span>
                      </Link>
                    </li>
                  )}
                  <li className="min-w-max">
                    <Link
                      to="/categories"
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
                      <span className="group-hover:text-gray-700">
                        Categories
                      </span>
                    </Link>
                  </li>
                  {userData && userData.role === ROLE_CHECK.admin && (
                    <li className="min-w-max">
                      <Link
                        to="quiz-management"
                        className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                      >
                        <img
                          className="h-7 w-7 mix-blend-multiply"
                          src={ManageQuiz}
                          alt="quiz"
                        />
                        <span className="group-hover:text-gray-700">
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
                            Educator Dashboard
                          </span>
                        </Link>
                      </li>
                      <li className="min-w-max">
                        <Link
                          to="/students"
                          className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                        >
                          <img
                            className="h-8 w-8 mix-blend-multiply"
                            src={students}
                            alt="students"
                          />
                          <span className="group-hover:text-gray-700">
                            Students
                          </span>
                        </Link>
                      </li>
                      <li className="min-w-max">
                        <Link
                          to="/groups"
                          className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                        >
                          <img
                            className="h-8 w-8 mix-blend-multiply"
                            src={group}
                            alt="group"
                          />
                          <span className="group-hover:text-gray-700">
                            Create or join Group
                          </span>
                        </Link>
                      </li>
                      <li className="min-w-max">
                        <Link
                          nk
                          to="/create"
                          className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                        >
                          <img
                            className="h-7 w-7 mix-blend-multiply"
                            src={quiz}
                            alt="quiz"
                          />
                          <span className="group-hover:text-gray-700">
                            Create Quiz
                          </span>
                        </Link>
                      </li>
                      <li className="min-w-max">
                        <Link
                          to="/groups-list"
                          className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                        >
                          <img
                            className="h-8 w-8 mix-blend-multiply"
                            src=""
                            alt="group"
                          />
                          <span className="group-hover:text-gray-700">
                            Groups List
                          </span>
                        </Link>
                      </li>

                      <li className="min-w-max">
                        <Link
                          to="/quiz-manage"
                          className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                        >
                          <img
                            className="h-8 w-8 mix-blend-multiply"
                            src={ManageQuiz}
                            alt="manage quiz"
                          />
                          <span className="group-hover:text-gray-700">
                            Quiz Manage
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="p-5 mb-20">
                <Link
                  to="/profile"
                  className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                >
                  <img
                    className="h-7 w-7 mix-blend-multiply"
                    src={profile}
                    alt="profile"
                  />
                  <span className="">Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                >
                  <img
                    className="h-7 w-7 mix-blend-multiply"
                    src={settings}
                    alt="settings"
                  />
                  <span className="">Settings</span>
                </Link>

                {user && (
                  <Link
                    to="/"
                    onClick={onLogout}
                    className="flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-400 px-4 py-3 text-white"
                  >
                    <img
                      className="h-7 w-7 mix-blend-multiply"
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
