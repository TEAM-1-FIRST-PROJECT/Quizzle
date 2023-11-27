import { useState, useEffect } from "react";
import { blockUser, searchUser } from "../../../services/admin.services";

const Students = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockedUsers, setBlockedUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

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
    <div className="p-4 m-20 border shadow-md rounded  bg-gradient-to-br from-violet-400 to-cyan-400">
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Search for user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-4">
        <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
          <thead className=" text-lg">
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Average Points</th>
              <th className="border px-4 py-2">Max Points</th>
              <th className="border px-4 py-2">Questions</th>
              <th className="border px-4 py-2">Last Update</th>
              <th className="border px-4 py-2">Block</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.username}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{/* Average Points */}</td>
                <td className="border px-4 py-2">{/* Max Points */}</td>
                <td className="border px-4 py-2">{/* Questions */}</td>
                <td className="border px-4 py-2">{/* Last Update */}</td>
                <td className="border px-4 py-2">
                  <button
                    className={`${
                      user.isBlocked ? "bg-green-500" : "bg-red-500"
                    } text-white px-4 py-2 rounded`}
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
        <div className="flex justify-between items-center mt-4">
          <div>
            Showing {indexOfFirstUser + 1}-{indexOfLastUser} of {users.length}
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
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
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
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
  );
};

export default Students;
