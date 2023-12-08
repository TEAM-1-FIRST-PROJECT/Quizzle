import { useState, useEffect } from "react";
import { blockUser, searchUser } from "../../services/admin.services";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockedUsers, setBlockedUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // const userResults = Object.values(userData?.score);

  // const score = userResults.map((quiz) => quiz?.score).reduce((a, b) => a + b, 0);

  // const usersData = () => {
  //   get(ref(database, 'users'))
  //     .then((snapshot) => {
  //       const user = snapshot.val();

  //       setUserName((Object.values(user).map(user => user.username)));
  //       setScore((Object.values(user).map(user => Object.values(user.score).reduce((sum, quiz) => sum + quiz.score, 0))));

  //     })
  // }

  // usersData();

  useEffect(() => {
    searchUser("").then(setUsers);
  }, [setUsers]);

  const handleBlockUser = (username, blockStatus) => {
    const newBlockStatus = !blockStatus;

    setBlockedUsers((prevState) => ({
      ...prevState,
      [username]: newBlockStatus,
    }));

    blockUser(username, newBlockStatus).then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.username === username
            ? { ...user, isBlocked: newBlockStatus }
            : user
        )
      );
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <div className="p-4 m-4 md:m-20 border shadow-md rounded bg-gradient-to-br from-violet-400 to-cyan-400 dark:from-zinc-500">
        <input
          type="text"
          className="border p-2 rounded w-full md:w-auto placeholder-orange-300 dark:placeholder-orange-200 dark:bg-zinc-400 font-bold"
          placeholder="Search for user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4 overflow-x-auto">
          <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 dark:from-zinc-800 text-white dark:text-zinc-200">
            <thead className="text-lg border border-rose-200 dark:border-indigo-600">
              <tr>
                <th className=" px-4 py-2">Username</th>
                <th className=" px-4 py-2">Email</th>
                <th className=" px-4 py-2">Role</th>
                <th className=" px-4 py-2">Average Points</th>
                <th className=" px-4 py-2">Max Points</th>
                <th className=" px-4 py-2">Questions</th>
                <th className=" px-4 py-2">Last Update</th>
                <th className=" px-4 py-2">Block/Unblock</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.username} className="border border-rose-200 dark:border-indigo-600">
                  <td className=" px-4 py-2">{user.username}</td>
                  <td className=" px-4 py-2">{user.email}</td>
                  <td className=" px-4 py-2">{user.role}</td>
                  <td className=" px-4 py-2">{/* Average Points */}</td>
                  <td className=" px-4 py-2">{/* Max Points */}</td>
                  <td className=" px-4 py-2">{/* Questions */}</td>
                  <td className=" px-4 py-2">{/* Last Update */}</td>
                  <td className=" px-4 py-2">
                    <button
                      className={`${
                        user.isBlocked
                          ? "bg-green-500 dark:bg-green-600"
                          : "bg-red-500 dark:bg-red-600"
                      } text-white dark:text-zinc-200 px-4 py-2 rounded`}
                      onClick={() =>
                        handleBlockUser(user.username, user.isBlocked)
                      }
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 dark:text-zinc-200">
            <div>
              Showing {indexOfFirstUser + 1}-{indexOfLastUser} of {users.length}
            </div>
            <div className="flex justify-center md:justify-end mt-2 md:mt-0">
              <button
                className="bg-blue-500 dark:bg-blue-600 dark:text-zinc-200 text-white px-4 py-2 rounded mr-2"
                onClick={() =>
                  paginate(currentPage > 1 ? currentPage - 1 : currentPage)
                }
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
              </span>
              <button
                className="bg-blue-500 text-white dark:bg-blue-600 dark:text-zinc-200 px-4 py-2 rounded ml-2"
                onClick={() =>
                  paginate(
                    currentPage < Math.ceil(users.length / usersPerPage)
                      ? currentPage + 1
                      : currentPage
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
