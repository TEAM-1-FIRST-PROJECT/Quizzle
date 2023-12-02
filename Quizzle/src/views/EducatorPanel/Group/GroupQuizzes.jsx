import { useState, useEffect } from "react";
import { blockUser, searchUser } from "../../../services/admin.services";
import { ROLE_CHECK } from "../../../common/constants";
import { useParams } from "react-router-dom";

const GroupQuizzes = () => {
    const { groupId } = useParams();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    searchUser("").then(setUsers);
  }, [setUsers]);

    
//   const handleRemoveMember = () => {
//     getGroupDetails(groupId)
//       .then((snapshot) => {
//         const group = snapshot.val();
//         const members = Object.keys(group.members).map((memberId) => {
//           return memberId;
//         });
//         return members;
//       })
//       .then((result) => {
//         console.log(result.toString());
//         toast.success("Member removed successfully");
//         // removeEducator(groupId, memberId)
//       });
//   };

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
    <div className="p-4 m-20 border shadow-md rounded bg-gradient-to-br from-violet-400 to-cyan-400">
      <input
        type="text"
        className="border p-2 rounded w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"
        placeholder="Search for user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-4 overflow-x-auto">
        <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
          <thead className=" text-lg">
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Average Points</th>
                        <th className="border px-4 py-2">
                            {}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
                user.role === ROLE_CHECK.educator && (
              <tr key={user.username}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{}</td>
                <td className="border px-4 py-2"></td>
              </tr>
                  )
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



export default GroupQuizzes;
