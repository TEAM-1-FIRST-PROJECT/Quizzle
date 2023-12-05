import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users.services";
import { quizAssignments, getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";

const AssignQuiz = () => {

  const { id } = useParams();
  const [date, setDate] = useState('');
  const [finalDate, setFinalDate] = useState('')
  const [users, setUsers] = useState([]);
  const [quiz, setQuiz] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(snapshot => {
        setUsers(Object.values(snapshot.val()))
      })
      .catch(e => toast.error(e));
  }, []);

  useEffect(() => {
    getQuizById(id)
      .then(snapshot => {
        snapshot.assignedUsers ?
          setAssignedUsers(Object.keys(snapshot.assignedUsers))
          : assignedUsers
        setQuiz(snapshot)
      })
      .catch(e => toast.error(e));
  }, [id, assignedUsers]);

  const assignQuizHandler = (user) => {

    const chosenDate = new Date(date);
    const dateInSeconds = chosenDate.getTime();
    const chosenFinalDate = new Date(finalDate);
    const finalDateInSeconds = chosenFinalDate.getTime();
    if (dateInSeconds === '' || finalDateInSeconds === '') {
      alert('date and finalDate can\'t be empty');
      return;
    }

    if (!dateInSeconds) {
      alert('date and finalDate cant\'be empty');
    }
    if (!finalDateInSeconds) {
      alert('date and finalDate cant\'be empty');
    }

    quizAssignments(user, id, dateInSeconds, finalDateInSeconds)
      .then(() => {
        console.log('quiz assigned successfully')
      })
      .catch(e => console.error(e));
  }

  return (
    <>
      {users && <div className="ml-2 mt-6">
        <section className="bg-white dark:bg-white py-3 sm:py-5">
          <div className="px-4  max-w-screen-2xl lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-indigo-300 opacity-80 sm:rounded-lg mb-20">
              <div className="overflow-x-auto">
                <div className="px-4 pt-2 text-sm text-white bg-indigo-500 flex items-center justify-end">
                  <span className="flex-grow">quiz {quiz?.title}</span>
                  <div className="ml-4">
                    open from
                    <input
                      type="date"
                      placeholder="date"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="ml-4">
                    closed on
                    <input
                      type="date"
                      onChange={(e) => setFinalDate(e.target.value)}
                    />
                  </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">

                    <tr>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">UserName</th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">Last name</th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white"></th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">Points</th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white"></th>

                    </tr>
                  </thead>
                  {users.map(user => (

                    <tbody key={user.uid}>
                      <tr className="border-b dark:border-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-200">
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.username}</td>
                        <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.lastName}
                        </th>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.score ? Object.values(user?.score).find(item => item.id === `${id}`)
                            ? Object.values(user?.score).find(item => item.id === `${id}`).score : 0 : 0
                          }</td>
                        <td className="px-4 py-2 text-yellow-400">
                          {assignedUsers.length > 0
                            ? assignedUsers.includes(user.username)
                              ? <button >Assigned</button>
                              : !user?.score ? <button onClick={() => assignQuizHandler(user.username)}>Assign</button> :
                                Object.values(user.score).map((quiz) => quiz.id).includes(id)
                                  ? <button >Resolved</button>
                                  : <button onClick={() => assignQuizHandler(user.username)}>Assign</button>
                            : !user?.score ? <button onClick={() => assignQuizHandler(user.username)}>Assign</button> :
                              Object.values(user.score).map((quiz) => quiz.id).includes(id)
                                ? <button >Resolved</button>
                                : <button onClick={() => assignQuizHandler(user.username)}>Assign</button>}
                        </td>                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </section></div>}
    </>
  )
}

export default AssignQuiz
